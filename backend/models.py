from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Room(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    status: str
    lights: str
    last_updated: Optional[datetime] = None

class CafeteriaFire(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    status: str
    last_checked: Optional[datetime] = None
