from fastapi import APIRouter, Form, UploadFile, File
from ..model.exam import Exams, Exam
from pydantic import BaseModel
import pandas as pd
from ..model.students import Students, Student
from ..model.conflict_graph import Conflicts

router = APIRouter()

exams = Exams()
studentInstance = Students()
conflictGraph = Conflicts()

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

        conflictGraph.add_conflict(date, time, session, len(students))

        exam = Exam(course=course, date=date, duration=duration, students=students, time=time, session=session)
        result = exams.insert(exam)
        if not result:
            return {"Error": "Exam with this course already exists"}
        for student in students:
            student = Student(name=student["name"], reg=student["reg"], course=course, session=session)
            studentInstance.insert(student)
        return {"Success": "Exam is Saved Successfully!"}
    except Exception as e:
        return {"Error": str(e)}

@router.post("/confirm")
async def insert(
    course: str = Form(...),
    date: str = Form(...),
    time: str = Form(...),
    duration: int = Form(...),
    file: UploadFile = File(...),
    conflict: str = Form(...),
    session: str = Form(...)
    ):
    try:
        contents = await file.read()
        df = pd.read_csv(pd.io.common.BytesIO(contents))

        students = df.to_dict(orient="records")
        exam = Exam(course=course, date=date, duration=duration, students=students, time=time, session=session)
        result = exams.insert(exam)
        if not result:
            return {"Error": "Exam with this course already exists"}
        conflictGraph.add_conflict(date, course, conflict)
        for student in students:
            student = Student(name=student["name"], reg=student["reg"], course=course, session=session)
            studentInstance.insert(student)
        return {"Success": "Exam is Saved Successfully!"}
    except Exception as e:
        return {"Error": str(e)}

@router.delete("/{course}/")
def delete(course: str):
    try:
        is_deleted, regs = exams.delete(course)
        if is_deleted:
            for reg in regs:
                studentInstance.delete(reg)
            return {"Success": "Exam deleted successfully"}
        return {"Error": "Exam not found"}
    except Exception as e:
        return {"Error": str(e)}

@router.delete("/{reg}/{course}/")
def delete_student(reg: str, course: str):
    result = exams.delete_students(course=course, reg=reg)
    if result:
        studentInstance.delete(reg)
        return {"message": "Student deleted successfully"}
    return {"message": "Student not found"}

@router.post("/update")
def update(exam: ExamBase):
    if exams.update(exam):
        return {"Success": "Exam updated successfully"}
    return {"Error": "Exam not found"}