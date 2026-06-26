import React from 'react';
import './OurValues.css';

const ValuesSection = () => {
  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Simplicity',
      description: 'We believe school management should be easy, organized, and stress-free for everyone.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Reliability',
      description: 'We build tools schools can depend on every day for smooth and consistent operations.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8" strokeLinecap="round"/>
          <path d="M8 12h8" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Accessibility',
      description: 'We create solutions that are simple to use and accessible for schools of all sizes.'
    }
  ];

  return (
    <section className="QQvalues-container">
      <div className="QQvalues-header">
        <span className="QQvalues-subtitle">Our Values</span>
        <h2 className="QQvalues-title">What We Stand For</h2>
        <p className="QQvalues-intro">The principles that guide every decision we make.</p>
      </div>
      
      <div className="QQvalues-grid">
        {values.map((value, index) => (
          <div key={index} className="QQvalue-card">
            <div className="QQvalue-icon-wrapper">
              {value.icon}
            </div>
            <h3 className="QQvalue-card-title">{value.title}</h3>
            <p className="QQvalue-card-description">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValuesSection;