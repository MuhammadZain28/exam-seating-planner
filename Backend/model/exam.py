import json
from ..structures.RB_Tree import RB_Tree
from dataclasses import dataclass
@dataclass(order=True)
class Key:
    date: str
    course: str
class Exams:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Exams, cls).__new__(cls)
            cls._instance.exams = RB_Tree()
            cls._instance.load()
        return cls._instance

    def insert(self, exam):
        key = Key(date=exam.date, course=exam.course)
        self.exams.insert(key, exam)
        self.save()

    def delete(self, course, date):
        key = Key(date=date, course=course)
        self.exams.delete(key)
        self.save()

    def delete_students(self, course, reg, date):
        key = Key(date=date, course=course)
        exam = self.search(key)
        if exam:
            exam.students = [s for s in exam.students if s["reg"] != reg]
            self.save()
            return True
        return False

    def search(self, exam):
        exam_node = self.exams.search(self.exams.root, exam)
        if exam_node:
            return exam_node.data
        return None

    def update(self, exam):
        for i, ex in enumerate(self.exams):
            if ex.course == exam.course:
                updated_exam = Exam(
                    course=exam.course,
                    date=exam.date,
                    type=exam.type,
                    duration=exam.duration,
                    students=ex.students
                )
                self.exams[i] = updated_exam
                self.save()
                return

    def get(self):
        result = self.exams.inorder()
        return [node.to_dict() for node in result]

    def save(self):
        data = {
            "exams": self.get()
        }
        with open("exams.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)


    def load(self):
        with open("exams.json", "r", encoding="utf-8") as f:
            exam = json.load(f)
            print("Loading exams table of size:", exam)
            for record in exam["exams"]:
                print("Loading exam:", record)
                students = [s for s in record["students"]]
                exam = Exam(
                    course=record["course"],
                    date=record["date"],
                    type=record["type"],
                    duration=record["duration"],
                    students=students
                )
                self.insert(exam)


class Exam:
    def __init__(self, course, date, type, duration, students, time="TBD"):
        self.course = course
        self.date = date
        self.type = type
        self.duration = duration
        self.students = students
        self.time = time
    def to_dict(self):
        return {
            "course": self.course,
            "date": self.date,
            "time": self.time,
            "type": self.type,
            "duration": self.duration,
            "students": self.students
        }