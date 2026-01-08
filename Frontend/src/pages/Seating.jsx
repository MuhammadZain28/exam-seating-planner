import { useState, useRef } from "react";
import { Download, CircleCheckBig, Share } from "lucide-react";
import { fetchSeatingArrangement, exportXlsx } from "../utils/seating";
import Halls from "../components/Halls";
import { useReactToPrint } from "react-to-print";

const SeatingPlanPage = ({ seatingPlans = null, setSeatingPlans }) => {
  const ref = useRef(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("09:00");

  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: `Seating Plan for ${date} ${time}`,
    suppressErrors: false,
    pageStyle: `
      @page {
        size: A3 landscape;
        margin: 10mm 0mm;
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
      generatedAt: new Date().toLocaleString(),
    };
    setSeatingPlans(plan);
  };
  const downloadPlan = () => {
    handlePrint();
  };

  const exportToExcel = async () => {
    const blob = await exportXlsx(date, time);
    if (blob) {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Seating_Plan_${date}_${time}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Seating Plan Generation
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Generate Seating Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            name="exam-date"
            id="exam-date"
            className="py-1 border"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            name="exam-time"
            id="exam-time"
            className="py-1 border"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button
            onClick={generateSeatingPlan}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 @print:hidden"
          >
            <CircleCheckBig />
            Generate Plan
          </button>
        </div>
        {seatingPlans && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold mb-2 text-black">
                Seating Plan for {date} at {time}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => exportToExcel()}
                  className="bg-white border-2 border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 hover:text-white"
                >
                  <Share className="w-4 h-4 inline-block mr-2" />
                  Export as XLSX
                </button>
                <button
                  onClick={() => downloadPlan()}
                  className="bg-white border-2 border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 hover:text-white"
                >
                  <Download className="w-4 h-4 inline-block mr-2" />
                  Download Seating Plan
                </button>
              </div>
            </div>
            {seatingPlans.arrangement && (
              <Halls arrangement={seatingPlans.arrangement} ref={ref} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatingPlanPage;
