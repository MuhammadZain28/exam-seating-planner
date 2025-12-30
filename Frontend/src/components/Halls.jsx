import { forwardRef } from "react";
import { DoorClosed, DoorOpen } from "lucide-react"

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
          </div>
          <div className="flex gap-1 items-center justify-center">
            <div className="w-10 h-8 flex items-center justify-center text-black"><DoorOpen /></div>

            {hall.layout[0].map((_, colIndex) => (
              <div
                key={colIndex}
                className="w-20 h-8 flex items-center justify-center font-semibold text-black"
              >
                {colIndex + 1}
              </div>
            ))}
          </div>
          <div
            className="flex flex-col gap-1 items-center"
          >
            {hall.layout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1">
                <div className="w-10 h-8 flex items-center justify-center font-semibold text-black">
                  {rowIndex + 1}
                </div>
                {row.map((seat, seatIndex) => (
                  <div
                    key={seatIndex}
                    className={`flex items-center justify-center border text-black text-[12px] rounded-lg w-20 h-8 ${
                      seat ? "bg-indigo-300" : "bg-gray-200"
                    }`}
                  >
                    {seat || ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {Object.entries(hall.courses).map(([course, sections]) => (
          <div key={course} className="flex justify-evenly items-center mt-4">
            <p><strong>{course}:</strong></p>
            {Object.entries(sections).map(([section, count]) => (
              <div
                key={section}
                className="text-md text-black flex flex-col items-center gap-1"
              >
                <span>
                  <strong>Section {section}:</strong> {count} students
                </span>
              </div>
            ))}
          </div>
          ))}
        </div>
      ))}
    </div>
  );
});

export default Halls;
