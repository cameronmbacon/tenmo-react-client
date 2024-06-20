import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: `${API_BASE_URL}/tenmo/accounts`,
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

export const getAccountByUserId = async (userId) => {
    try {
        const response = await api.get(`/userId/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching account:', error);
        throw error;
    }
};

export const getAccountBalance = async (userId) => {
    try {
        const response = await api.get(`/userId/${userId}/balance`);
        return response.data;
    } catch (error) {
        console.error('Error fetching account balance:', error);
        throw error;
    }
};