import React from 'react';
import './Footer.css'
import Logo from '../assets/UchevaLogo.png'
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const Footer = () => {
  return (
    <>
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo-container">
            <img src={Logo} alt="" />
          </div>
          <p className="brand-description">
            School management platform is 
            <br />built for modern Nigerian schools.
            <br />Simple, powerful, and affordable.
          </p>
          <div className="social-links">
            <div className='social-links-cont'>
                <RiTwitterXFill className='social-icons'/>
            </div>
            <div className='social-links-cont'>
                <FaFacebookF className='social-icons'/>
            </div>
            <div className='social-links-cont'>
                <FaInstagram className='social-icons'/>
            </div>
            <div className='social-links-cont'>
                <MdMailOutline className='social-icons'/>
            </div>
          </div>
        </div>

        <div className="footer-links-group">
          <div className="footer-column">
            <h3 className="column-title">Product</h3>
            <ul>
              <li><a href="#" className='column-title-texts'>Features</a></li>
              <li><a href="#" className='column-title-texts'>How It Works</a></li>
              <li><a href="#" className='column-title-texts'>Pricing</a></li>
              <li><a href="#" className='column-title-texts'>FAQs</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="column-title">Company</h3>
            <ul>
              <li><a href="#" className='column-title-texts'>About Us</a></li>
              <li><a href="#" className='column-title-texts'>Contact Us</a></li>
              <li><a href="#" className='column-title-texts'>Blog</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="column-title">Legal</h3>
            <ul>
              <li><a href="#" className='column-title-texts'>Privacy Policy</a></li>
              <li><a href="#" className='column-title-texts'>Terms of Service</a></li>
              <li><a href="#" className='column-title-texts'>Data Protection</a></li>
              <li><a href="#" className='column-title-texts'>Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-subscribe">
          <h3 className="column-title">Subscribe</h3>
          <p className="subscribe-text">
            Signup to be the first to hear about 
            <br />exclusive deals, special offers and 
            <br />upcoming collections
          </p>
          <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Example@gmail.com" 
              className="subscribe-input"
              required 
            />
            <button type="submit" className="subscribe-button">Submit</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © 2026 Ucheva. All rights reserved.
        </div>
        <div className="status-location">
          <span className="status-indicator">
            <span className="dot"></span> All systems operational
          </span>
          <span className="divider">•</span>
          <span className="location">Made in Lagos, Nigeria <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/330px-Flag_of_Nigeria.svg.png" alt="" className='NG'/></span>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
