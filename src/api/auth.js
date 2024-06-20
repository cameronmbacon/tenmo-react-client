import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const login = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        
        return response.data;
    } catch (error) {
        console.error("Login error: ", error);
        throw error;
    }
};

export const logout = () => {
    if (localStorage) {
        localStorage.clear();
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/register', userData);

        return response.data;
    } catch (error) {
        console.error("Registration error: ", error);
        throw error;
    }
};