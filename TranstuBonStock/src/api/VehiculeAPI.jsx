import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.withCredentials = true; 

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
        return (response.data);
    } catch (error) {
        console.error('Error fetching carburantType data:', error);
        throw error;
    }

};


export const getAllOwners = async() => {
    try {
        const response = await axios.get(`/owner`);
        return (response.data);
    } catch (error) {
        console.error('Error fetching owner data:', error);
        throw error;
    }

};

export const getDirectorbyID = async(id) => {
    try {
        const response = await axios.get(`/director/${id}`);
        return (response.data);
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
        console.error('Error updating the record:', error);
        throw error;
    }
};

export const deleteMoyenDeTransport = async ( id ) => {
    try {
        const response = await axios.delete(`/moyendeTransports/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error delete the record:', error);
        throw error;
    }
};

