import React from "react";
import "../styles/onboarding.css";

const OnboardingSuccess = ({ onGetStarted }) => {
  return (
    <div className="onboarding-success-wrapper">
      <div className="success-circle-badge">
        <div className="success-check-circle">✓</div>
      </div>
      <h1 className="success-title">Setup Complete!</h1>
      <p className="success-description">
        You're all set! Your school has been successfully configured.
      </p>
      <button type="button" onClick={onGetStarted} className="get-started-btn">
        Get Started
      </button>
    </div>
  );
};

export default OnboardingSuccess;
