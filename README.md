# INNOBUS - Intelligent Public Transport App

INNOBUS is a comprehensive MVP for a public transport application featuring real-time tracking, route calculation, and a "Waze-like" navigation mode for bus users.

## Project Structure

The project is organized as a Monorepo:

*   `backend/`: FastAPI (Python) backend service.
*   `mobile/`: Flutter (Dart) mobile application.
*   `web/`: React + Vite web application.
*   `admin/`: React + Vite admin panel.
*   `database/`: PostgreSQL + PostGIS initialization scripts.
*   `scripts/`: Utility scripts for data simulation.

## Prerequisites

*   Docker & Docker Compose
*   Node.js (for Web/Admin)
*   Flutter SDK (for Mobile)
*   Python 3.10+ (for local backend dev)

## Getting Started

### 1. Start Infrastructure (Database & Backend)

```bash
docker-compose up --build
```

This will start:
*   **Database**: PostgreSQL + PostGIS on port 5432.
*   **Backend**: FastAPI on port 8000 (http://localhost:8000).

### 2. Populate Mock Data

Once the database is running, run the simulation script to populate stops, routes, and trips:

```bash
# Install dependencies
pip install psycopg2-binary

# Run script
python scripts/simulate_data.py
```

### 3. Run Web App

```bash
cd web
npm install
npm run dev
```
Access at: http://localhost:3000

### 4. Run Admin Panel

```bash
cd admin
npm install
npm run dev
```
Access at: http://localhost:3001

### 5. Run Mobile App

```bash
cd mobile
flutter pub get
flutter run
```

## Key Features

*   **Smart Routing**: Calculates optimal routes combining walking and bus segments.
*   **Waze Mode**: Detects when you are on the bus (Snap-to-route) and notifies you 3 minutes before your stop.
*   **Real-time Tracking**: Visualizes bus positions and user progress.
*   **Admin Dashboard**: Manage routes, stops, and view analytics.

## Architecture

*   **Backend**: Hexagonal Architecture.
*   **Database**: Spatial queries using PostGIS (`ST_Distance`, `ST_ClosestPoint`).
*   **Mobile**: Riverpod for state management, `flutter_map` for OSM integration.

## API Documentation

Once the backend is running, visit: http://localhost:8000/docs
