import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Select({ options = [], onChange, value }) {
  const [selected, setSelected] = useState(value || null);


  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-black">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full bg-[#f9f9f9] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {selected ? selected : "Select Option"}
        <ChevronDown />
      </div>

      {open && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg z-20 overflow-hidden">
          {options.map((opt) => {
            const isSelected = selected === opt.value;

            return (
              <div
                key={opt.value}
                onClick={() => {
                  setSelected(opt.label);
                  setOpen(false);
                  onChange && onChange(opt.value);
                }}
                className="
                  flex items-center justify-between 
                  px-4 py-2 
                  cursor-pointer 
                  hover:bg-indigo-50 
                  border-b border-gray-200 
                  last:border-none
                "
              >
                <span className="text-gray-700">{opt.label}</span>

                {/* Filled  when selected */}
                {isSelected && <span className="text-indigo-600 text-lg">●</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
