import React, { useState } from 'react';
import './Header.css';
import Logo from '../assets/UchevaLogo.png'
import Button from './Button';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { FiMenu, FiX } from "react-icons/fi"; 

const Header = () => {
  const nav = useNavigate();
  const location = useLocation(); 

  const [open, setOpen] = useState(false);

  const handleLogin = () => console.log('Log In clicked');
  const handleStart = () => console.log('Get Started clicked');
  
  const handleNavigation = (path) => {
    nav(path);
    setOpen(false); 
  };

  return (
    <header className="Header">
      <div className="HeaderCont1">
        <img src={Logo} alt="Ucheva Logo" className="HeaderCont1Logo" />
      </div>

      <ul className={`HeaderCont2 ${open ? 'active' : ''}`}>

        <li 
          className={`HeaderCont2Li ${location.pathname === '/' ? 'active-link' : ''}`} 
          onClick={() => handleNavigation('/')}
        >
          Home
        </li>
        <li 
          className={`HeaderCont2Li ${location.pathname === '/Features' ? 'active-link' : ''}`} 
          // onClick={() => handleNavigation('/Features')}
        >
          Features
        </li>
        <li 
          className={`HeaderCont2Li ${location.pathname === '/Pricing' ? 'active-link' : ''}`} 
          onClick={() => handleNavigation('/Pricing')}
        >
          Pricing
        </li>
        <li 
          className={`HeaderCont2Li ${location.pathname === '/AboutUs' ? 'active-link' : ''}`} 
          onClick={() => handleNavigation('/AboutUs')}
        >
          About Us
        </li>
        <li 
          className={`HeaderCont2Li ${location.pathname === '/ContactUs' ? 'active-link' : ''}`} 
          onClick={() => handleNavigation('/ContactUs')}
        >
          Contact Us
        </li>
      </ul>

      <div className="HeaderCont3">
        <Button
          text="Log In"
          onClick={(handleLogin) => {
            nav("/login");
          }}
          type="login"
        />
        <Button
          text="Get Started"
          onClick={(handleStart) => {
            nav("/signup");
          }}
          type="get-started"
        />

        <div className="MobileMenuIconDiv">
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
