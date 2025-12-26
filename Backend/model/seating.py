from .rooms import Rooms
from .exam import Exams
from ..structures.Queue import PriorityQueue
import json

class Seating:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Seating, cls).__new__(cls)
            cls._instance.arrangements = {}
        return cls._instance

    def arrange_exam_hall(self, rooms, exams):
        halls = {}
        count = 0
        while not exams.isEmpty() and rooms:
            room = rooms.pop(0)
            halls[room["name"]] = {}
            courses = {}
            groups = {0: [], 1: [], 2: [], 3: []}

            for r in range(room["rows"]):
                for c in range(room["columns"]):
                    g = (r % 2) * 2 + (c % 2)
                    groups[g].append((r, c))


            hall = [[None for _ in range(room["columns"])] for _ in range(room["rows"])]

            i = 0
            remaining_seats = []
            new_exams = []
            while i < 4 and not exams.isEmpty():
                exam_info = exams.pop()
                if not exam_info:
                    break
                key = exam_info['session']
                courses[key] = 0

                for student in exam_info["students"]:
                    if not groups[i]:
                        remaining_seats.append(student)
                        continue
                    r, c = groups[i].pop()
                    hall[r][c] = (student["reg"])
                    courses[key] += 1
                    count += 1
                if remaining_seats and len(rooms):
                    new_exams.append({"course": exam_info["course"], "date": exam_info["date"], "duration": exam_info["duration"], "session": exam_info["session"], "students": remaining_seats})
                    remaining_seats = []
                i = (i + 1) % 4
            if new_exams:
                for ne in new_exams:
                    exams.push(ne, len(exam_info["students"]))

            halls[room["name"]] = {"layout": hall, "courses": courses}
        print("Total Students Seated:", count)
        return halls


    def shedule_exams(self, date="2025-12-21", time="09:00"):
        # load_arrangement_result = load_arrangement(date, time)
        # if load_arrangement_result:
        #     return load_arrangement_result
        roomInstance = Rooms()
        examInstance = Exams()
        rooms = roomInstance.to_list()
        exams = PriorityQueue()
        for exam in examInstance.get():
            if exam["date"] == date and exam["time"] == time:
                exams.push(exam, len(exam["students"]))
            elif exam["date"] > date:
                break
        arrangement = self.arrange_exam_hall(rooms, exams)
        self.save_arrangement(arrangement, date, time)
        return arrangement

    def save_arrangement(self, arrangement, date, time):
        self.arrangements.setdefault(date, {})[time] = arrangement
        with open("Exam_arrangements.json", "w") as f:
            json.dump(self.arrangements, f, indent=1)

    def load_arrangement(self):
        try:
            filename = f"Exam_arrangements.json"
            with open(filename, "r") as f:
                self.arrangements = json.load(f)
        except FileNotFoundError:
            return None

    def load_exist(self, date, time):
        if date in self.arrangements and time in self.arrangements[date]:
            return self.arrangements[date][time]
        return None
    def get_arrangements(self):
        data = []
        for date, times in self.arrangements.items():
            for time, arrangements in times.items():
                data.append({
                    "date": date,
                    "time": time
                })
        return data

    def delete_arrangement(self, date, time):
        if date in self.arrangements and time in self.arrangements[date]:
            del self.arrangements[date][time]
            if not self.arrangements[date]:
                del self.arrangements[date]
            with open("Exam_arrangements.json", "w") as f:
                json.dump(self.arrangements, f, indent=1)
            return True
        return False

