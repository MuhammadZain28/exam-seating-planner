from fastapi import APIRouter
from ..model.seating import shedule_exams

router = APIRouter()

@router.get("/{date}")
def get_arranger(date: str):
    return shedule_exams(date)