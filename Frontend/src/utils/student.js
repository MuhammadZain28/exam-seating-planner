import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default class Student {
    constructor(name = "John Doe", rollNo = "000", department = "CSE", semester = 1) {
        this.name = name
        this.rollNo = rollNo
        this.department = department
        this.semester = semester
    }
    getStudentData = async () => {
        try {
            const response = await axios.get(`${API_URL}/students/`);
            return response.data;
        } catch (error) {
            console.error("Error fetching students:", error);
            return null;
        }
    };

    searchStudent = async (rollNo) => {
        try {
            const response = await axios.get(`${API_URL}/students/search/${encodeURIComponent(rollNo)}`);
            return response.data;
        } catch (error) {
            console.error("Error searching student:", error);
            return null;
        }
    };

    deleteStudent = async (reg, course, session) => {
        try {
            const response = await axios.delete(`${API_URL}/exam/${reg}/${course}/${session}/`);
            console.log("Delete Student Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error deleting student:", error);
            return null;
        }
    };
}