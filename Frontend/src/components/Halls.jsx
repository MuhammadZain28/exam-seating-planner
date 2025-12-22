import React from "react";

const Halls = ({ arrangement }) => {
  return (
    <div className="exam-halls">
      {Object.entries(arrangement).map(([hallName, hallRows]) => (
        <div key={hallName} className="bg-indigo-50 mb-6 p-4 border rounded-lg">
          <h2 className="text-lg font-bold mb-2">{hallName}</h2>
          <div className="flex flex-col gap-1">
            {hallRows.slice().reverse().map((row, rowIndex) => (
              <div key={rowIndex} className="row flex gap-1">
                {row.slice().reverse().map((seat, seatIndex) => (
                  <div
                    key={seatIndex}
                    className={`seat flex items-center justify-center border text-black text-[12px] rounded-lg w-20 h-12 ${
                      seat ? "bg-indigo-300" : "bg-gray-200"
                    }`}
                  >
                    {seat || ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Halls;
