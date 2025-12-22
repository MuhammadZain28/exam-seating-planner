from .exam import Exams

examInstance = Exams()

class Student:
    def __init__(self, name, reg, course):
        self.name = name
        self.reg = reg
        self.course = course

    def to_dict(self):
        return {
            "name": self.name,
            "reg": self.reg
        }
    def to_print(self):
        return {
            "name": self.name,
            "reg": self.reg,
            "course": self.course,
        }

class Students:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Students, cls).__new__(cls)
            cls.table = [None] * 1117
            cls.size = 1117
            cls.elements = 0
        return cls._instance

    def insert(self, student):
        key = sum(ord(c) for c in student.reg)
        index = self.hash_1(key)
        steps = self.hash_2(key)
        i = 0
        while self.table[index] is not None:
            index = (index + steps) % self.size
            i += 1
            if i > self.size:
                print("Hash table is full, cannot insert student:", student.reg)
                return  False
        self.table[index] = student
        self.elements += 1
        return True

    def hash_1(self, key):
        return key % self.size

    def hash_2(self, key):
        return 2 + (key % (self.size - 1))

    def search(self, student):
        key = sum(ord(c) for c in student["reg"])
        index = self.hash_1(key)
        steps = self.hash_2(key)

        i = 0
        while self.table[index] is not None:
            print("Searching at index:", i)
            if self.table[index].reg == student["reg"]:
                return self.table[index]

            index = (index + steps) % self.size
            i += 1
            if i > self.size:
                return None

    def check_duplicate(self, students):
        if self.elements == 0:
            return 0, None
        duplicates = 0
        conflict = None
        for student in students:
            searched = self.search(student)
            if searched is not None:
                duplicates += 1
                conflict = searched.to_print()
        if duplicates == 0:
            return 0, None
        print(conflict)
        return duplicates, conflict["course"]
    def to_list(self):
        result = []
        count = 0
        for i, student in enumerate(self.table):
            if count > self.elements:
                break
            if student is None or student == -1:
                continue
            result.append(student.to_print())
            count += 1
        return result


    def delete(self, reg):
        key = sum(ord(c) for c in reg)
        index = self.hash_1(key)
        steps = self.hash_2(key)

        i = 0
        while self.table[index] is not None:
            if self.table[index] != -1 and self.table[index].reg == reg:
                self.table[index] = -1  # Mark as deleted
                self.elements -= 1
                return True

            index = (index + steps) % self.size
            i += 1
            if i > self.size:
                return False
        return False


    def load(self):
        exam = examInstance.get()
        for record in exam:
            for s in record["students"]:
                student = Student(name=s["name"], reg=s["reg"], course=record["course"])
                self.insert(student)