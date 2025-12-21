import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Select({ options = [], onChange, value }) {
  const [selected, setSelected] = useState(value || null);
  const [open, setOpen] = useState(false);

  const selectRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative text-black">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full bg-[#f9f9f9] border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
      >
        {selected ? selected : "Select Option"}
        <ChevronDown />
      </div>

      {open && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg z-20 overflow-hidden">
          {options.map((opt) => {
            const isSelected = selected === opt.label;

            return (
              <div
                key={opt.value}
                onClick={() => {
                  setSelected(opt.label);
                  setOpen(false);
                  onChange && onChange(opt.value);
                }}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-indigo-50 border-b last:border-none"
              >
                <span>{opt.label}</span>
                {isSelected && <span className="text-indigo-600">●</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
