from collections import deque
class Exam:
    def __init__(self, course, date, type, duration):
        self.course = course
        self.date = date
        self.type = type
        self.duration = duration
        self.students = deque()

    def __repr__(self):
        return f"{self.course} ({self.type})"
