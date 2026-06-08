import React from "react";
import "./LayoutStyles/SecurityHeader.css";

const SecurityHeader = () => {
  return (
    <header className="security-header">
      <div className="date-section">
        <svg
          className="calendar-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span className="date-text">Monday, 18 May 2026</span>
      </div>

      <button className="notification-button">
        <svg className="bell-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      </button>

      <div className="profile-section">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-06-08%20at%2001.19.58-Oiqgh9nJfGFrfHkzeDIrGzdlaTniyn.png"
          alt="Davis Okon profile"
          className="profile-avatar"
        />
        <div className="profile-info">
          <p className="profile-name">Davis Okon</p>
          <p className="profile-role">Security</p>
        </div>
      </div>
    </header>
  );
};

export default SecurityHeader;
