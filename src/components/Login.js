import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BiSolidUser, BiSolidLock } from 'react-icons/bi';
import { login as apiLogin } from '../api/auth';
import useTenmoApi from '../hooks/useTenmoApi';

import '../styles/Login.css';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const message = location.state ? location.state.message : null;
    const { login } = useAuth();
    const { fetchAccountByUserId, fetchTransfersForUser } = useTenmoApi();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const loginResponse = await apiLogin(username, password);
            await login(loginResponse);
            const userData = loginResponse.user;
            const accountData = await fetchAccountByUserId(userData.id);
            const transfersData = await fetchTransfersForUser(userData.id);
            navigate('/dashboard',
                { state: { 
                    user: userData,
                    account: accountData,
                    transfers: transfersData,
                },
            });  
        } catch (error) {
            setError('Login failed. Check credentials and try again.');
        }
    }

    return (
        <div className='login-container'>
            <div className='form-container'>
                <div className='header'>
                    <div className='text'>Login</div>
                    <div className='underline'></div>
                </div>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <form className='inputs' onSubmit={handleSubmit}>
                    <div className='input'>
                        <div className='icon'><BiSolidUser /></div>
                        <input type='text' value={username} placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='input'>
                        <div className='icon'><BiSolidLock /></div>
                        <input type='password' value={password} placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className='register'>
                        Need an account? 
                            <span onClick={() => navigate('/register')}> Sign up here!</span>
                    </div>
                    <div className='submit-container'>
                        <button className='submit' type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;