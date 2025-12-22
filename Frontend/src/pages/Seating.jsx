import React, { useState } from 'react';
import { Download, CircleCheckBig } from 'lucide-react';
import { fetchSeatingArrangement } from '../utils/seating';
import Halls from '../components/Halls';

// Seating Plan Component
const SeatingPlanPage = ({ seatingPlans = [], setSeatingPlans }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentPlan, setCurrentPlan] = useState(null);

  const generateSeatingPlan = async () => {
    const seatingArrangement = await fetchSeatingArrangement(date);

    const plan = {
      id: Date.now(),
      arrangement: seatingArrangement,
      generatedAt: new Date().toLocaleString()
    };
    console.log("Generated Seating Plan:", plan);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="date" name="exam-date" id="exam-date" className='py-1 border' value={date} onChange={(e) => setDate(e.target.value)} />
          {/* <Select value={selectedRoom} onChange={(opt) => setSelectedRoom(opt)} options={[{label: "Select Room", value: "select"}]} /> */}
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
                  { currentPlan.arrangement && <Halls arrangement={currentPlan.arrangement} /> }
                  {/* {currentPlan.arrangement.map((row, rowIndex) => (
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
                  ))} */}
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