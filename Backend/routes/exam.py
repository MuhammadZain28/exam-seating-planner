from fastapi import APIRouter, Form, UploadFile, File
from ..model.exam import Exams, Exam
from pydantic import BaseModel
import pandas as pd
from ..structures.Queue import Queue
from ..model.students import Student

router = APIRouter()

exams = Exams()
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

    students = [Student(record.name, record.reg, course) for record in df.to_dict(orient='records')]
    exam = Exam(course=course, date=date, type=exam_type, duration=duration)
    for student in students:
        exam.students.enqueue(student)
    exams.insert(exam)
    print(f"Inserted exam for course: {course} with {len(students)} students.")

    return {"rows": len(df), "columns": list(df.columns)}

@router.delete("/delete/{course}")
def delete(course: str):
    print("Deleting course:", course)
    return exams.delete(course)
@router.post("/update")
def update(exam: ExamBase):
    return exams.update(exam)