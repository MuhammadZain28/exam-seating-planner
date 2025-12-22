from .rooms import Room, Rooms
from .exam import Exam, Exams
from ..structures.Queue import PriorityQueue

def arrange_exam_hall(room, exams):
    halls = {}
    count = 0
    while not exams.isEmpty() and rooms:
        room = rooms.pop(0)
        halls[room.name] = []
        groups = {0: [], 1: [], 2: [], 3: []}

        for r in range(room.rows):
            for c in range(room.columns):
                g = (r % 2) * 2 + (c % 2)
                groups[g].append((r, c))

        print(f"Seat group {groups}")

        hall = [[None for _ in range(room.columns)] for _ in range(room.rows)]

        i = 0
        remaining_seats = []
        new_exams = []
        msg = ""
        while i < 4 and not exams.isEmpty():
            exam_info = exams.pop()
            print("Students: ", len(exam_info.students), "Group", len(groups[i]), "Remaining rooms:", len(rooms))
            if len(exam_info.students) > len(groups[i]) and len(rooms) == 0:
                msg += f"Not enough seats in group {i} for {exam_info.course}\n"
                continue
            print(f"{exam_info.course}: {i}")

            for student in exam_info.students:
                if not groups[i]:
                    remaining_seats.append(student)
                    continue
                r, c = groups[i].pop()
                hall[r][c] = (student[1])
                count += 1
            if remaining_seats and len(rooms):
                print(f"Remaining seats for {exam_info.course}: ", len(remaining_seats))
                new_exams.append(Exam(exam_info.course, exam_info.date, exam_info.duration, students=remaining_seats))
                remaining_seats = []
            i = (i + 1) % 4
        if new_exams:
            for ne in new_exams:
                exams.push(ne, len(exam_info.students))

        halls[room.name] = hall

    print(f"Total students seated: {count} \n {remaining_seats}")
    return halls


