from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Backend.routes.exam import router as exam
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