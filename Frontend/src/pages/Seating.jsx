import { useState, useRef } from 'react';
import { Download, CircleCheckBig } from 'lucide-react';
import { fetchSeatingArrangement } from '../utils/seating';
import Halls from '../components/Halls';
import { useReactToPrint } from 'react-to-print';

// Seating Plan Component
const SeatingPlanPage = ({ seatingPlans = [], setSeatingPlans }) => {
  const ref = useRef(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState("09:00");
  const [currentPlan, setCurrentPlan] = useState(null);

  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: `Seating Plan for ${date} ${time}`,
    suppressErrors: false,
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 15mm 10mm;
      }
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    `,
  });

  const generateSeatingPlan = async () => {
    const seatingArrangement = await fetchSeatingArrangement(date, time);

    const plan = {
      id: Date.now(),
      arrangement: seatingArrangement,
      generatedAt: new Date().toLocaleString()
    };
    console.log("Generated Seating Plan:", plan);
    setCurrentPlan(plan);
    setSeatingPlans([...seatingPlans, plan]);
  }
  const downloadPlan = () => {
    handlePrint();
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Seating Plan Generation</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Generate Seating Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="date" name="exam-date" id="exam-date" className='py-1 border' value={date} onChange={(e) => setDate(e.target.value)} />
          <input type="time" name="exam-time" id="exam-time" className='py-1 border' value={time} onChange={(e) => setTime(e.target.value)} />
          <button
            onClick={generateSeatingPlan}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 @print:hidden"
          >
            <CircleCheckBig />
            Generate Plan
          </button>
        </div>
        {currentPlan && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold mb-2 text-black">Seating Plan for {date} at {time}</h3>
              <button
                onClick={() => downloadPlan()}
                className="bg-white border-2 border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 hover:text-white"
              >
                <Download className="w-4 h-4 inline-block mr-2" />
                Download Seating Plan
              </button>
            </div>
              { currentPlan.arrangement && <Halls arrangement={currentPlan.arrangement} ref={ref} /> }
          </div>
        )}
      </div>
    </div>
  );
}

export default SeatingPlanPage;