import React from 'react';
import './AboutUs.css';
import Header from './Header';
import Footer from './Footer';
import HappyCL1 from '../assets/HappyCL1.jpg'
import HappyCL2 from '../assets/HappyCL2.jpg'
import HappyCL3 from '../assets/HappyCL3.jpg'
import HappyCL4 from '../assets/HappyCL4.jpg'
import OurMission from './OurMission';

export default function AboutUs() {
  return (
    <>
    <Header/>
    <section className="our-story-section">
      <div className="story-container">
        
        {/* Left Side: Bento-style Grid Layout */}
        <div className="grid-gallery">
          
          {/* Top Left: People Row Image */}
          <div className="grid-item img-row-people">
            <img 
              src="https://unsplash.com" 
              alt="School administrators and staff in a row" 
            />
          </div>
          
          {/* Top Right: Stats Card */}
          <div className="grid-item stats-card-blue">
            <span className="stat-percentage">98%</span>
            <p className="stat-label">Happy Clients</p>
            <div className="avatar-group">
              <img src={HappyCL1} alt="Client 1" className="avatar" />
              <img src={HappyCL2} alt="Client 2" className="avatar" />
              <img src={HappyCL3} alt="Client 3" className="avatar" />
              <img src={HappyCL4} alt="Client 4" className="avatar" />
              <div className="avatar-plus">+</div>
            </div>
          </div>
          
          {/* Bottom Left: Years Card */}
          <div className="grid-item badge-years">
            <div className="badge-content">
              <span className="years-number">1+</span>
              <p className="years-text">Year in<br />Business</p>
            </div>
          </div>
          
          {/* Bottom Right: Office Meeting Image */}
          <div className="grid-item img-meeting">
            <img 
              src="https://unsplash.com" 
              alt="Team discussing around a laptop screen" 
            />
          </div>
          
        </div>

        {/* Right Side: Typography Content */}
        <div className="story-content">
          <span className="content-subtitle">About Us</span>
          <h2 className="content-title">Our Story</h2>
          <p className="content-text">
            The idea began after several conversations with school administrators, 
            teachers, and staff who all shared similar frustrations. Attendance was 
            being recorded on paper, fee tracking was difficult to manage, important 
            announcements got lost in WhatsApp groups, and parents often stayed 
            uninformed unless there was a serious issue.
          </p>
        </div>

      </div>
    </section>
    <OurMission/>
    <Footer/>
    </>
  );
}
