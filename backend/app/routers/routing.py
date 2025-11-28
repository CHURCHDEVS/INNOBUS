from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.routing import RoutingService

router = APIRouter(
    prefix="/routing",
    tags=["routing"]
)

@router.get("/calculate")
def calculate_route(origin_lat: float, origin_lon: float, dest_lat: float, dest_lon: float, db: Session = Depends(get_db)):
    service = RoutingService(db)
    routes = service.find_routes(origin_lat, origin_lon, dest_lat, dest_lon)
    return {"routes": routes}
