from .exam import Exams

examInstance = Exams()
DELETED = object()
class Student:
    def __init__(self, name, reg, course, session, section):
        self.name = name
        self.reg = reg
        self.course = course
        self.session = session
        self.section = section

    def to_dict(self):
        return {
            "name": self.name,
            "reg": self.reg,
            "session": self.session,
            "section": self.section
        }
    def to_print(self):
        return {
            "name": self.name,
            "reg": self.reg,
            "course": self.course,
            "session": self.session,
            "section": self.section
        }

class Students:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Students, cls).__new__(cls)
            cls.table = [None] * 1091
            cls.size = 1091
            cls.elements = 0
        return cls._instance

    def insert(self, student):
        if self.elements / self.size > 0.7:
            self.rehash()
        key = self.compute_key(student.reg)
        h1 = key % self.size
        h2 = 2 + (key % (self.size - 1))
        for attempt in range(self.size):
            idx = (h1 + attempt * h2) % self.size
            if self.table[idx] is None or self.table[idx] is DELETED:
                self.table[idx] = student
                self.elements += 1
                return True
        return False

    def search(self, reg):
        key = self.compute_key(reg)
        h1 = key % self.size
        h2 = 2 + (key % (self.size - 1))
        for attempt in range(self.size):
            idx = (h1 + attempt * h2) % self.size
            s = self.table[idx]
            if s is None:
                return None
            if s is not DELETED and s.reg == reg:
                return s
        return None

    def compute_key(self, reg):
        key = 0
        p = 31
        m = 10**9 + 9
        for i, c in enumerate(reg):
            key = (key + (ord(c) * pow(p, i, m))) % m
        return key


    def to_list(self):
        result = [s.to_print() for s in self.table if s and s != DELETED]
        return result


    def delete(self, reg):
        key = self.compute_key(reg)
        h1 = key % self.size
        h2 = 2 + (key % (self.size - 1))
        for attempt in range(self.size):
            idx = (h1 + attempt * h2) % self.size
            s = self.table[idx]
            if s is None:
                return False
            if s is not DELETED and s.reg == reg:
                self.table[idx] = DELETED
                return True
        return False

    def rehash(self):
        old_table = self.table
        self.size = self.size * 2 + 1
        self.table = [None] * self.size
        self.elements = 0
        for student in old_table:
            if student and student != DELETED:
                self.insert(student)

    def load(self):
        exam = examInstance.get()
        for record in exam:
            for s in record["students"]:
                student = Student(name=s.get("name", " "), reg=s["reg"], course=record["course"], session=record["session"], section=s.get("section", "A"))
                self.insert(student)