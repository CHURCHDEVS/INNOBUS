from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from .database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    accessibility_preference = Column(String, default="none")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Stop(Base):
    __tablename__ = "stops"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    location = Column(Geometry("POINT", srid=4326))

class Route(Base):
    __tablename__ = "routes"
    id = Column(String, primary_key=True)
    short_name = Column(String)
    long_name = Column(String)
    color = Column(String)

class Trip(Base):
    __tablename__ = "trips"
    id = Column(String, primary_key=True)
    route_id = Column(String, ForeignKey("routes.id"))
    headsign = Column(String)
    shape_id = Column(String)
    
    route = relationship("Route")

class UserTrip(Base):
    __tablename__ = "user_trips"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    trip_id = Column(String, ForeignKey("trips.id"))
    status = Column(String, default="active")
    current_location = Column(Geometry("POINT", srid=4326))
    target_stop_id = Column(String, ForeignKey("stops.id"))
    estimated_arrival_at_stop = Column(DateTime)
    last_updated = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User")
    trip = relationship("Trip")
    target_stop = relationship("Stop")
