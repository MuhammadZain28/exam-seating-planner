from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.exam import router as exam
from .routes.student import router as student
from .routes.room import router as room
from .routes.seating import router as seating
# Create FastAPI instance
app = FastAPI(title="Exam Seating Planner Backend")

# Enable CORS so React frontend can access it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(exam, prefix="/exam")
app.include_router(student, prefix="/students")
app.include_router(room, prefix="/room")
app.include_router(seating, prefix="/seating")
