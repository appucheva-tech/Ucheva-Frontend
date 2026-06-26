import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Manage.css';
import FreeLady from '../assets/FreeLady.png'

const CTASection = () => {
  const nav = useNavigate(); 
  return (
    <section className="SScta-banner">
      <div className="SScta-content-wrapper">
        <div className="SScta-image-side">
          <img 
            src={FreeLady} 
            alt="Customer Support Representative" 
            className="SScta-avatar" 
          />
        </div>
        
        <div className="SScta-text-side">
          <h2 className="SScta-heading">Manage Your School with Ease</h2>
          <p className="SScta-subheading">
            Our team is here to help you get set up fast and start managing your school.
          </p>
          <button className="SScta-button" type="button" onClick={() => nav ('./signup')}>
            Start Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;