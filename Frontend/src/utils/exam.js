import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default class Exam {
  constructor(course = "ABC", date = new Date().toISOString().split("T")[0], time = "TBD", type = "Midterm", duration = 90, student = []) {
    this.course = course
    this.date = date
    this.time = time
    this.type = type
    this.duration = duration
    this.student = student
  }

  insertExam = async (exam) => {
    try {
      const form = new FormData();
      form.append("course", exam.course);
      form.append("date", exam.date);
      form.append("time", exam.time)
      form.append("exam_type", exam.type);
      form.append("duration", exam.duration);
      form.append("file", exam.student);
      console.log("Form Data:", Array.from(form.entries()));
      const response = await axios.post(`${API_URL}/exam/insert`,
        form,
        { headers: {'Content-Type': 'multipart/form-data'} }
      )
      return response.data
    } catch (error) {
      console.log("Error Insert Course", error)
      return null
    }
  };

  confirmExam = async (exam, conflictCourse) => {
    try {
      const form = new FormData();
      form.append("course", exam.course);
      form.append("date", exam.date);
      form.append("time", exam.time)
      form.append("exam_type", exam.type);
      form.append("duration", exam.duration);
      form.append("file", exam.student);
      form.append("conflict", conflictCourse);
      console.log("Form Data:", Array.from(form.entries()));
      const response = await axios.post(`${API_URL}/exam/confirm`,
        form,
        { headers: {'Content-Type': 'multipart/form-data'} }
      )
      return response.data
    } catch (error) {
      console.log("Error Insert Course", error)
      return null
    }
  };

  getExams = async () => {
    try {
      const response = await axios.get(`${API_URL}/exam/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching counters:", error);
      return null;
    }
  };

  deleteExam = async (course) => {
    try {
      const response = await axios.delete(`${API_URL}/exam/${encodeURIComponent(course)}/`)
      console.log("Delete Response:", response.data)
      return response.data
    } catch (error) {
      console.error(error)
      return null
    }
  }
  updateExam = async (exam) => {
    try {
      const payload = {
        course: exam.course || "",   // default empty string
        date: exam.date || "",
        type: exam.type || "",
        duration: Number(exam.duration) || 0
      }
      const response = await axios.post(`${API_URL}/exam/update`, payload)
      return response.data
    } catch (error) {
      console.error("Error Update Course", error)
      return null
    }
  }
}
