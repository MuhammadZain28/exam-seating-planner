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

export async function exportXlsx(date, time) {
    try {
        const response = await axios.get(`${API_URL}/seating/export/${encodeURIComponent(date)}/${encodeURIComponent(time)}`, {
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        console.error('Error exporting XLSX:', error);
        return null;
    }   
}

export function getFirstAndLastRoll(layout, session) {
  const rolls = layout
    .flat()
    .filter(seat => seat && seat.includes(session));

  if (rolls.length === 0) {
    return { first: "-", last: "-" };
  }

  rolls.sort();

  return {
    first: rolls[0],
    last: rolls[rolls.length - 1]
  };
};
