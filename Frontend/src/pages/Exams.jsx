import React, { useEffect, useState } from "react";
import { PlusCircle, Edit2, Trash2, Calendar1 } from "lucide-react";
import Modal from "../components/Modal";
import Select from "../components/Select";
import { getExams } from "../utils/api";

const ExamsPage = ({ students = [] }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    duration: "",
    students: [],
  });
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getExams();
        console.log("Fetched exams:");
        if (res) setExams(res);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const examData = { ...formData, students: selectedStudents };

    if (editingExam) {
      setExams(
        exams.map((ex) =>
          ex.id === editingExam.id ? { ...examData, id: ex.id } : ex
        )
      );
    } else {
      setExams([...exams, { ...examData, id: Date.now() }]);
    }
    setFormData({ name: "", date: "", time: "", duration: "", students: [] });
    setSelectedStudents([]);
    setShowForm(false);
    setEditingExam(null);
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setFormData(exam);
    setSelectedStudents(exam.students);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setExams(exams.filter((ex) => ex.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Exams Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingExam(null);
            setFormData({
              name: "",
              date: "",
              time: "",
              duration: "",
              students: [],
            });
            setSelectedStudents([]);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <PlusCircle className="w-4 h-4" />
          <span> Exam</span>
        </button>
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={
          editingExam ? (
            "Edit Exam"
          ) : (
            <div className="flex items-center font-bold gap-2 text-4xl ">
              <Calendar1 size={36} /> Exam
            </div>
          )
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="selectOption">
                Course
                <input
                  type="text"
                  placeholder="Course Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </label>
            </div>

            <label htmlFor="">
              Date
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </label>
            <label htmlFor="">
              Type
              <Select
                options={[
                  { label: "Midterm", value: "midterm" },
                  { label: "Final", value: "final" },
                ]}
                value={formData.type}
                onChange={(value) => setFormData({ ...formData, type: value })}
              />
            </label>
            <label htmlFor="">
              Duration
              <input
                type="text"
                placeholder="Duration (e.g., 2 hours)"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </label>
          </div>

          <div className="flex flex-col">
            <label>Students List</label>
            <label
              htmlFor="fileInput"
              className="bg-white text-indigo-600 border-indigo-600 border-2 px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-indigo-200 transition"
            >
              Choose File
            </label>

            <input
              type="file"
              id="fileInput"
              accept=".csv"
              className="hidden"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editingExam ? "Update" : "Schedule"} Exam
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingExam(null);
              }}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {exam.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {exam.date} at {exam.time}
                </p>
                <p className="text-gray-500 text-sm">
                  Duration: {exam.duration}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(exam)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exam.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-indigo-50 rounded p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Enrolled Students: {exam.students.length}
              </p>
              <div className="flex flex-wrap gap-2">
                {exam.students.slice(0, 5).map((studentId) => {
                  const student = students.find((s) => s.id === studentId);
                  return student ? (
                    <span
                      key={studentId}
                      className="bg-white px-3 py-1 rounded-full text-xs"
                    >
                      {student.name}
                    </span>
                  ) : null;
                })}
                {exam.students.length > 5 && (
                  <span className="bg-white px-3 py-1 rounded-full text-xs">
                    +{exam.students.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {exams.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            No exams scheduled yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamsPage;
