import { useState, useEffect} from "react";
import {
  Trash2,
  Search,
} from "lucide-react";
import Student from "../utils/student";


const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);


  const handleDelete = (reg, course) => {
    const studentInstance = new Student();
    studentInstance.deleteStudent(reg, course);
    setStudents(students.filter((s) => s.reg !== reg || s.course !== course));
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">
          Students Management
        </h1>
      </div>


      {/* Search + Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">
                  Roll No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.reg + student.course} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-black">{student.name}</td>
                  <td className="px-6 py-4 text-black">{student.reg}</td>
                  <td className="px-6 py-4 text-black">{student.course}</td>
                  <td className="px-6 py-4 text-black">{student.semester}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleDelete(student.reg, student.course)}
                      className="text-red-600 hover:text-red-800 bg-indigo-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <p className="text-center text-gray-500 py-8">No students found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
