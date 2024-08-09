import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.withCredentials = true; 

export const fetchDistricts = async () => {
    try {
        const response = await axios.get('/districts');
        return response.data;
    } catch (error) {
        console.error('Error fetching Users data:', error);
        throw error;
    }
};

export const updateDistricts = async (id, data) => {
    
    try {
        const response = await axios.patch(`/districts/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating the districts:', error);
        throw error;
    }
      
};

export const addDistricts = async (data) => {
    try {
        const response = await axios.post(`/districts`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating the districts:', error);
        throw error;
    }
};


export const deleteDistricts = async (id) => {
    try {
        const response = await axios.delete(`/districts/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error delete the user:', error);
        throw error;
    }
};


