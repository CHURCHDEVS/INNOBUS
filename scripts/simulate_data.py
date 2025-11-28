import os
import psycopg2
import random

# Connect to DB
conn = psycopg2.connect(
    dbname="innobus_db",
    user="innobus_user",
    password="innobus_pass",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

def insert_mock_data():
    print("Inserting mock data...")
    
    # 1. Stops
    stops = [
        ("STOP_1", "Portal Norte", 4.7556, -74.0454),
        ("STOP_2", "Calle 100", 4.6865, -74.0567),
        ("STOP_3", "Calle 72", 4.6567, -74.0612),
        ("STOP_4", "Calle 26", 4.6156, -74.0723),
        ("STOP_5", "Portal Sur", 4.5956, -74.1523),
    ]
    for s in stops:
        cur.execute("INSERT INTO stops (id, name, lat, lon) VALUES (%s, %s, %s, %s) ON CONFLICT DO NOTHING", s)

    # 2. Routes
    routes = [
        ("R1", "Ruta Norte-Sur", "Expreso Norte", "Agency1", "#FF0000"),
        ("R2", "Ruta 80", "Calle 80 - Centro", "Agency1", "#0000FF"),
    ]
    for r in routes:
        cur.execute("INSERT INTO routes (id, short_name, long_name, agency_id, color) VALUES (%s, %s, %s, %s, %s) ON CONFLICT DO NOTHING", r)

    # 3. Trips
    trips = [
        ("TRIP_1", "R1", "Hacia Sur", "SHAPE_1"),
        ("TRIP_2", "R1", "Hacia Norte", "SHAPE_1_REV"),
    ]
    for t in trips:
        cur.execute("INSERT INTO trips (id, route_id, headsign, shape_id) VALUES (%s, %s, %s, %s) ON CONFLICT DO NOTHING", t)

    # 4. Shapes (Simplified straight line for MVP)
    # Shape 1: Portal Norte -> Portal Sur
    shape_points = [
        ("SHAPE_1", 1, 4.7556, -74.0454),
        ("SHAPE_1", 2, 4.6865, -74.0567),
        ("SHAPE_1", 3, 4.6567, -74.0612),
        ("SHAPE_1", 4, 4.6156, -74.0723),
        ("SHAPE_1", 5, 4.5956, -74.1523),
    ]
    for sp in shape_points:
        cur.execute("INSERT INTO shapes (shape_id, sequence, lat, lon) VALUES (%s, %s, %s, %s) ON CONFLICT DO NOTHING", sp)

    conn.commit()
    print("Mock data inserted successfully!")

if __name__ == "__main__":
    try:
        insert_mock_data()
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cur.close()
        conn.close()
