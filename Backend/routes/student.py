from fastapi import APIRouter
from ..model.students import Students, Student

router = APIRouter()

students = Students()
students.load()

@router.get("/")
def get_students():
    return students.to_list()
@router.get("/search/{reg}")
def search_student(reg: str):
    student = students.search(Student("", reg))
    if student:
        return student.to_dict()
    return {"message": "Student not found"}