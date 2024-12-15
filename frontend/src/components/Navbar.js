import React, { useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

import { HiOutlineHome } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { PiPingPongLight } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";
import { FaBars } from "react-icons/fa";
import Banner from '../images/imgprofile.jpg';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);


  const getIconStyle = (path) => ({
    color: '#BBFC52',
    fontSize: '20px',
  });

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>
      <ul className={`nav-items ${menuOpen ? 'open' : ''}`}>
        <img src={Banner} alt='Banner' className='img-profile'/>
        <p className='name'>Name</p>
        <li className="nav-item">
          <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
            <HiOutlineHome style={getIconStyle('/home')} /> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
            <IoPersonOutline style={getIconStyle('/profile')} /> Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/chat" className={location.pathname === '/chat' ? 'active' : ''}>
            <BsChatDots style={getIconStyle('/chat')} /> Chat
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/game" className={location.pathname === '/game' ? 'active' : ''}>
            <PiPingPongLight style={getIconStyle('/game')} /> Game
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/friends" className={location.pathname === '/friends' ? 'active' : ''}>
            <IoPeopleOutline style={getIconStyle('/friends')} /> Friends
          </Link>
        </li>
        <div className="spacer"></div>
        <li className="nav-item">
          <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
            <AiOutlineSetting style={getIconStyle('/settings')} /> Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" className={location.pathname === '/logout' ? 'active' : ''}>
            <TbLogout2 style={getIconStyle('/logout')} /> Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;