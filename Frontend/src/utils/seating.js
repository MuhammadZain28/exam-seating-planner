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