import json
class Student:
    def __init__(self, name, reg, course):
        self.name = name
        self.reg = reg
        self.course = course

    def to_dict(self):
        return {
            "name": self.name,
            "reg": self.reg,
            "course": self.course
        }

class Students:
    def __init__(self):
        self.table = []
        self.size = 10
        self.elements = 0

    def insert(self, student):
        key = sum(ord(c) for c in student.reg)
        index = self.hash_1(key)
        steps = self.hash_2(key)
        i = 0
        while self.table[index] is not None:
            index = (index + steps) % self.size
            i += 1
            if i > self.size:
                return  # Table is full
        self.table[index] = student
        self.elements += 1

    def hash_1(self, key):
        return key % self.size

    def hash_2(self, key):
        return 2 + (key % (self.size - 1))

    def search(self, student):
        key = sum(ord(c) for c in student.reg)
        index = self.hash_1(key)
        steps = self.hash_2(key)

        i = 0
        while self.table[index] is not None:
            if self.table[index].reg == student.reg:
                return self.table[index]

            index = (index + steps) % self.size
            i += 1
            if i > self.size:
                return None

    def to_list(self):
        result = []
        count = 0
        for i, student in enumerate(self.table):
            if count > self.elements:
                break
            if student is None or student == -1:
                continue
            result.append(student.to_dict())
            count += 1
        return result

    def load(self):
        with open("students.json", "r", encoding="utf-8") as f:
            student = json.load(f)
            self.size = len(student) * 2
            self.table = [None] * self.size
            for data in student:
                for record in data:
                    print("Loading student:", record)
                    student = Student(**record)
                    self.insert(student)