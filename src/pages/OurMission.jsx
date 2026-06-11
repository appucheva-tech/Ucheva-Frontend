import React from 'react';
import './OurMission.css';
import AboutUsPic2 from '../assets/AboutUsPic2.png'


const OurMission = () => {
  return (
    <section className="mission-vision-container">
      <div className="Ourtext-column">
        <span className="subtitle">Our Mission & Vision</span>
        
        <div className="content-block">
          <h2 className="title">Our Mission</h2>
          <p className="Ourdescription">
            To help schools simplify daily operations through smart, accessible, 
            and easy-to-use digital management tools.
          </p>
        </div>

        <div className="content-block">
          <h2 className="title">Our Vision</h2>
          <p className="Ourdescription">
            To become the trusted digital operating system for modern schools across Africa.
          </p>
        </div>
      </div>

      <img src={AboutUsPic2} alt="" className='AboutUsPic2'/>
    </section>
  );
};

export default OurMission;
