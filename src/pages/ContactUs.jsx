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
    <div className="contact-layout-wrapper">
      <div className="contact-layout-container">
        
        <div className="contact-form-card">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="contact-form-grid">
              
              <div className="contact-input-field">
                <label>Name</label>
                <input type="text" placeholder="John Doe" />
              </div>

              <div className="contact-input-field">
                <label>Email</label>
                <input type="email" placeholder="example@gmail.com" />
              </div>

              <div className="contact-input-field">
                <label>School name</label>
                <input type="text" placeholder="E.g.: Green Field Academy" />
              </div>

              <div className="contact-input-field">
                <label>What can we help with?</label>
                <div className="select-container">
                  <select defaultValue="general">
                    <option value="general">General Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="sales">Sales Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="contact-input-field full-row">
                <label>Message</label>
                <textarea placeholder="Type here..."></textarea>
              </div>

            </div>

            <div className="action-button-row">
              <button type="submit" className="submit-action-btn">Send Message</button>
            </div>
          </form>
        </div>

        <div className="contact-details-panel">
          <span className="panel-tagline">Contact Us</span>
          <h2 className="panel-heading">Get in Touch With Us</h2>
          <p className="panel-lead-text">
            Have questions or need support? We're here to help your school get started.
          </p>

          <div className="panel-data-group">
            <h3>Contact</h3>
            <a href="mailto:app.ucheva@gmail.com" className="data-anchor">app.ucheva@gmail.com</a>
          </div>

          <div className="panel-data-group">
            <h3>Address</h3>
            <p className="address-paragraph">
              12 Tech Hub Road, Victoria Island,<br />Lagos, Nigeria
            </p>
          </div>

          <div className="panel-social-group">
            <h3>Connect with us on</h3>
            <div className="social-button-list">
              <a href="#" className="social-circle-btn" aria-label="Instagram">
                <IoLogoInstagram />
              </a>
              <a href="#" className="social-circle-btn" aria-label="TikTok">
                <AiOutlineTikTok />
              </a>
              <a href="#" className="social-circle-btn" aria-label="X">
                <RiTwitterXFill />
              </a>
              <a href="#" className="social-circle-btn" aria-label="LinkedIn">
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
