import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotSure.css';

const NotSure = () => {
  const nav = useNavigate();
  return (
    <div className='NNNotSureWrapper'>
    <div className="NNbanner-containerz">
      <div className="NNbanner-content">
        <h2 className="NNbanner-title">Not sure which plan fits your school?</h2>
        <p className="NNbanner-subtitle">
          Explore flexible plans designed to grow with your school.
        </p>
        <button className="NNbanner-buttons" onClick={() => nav ('./signup')}>
          Contact Us
        </button>
      </div>
    </div>
    </div>
  );
};

export default NotSure;