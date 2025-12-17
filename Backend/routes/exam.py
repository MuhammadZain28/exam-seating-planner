from fastapi import APIRouter, Form, UploadFile, File
from ..model.exam import Exams, Exam
from pydantic import BaseModel
import pandas as pd
from ..model.students import Student
from .student import insert_student, delete_students

router = APIRouter()

exams = Exams()
exams.load()
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
    exam_type: str = Form(...),
    duration: int = Form(...),
    file: UploadFile = File(...)
    ):
    contents = await file.read()
    df = pd.read_csv(pd.io.common.BytesIO(contents))

    students = [Student(record["name"], record["reg"], course) for record in df.to_dict(orient='records')]
    exam = Exam(course=course, date=date, type=exam_type, duration=duration, students=len(students))
    exams.insert(exam)
    insert_student(students)
    print(f"Inserted exam for course: {course} with {len(students)} students.")

    return {"rows": len(df), "columns": list(df.columns)}

@router.delete("/delete/{course}")
def delete(course: str):
    print("Deleting course:", course)
    delete_students(course)
    return exams.delete(course)
@router.post("/update")
def update(exam: ExamBase):
    return exams.update(exam)