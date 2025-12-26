import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export async function fetchSeatingArrangement(date, time) {
    try {
        const response = await axios.get(`${API_URL}/seating/${encodeURIComponent(date)}/${encodeURIComponent(time)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching seating arrangement:', error);
        return null;
    }
}

export async function fetchAllArrangements() {
    try {
        const response = await axios.get(`${API_URL}/seating/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all arrangements:', error);
        return null;
    }
}

export async function ExistingArrangements(date, time) {
    try {
        const response = await axios.get(`${API_URL}/seating/existing/${encodeURIComponent(date)}/${encodeURIComponent(time)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching existing arrangements:', error);
        return null;
    }
}

export async function deleteArrangement(date, time) {
    try {
        const response = await axios.delete(`${API_URL}/seating/delete/${encodeURIComponent(date)}/${encodeURIComponent(time)}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting arrangement:', error);
        return null;
    }
}