import{ useState } from "react";
import { PlusCircle, Edit2, Trash2, Calendar1, MessageCircleX, CircleCheckBigIcon, LinkIcon } from "lucide-react";
import Modal from "../components/Modal";
import Select from "../components/Select";
import Exam from "../utils/exam";
import { useAlertBox } from "../components/Alerts";

const ExamsPage = ({ exams, setExams, reload, setReload }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [formData, setFormData] = useState(new Exam());
  const { alertBox } = useAlertBox();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const examInstance = new Exam()
    if (editingExam) {
      const res = await examInstance.updateExam(formData)
      if (res.Error) {
        alertBox(res.Error, "Error", <MessageCircleX />);
      } else {
        alertBox("Exam updated successfully!", "Success", <CircleCheckBigIcon />);
        const updatedExams = exams.map((exam) =>
          exam.course === formData.course ? formData : exam
        );
        setExams(updatedExams);
      }
    } else {
      const res = await examInstance.insertExam(formData)
      if (res.Error) {
        await alertBox(res.Error, "Error", <MessageCircleX />);
      } else if (res.Alert) {
        const alertRes = await alertBox(res.Alert, "Alert", <MessageCircleX />);
        console.log("Alert Response:", res.conflict);
        if (!alertRes) return;
        const conflictCourse = res.conflict
        const confirmRes = await examInstance.confirmExam(formData, conflictCourse)
        if (confirmRes.Error) {
          await alertBox(confirmRes.Error, "Error", <MessageCircleX />);
        } else {
          await alertBox("Exam scheduled successfully!", "Success", <CircleCheckBigIcon />);
          setExams([...exams, { ...formData, id: Date.now() }]);
        }
      } else {
        await alertBox("Exam scheduled successfully!", "Success", <CircleCheckBigIcon />);
        setExams([...exams, { ...formData, id: Date.now() }]);
      }
      setReload(!reload);
    }
    setFormData(new Exam());
    setShowForm(false);
    setEditingExam(null);
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setFormData(exam);
    setShowForm(true);
  };

  const handleDelete = async (exam) => {
    const confirm = await alertBox(`Do you want to delete exam for course ${exam.course}?`, "Delete", <Trash2 />, null, "Delete", "Cancel");
    if (!confirm) return;
    const examInstance = new Exam()
    const response = await examInstance.deleteExam(exam.course)
    if (response.Error) {
      alertBox(response.Error, "Error", <MessageCircleX />);
    } else {
      alertBox("Exam deleted successfully!", "Success", <CircleCheckBigIcon />);
      const updatedExams = exams.filter((e) => e.course !== exam.course);
      setExams(updatedExams);
    }
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Exams Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingExam(null);
            setFormData(new Exam());
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
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={editingExam !== null}
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
                  { label: "Midterm", value: "Midterm" },
                  { label: "Final", value: "Final" },
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

          { !editingExam && <div className="flex flex-col">
            <p>{formData.student ? formData.student.name : "No file chosen"}</p>
            <label className="flex items-center justify-between">Students List
              <div className="flex items-center gap-2 text-sm font-normal">File Format
                <a href="/students.csv" download="students.csv" className="flex items-center gap-1 text-sm"><LinkIcon size={16} /> students.csv</a>
              </div>
            </label>
            <label
              htmlFor="fileInput"
              className="bg-[#f9f9f9] text-black border-gray-300 border px-4 py-2 rounded-lg font-bold cursor-pointer hover:bg-gray-200 transition"
            >
              Choose File
            </label>

            <input
              type="file"
              id="fileInput"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                setFormData({ ...formData, student: e.target.files[0] });
              }}
            />
          </div>}

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
          <div key={exam.course} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start w-full">
              <div className="w-full">
                <h3 className="text-xl font-semibold text-black mb-2">
                  {exam.course}
                </h3>
                <p className="text-black">
                  {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(exam)}
                  className="text-blue-600 hover:text-blue-800 bg-indigo-100 p-2 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exam)}
                  className="text-red-600 hover:text-red-800 bg-indigo-100 p-2 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex w-full justify-between mb-4">
              <p className="text-black text-sm">
                Duration: {exam.duration} mins
              </p>
              <p className="text-black text-sm">
                {exam.date} at {exam.time}
              </p>
            </div>
            <div className="bg-indigo-50 rounded p-4">
              <p className="text-sm font-medium text-black mb-2">
                Enrolled Students: {Array.isArray(exam.students) ? exam.students.length : 0}
              </p>
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
