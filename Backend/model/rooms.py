import json
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
    def __init__(self):
        self.rooms = []
    def add_room(self, room):
        self.rooms.append(room)
    def to_list(self):
        result = []
        for room in self.rooms:
            result.append(room.to_dict())
        return result
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