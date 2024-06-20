import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiHome, BiMenu, BiX } from 'react-icons/bi';
import { RiExchangeDollarFill } from 'react-icons/ri';
import Logout from './Logout';

import '../styles/Navbar.css';

const Navbar = ({ user, account, transfers, toggleMenu, toggleTransferMenu, showMenu }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard',
      { state: { 
          user,
          account,
          transfers,
      },
  })};

  return (
    <div>
        <nav className='navbar'>
            <button className='dashboard-btn' onClick={handleClick}><BiHome /></button>
            <button className='dashboard-btn transfer-btn' onClick={toggleTransferMenu}><RiExchangeDollarFill /></button>
            <button className='dashboard-btn' onClick={toggleMenu}><BiMenu /></button>
        </nav>

        {showMenu && (
            <div className='menu more-menu'>
              <ul>
              <li><button className='close-btn' onClick={toggleMenu}><BiX /></button></li>
                <li><Logout /></li>
              </ul>
            </div>
        )}
    </div>
  );
}

export default Navbar;