import React from 'react';
import './ContactUs.css';
import Header from './Header';
import Footer from './Footer';
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineTikTok } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";

const ContactLayout = () => {
  return (
    <>
    <Header/>
    <div className="TTcontact-layout-wrapper">
      <div className="TTcontact-layout-container">
        
        <div className="TTcontact-form-card">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="TTcontact-form-grid">
              
              <div className="TTcontact-input-field">
                <label>Name</label>
                <input type="text" placeholder="John Doe" />
              </div>

              <div className="TTcontact-input-field">
                <label>Email</label>
                <input type="email" placeholder="example@gmail.com" />
              </div>

              <div className="TTcontact-input-field">
                <label>School name</label>
                <input type="text" placeholder="E.g.: Green Field Academy" />
              </div>

              <div className="TTcontact-input-field">
                <label>What can we help with?</label>
                <div className="TTselect-container">
                  <select defaultValue="general">
                    <option value="general">General Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="sales">Sales Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="TTcontact-input-field TTfull-row">
                <label>Message</label>
                <textarea placeholder="Type here..."></textarea>
              </div>

            </div>

            <div className="TTaction-button-row">
              <button type="submit" className="TTsubmit-action-btn">Send Message</button>
            </div>
          </form>
        </div>

        <div className="TTcontact-details-panel">
          <span className="TTpanel-tagline">Contact Us</span>
          <h2 className="TTpanel-heading">Get in Touch With Us</h2>
          <p className="TTpanel-lead-text">
            Have questions or need support? We're here to help your school get started.
          </p>

          <div className="TTpanel-data-group">
            <h3>Contact</h3>
            <a href="mailto:app.ucheva@gmail.com" className="TTdata-anchor">app.ucheva@gmail.com</a>
          </div>

          <div className="TTpanel-data-group">
            <h3>Address</h3>
            <p className="TTaddress-paragraph">
              12 Tech Hub Road, Victoria Island,<br />Lagos, Nigeria
            </p>
          </div>

          <div className="TTpanel-social-group">
            <h3>Connect with us on</h3>
            <div className="TTsocial-button-list">
              <a href="#" className="TTsocial-circle-btn" aria-label="Instagram">
                <IoLogoInstagram />
              </a>
              <a href="#" className="TTsocial-circle-btn" aria-label="TikTok">
                <AiOutlineTikTok />
              </a>
              <a href="#" className="TTsocial-circle-btn" aria-label="X">
                <RiTwitterXFill />
              </a>
              <a href="#" className="TTsocial-circle-btn" aria-label="LinkedIn">
                <BiLogoLinkedin />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactLayout;