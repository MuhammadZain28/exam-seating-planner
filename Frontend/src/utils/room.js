import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default class Room {
  constructor(name = "Room A", capacity = 30, rows = 5, columns = 6) {
    this.name = name
    this.capacity = capacity
    this.rows = rows
    this.columns = columns
  }

  insertRoom = async (room) => {
    try {
      const payload = {
        name: room.name,
        rows: Number(room.rows),
        columns: Number(room.columns)
      }
      const response = await axios.post(`${API_URL}/room/insert`, payload)
      return response.data
    } catch (error) {
      console.log("Error Insert Room", error)
      return null
    }
  };

  getRooms = async () => {
    try {
      const response = await axios.get(`${API_URL}/room/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return null;
    }
  };

  deleteRoom = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/room/delete/${encodeURIComponent(id)}`)
      return response.data
    } catch (error) {
      console.error(error)
      return null
    }
  }
  updateRoom = async (room) => {
    try {
      const payload = {
        name: room.name || "",   // default empty string
        capacity: Number(room.capacity) || 0,
        rows: Number(room.rows) || 0,
        columns: Number(room.columns) || 0
      }
      const response = await axios.put(`${API_URL}/room/update/${encodeURIComponent(room.name)}`, payload)
      return response.data
    } catch (error) {
      console.error("Error updating room:", error);
      return null
    }
  }
}