from .rooms import Room, Rooms
from .exam import Exam, Exams
from ..structures.Queue import PriorityQueue

def arrange_exam_hall(rooms, exams):
    halls = {}
    count = 0
    while not exams.isEmpty() and rooms:
        room = rooms.pop(0)
        halls[room["name"]] = []
        groups = {0: [], 1: [], 2: [], 3: []}

        for r in range(room["rows"]):
            for c in range(room["columns"]):
                g = (r % 2) * 2 + (c % 2)
                groups[g].append((r, c))

        print(f"Seat group {groups}")

        hall = [[None for _ in range(room["columns"])] for _ in range(room["rows"])]

        i = 0
        remaining_seats = []
        new_exams = []
        msg = ""
        while i < 4 and not exams.isEmpty():
            exam_info = exams.pop()
            if len(exam_info["students"]) > len(groups[i]) and len(rooms) == 0:
                continue

            for student in exam_info["students"]:
                if not groups[i]:
                    remaining_seats.append(student)
                    continue
                r, c = groups[i].pop()
                hall[r][c] = (student["reg"])
                count += 1
            if remaining_seats and len(rooms):
                new_exams.append({"course": exam_info["course"], "date": exam_info["date"], "duration": exam_info["duration"], "students": remaining_seats})
                remaining_seats = []
            i = (i + 1) % 4
        if new_exams:
            for ne in new_exams:
                exams.push(ne, len(exam_info["students"]))

        halls[room["name"]] = hall

    return halls


def shedule_exams(date="2025-12-21"):
    roomInstance = Rooms()
    examInstance = Exams()
    roomInstance.load()
    examInstance.load()
    rooms = roomInstance.to_list()
    exams = PriorityQueue()
    for exam in examInstance.get():
        print(exam["date"], date)
        if exam["date"] == date:
            exams.push(exam, len(exam["students"]))
        elif exam["date"] > date:
            break
    return arrange_exam_hall(rooms, exams)

if __name__ == "__main__":
    shedule_exams()

