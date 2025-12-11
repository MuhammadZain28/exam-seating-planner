import React, { useState } from 'react';
import { Download, CircleCheckBig } from 'lucide-react';

// Seating Plan Component
const SeatingPlanPage = ({ exams = [], rooms = [], students = [], seatingPlans = [], setSeatingPlans }) => {
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [currentPlan, setCurrentPlan] = useState(null);

  const generateSeatingPlan = () => {
    const exam = exams.find(e => e.id === parseInt(selectedExam));
    const room = rooms.find(r => r.id === parseInt(selectedRoom));

    if (!exam || !room) return;

    const examStudents = students.filter(s => exam.students.includes(s.id));
    const shuffled = [...examStudents].sort(() => Math.random() - 0.5);

    // const totalSeats = room.rows * room.columns;
    const seatingArrangement = [];

    for (let row = 0; row < room.rows; row++) {
      const rowSeats = [];
      for (let col = 0; col < room.columns; col++) {
        const index = row * room.columns + col;
        rowSeats.push(shuffled[index] || null);
      }
      seatingArrangement.push(rowSeats);
    }

    const plan = {
      id: Date.now(),
      examId: exam.id,
      roomId: room.id,
      examName: exam.name,
      roomName: room.name,
      date: exam.date,
      arrangement: seatingArrangement,
      generatedAt: new Date().toLocaleString()
    };

    setCurrentPlan(plan);
    setSeatingPlans([...seatingPlans, plan]);
  }
  const downloadPlan = (plan) => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(plan, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `SeatingPlan_${plan.examName}_${plan.roomName}.json`;
    document.body.appendChild(element);
    element.click();
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Seating Plan Generation</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Generate Seating Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Exam</option>
            {exams.map(exam => (
              <option key={exam.id} value={exam.id}>{exam.name} ({exam.date})</option>
            ))}
          </select>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Room</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>{room.name} (Capacity: {room.capacity})</option>
            ))}
          </select>
          <button
            onClick={generateSeatingPlan}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            <CircleCheckBig />
            Generate Plan
          </button>
        </div>
        {currentPlan && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Seating Plan for {currentPlan.examName} in {currentPlan.roomName}</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <tbody>
                  {currentPlan.arrangement.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((seat, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-300 p-2 text-center"
                        >
                          {seat ? (
                            <div>
                              <p className="font-medium">{seat.name}</p>
                              <p className="text-sm text-gray-500">{seat.rollNo}</p>
                            </div>
                          ) : (
                            <span className="text-gray-400">Empty</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => downloadPlan(currentPlan)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4 inline-block mr-2" />
                Download Seating Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeatingPlanPage;