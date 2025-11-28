-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    accessibility_preference VARCHAR(50) DEFAULT 'none',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stops table (GTFS stops)
CREATE TABLE stops (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lon DOUBLE PRECISION NOT NULL,
    location GEOMETRY(Point, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(lon, lat), 4326)) STORED
);

-- Routes table (GTFS routes)
CREATE TABLE routes (
    id VARCHAR(255) PRIMARY KEY,
    short_name VARCHAR(50),
    long_name VARCHAR(255),
    agency_id VARCHAR(255),
    color VARCHAR(7) DEFAULT '#000000'
);

-- Trips table (GTFS trips)
CREATE TABLE trips (
    id VARCHAR(255) PRIMARY KEY,
    route_id VARCHAR(255) REFERENCES routes(id),
    headsign VARCHAR(255),
    shape_id VARCHAR(255)
);

-- Shapes table (GTFS shapes - simplified for storage)
-- Storing as individual points is standard GTFS, but for performance we might want a LineString per shape_id in a separate table or view.
CREATE TABLE shapes (
    shape_id VARCHAR(255),
    sequence INT,
    lat DOUBLE PRECISION NOT NULL,
    lon DOUBLE PRECISION NOT NULL,
    location GEOMETRY(Point, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(lon, lat), 4326)) STORED,
    PRIMARY KEY (shape_id, sequence)
);

-- Aggregate shapes into LineStrings for easier routing/snapping
CREATE VIEW route_shapes AS
SELECT 
    shape_id, 
    ST_MakeLine(location ORDER BY sequence) as geom
FROM shapes
GROUP BY shape_id;

-- GTFS Raw (placeholder for bulk imports)
CREATE TABLE gtfs_raw (
    filename VARCHAR(255),
    content TEXT,
    imported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alerts (Crowdsourcing)
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    type VARCHAR(50) NOT NULL, -- 'bus_no_show', 'stop_closed', 'route_detour'
    description TEXT,
    lat DOUBLE PRECISION,
    lon DOUBLE PRECISION,
    location GEOMETRY(Point, 4326),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Trips (Active navigation sessions)
CREATE TABLE user_trips (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    trip_id VARCHAR(255) REFERENCES trips(id), -- The bus trip they are on
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'cancelled'
    current_location GEOMETRY(Point, 4326),
    target_stop_id VARCHAR(255) REFERENCES stops(id),
    estimated_arrival_at_stop TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Current Bus Positions (Real-time or Simulated)
CREATE TABLE current_bus_positions (
    trip_id VARCHAR(255) PRIMARY KEY, -- REFERENCES trips(id) (might be loose constraint for RT)
    lat DOUBLE PRECISION NOT NULL,
    lon DOUBLE PRECISION NOT NULL,
    speed DOUBLE PRECISION, -- km/h
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location GEOMETRY(Point, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(lon, lat), 4326)) STORED
);

-- Indexing for spatial queries
CREATE INDEX idx_stops_location ON stops USING GIST (location);
CREATE INDEX idx_shapes_location ON shapes USING GIST (location);
CREATE INDEX idx_alerts_location ON alerts USING GIST (location);
