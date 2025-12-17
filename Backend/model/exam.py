from ..structures.Queue import Queue
import json

class Exams:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * size
        self.elements = 0

    def hash_1(self, key):
        return key % self.size

    def hash_2(self, key):
        return 1 + (key % (self.size - 1))

    def insert(self, exam):
        key = sum(ord(c) for c in exam.course)
        index = self.hash_1(key)
        steps = self.hash_2(key)

        i = 0
        while self.table[index] is not None and self.table[index] != -1:
            index = (index + steps) % self.size
            i += 1

            if i > self.size:
                return  # Table is full

        self.table[index] = exam
        self.elements += 1
        self.save()
        self.save_students()

    def delete(self, course):
        key = sum(ord(c) for c in course)
        index = self.hash_1(key)
        steps = self.hash_2(key)

        i = 0
        while self.table[index] is not None:
            if self.table[index].course == course:
                self.table[index] = -1
                self.elements -= 1
                return

            index = (index + steps) % self.size
            i += 1
            if i > self.size:
                return

    def search(self, exam):
        key = sum(ord(c) for c in exam.course)
        index = self.hash_1(key)
        steps = self.hash_2(key)

        i = 0
        while self.table[index] is not None:
            if self.table[index].course == exam.course:
                return self.table[index]

            index = (index + steps) % self.size
            i += 1
            if i > self.size:
                return None

    def update(self, exam):
        key = sum(ord(c) for c in exam.course)
        index = self.hash_1(key)
        steps = self.hash_2(key)

        i = 0
        while self.table[index] is not None:
            if self.table[index].course == exam.course:
                self.table[index] = exam
                return

            index = (index + steps) % self.size
            i += 1
            if i > self.size:
                return

    def get(self):
        result = []
        count = 0
        for i, exam in enumerate(self.table):
            if count > self.elements:
                break
            if exam is None or exam == -1:
                continue
            result.append(exam.to_dict())
        return result

    def get_table(self):
        result = []
        count = 0
        for i, exam in enumerate(self.table):
            if count > self.elements:
                break
            if exam is None or exam == -1:
                continue
            result.append(exam.exam_info())
        return result

    def get_students(self):
        result = []
        count = 0
        for i, exam in enumerate(self.table):
            if count > self.elements:
                break
            if exam is None or exam == -1:
                continue
            std = exam.students.to_list()
            result.append(std)
        return result

    def save(self):
        data = self.get_table()
        with open("exams.json", "w", encoding="utf-8") as f:
            json.dump(data, f)

    def save_students(self):
        with open("students.json", "w", encoding="utf-8") as f:
            json.dump(self.get_students(), f, indent=4)


    def load(filename):
        with open(filename, "r", encoding="utf-8") as f:
            return json.load(f)

class Exam:
    def __init__(self, course, date, type, duration):
        self.course = course
        self.date = date
        self.type = type
        self.duration = duration
        self.students = Queue()
    def to_dict(self):
        return {
            "course": self.course,
            "date": self.date,
            "type": self.type,
            "duration": self.duration,
            "students": self.students.count()
        }
    def exam_info(self):
        return {
            "course": self.course,
            "date": self.date,
            "type": self.type,
            "duration": self.duration,
        }