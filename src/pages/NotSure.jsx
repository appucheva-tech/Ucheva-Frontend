import React from 'react';
import './NotSure.css';

const NotSure = () => {
  return (
    <div className="banner-container">
      <div className="banner-content">
        <h2 className="banner-title">Not sure which plan fits your school?</h2>
        <p className="banner-subtitle">
          Explore flexible plans designed to grow with your school.
        </p>
        <button className="banner-button" onClick={() => window.location.href = '#contact'}>
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default NotSure;
