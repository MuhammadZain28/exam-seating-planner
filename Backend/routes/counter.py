from fastapi import APIRouter

router = APIRouter()

counter = {"value" : 0}
@router.get("/")
def get_counter():
    return counter
@router.post("/increment")
def increment_counter():
    counter["value"] += 1
    return counter
@router.post("/decrement")
def decrement_counter():
    counter["value"] -= 1
    return counter