import { useState, useRef } from 'react';
import { Download, CircleCheckBig, Trash, Trash2 } from 'lucide-react';
import { ExistingArrangements, deleteArrangement } from '../utils/seating';
import Halls from '../components/Halls';
import { useReactToPrint } from 'react-to-print';
import { useAlertBox } from '../components/Alerts';

const ArrangementPage = ({ arrangements }) => {
  const ref = useRef(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState("09:00");
  const [seatingPlans, setSeatingPlans] = useState(null);
  const { alertBox } = useAlertBox();

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

  const generateSeatingPlan = async (date, time) => {
    setDate(date);
    setTime(time);
    const seatingArrangement = await ExistingArrangements(date, time);

    const plan = {
      arrangement: seatingArrangement,
      generatedAt: new Date().toLocaleString()
    };
    setSeatingPlans(plan);
  }
  const downloadPlan = () => {
    handlePrint();
  }

  const handleDelete = async () => {
    const response = await deleteArrangement(date, time);
    if (response && response.Success) {
      alertBox(`Seating arrangement for ${date} at ${time} deleted successfully.`, 'Success', <CircleCheckBig />);
      setSeatingPlans(null);
    } else {
      alertBox(`Failed to delete seating arrangement for ${date} at ${time}.`, 'Error');
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Seating Plans</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">View Seating Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            { arrangements && arrangements.map((arrangementItem) => (
              <button onClick={() => generateSeatingPlan(arrangementItem.date, arrangementItem.time)} key={arrangementItem.date + arrangementItem.time} className="p-2 border rounded-lg bg-indigo-500 text-white hover:bg-indigo-600">
                Seating Plan for {arrangementItem.date} at {arrangementItem.time}
              </button>
            ))}
        </div>
        {seatingPlans && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold mb-2 text-black">Seating Plan for {date} at {time}</h3>
              <div className='flex items-center'>
                <button
                    onClick={() => downloadPlan()}
                    className="bg-white border-2 border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 hover:text-white"
                >
                    <Download className="w-4 h-4 inline-block mr-2" />
                    Download Seating Plan
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-white border-2 border-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white text-red-600 px-4 py-2 rounded-lg ml-4 transition-all duration-300"
                >
                    <Trash2 size={24} />
                </button>
              </div>
            </div>
              { seatingPlans.arrangement && <Halls arrangement={seatingPlans.arrangement} ref={ref} /> }
          </div>
        )}
      </div>
    </div>
  );
}

export default ArrangementPage;