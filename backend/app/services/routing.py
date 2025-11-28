from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List, Dict

class RoutingService:
    def __init__(self, db: Session):
        self.db = db

    def find_routes(self, origin_lat: float, origin_lon: float, dest_lat: float, dest_lon: float):
        # MVP Naive Routing:
        # 1. Find stops within 1km of Origin
        # 2. Find stops within 1km of Destination
        # 3. Find trips that go from Origin-Stop to Dest-Stop
        
        query = text("""
            WITH near_origin AS (
                SELECT id, name, lat, lon, location,
                       ST_Distance(location, ST_SetSRID(ST_MakePoint(:origin_lon, :origin_lat), 4326)) as dist_walk_start
                FROM stops
                WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint(:origin_lon, :origin_lat), 4326), 0.01) -- ~1km
            ),
            near_dest AS (
                SELECT id, name, lat, lon, location,
                       ST_Distance(location, ST_SetSRID(ST_MakePoint(:dest_lon, :dest_lat), 4326)) as dist_walk_end
                FROM stops
                WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint(:dest_lon, :dest_lat), 4326), 0.01)
            )
            SELECT 
                r.short_name, 
                r.long_name,
                t.id as trip_id,
                start_stop.name as start_stop_name,
                end_stop.name as end_stop_name,
                start_stop.dist_walk_start,
                end_stop.dist_walk_end
            FROM trips t
            JOIN routes r ON t.route_id = r.id
            JOIN near_origin start_stop ON TRUE -- Simplified: In real GTFS we check stop_times
            JOIN near_dest end_stop ON TRUE
            LIMIT 5
        """)
        
        # Note: The above SQL is a placeholder. Real GTFS routing requires joining stop_times.
        # Since we don't have populated stop_times in the schema yet (omitted for brevity in init.sql but crucial),
        # I will return a mock response if no data is found, or implement a basic version if tables existed.
        # For this MVP step, I'll return a structured mock that the Frontend can consume to show the UI.
        
        return [
            {
                "route_name": "Ruta A",
                "trip_id": "trip_1",
                "steps": [
                    {"type": "walk", "instruction": "Walk to Stop A", "duration_min": 5},
                    {"type": "bus", "instruction": "Take Bus A to Stop B", "duration_min": 20},
                    {"type": "walk", "instruction": "Walk to Destination", "duration_min": 3}
                ],
                "total_duration_min": 28
            }
        ]
