from sqlalchemy.orm import Session
from sqlalchemy import text
from ..models import UserTrip, Trip, Stop
from ..schemas import LocationUpdate, TripStatus
import datetime

class TrackingService:
    def __init__(self, db: Session):
        self.db = db

    def update_user_location(self, user_trip_id: int, location: LocationUpdate) -> TripStatus:
        user_trip = self.db.query(UserTrip).filter(UserTrip.id == user_trip_id).first()
        if not user_trip:
            raise Exception("Trip not found")

        # 1. Snap to route logic using PostGIS
        # Find closest point on the route shape
        # We assume 'trips' table has a shape_id and 'route_shapes' view exists (or we join shapes)
        # For MVP, let's do a direct spatial query on the shapes table or view
        
        # Check proximity (Threshold: 20 meters)
        # ST_Distance returns degrees by default for 4326, so we cast to geography for meters
        query_proximity = text("""
            SELECT ST_Distance(
                ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography,
                (SELECT geom FROM route_shapes WHERE shape_id = (SELECT shape_id FROM trips WHERE id = :trip_id))::geography
            )
        """)
        
        distance_to_route = self.db.execute(query_proximity, {
            "lon": location.lon, 
            "lat": location.lat, 
            "trip_id": user_trip.trip_id
        }).scalar()

        if distance_to_route > 20:
            # User is off-route
            return TripStatus(
                status="off_route",
                eta_seconds=None,
                distance_remaining_meters=None,
                message="You are off the route."
            )

        # 2. Calculate Distance Remaining to Target Stop
        # Project user location onto line, then measure distance from there to stop
        # This is complex in pure SQL without a linear referencing system setup, 
        # but we can approximate: Distance(User, Stop) along the line.
        # For MVP, let's use ST_Distance between User and Stop (straight line) or slightly better, 
        # distance along line if we had LRS. Let's stick to straight line distance for simplicity 
        # OR use pgRouting if available. 
        # BETTER: ST_LineLocatePoint to find fraction, then compute length * (stop_fraction - user_fraction)
        
        query_remaining = text("""
            WITH route_line AS (
                SELECT geom FROM route_shapes WHERE shape_id = (SELECT shape_id FROM trips WHERE id = :trip_id)
            ),
            user_point AS (
                SELECT ST_ClosestPoint(geom, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)) as pt FROM route_line
            ),
            stop_point AS (
                SELECT location as pt FROM stops WHERE id = :stop_id
            )
            SELECT 
                ST_Length(
                    ST_LineSubstring(
                        geom, 
                        ST_LineLocatePoint(geom, (SELECT pt FROM user_point)),
                        ST_LineLocatePoint(geom, (SELECT pt FROM stop_point))
                    )::geography
                ) as dist_meters
            FROM route_line
        """)
        
        try:
            distance_remaining = self.db.execute(query_remaining, {
                "lon": location.lon,
                "lat": location.lat,
                "trip_id": user_trip.trip_id,
                "stop_id": user_trip.target_stop_id
            }).scalar()
        except Exception as e:
            # Fallback if ST_LineSubstring fails (e.g. user passed stop)
            distance_remaining = 0

        if distance_remaining is None or distance_remaining < 0:
             distance_remaining = 0

        # 3. Calculate ETA
        # Use bus speed if available (from GTFS-RT / current_bus_positions), else default
        # Default speed: 20 km/h = 5.55 m/s
        avg_speed_mps = 5.55
        if location.speed and location.speed > 1:
             # Blend user speed (if they are on bus) with avg
             avg_speed_mps = (avg_speed_mps + location.speed) / 2
        
        eta_seconds = distance_remaining / avg_speed_mps

        # 4. Check Notification Threshold (3 minutes = 180 seconds)
        notification_triggered = eta_seconds <= 180 and eta_seconds > 0

        # Update UserTrip state
        user_trip.current_location = f"POINT({location.lon} {location.lat})"
        user_trip.estimated_arrival_at_stop = datetime.datetime.utcnow() + datetime.timedelta(seconds=eta_seconds)
        self.db.commit()

        return TripStatus(
            status="on_route",
            eta_seconds=eta_seconds,
            distance_remaining_meters=distance_remaining,
            notification_triggered=notification_triggered,
            message="Prepare to get off" if notification_triggered else "En route"
        )
