from fastapi import APIRouter
from ..model.rooms import Rooms, Room
from pydantic import BaseModel

router = APIRouter()
rooms = Rooms()
rooms.load()

class RoomModel(BaseModel):
    name: str
    rows: int
    columns: int

@router.get("/")
def get_rooms():
    return rooms.to_list()

@router.post("/insert")
def add_room(room_data: RoomModel):
    room = Room(
        room_number=room_data.name,
        row=room_data.rows,
        column=room_data.columns
    )
    rooms.add_room(room)
    rooms.save()
    return {"message": "Room added successfully"}