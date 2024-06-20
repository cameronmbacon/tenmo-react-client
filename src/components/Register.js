import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import { BiSolidUser, BiSolidMessage, BiSolidLock } from 'react-icons/bi';

import '../styles/Register.css';
import Header from './Header';

const Register = () => {

    const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await register({ username, password });
            navigate('/login',
                { state: { 
                message: 'Registration successful! Please log in.',
            },
        });
        } catch (error) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='register-container'>
            <Header />
            <div className='form-container'>
                <div className='header'>
                    <div className='text'>Sign Up</div>
                    <div className='underline'></div>
                </div>
                <form className='inputs' onSubmit={handleSubmit}>
                    <div className='input'>
                        <div className='icon'><BiSolidUser /></div>
                        <input type='text' value={username} placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    {/* <div className='input'>
                        <div className='icon'><BiSolidMessage /></div>
                        <input type='email' value={email} placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} />
                    </div> */}
                    <div className='input'>
                        <div className='icon'><BiSolidLock /></div>
                        <input type='password' value={password} placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className='login'>
                        Already a user? 
                        <span onClick={() => navigate('/login')}> Log in here!</span>
                    </div>
                    <div className='submit-container'>
                        <button className='submit' type='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;