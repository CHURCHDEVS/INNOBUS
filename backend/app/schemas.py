from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: str
    accessibility_preference: Optional[str] = "none"

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class LocationUpdate(BaseModel):
    lat: float
    lon: float
    speed: Optional[float] = 0.0
    heading: Optional[float] = 0.0
    timestamp: Optional[datetime] = None

class TripStart(BaseModel):
    trip_id: str
    target_stop_id: str

class TripStatus(BaseModel):
    status: str
    eta_seconds: Optional[float]
    distance_remaining_meters: Optional[float]
    notification_triggered: bool = False
    message: Optional[str] = None
