import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeatingPlanPage from './pages/Seating.jsx';
import Navigation from './components/Navigation.jsx';
import Dashboard from './pages/Dashboard.jsx';
import StudentsPage from './pages/Students.jsx';
import RoomsPage from './pages/Rooms.jsx';
import ExamsPage from './pages/Exams.jsx';
import { useState } from 'react';
const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="grid grid-cols-[75px_1fr] min-h-screen bg-[#F2F4F0] w-screen" onClick={() => setIsOpen(false)}>
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/seating" element={<SeatingPlanPage />} />
      </Routes>
    </div>
  );
}

export default App;