import React, { useEffect, useRef, useState } from "react";
import Trie from "../utils/Trie";
import { PlusIcon, Search as SearchIcon } from "lucide-react";


export default function Search({ data, onSelect }) {
  const trieRef = useRef(new Trie());
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    data.forEach(s =>
      trieRef.current.insert(s.reg + s.course, s)
    );
  });

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
        if (query.trim() === "") {
            setResults([]);
        } else {
            const searchResults = trieRef.current.search(query);
            setResults(searchResults);
        }
    }, 300);

    return () => clearTimeout(debouncedSearch);
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelect = (student) => {
    const result = []
    result.push(student)
    setResults([]);
    onSelect && onSelect(result);
  }

  const handleClear = () => {
    setQuery("");
    setResults([]);
    onSelect && onSelect(data);
  }

  return (
    <div className="w-full">
      <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search student..."
        value={query}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 500)}
        className="w-full px-10"
      />
      {query && <PlusIcon className="absolute right-3 top-3 w-5 h-5 text-red-600 rotate-45" fill="rgb(255, 0, 0)" onClick={handleClear} />}

      {open && <ul className="absolute bg-white w-full rounded-lg border border-black/30 mt-2 px-2 shadow-lg shadow-black/20 max-h-[405px] overflow-y-auto z-10">
        {results.map(student => (
          <li key={student.reg+student.course} className="p-1 border-b border-black last:border-0" onClick={() => handleSelect(student)}>
            <strong className="text-black"><span className="w-40 inline-block">{student.name}</span>&emsp;&emsp;&emsp;&emsp;{student.reg}</strong>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {student.course}
            </div>
          </li>
        ))}
      </ul> }
    </div>
  );
}