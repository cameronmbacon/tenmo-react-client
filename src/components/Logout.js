import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout as apiLogout } from '../api/auth';
import { BiExit } from 'react-icons/bi';

import '../styles/Logout.css';

const Logout = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        apiLogout();
        logout();
        navigate('/');
    };

    return (
        <button className='logout-btn' onClick={handleClick}>
            <BiExit />
        </button>
    )
}

export default Logout;