from fastapi import APIRouter
from ..controller.exam import Exams

router = APIRouter()

exams = Exams()

@router.get("/")
def get_exam():
    return exams
@router.post("/insert")
def insert(exam):
    exams.insert(exam)