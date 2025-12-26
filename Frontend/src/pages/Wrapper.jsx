import { Link } from "react-router-dom";
import { useState } from "react";
const Wrapper = ({ children }) => {
    const [location, setLocation] = useState(window.location.pathname);
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex items-center w-full justify-center bg-white shadow-md rounded-b-lg border-b-2 border-indigo-100">
                <Link onClick={() => setLocation("/seating")} to="/seating" className={`w-full text-center border-r-2 border-indigo-600 p-4 ${location === "/seating" ? "bg-indigo-100 text-indigo-700" : ""} transition-all duration-300`}>Generate Seating Plans</Link>
                <Link onClick={() => setLocation("/arrangements")} to="/arrangements" className={`w-full text-center p-4 ${location === "/arrangements" ? "bg-indigo-100 text-indigo-700" : ""} transition-all duration-300`}>View Existing Plans</Link>
            </div>
            {children}
        </div>
    );
}
export default Wrapper;