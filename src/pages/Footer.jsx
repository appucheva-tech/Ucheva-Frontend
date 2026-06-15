import React from 'react';
import './Footer.css'
import Logo from '../assets/Logo.svg'
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const Footer = () => {
  return (
    <>
    <footer className="AAmyfooter">
      <div className="AAfooter-container">
        <div className="AAfooter-brand">
          <div className="AAlogo-container">
            <img src={Logo} alt="" />
          </div>
          <p className="AAbrand-description">
            School management platform is 
            <br />built for modern Nigerian schools.
            <br />Simple, powerful, and affordable.
          </p>
          <div className="AAsocial-links">
            <div className='AAsocial-links-cont'>
                <RiTwitterXFill className='AAsocial-icons'/>
            </div>
            <div className='AAsocial-links-cont'>
                <FaFacebookF className='AAsocial-icons'/>
            </div>
            <div className='AAsocial-links-cont'>
                <FaInstagram className='AAsocial-icons'/>
            </div>
            <div className='AAsocial-links-cont'>
                <MdMailOutline className='AAsocial-icons'/>
            </div>
          </div>
        </div>

        <div className="AAfooter-links-group">
          <div className="AAfooter-column">
            <h3 className="AAcolumn-title">Product</h3>
            <ul>
              <li><a href="#" className='AAcolumn-title-texts'>Features</a></li>
              <li><a href="#" className='AAcolumn-title-texts'>How It Works</a></li>
              <li><a href="#" className='AAcolumn-title-texts'>Pricing</a></li>
              <li><a href="#" className='AAcolumn-title-texts'>FAQs</a></li>
            </ul>
          </div>

          <div className="AAfooter-column">
            <h3 className="AAcolumn-title">Company</h3>
            <ul>
              <li><a href="#" className='AAcolumn-title-texts'>About Us</a></li>
              <li><a href="#" className='AAcolumn-title-texts'>Contact Us</a></li>
              <li><a href="#" className='AAcolumn-title-texts'>Blog</a></li>
            </ul>
          </div>

          <div className="AAfooter-column">
            <h3 className="AAcolumn-title">Legal</h3>
            <ul>
              <li><a href="#" className='AAcolumn-title-texts'>Privacy Policy</a></li>
              <li><a href="#" className='AAcolumn-title-texts'>Terms of Service</a></li>
              <li><a href="#" className='AAcolumn-title-texts'>Data Protection</a></li>
              <li><a href="#" className='AAcolumn-title-texts'>Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="AAfooter-subscribe">
          <h3 className="AAsubscribe-heading">Subscribe</h3>
          <p className="AAsubscribe-text">
            Signup to be the first to hear about 
            <br />exclusive deals, special offers and 
            <br />upcoming collections
          </p>
          <form className="AAsubscribe-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Example@gmail.com" 
              className="AAsubscribe-input"
              required 
            />
            <button type="submit" className="AAsubscribe-button">Submit</button>
          </form>
        </div>
      </div>

      <div className="AAfooter-bottom">
        <div className="AAcopyright">
          © 2026 Ucheva. All rights reserved.
        </div>
        <div className="AAstatus-location">
          <span className="AAstatus-indicator">
            <span className="AAdot"></span> All systems operational
          </span>
          <span className="AAdivider">•</span>
          <span className="AAlocation">Made in Lagos, Nigeria <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/330px-Flag_of_Nigeria.svg.png" alt="" className='AANG'/></span>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
