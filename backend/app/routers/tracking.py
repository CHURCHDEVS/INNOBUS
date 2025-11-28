from fastapi import APIRouter, Depends, HTTPException, WebSocket
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import LocationUpdate, TripStatus, TripStart
from ..services.tracking import TrackingService
from ..models import UserTrip

router = APIRouter(
    prefix="/tracking",
    tags=["tracking"]
)

@router.post("/start", response_model=int)
def start_trip(trip_data: TripStart, db: Session = Depends(get_db)):
    # Create a new UserTrip session
    # For MVP, hardcoding user_id=1
    new_trip = UserTrip(
        user_id=1, 
        trip_id=trip_data.trip_id,
        target_stop_id=trip_data.target_stop_id,
        status="active"
    )
    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)
    return new_trip.id

@router.post("/update/{user_trip_id}", response_model=TripStatus)
def update_location(user_trip_id: int, location: LocationUpdate, db: Session = Depends(get_db)):
    service = TrackingService(db)
    try:
        status = service.update_user_location(user_trip_id, location)
        return status
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# WebSocket for real-time updates (Optional for MVP but requested)
@router.websocket("/ws/{user_trip_id}")
async def websocket_endpoint(websocket: WebSocket, user_trip_id: int, db: Session = Depends(get_db)):
    await websocket.accept()
    service = TrackingService(db)
    try:
        while True:
            data = await websocket.receive_json()
            location = LocationUpdate(**data)
            status = service.update_user_location(user_trip_id, location)
            await websocket.send_json(status.dict())
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket.close()
