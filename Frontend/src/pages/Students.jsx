import { useEffect, useState } from "react";
import { Trash2, MessageCircleX, CircleCheckBigIcon } from "lucide-react";
import Student from "../utils/student";
import Search from "../components/Search";
import { useAlertBox } from "../components/Alerts";

const StudentsPage = ({students, setStudents}) => {
  const [filteredStudents, setFilteredStudents] = useState(students);
  const { alertBox } = useAlertBox();

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);
  const handleDelete = async (student) => {
    const confirm = await alertBox(`Do you want to delete student ${student.name}?`, "Delete", <MessageCircleX />, null, "Delete", "Cancel");
    if (!confirm) return;
    const studentInstance = new Student();
    const response = await studentInstance.deleteStudent(student.reg, student.course, student.date);
    if (response.Error) {
      alertBox(response.Error, "Error", <MessageCircleX />);
    } else {
      alertBox("Student deleted successfully!", "Success", <CircleCheckBigIcon />);
    }
    setStudents(students.filter((s) => s.reg !== student.reg || s.course !== student.course || s.date !== student.date));
  };

  return (
    <div className="p-6 w-full min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">
          Students Management
        </h1>
      </div>


      {/* Search + Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 relative w-full">
          {students.length > 0 ?  <Search data={students} onSelect={(data) => setFilteredStudents(data)} /> : null}
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
                  Session
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
                  <td className="px-6 py-4 text-black">{student.session}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleDelete(student)}
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
