import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.withCredentials = true; 

export const fetchUsers = async () => {
    try {
        const response = await axios.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching Users data:', error);
        throw error;
    }
};

export const updateUsers = async (id, data) => {
    
    try {
        const response = await axios.patch(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating the users:', error);
        throw error;
    }
      
};

export const addUsers = async (data) => {
    try {
        const response = await axios.post(`/users`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating the record:', error);
        throw error;
    }
};

export const deleteUsers = async (id) => {
    try {
        const response = await axios.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error delete the user:', error);
        throw error;
    }
};

export const getUserByID = async(id) => {
    try {
        const response = await axios.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting User data by id :', error);
        throw error;
    }
}