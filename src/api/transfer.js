import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: `${API_BASE_URL}/tenmo/transfers`,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const createSendTransfer = async (transferData) => {
    try {
        const response = await api.post('/send', transferData);
        return response.data;
    } catch (error) {
        console.error('Error creating send transfer', error);
        throw error;
    }
};

export const createRequestTransfer = async (transferData) => {
    try {
        const response = await api.post('/request', transferData);
        return response.data;
    } catch (error) {
        console.error('Error creating request transfer', error);
        throw error;
    }
};

export const acceptRequestTransfer = async (transferId) => {
    try {
        const response = await api.put(`/request/${transferId}/accept`);
        return response.data;
    } catch (error) {
        console.error('Error accepting request transfer', error);
        throw error;
    }
};

export const rejectRequestTransfer = async (transferId) => {
    try {
        const response = await api.put(`/request/${transferId}/reject`);
        return response.data;
    } catch (error) {
        console.error('Error rejecting request transfer', error);
        throw error;
    }
};

export const listTransfersForUser = async (userId) => {
    let response = {};
    try {
        response = await api.get(`/${userId}`);
    } catch (error) {
        console.error('Error fetching transfers for user', error);
        throw error;
    } finally {
        return response.data;
    }
};

export const getTransferDetails = async (transferId) => {
    try {
        const response = await api.get(`/${transferId}/details`);
        return response.data;
    } catch (error) {
        console.error('Error fetching transfers details', error);
        throw error;
    }
};