import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    const steps = [
    {
      id: 1,
      title: "1. Create School Account",
      description: "Sign up with your school details. Set up your school profile, classes, and academic calendar.",
      imageClass: "image-step-1"
    },
    {
      id: 2,
      title: "2. Add Students & Staff",
      description: "Import or manually add students and staff profiles. Assign them to classes, roles, and payment plans.",
      imageClass: "image-step-2"
    },
    {
      id: 3,
      title: "3. Manage Operations Easily",
      description: "Track attendance daily, collect fees, send parent alerts, and monitor everything from your dashboard.",
      imageClass: "image-step-3"
    }
  ];

  return (
    <>
    <div className="how-it-works-container">
      <span className="section-tag">How It Works</span>
      <h2 className="section-title">Up and Running In Three Simple Steps</h2>
      <p className="section-description">
        Get started in minutes with a simple process designed to
        help schools manage operations more efficiently.
      </p>
    </div>
    <div className="steps-container">
      {steps.map((step) => (
        <div key={step.id} className="step-card">
          <div className={`step-image-holder ${step.imageClass}`}>
            {/* Minimal UI representations mimicking the vector illustrations */}
            {step.id === 1 && (
              <div className="mock-ui-1">
                <div className="mock-bubble">
                  <div className="line long"></div>
                  <div className="line short"></div>
                </div>
                <div className="mock-btn">
                  <span className="icon-user">👤</span>
                  <span>Create Account</span>
                </div>
              </div>
            )}
            {step.id === 2 && (
              <div className="mock-ui-2">
                <div className="mock-bubble-top">
                  <div className="line long"></div>
                  <div className="avatar-line">
                    <div className="avatar"></div>
                    <div className="line short"></div>
                  </div>
                </div>
                <div className="mock-bubble-bottom">
                  <div className="plus-btn">+</div>
                  <div className="line medium"></div>
                </div>
              </div>
            )}
            {step.id === 3 && (
              <div className="mock-ui-3">
                <div className="chart-card">
                  <div className="badge">⚙️</div>
                  <div className="bar bar-1"></div>
                  <div className="bar bar-2"></div>
                  <div className="bar bar-3"></div>
                  <div className="bar bar-4"></div>
                </div>
              </div>
            )}
          </div>
          <h3 className="step-title">{step.title}</h3>
          <p className="step-desc">{step.description}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default HowItWorks;
