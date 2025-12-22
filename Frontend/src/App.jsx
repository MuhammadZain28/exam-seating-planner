import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeatingPlanPage from './pages/Seating.jsx';
import Navigation from './components/Navigation.jsx';
import Dashboard from './pages/Dashboard.jsx';
import StudentsPage from './pages/Students.jsx';
import RoomsPage from './pages/Rooms.jsx';
import ExamsPage from './pages/Exams.jsx';
import { useState, useEffect } from 'react';
import Exam from './utils/exam.js';
import Student from './utils/student.js';
import Room from './utils/room.js';


const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [exams, setExams] = useState(null)
  const [students, setStudents] = useState(null)
  const [rooms, setRooms] = useState(null)
  const [seatingPlans, setSeatingPlans] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const examInstance = new Exam()
      try {
        const res = await examInstance.getExams();
        console.log("Fetched exams:", res);
        if (res) setExams(res);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [reloadFlag]);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentInstance = new Student();
      const data = await studentInstance.getStudentData();
      console.log("Fetched Students:", data);
      if (data) {
        setStudents(data);
      } else {
        setStudents([]);
      }
    };

    fetchStudents();
  }, [reloadFlag]);


  useEffect(() => {
    const fetchRooms = async () => {
      const roomInstance = new Room();
      const data = await roomInstance.getRooms();
      console.log("Fetched Rooms:", data);
      if (data) {
        setRooms(data);
      } else {
        setRooms([]);
      }
    };

    fetchRooms();
  }, []);

  if (exams === null || students === null || rooms === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-[75px_1fr] min-h-screen bg-[#F2F4F0] w-screen" onClick={() => setIsOpen(false)}>
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
      <Routes>
        <Route path="/" element={<Dashboard students={students} exams={exams} rooms={rooms} setRooms={setRooms} />} />
        <Route path="/students" element={<StudentsPage students={students} setStudents={setStudents} />} />
        <Route path="/rooms" element={<RoomsPage rooms={rooms} setRooms={setRooms} />} />
        <Route path="/exams" element={<ExamsPage exams={exams} setExams={setExams} reload={reloadFlag} setReload={setReloadFlag} />} />
        <Route path="/seating" element={<SeatingPlanPage seatingPlans={seatingPlans} setSeatingPlans={setSeatingPlans} />} />
      </Routes>
    </div>
  );
}

export default App;