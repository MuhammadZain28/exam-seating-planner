# generate_students.py
from faker import Faker
import pandas as pd
import random

fake = Faker()

NUM_STUDENTS_PER_COURSE = 171


def generate_students(year=2024):
    students = []
    for i in range(1, NUM_STUDENTS_PER_COURSE + 1):
        reg = f"{year}-CS-{str(i).zfill(3)}"
        students.append({
            "reg": reg,
            "name": fake.name(),
            "section": random.choice(['A', 'B', 'C', 'D'])
        })
    return students

year = 2024
students = generate_students(year)
df = pd.DataFrame(students)
df.to_csv(f"students {year}.csv", index=False)
print(f"students {year}.csv generated successfully ✅")