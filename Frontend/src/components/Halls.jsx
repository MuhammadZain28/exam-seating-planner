import { forwardRef } from "react";

const Halls = forwardRef(({ arrangement }, ref) => {
  console.log("Rendering Halls with arrangement:", arrangement);
  return (
    <div className="p-4 w-full h-full relative" ref={ref}>
      {Object.entries(arrangement).map(([hallName, hall]) => (
        <div
          key={hallName}
          className="bg-indigo-50 mb-6 p-4 border rounded-lg print:grid place-self-center w-full" style={{pageBreakAfter: "always"}}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{hallName}</h2>
            <p className="text-lg"><strong>Total Students:</strong> {Object.values(hall.courses).reduce((acc, count) => acc + count, 0)}</p>
          </div>
          <div
            className="flex flex-col gap-1 items-center"
          >
            {hall.layout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1">
                {row.map((seat, seatIndex) => (
                  <div
                    key={seatIndex}
                    className={`flex items-center justify-center border text-black text-[12px] rounded-lg w-20 h-12 ${
                      seat ? "bg-indigo-300" : "bg-gray-200"
                    }`}
                  >
                    {seat || ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-evenly items-center mt-4">
            {Object.entries(hall.courses).map(([session, count]) => (
              <div key={session} className="mt-2 text-md text-black">
                <span className="font-semibold">Session - {session}:</span> {count} students
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default Halls;
