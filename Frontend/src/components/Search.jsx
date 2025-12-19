import React, { useEffect, useRef, useState } from "react";
import Trie from "../utils/Trie";


export default function Search({ data, onSelect }) {
  const trieRef = useRef(new Trie());
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    data.forEach(s =>
      trieRef.current.insert(s.reg + s.xyz, s)
    );
    console.log("Trie built with data", trieRef.current);
  }, []);

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


  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search student..."
        value={query}
        onChange={handleChange}
        className="w-full px-10"
      />

      <ul className="absolute bg-[#f9f9f9] w-full rounded-lg border border-black/30 mt-2 px-2 shadow-lg shadow-black/20">
        {results.map(student => (
          <li key={student.reg} className="p-1 border-b border-black last:border-0" onClick={() => handleSelect(student)}>
            <strong className="text-black"><span className="w-40 inline-block">{student.name}</span>&emsp;&emsp;&emsp;&emsp;{student.reg}</strong>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {student.course}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}