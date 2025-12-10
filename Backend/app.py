from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.counter import router as counter
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

app.include_router(counter, prefix="/counter")