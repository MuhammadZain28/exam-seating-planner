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


@router.get("/")
def get_exam():
    return exams.get()
@router.post("/insert")
async def insert(
    course: str = Form(...),
    date: str = Form(...),
    time: str = Form(...),
    duration: int = Form(...),
    file: UploadFile = File(...)
    ):
    # try:
        contents = await file.read()
        df = pd.read_csv(pd.io.common.BytesIO(contents))

        students = df.to_dict(orient="records")
        # duplicate_count, conflict_course = studentInstance.check_duplicate(students)
        # percentage = (duplicate_count / len(students))
        # if percentage > 0 and percentage <= 0.3:
        #     return {"Alert" : f"{duplicate_count} students of this course already giving Exam on this day. Do you still want to schedule...?", "conflict": conflict_course}
        # elif percentage > 0.3:
        #     return {"Error" : f"{duplicate_count} students of this course already giving Exam on this day. Cannot schedule Exam."}

        exam = Exam(course=course, date=date, duration=duration, students=students, time=time)
        result = exams.insert(exam)
        if not result:
            return {"Error": "Exam with this course already exists"}
        for student in students:
            student = Student(name=student["name"], reg=student["reg"], course=course)
            studentInstance.insert(student)
        return {"Success": "Exam is Saved Successfully!"}
    # except Exception as e:
    #     return {"Error": str(e)}

@router.post("/confirm")
async def insert(
    course: str = Form(...),
    date: str = Form(...),
    time: str = Form(...),
    duration: int = Form(...),
    file: UploadFile = File(...),
    conflict: str = Form(...)
    ):
    try:
        contents = await file.read()
        df = pd.read_csv(pd.io.common.BytesIO(contents))

        students = df.to_dict(orient="records")
        exam = Exam(course=course, date=date, duration=duration, students=students, time=time)
        result = exams.insert(exam)
        if not result:
            return {"Error": "Exam with this course already exists"}
        conflictGraph.add_conflict(date, course, conflict)
        for student in students:
            student = Student(name=student["name"], reg=student["reg"], course=course)
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