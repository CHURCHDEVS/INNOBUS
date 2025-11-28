from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="INNOBUS API",
    description="Backend for INNOBUS public transport app",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to INNOBUS API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

from .routers import tracking, routing
app.include_router(tracking.router)
app.include_router(routing.router)
