import React from 'react';
import './NotSure.css';

const NotSure = () => {
  return (
    <div className='NotSureWrapper'>
    <div className="banner-containerz">
      <div className="banner-content">
        <h2 className="banner-title">Not sure which plan fits your school?</h2>
        <p className="banner-subtitle">
          Explore flexible plans designed to grow with your school.
        </p>
        <button className="banner-buttons" onClick={() => window.location.href = '#contact'}>
          Contact Us
        </button>
      </div>
    </div>
    </div>
  );
};

export default NotSure;
