import React, { useState } from "react";
import { PlusCircle, Edit2, Trash2, Search, User2 } from "lucide-react";
import Modal from "../components/Modal";

const StudentsPage = ({ students = [], setStudents }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    semester: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...formData, id: s.id } : s
        )
      );
    } else {
      setStudents([...students, { ...formData, id: new Date().getTime() }]);
    }
    setFormData({ name: "", rollNo: "", department: "", semester: "" });
    setEditingStudent(null);
    setShowModal(false);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Students Management
        </h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditingStudent(null);
            setFormData({
              name: "",
              rollNo: "",
              department: "",
              semester: "",
            });
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <PlusCircle className="w-4 h-4" />
          <span> Student</span>
        </button>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingStudent ? "Edit Student" : <div className="flex items-center font-bold gap-2 text-4xl "><User2 size={32} />Student</div>}
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label htmlFor="name">Student</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="name">Registration No</label>
            <input
              type="text"
              value={formData.rollNo}
              onChange={(e) =>
                setFormData({ ...formData, rollNo: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="department">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="semester">Semester</label>
            <input
              type="text"
              value={formData.semester}
              onChange={(e) =>
                setFormData({ ...formData, semester: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="department">Course</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="md:col-span-2 flex space-x-3">
            <button
              type="submit"
              className="flex items-center bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editingStudent ? "Update" : <PlusCircle className="w-4 h-4 inline-block mr-2" />} Student
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

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
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Roll No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.rollNo}</td>
                  <td className="px-6 py-4">{student.department}</td>
                  <td className="px-6 py-4">{student.semester}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-red-600 hover:text-red-800"
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
