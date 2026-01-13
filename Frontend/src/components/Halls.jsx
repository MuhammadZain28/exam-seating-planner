import { forwardRef } from "react";
import { DoorClosed, DoorOpen } from "lucide-react"

const Halls = forwardRef(({ arrangement }, ref) => {

  const sessions = arrangement.length ? Object.keys(arrangement[0]?.courses) : [];
  console.log("Arrangements: ", arrangement);
  const palette = [["border-red-200", "bg-red-200"], ["border-blue-200", "bg-blue-200"], ["border-green-200", "bg-green-200"], ["border-yellow-100", "bg-yellow-100"], ["border-purple-200", "bg-purple-200"], ["border-pink-200", "bg-pink-200"], ["border-indigo-200", "bg-indigo-200"], ["border-teal-200", "bg-teal-200"], ["border-orange-200", "bg-orange-200"], ["border-cyan-200", "bg-cyan-200"]];

  const colors = Object.fromEntries(
    sessions
      .filter(Boolean)
      .map((session, index) => [session, palette[index] ?? "#000"])
  );
  console.log("Colors mapping: ", colors);
  if (arrangement.length === 0) {
    return (
      <div className="p-4 w-full h-full flex items-center justify-center" ref={ref}>
        <p className="text-gray-500">No seating arrangement available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 relative w-full" ref={ref}>
      {arrangement.map((hall) => (
        <div
          key={hall.name}
          className="mb-6 p-4 border rounded-lg print:bg-transparent print:py-2 print:px-0 print:border-none print:grid bg-gray-50 w-full" style={{pageBreakAfter: "always"}}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{hall.name}</h2>
          </div>

          <div className="mb-2 gap-2 flex">
            {Object.entries(hall.courses).map(([course, sections]) => (
              <div key={course} className={`flex w-full gap-2 border-l-4 ${colors[course][0]} ${colors[course][1]} bg-opacity-20 p-2`} >
                <strong className="text-black text-sm">{course}:</strong>
                {Object.entries(sections).map(([section, count]) => (
                  <div
                    key={section}
                    className={`text-md text-black flex items-center gap-2`}
                  >
                    { count > 0 && <>{section} : {count} </> }
                  </div>
                ))}
            </div>
            ))}
          </div>
          <div className="flex gap-1 items-center justify-center">
            <div className="w-10 h-8 flex items-center justify-center text-black"><DoorOpen /></div>

            {hall.layout[0].map((_, colIndex) => (
              <div
                key={colIndex}
                className="w-36 h-8 print:w-36 flex items-center justify-center font-semibold text-black"
              >
                {colIndex + 1}
              </div>
            ))}
          </div>
          <div
            className="flex flex-col gap-1 items-center mb-4"
          >
            {hall.layout.slice().reverse().map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1">
                <div className="w-10 h-8 flex items-center justify-center font-semibold text-black">
                  {rowIndex + 1}
                </div>
                {row.slice().reverse().map((seat, seatIndex) => (
                  <div
                    key={seatIndex}
                    className={`flex flex-col items-center shadow-md justify-evenly border text-black text-[12px] print:text-lg rounded w-32 print:w-36 h-14 print:h-20 ${
                      seat ? `bg-white border-0 border-l-4 ${colors[seat?.[1]][0]}` : "bg-gray-300"
                    }`}
                  >
                    {seat ? <p className={`${colors[seat?.[1]][1]} px-4 text-[10px]`}>{seat[1]}</p> : null}
                    <p>{seat ? seat[0] : "-"}</p>
                  </div>

                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default Halls;
