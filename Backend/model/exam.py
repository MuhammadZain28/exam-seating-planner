import json
from ..structures.LinkList import LinkList
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
            cls._instance.exams = LinkList()
            cls._instance.load()
        return cls._instance

    def insert(self, exam):
        self.exams.push(exam)
        self.save()

    def delete(self, course):
        self.exams.delete(course)
        self.save()

    def delete_students(self, course, reg):
        exam = self.search(course)
        if exam:
            exam.students = [s for s in exam.students if s["reg"] != reg]
            self.save()
            return True
        return False

    def search(self, course):
        exam_node = self.exams.search(course)
        if exam_node:
            return exam_node.data
        return None

    def update(self, exam):
        exam_node = self.exams.search(exam.course)
        if exam_node:
            ex = Exam(
                course=exam.course,
                date=exam.date,
                type=exam.type,
                duration=exam.duration,
                students=exam_node.data.students
            )
            exam_node.data = ex
            self.save()
            return True
        return False

    def get(self):
        result = self.exams.mergeSort(self.exams.head)
        self.exams.head = result
        if result is None:
            return []
        return self.exams.get_list()

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