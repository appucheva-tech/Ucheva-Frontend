import React from 'react';
import './OurMission.css';


const OurMission = () => {
  return (
    <section className="mission-vision-container">
      <div className="text-column">
        <span className="subtitle">Our Mission & Vision</span>
        
        <div className="content-block">
          <h2 className="title">Our Mission</h2>
          <p className="description">
            To help schools simplify daily operations through smart, accessible, 
            and easy-to-use digital management tools.
          </p>
        </div>

        <div className="content-block">
          <h2 className="title">Our Vision</h2>
          <p className="description">
            To become the trusted digital operating system for modern schools across Africa.
          </p>
        </div>
      </div>

      <div className="image-column">
        <div className="grid-layout">
          
        </div>
      </div>
    </section>
  );
};

export default OurMission;
