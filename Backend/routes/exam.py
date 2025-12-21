from fastapi import APIRouter, Form, UploadFile, File
from ..model.exam import Exams, Exam
from pydantic import BaseModel
import pandas as pd
from ..model.students import Students, Student

router = APIRouter()

exams = Exams()
studentInstance = Students()

class ExamBase(BaseModel):
    course: str
    date: str
    type: str
    duration: int


@router.get("/")
def get_exam():
    return exams.get()
@router.post("/insert")
async def insert(
    course: str = Form(...),
    date: str = Form(...),
    time: str = Form(...),
    exam_type: str = Form(...),
    duration: int = Form(...),
    file: UploadFile = File(...)
    ):
    try:
        contents = await file.read()
        df = pd.read_csv(pd.io.common.BytesIO(contents))

        students = [Student(reg=record["reg"], name=record["name"], course=course) for record in df.to_dict(orient='records')]
        exam = Exam(course=course, date=date, type=exam_type, duration=duration, students=students, time=time)
        result = exams.insert(exam)
        if not result:
            return {"Error": "Exam with this course already exists"}
        for student in students:
            studentInstance.insert(student)
        return {"Success": "Exam is Saved Successfully!"}
    except Exception as e:
        return {"Error": str(e) + " not Found. Format of csv is incorrect"}

@router.delete("/{course}/")
def delete(course: str):
    if exams.delete(course):
        return {"Success": "Exam deleted successfully"}
    return {"Error": "Exam not found"}

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