import React from 'react';
import './Manage.css';
import FreeLady from '../assets/FreeLady.png'

const CTASection = () => {
  return (
    <section className="cta-banner">
      <div className="cta-content-wrapper">
        <div className="cta-image-side">
          <img 
            src={FreeLady} 
            alt="Customer Support Representative" 
            className="cta-avatar" 
          />
        </div>
        
        <div className="cta-text-side">
          <h2 className="cta-heading">Manage Your School with Ease</h2>
          <p className="cta-subheading">
            Our team is here to help you get set up fast and start managing your school.
          </p>
          <button className="cta-button" type="button">
            Start Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
