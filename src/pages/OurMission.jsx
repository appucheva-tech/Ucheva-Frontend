import React from 'react';
import './OurMission.css';

// Replace these placeholders with your actual asset paths
// import mainPersonImage from './assets/person.jpg'; 
// import targetIcon from './assets/target-icon.svg';
// import lightbulbIcon from './assets/lightbulb-icon.svg';

const OurMission = () => {
  return (
    <section className="mission-vision-container">
      {/* Left Column: Text Content */}
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

      {/* Right Column: Visual Grid */}
      <div className="image-column">
        <div className="grid-layout">
          {/* Top Left: Target Icon Card */}
          <div className="icon-card target-card">
            {/* <img src={targetIcon} alt="Target Icon" className="grid-icon" /> */}
          </div>

          {/* Main Content: Person holding laptop overlapping the grid */}
          <div className="main-image-wrapper">
            {/* <img src={mainPersonImage} alt="Professional holding laptop" className="person-image" /> */}
          </div>

          {/* Bottom Right: Lightbulb Icon Card */}
          <div className="icon-card lightbulb-card">
            {/* <img src={lightbulbIcon} alt="Lightbulb Icon" className="grid-icon" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
