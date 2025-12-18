import json

class Exams:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Exams, cls).__new__(cls)
            cls._instance.exams = []
            cls._instance.load()
        return cls._instance

    def insert(self, exam):
        self.exams.append(exam)
        self.save()

    def delete(self, course):
        self.exams = [exam for exam in self.exams if exam.course != course]
        self.save()

    def delete_students(self, course, reg):
        for exam in self.exams:
            if exam.course == course:
                exam.students = [s for s in exam.students if s["reg"] != reg]
                self.save()
                return True
        return False

    def search(self, exam):
        for ex in self.exams:
            if ex.course == exam.course:
                return ex
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
        result = []
        for exam in self.exams:
            result.append(exam.to_dict())
        return result

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
    def __init__(self, course, date, type, duration, students):
        self.course = course
        self.date = date
        self.type = type
        self.duration = duration
        self.students = students
    def to_dict(self):
        return {
            "course": self.course,
            "date": self.date,
            "type": self.type,
            "duration": self.duration,
            "students": self.students
        }