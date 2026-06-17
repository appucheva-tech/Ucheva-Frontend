import React from "react";
import "../styles/onboarding.css";
import { useNavigate } from "react-router-dom";

const OnboardingSuccess = ({ onGetStarted }) => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/admin/dashboard");
  };
  return (
    <div className="onboarding-success-wrapper">
      <div className="success-stepper-mesh animate-fade-in">
        <div className="success-stepper-node-row">
          <div className="success-track-line-active" />

          <div className="step-node-point">
            <div className="step-node-circle success-completed">✓</div>
            <span className="step-node-label success-completed">
              School Profile
            </span>
          </div>

          <div className="step-node-point">
            <div className="step-node-circle success-completed">✓</div>
            <span className="step-node-label success-completed">Classes</span>
          </div>

          <div className="step-node-point">
            <div className="step-node-circle success-completed">✓</div>
            <span className="step-node-label success-completed">
              Fee Structure
            </span>
          </div>
        </div>
      </div>

      {/* Main Big Centered Green Checkmark Badge with Pop Animation */}
      <div className="success-badge-container">
        <div className="success-circle-badge animate-pop-in">
          <div className="success-check-circle">
            <svg
              className="animated-checkmark-svg"
              width="54"
              height="54"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {/* Text Info and Action Button */}
      <h1
        className="success-title animate-slide-up"
        style={{ animationDelay: "0.4s" }}
      >
        Setup Complete!
      </h1>
      <p
        className="success-description animate-slide-up"
        style={{ animationDelay: "0.5s" }}
      >
        You're all set! Your school has been successfully configured.
      </p>

      <button
        type="button"
        onClick={onGetStarted}
        className="get-started-btn animate-slide-up"
        style={{ animationDelay: "0.6s" }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default OnboardingSuccess;