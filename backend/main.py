from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import random
from datetime import timedelta
from sqlmodel import Session, select

from . import models
from .db import init_db, get_session
import os
from .db import engine, DATABASE_URL

app = FastAPI()

# Allow requests from Vite dev server and Electron
# Allow requests from Vite dev server, Netlify, and other origins.
# You can override allowed origins using the CORS_ORIGINS env var as a
# comma-separated list.
default_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "capacitor://localhost",
    "http://localhost",
]
env_origins = os.environ.get("CORS_ORIGINS")
if env_origins:
    allow_origins = [o.strip() for o in env_origins.split(",") if o.strip()]
else:
    allow_origins = default_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    # Log which database URL is being used for debugging
    print(f"[startup] Using DATABASE_URL={DATABASE_URL}")
    # Initialize database and create tables
    init_db()

    # Seed sample data if empty
    # Use the engine imported from db.py to create a session.
    from .db import engine
    with Session(engine) as session:
        room_count = session.exec(select(models.Room)).all()
        if not room_count:
            sample_rooms = [
                models.Room(name="Lecturer room Beta", status="Occupied", lights="ON"),
                models.Room(name="Lecturer room Omega", status="Unoccupied", lights="OFF"),
                models.Room(name="Lecturer room Zeta", status="Occupied", lights="ON"),
            ]
            session.add_all(sample_rooms)
            session.commit()

        fire_entries = session.exec(select(models.CafeteriaFire)).all()
        if not fire_entries:
            session.add(models.CafeteriaFire(status="SAFE", last_checked=datetime.now()))
            session.commit()


@app.get("/api/rooms")
def get_rooms(session: Session = Depends(get_session)):
    rooms = session.exec(select(models.Room)).all()
    return [
        {"room": r.name, "status": r.status, "lights": r.lights} for r in rooms
    ]


@app.get("/api/cafeteria/fire")
def fire_status(session: Session = Depends(get_session)):
    fire = session.exec(select(models.CafeteriaFire)).first()
    if not fire:
        return {"status": "UNKNOWN", "last_checked": None}
    return {"status": fire.status, "last_checked": fire.last_checked.strftime("%Y-%m-%d %H:%M:%S")}


@app.get("/api/cafeteria/gas")
def gas_status():
    return {
        "status": "SAFE",  # change to "DETECTED" to simulate
        "last_checked": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }


@app.get("/api/serverroom")
def server_room_status():
    temperature = random.randint(60, 80)  # Simulate temperature readings
    
    if temperature > 75:
        status = "OVERHEATING"
        overheating = True
    elif temperature > 65:
        status = "WARNING"
        overheating = False
    else:
        status = "NORMAL"
        overheating = False
    
    return {
        "temperature": temperature,
        "status": status,
        "overheating": overheating,
        "last_checked": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }


@app.get("/api/alerts")
def get_alerts():
    """Get all active alerts for the campus"""
    
    # Simulate dynamic alerts
    alerts = []
    
    # Fire alert (30% chance)
    if random.random() < 0.3:
        alerts.append({
            "id": 1,
            "type": "critical",
            "title": "Fire Alert",
            "message": "Fire detected in Cafeteria! Immediate evacuation required.",
            "time": (datetime.now() - timedelta(minutes=random.randint(1, 30))).strftime("%H:%M"),
            "location": "Cafeteria",
            "status": "active",
            "priority": "high"
        })
    
    # Energy spike alert (40% chance)
    if random.random() < 0.4:
        alerts.append({
            "id": 2,
            "type": "warning",
            "title": "Energy Spike",
            "message": "Energy usage spike detected in Server Room.",
            "time": (datetime.now() - timedelta(minutes=random.randint(5, 60))).strftime("%H:%M"),
            "location": "Server Room",
            "status": "active",
            "priority": "medium"
        })
    
    # System info (always present)
    alerts.append({
        "id": 3,
        "type": "info",
        "title": "System Update",
        "message": "All systems operational. Regular maintenance scheduled.",
        "time": (datetime.now() - timedelta(hours=random.randint(1, 3))).strftime("%H:%M"),
        "location": "Campus-wide",
        "status": "resolved",
        "priority": "low"
    })
    
    return alerts
