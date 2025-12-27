import json
from ..structures.RB_Tree import RB_Tree
from dataclasses import dataclass

@dataclass(order=True)
class Key:
    capacity: int
    name: str

class Room:
    def __init__(self, name: str, columns: int, rows: int):
        self.name = name
        self.columns = columns
        self.rows = rows

    def to_dict(self):
        return {
            "name": self.name,
            "columns": self.columns,
            "rows": self.rows
        }

class Rooms:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Rooms, cls).__new__(cls)
            cls._instance.rooms = RB_Tree()
            cls._instance.capacity = 0
        return cls._instance
    def add_room(self, room):
        key = room.name
        if (self.rooms.insert(key, room)):
            self.capacity += room.rows * room.columns
            return True
        return False

    def delete_room(self, room_id):
        key = room_id
        if self.rooms.delete(key):
            return True
        return False

    def to_list(self):
        return self.rooms.inorder()
    def load(self):
        import json
        with open("rooms.json", "r", encoding="utf-8") as f:
            data = json.load(f)
            for record in data["rooms"]:
                room = Room(**record)
                self.add_room(room)
    def save(self):
        data = {
            "rooms": self.to_list()
        }
        with open("rooms.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)