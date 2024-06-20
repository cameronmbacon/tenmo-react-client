import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/Home.css';

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className='home-container'>
            <div className='hero'>
                <div className='hero-text'>
                    <div className='welcome-headline'>
                        <h1>Welcome</h1>
                        <h1>to</h1>
                        <h1>TEnmo!</h1>
                    </div>
                    <h4>An online payment service for transferring TE bucks between friends</h4>
                    <Link to='/register' smooth='true' offset={0} duration={500}  className='btn'>Get Started</Link>
                    <div className='login'>
                        Already a user? 
                        <span onClick={() => navigate('/login')}> Log in here!</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;