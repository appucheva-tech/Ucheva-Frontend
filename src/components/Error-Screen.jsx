import React from "react";
import "../styles/error-screen.css";

const ErrorScreen = ({
  title = "Dashboard Sync Failed",
  message = "We couldn't refresh your school dashboard records. Check your internet connection or try re-authenticating.",
  onRetry,
}) => {
  return (
    <div className="portal-error-wrapper">
      <div className="portal-error-card">
        {/* Animated Double Ring Institutional Shield */}
        <div className="portal-error-badge-container">
          <div className="portal-error-badge-glow"></div>
          <div className="portal-error-badge-ring">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c4ab23" /* Pure School Gold */
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        </div>

        {/* Crisp Text Architecture */}
        <div className="portal-error-content">
          <h3 className="portal-error-title">{title}</h3>
          <p className="portal-error-message">{message}</p>
        </div>

        {/* Premium Compact Action Button */}
        {onRetry && (
          <button onClick={onRetry} className="portal-error-action-btn">
            <span>Sync Records</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorScreen;
