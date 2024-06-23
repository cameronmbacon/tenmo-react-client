import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                setUser({ username: decodedToken.sub });
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.clear();
            }
        }
    }, []);

    const login = async (loginResponseDto) => {
        try {
            localStorage.setItem('token', loginResponseDto.token);
            localStorage.setItem('user', JSON.stringify(loginResponseDto.user));
            setUser(user);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser({});
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};