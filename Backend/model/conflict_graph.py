import json
class Conflicts:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Conflicts, cls).__new__(cls)
            cls.graph = {}
        return cls._instance

    def add_conflict(self, date, time, session):
        if date not in self.graph:
            self.graph[date] = {}

        if time not in self.graph[date]:
            self.graph[date][time] = []

        if session not in self.graph[date][time]:
            self.graph[date][time].append(session)
        self.save_graph()

    def can_place_exam(self, date, time, session):
        if date in self.graph and time in self.graph[date]:
            if session in self.graph[date][time] and len(self.graph[date][time]) < 4:
                return False
        return True

    def save_graph(self):
        with open("conflict_graph.json", "w", encoding="utf-8") as f:
            json.dump(self.graph, f, indent=2)

    def load_graph(self):
        try:
            with open("conflict_graph.json", "r", encoding="utf-8") as f:
                self.graph = json.load(f)
        except FileNotFoundError:
            self.graph = {}