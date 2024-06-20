import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const { user } = useAuth();

    return user || localStorage.getItem('token') ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;