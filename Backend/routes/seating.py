from fastapi import APIRouter
from ..model.seating import shedule_exams

router = APIRouter()

@router.get("/{date}/{time}")
def get_arranger(date: str, time: str):
    return shedule_exams(date, time)