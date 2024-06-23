import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { GiMoneyStack } from 'react-icons/gi';
import { BiMenuAltRight} from 'react-icons/bi';

import '../styles/Header.css';

const Header = () => {

    const [mobileMenu, setMobileMenu] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const toggleMenu = (event) => {
      event.preventDefault();
        mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
    }

  return (
    <nav className='nav-container'>
        <div className='logo'><Link style={currentUser && { pointerEvents: 'none' }} to='/' smooth='true'><GiMoneyStack /><span>TEnmo</span></Link></div>
        {!currentUser &&
        <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
            <li><Link to={'./about'}>About</Link></li>
            <li><Link to={'./team'}>Team</Link></li>
        </ul>}
        <div className='menu-icon' onClick={toggleMenu}><BiMenuAltRight /></div>
    </nav>
  );
};

export default Header;