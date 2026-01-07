import json
class Conflicts:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Conflicts, cls).__new__(cls)
            cls.graph = {}
        return cls._instance

    def add_conflict(self, date, time, session, students):
        if date not in self.graph:
            self.graph[date] = {}

        if time not in self.graph[date]:
            self.graph[date][time] = {}

        if session not in self.graph[date][time]:
            self.graph[date][time][session] = list(map(lambda s: s["reg"], students))
        self.save_graph()

    def can_place_exam(self, date, time, session):
        if date in self.graph and time in self.graph[date]:
            if session in self.graph[date][time] and len(self.graph[date][time]) < 4:
                return False
        return True

    def student_conflict(self, date, time, students):
        if date in self.graph and time in self.graph[date]:
            for session in self.graph[date][time]:
                prev_student = self.graph[date][time][session]
                disjoint = set(prev_student).isdisjoint(set(students))
                print(disjoint)
                if not disjoint:
                    return False
        return True
    def remove_conflict(self, date, time, session):
        if date in self.graph and time in self.graph[date]:
            if session in self.graph[date][time]:
                del self.graph[date][time][session]
                if not self.graph[date][time]:
                    del self.graph[date][time]
                if not self.graph[date]:
                    del self.graph[date]
                self.save_graph()
                return True
        return False

    def update_conflict(self, old_date, old_time, old_session, new_date, new_time, new_session, students):
        self.remove_conflict(old_date, old_time, old_session)
        self.add_conflict(new_date, new_time, new_session, students)

    def save_graph(self):
        with open("conflict_graph.json", "w", encoding="utf-8") as f:
            json.dump(self.graph, f, indent=2)

    def load_graph(self):
        try:
            with open("conflict_graph.json", "r", encoding="utf-8") as f:
                self.graph = json.load(f)
        except FileNotFoundError:
            self.graph = {}