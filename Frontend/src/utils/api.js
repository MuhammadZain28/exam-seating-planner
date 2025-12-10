import axios from "axios";

const API_URL = "http://127.0.0.1:8000";


export const getCounter = async () => {
  try {
    const response = await axios.get(`${API_URL}/counter/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching counters:", error);
    return null;
  }
};
export const incrementCounter = async () => {
  try {
    const response = await axios.post(`${API_URL}/counter/increment`);
    return response.data;
  } catch (error) {
    console.error(`Error incrementing counter:`, error);
    return null;
  }
};

export const decrementCounter = async () => {
  try {
    const response = await axios.post(`${API_URL}/counter/decrement`);
    return response.data;
  } catch (error) {
    console.error(`Error decrementing counter:`, error);
    return null;
  }
};