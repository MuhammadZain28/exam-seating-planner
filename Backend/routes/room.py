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
        name=room_data.name,
        rows=room_data.rows,
        columns=room_data.columns
    )
    if rooms.add_room(room):
        rooms.save()
        return {"Success": "Room added successfully"}
    return {"Error": "Room already exists"}
@router.delete("/delete/{room_id}/")
def delete_room(room_id: str):
    if rooms.delete_room(room_id):
        rooms.save()
        return {"Success": "Room deleted successfully"}
    return {"Error": "Room not found"}

@router.put("/update/{room_id}/")
def update_room(room_id: str, room_data: RoomModel):
    if rooms.delete_room(room_id):
        room = Room(
            name=room_data.name,
            rows=room_data.rows,
            columns=room_data.columns
        )
        if rooms.add_room(room):
            rooms.save()
            return {"Success": "Room updated successfully"}
    return {"Error": "Room not found for update"}