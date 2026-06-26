import React from 'react';
import './OurMission.css';
import AboutUsPic2 from '../assets/AboutUsPic2.png'

const OurMission = () => {
  return (
    <section className="PPmission-vision-container">
      <div className="PPOurtext-column">
        <span className="PPsubtitle">Our Mission & Vision</span>
        
        <div className="PPcontent-block">
          <h2 className="PPtitle">Our Mission</h2>
          <p className="PPOurdescription">
            To help schools simplify daily operations through smart, accessible, 
            and easy-to-use digital management tools.
          </p>
        </div>

        <div className="PPcontent-block">
          <h2 className="PPtitle">Our Vision</h2>
          <p className="PPOurdescription">
            To become the trusted digital operating system for modern schools across Africa.
          </p>
        </div>
      </div>

      <img src={AboutUsPic2} alt="" className='PPAboutUsPic2'/>
    </section>
  );
};

export default OurMission;