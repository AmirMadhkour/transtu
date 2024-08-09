import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.withCredentials = true;

export const fetchBonCarburant = async () => {
    try {
        const response = await axios.get('/boncarburants');
        return response.data;
    } catch (error) {
        console.error('Error fetching BonCarburant data:', error);
        throw error;
    }
};

export const updateBonCarburant = async (id, data) => {
    try {
        const response = await axios.patch(`/boncarburants/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating the record:', error);
        throw error;
    }
};

export const getBonByID = async (id) => {
    try {
        const response = await axios.get(`/boncarburants/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching carburantType data:', error);
        throw error;
    }
};


export const getCarburantTypebyID = async (id) => {
    try {
        const response = await axios.get(`/carburant_types/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching carburantType data:', error);
        throw error;
    }
};

export const addBonCarburant = async (data) => {
    try {
        const response = await axios.post(`/boncarburants`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating the record:', error);
        throw error;
    }

};

export const deleteBonCarburant = async (id) => {
    try {
        const response = await axios.delete(`/boncarburants/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error delete the record:', error);
        throw error;
    }
};
