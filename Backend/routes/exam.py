from fastapi import APIRouter, Form, UploadFile, File
from ..model.exam import Exams, Exam
from pydantic import BaseModel
import pandas as pd
from ..model.students import Students, Student
from ..model.conflict_graph import Conflicts
from ..model.rooms import Rooms

router = APIRouter()

exams = Exams()
studentInstance = Students()
conflictGraph = Conflicts()
conflictGraph.load_graph()
rooms = Rooms()

class ExamBase(BaseModel):
    course: str
    date: str
    duration: int
    time: str
    session: str


@router.get("/")
def get_exam():
    return exams.get()
@router.post("/insert")
async def insert(
    course: str = Form(...),
    date: str = Form(...),
    time: str = Form(...),
    duration: int = Form(...),
    file: UploadFile = File(...),
    session: str = Form(...)
    ):
    try:
        if not conflictGraph.can_place_exam(date, time, session):
            return {"Error": "Conflict detected with another exam at the same date and time for the same session."}
        contents = await file.read()
        df = pd.read_csv(pd.io.common.BytesIO(contents))

        students = df.to_dict(orient="records")

        if not conflictGraph.student_conflict(date, time, list(map(lambda s: s["reg"], students))):
            return {"Error": "Student conflict detected with another exam at the same date and time."}
        conflictGraph.add_conflict(date, time, session, students)

        exam = Exam(course=course, date=date, duration=duration, students=students, time=time, session=session)
        result = exams.insert(exam)
        if not result:
            return {"Error": "Exam with this course already exists"}
        for student in students:
            student = Student(name=student.get("name", " "), reg=student.get("reg", " "), course=course, session=session, section=student.get("section", 'A'))
            studentInstance.insert(student)
        return {"Success": "Exam is Saved Successfully!"}
    except Exception as e:
        return {"Error": str(e)}

@router.delete("/{course}/{session}/")
def delete(course: str, session: str):
    try:
        is_deleted, regs, time, date = exams.delete({"course": course, "session": session})
        if is_deleted:
            for reg in regs:
                studentInstance.delete(reg)
            conflictGraph.remove_conflict(date, time, session)
            exams.save()
            return {"Success": "Exam deleted successfully"}
        return {"Error": "Exam not found"}
    except Exception as e:
        return {"Error": str(e)}

@router.delete("/{reg}/{course}/{session}/")
def delete_student(reg: str, course: str, session: str):
    result = exams.delete_students(course=course, reg=reg, session=session)
    if result:
        studentInstance.delete(reg)
        return {"message": "Student deleted successfully"}
    return {"message": "Student not found"}

@router.post("/update/{course}")
def update(course: str, exam: ExamBase):
    if exams.update(exam, course):
        return {"Success": "Exam updated successfully"}
    return {"Error": "Exam not found"}