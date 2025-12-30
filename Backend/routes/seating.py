from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from ..model.seating import Seating

router = APIRouter()
seating_instance = Seating()
seating_instance.load_arrangement()

@router.get("/{date}/{time}")
def get_arranger(date: str, time: str):
    return seating_instance.shedule_exams(date, time)

@router.get("/")
def get_arrangements():
    return seating_instance.get_arrangements()

@router.get("/existing/{date}/{time}")
def load_existing_arrangement(date: str, time: str):
    return seating_instance.load_exist(date, time)

@router.delete("/delete/{date}/{time}")
def delete_arrangement(date: str, time: str):
    seating_instance.delete_arrangement(date, time)
    return {"Success": "Arrangement deleted successfully"}

@router.get("/export/{date}/{time}")
def export_arrangement(date: str, time: str):
    blob = seating_instance.export_xlsx(date, time)

    return StreamingResponse(
        blob,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": f'attachment; filename="seating_{date}_{time}.xlsx"'
        }
    )