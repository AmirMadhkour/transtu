import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.withCredentials = true;

// Request Interceptor
axios.interceptors.request.use(
    (config) => {
        // Example: Add an Authorization header
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log the request
        console.log('Request:', config);

        return config;
    },
    (error) => {
        // Handle request error
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
axios.interceptors.response.use(
    (response) => {
        // Log the response
        console.log('Response:', response);

        return response;
    },
    (error) => {
        // Handle response error
        console.error('Response error:', error);

        // Example: Redirect to login if 401 Unauthorized
        if (error.response && error.response.status === 401) {
            window.location.href = '/Login';
        }

        return Promise.reject(error);
    }
);

// API Functions

export const fetchVehicule = async () => {
    try {
        const response = await axios.get('/moyendeTransports');
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicule data:', error);
        throw error;
    }
};

export const updateMoyendeTransport = async (id, data) => {
    try {
        const response = await axios.patch(`/moyendeTransports/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating the record:', error);
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

export const getAllOwners = async () => {
    try {
        const response = await axios.get(`/owner`);
        return response.data;
    } catch (error) {
        console.error('Error fetching owner data:', error);
        throw error;
    }
};

export const getDirectorbyID = async (id) => {
    try {
        const response = await axios.get(`/director/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching director data:', error);
        throw error;
    }
};

export const addMoyendeTransport = async (data) => {
    try {
        const response = await axios.post(`/moyendeTransports`, data);
        return response.data;
    } catch (error) {
        console.error('Error adding the record:', error);
        throw error;
    }
};

export const deleteMoyenDeTransport = async (id) => {
    try {
        const response = await axios.delete(`/moyendeTransports/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting the record:', error);
        throw error;
    }
};
