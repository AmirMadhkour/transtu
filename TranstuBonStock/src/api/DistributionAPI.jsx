import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.withCredentials = true;

export const fetchDistribution = async () => {
    try {
        const response = await axios.get('/distributions');
        return response.data;
    } catch (error) {
        console.error('Error fetching distributions data:', error);
        throw error;
    }
};

export const addRecu = async (data) => {
    try {
        const response = await axios.post('/distribution', data);
        return response.data;
    } catch (error) {
        console.error('Error updating the record:', error);
        throw error;
    }

};

export const removeRecu = async (id) => {
    try {
        const response = await axios.delete(`/distributions/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error removing the record:', error);
        throw error;
    }
};

