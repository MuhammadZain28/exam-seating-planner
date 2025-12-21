import json
class Conflicts:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Conflicts, cls).__new__(cls)
            cls.graph = {}
        return cls._instance

    def add_conflict(self, date, course1, course2):
        if date not in self.graph:
            self.graph[date] = {}

        if course1 not in self.graph[date]:
            self.graph[date][course1] = []

        if course2 not in self.graph[date]:
            self.graph[date][course2] = []

        if course2 not in self.graph[date][course1]:
            self.graph[date][course1].append(course2)

        if course1 not in self.graph[date][course2]:
            self.graph[date][course2].append(course1)

        self.save_graph()

    def save_graph(self):
        with open("conflict_graph.json", "w", encoding="utf-8") as f:
            json.dump(self.graph, f, indent=2)

    def load_graph(self):
        try:
            with open("conflict_graph.json", "r", encoding="utf-8") as f:
                self.graph = json.load(f)
        except FileNotFoundError:
            self.graph = {}