if __name__ == "__main__":
    rooms = []
    rooms.append(Room("Exam Hall 1", 4, 4))
    rooms.append(Room("Exam Hall 2", 5, 4))
    rooms.append(Room("Exam Hall 3", 4, 6))
    rooms.append(Room("Exam Hall 4", 5, 6))

    # Course 1: Computer Science (CS)
    cs_students = [
        ("Ali Raza", "2024-CS-001"),
        ("Ahmed Khan", "2024-CS-002"),
        ("Usman Tariq", "2024-CS-003"),
        ("Hassan Ali", "2024-CS-004"),
        ("Bilal Ahmed", "2024-CS-005"),
        ("Zain Ul Abidin", "2024-CS-006"),
        ("Ahsan Mehmood", "2024-CS-007"),
        ("Hamza Javed", "2024-CS-008"),
        ("Noman Farooq", "2024-CS-009"),
        ("Fahad Riaz", "2024-CS-010")
    ]

    # Course 2: Software Engineering (SE)
    se_students = [
        ("Sara Iqbal", "2024-SE-001"),
        ("Ayesha Noor", "2024-SE-002"),
        ("Hira Khalid", "2024-SE-003"),
        ("Fatima Zahra", "2024-SE-004"),
        ("Maryam Akhtar", "2024-SE-005"),
        ("Noor Fatima", "2024-SE-006"),
        ("Iqra Ahmed", "2024-SE-007"),
        ("Zara Hussain", "2024-SE-008"),
        ("Sana Khan", "2024-SE-009"),
        ("Hania Ali", "2024-SE-010")
    ]

    # Course 3: Information Technology (IT)
    it_students = [
        ("Danish Ali", "2024-IT-001"),
        ("Saad Ahmed", "2024-IT-002"),
        ("Umar Farooq", "2024-IT-003"),
        ("Shahzaib Khan", "2024-IT-004"),
        ("Talha Riaz", "2024-IT-005"),
        ("Faizan Malik", "2024-IT-006"),
        ("Huzaifa Noor", "2024-IT-007"),
        ("Arslan Qureshi", "2024-IT-008"),
        ("Adnan Siddiqui", "2024-IT-009"),
        ("Haris Khan", "2024-IT-010")
    ]

    # Course 4: Artificial Intelligence (AI)
    ai_students = [
        ("Zain Malik", "2024-AI-001"),
        ("Aiman Sheikh", "2024-AI-002"),
        ("Maya Khan", "2024-AI-003"),
        ("Sara Farooq", "2024-AI-004"),
        ("Ali Shah", "2024-AI-005"),
        ("Hina Iqbal", "2024-AI-006"),
        ("Sufyan Ali", "2024-AI-007"),
        ("Noor Shah", "2024-AI-008"),
        ("Muneeb Riaz", "2024-AI-009"),
        ("Eman Qureshi", "2024-AI-010")
    ]

    # Course 5: Cyber Security (CY)
    cy_students = [
        ("Areeba Khan", "2024-CY-001"),
        ("Dania Noor", "2024-CY-002"),
        ("Fahad Ali", "2024-CY-003"),
        ("Bilal Riaz", "2024-CY-004"),
        ("Samiya Shah", "2024-CY-005"),
        ("Shahroz Malik", "2024-CY-006"),
        ("Hassan Qureshi", "2024-CY-007"),
        ("Zoya Iqbal", "2024-CY-008"),
        ("Ayaan Ahmed", "2024-CY-009"),
        ("Maryam Shah", "2024-CY-010")
    ]


    ds_students = [
        ("Areeba Khan", "2024-DS-001"),
        ("Dania Noor", "2024-DS-002"),
        ("Fahad Ali", "2024-DS-003"),
        ("Bilal Riaz", "2024-DS-004"),
        ("Samiya Shah", "2024-DS-005"),
        ("Shahroz Malik", "2024-DS-006"),
        ("Hassan Qureshi", "2024-DS-007"),
        ("Zoya Iqbal", "2024-DS-008"),
        ("Ayaan Ahmed", "2024-DS-009"),
        ("Maryam Shah", "2024-DS-010")
    ]
    dm_students = [
        ("Areeba Khan", "2024-DM-001"),
        ("Dania Noor", "2024-DM-002"),
        ("Fahad Ali", "2024-DM-003"),
        ("Bilal Riaz", "2024-DM-004"),
        ("Samiya Shah", "2024-DM-005"),
        ("Shahroz Malik", "2024-DM-006"),
        ("Hassan Qureshi", "2024-DM-007"),
        ("Zoya Iqbal", "2024-DM-008"),
        ("Ayaan Ahmed", "2024-DM-009"),
        ("Maryam Shah", "2024-DM-010")
    ]
    la_students = [
        ("Areeba Khan", "2024-LA-001"),
        ("Dania Noor", "2024-LA-002"),
        ("Fahad Ali", "2024-LA-003"),
        ("Bilal Riaz", "2024-LA-004"),
        ("Samiya Shah", "2024-LA-005"),
        ("Shahroz Malik", "2024-LA-006"),
        ("Hassan Qureshi", "2024-LA-007"),
        ("Zoya Iqbal", "2024-LA-008"),
        ("Ayaan Ahmed", "2024-LA-009"),
        ("Maryam Shah", "2024-LA-010")
    ]
    en_students = [
        ("Areeba Khan", "2024-EN-001"),
        ("Dania Noor", "2024-EN-002"),
        ("Fahad Ali", "2024-EN-003"),
        ("Bilal Riaz", "2024-EN-004"),
        ("Samiya Shah", "2024-EN-005"),
        ("Shahroz Malik", "2024-EN-006"),
        ("Hassan Qureshi", "2024-EN-007"),
        ("Zoya Iqbal", "2024-EN-008"),
        ("Ayaan Ahmed", "2024-EN-009"),
        # ("Maryam Shah", "2024-EN-010")
    ]

    # Create Exam objects
    exams = PriorityQueue()
    exams.push(Exam("CSC-103", "18-9-2024", 90, students=se_students), priority= len(se_students))
    exams.push(Exam("CSC-101", "18-9-2024", 90, students=it_students), priority= len(it_students))
    exams.push(Exam("CSC-102", "18-9-2024", 90, students=cs_students), priority= len(cs_students))
    exams.push(Exam("CSC-107", "18-9-2024", 90, students=ds_students), priority= len(ds_students))
    exams.push(Exam("CSC-104", "18-9-2024", 90, students=ai_students), priority= len(ai_students))
    exams.push(Exam("CSC-105", "18-9-2024", 90, students=cy_students), priority= len(cy_students))
    exams.push(Exam("CSC-106", "18-9-2024", 90, students=dm_students), priority= len(dm_students))
    exams.push(Exam("CSC-108", "18-9-2024", 90, students=la_students), priority= len(la_students))
    exams.push(Exam("CSC-109", "18-9-2024", 90, students=en_students), priority= len(en_students))

    halls = arrange_exam_hall(rooms, exams)
    for hall in halls:
        print(hall)
        for row in halls[hall]:
            print(row)

