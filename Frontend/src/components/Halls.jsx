import { forwardRef } from "react";
import { DoorClosed, DoorOpen } from "lucide-react"

const Halls = forwardRef(({ arrangement }, ref) => {

  const keys = Object.keys(arrangement);
  if (keys.length === 0) {
    return <div ref={ref}>No arrangement data available.</div>;
  }
  const std = [arrangement[keys[0]]["layout"][0][0], arrangement[keys[0]]["layout"][0][1], arrangement[keys[0]]["layout"][1][0], arrangement[keys[0]]["layout"][1][1]];
  console.log("Rendering arrangement:", std);
  const palette = ["bg-red-200", "bg-blue-200", "bg-green-200", "bg-yellow-100"];

  const colors = std.reduce((acc, regNo, index) => {
    const year = regNo?.split("-")[0];
    if (year) {
      acc[year] = palette[index % palette.length];
    }
    return acc;
  }, {});

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
                className="w-24 h-8 flex items-center justify-center font-semibold text-black"
              >
                {colIndex + 1}
              </div>
            ))}
          </div>
          <div
            className="flex flex-col gap-1 items-center mb-4"
          >
            {hall.layout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1">
                <div className="w-10 h-8 flex items-center justify-center font-semibold text-black">
                  {rowIndex + 1}
                </div>
                {row.map((seat, seatIndex) => (
                  <div
                    key={seatIndex}
                    className={`flex items-center justify-center border text-black text-[12px] rounded-lg w-24 h-8 ${
                      seat ? colors[seat.split("-")[0].replace("r", '').replace('R', '').replace('/', '').replace('M', '')] : "bg-gray-300"
                    }`}
                  >
                    {seat || ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {Object.entries(hall.courses).map(([course, sections]) => (
          <div key={course} className={`grid grid-cols-[1fr_2fr_2fr_2fr_2fr] mx-10 gap-4 ${colors[course]} px-2`} >
            <p><strong>{course}:</strong></p>
            {Object.entries(sections).map(([section, count]) => (
              <div
                key={section}
                className={`text-md text-black flex items-center gap-2`}
              >
                { count > 0 && <><strong>Section {section}:</strong> {count} students</> }
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
