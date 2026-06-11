import React, { useState } from "react";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import "./BursaryHeader.css";

const BursaryHeader = ({ setSidebarOpen }) => {
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [isTermDropdownOpen, setIsTermDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const formatDate = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return today.toLocaleDateString("en-US", options);
  };

  const sessions = [
    "2024/2025 Session",
    "2025/2026 Session",
    "2026/2027 Session",
  ];
  const terms = ["First Term", "Second Term", "Third Term"];

  return (
    <header className="br-header">
      {/* Date Section */}
      <div className="br-date-section">
        <FiCalendar />
        <span>{formatDate()}</span>
      </div>

      {/* Session Dropdown */}
      <div className="br-dropdown-section">
        <button
          className="br-dropdown-button"
          onClick={() => setIsSessionDropdownOpen(!isSessionDropdownOpen)}
        >
          2026/2027 Session
          <FiChevronDown />
        </button>
        {isSessionDropdownOpen && (
          <div className="br-dropdown-menu">
            {sessions.map((session, index) => (
              <p key={index}>{session}</p>
            ))}
          </div>
        )}
      </div>

      {/* Term Dropdown */}
      <div className="br-dropdown-section">
        <button
          className="br-dropdown-button"
          onClick={() => setIsTermDropdownOpen(!isTermDropdownOpen)}
        >
          Third Term
          <FiChevronDown />
        </button>
        {isTermDropdownOpen && (
          <div className="br-dropdown-menu">
            {terms.map((term, index) => (
              <p key={index}>{term}</p>
            ))}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="br-notification-section">
        <IoNotifications />
      </div>

      {/* Profile Section */}
      <div className="br-profile-section-wrapper">
        <div
          className="br-profile-section"
          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
        >
          <img
            src="https://i.postimg.cc/8cXMb41Q/Ucheva-profile.jpg"
            alt="Profile"
            className="br-user-profile"
          />
          <div className="br-user-info">
            <div className="br-user-name">Kareem Habeeb</div>
            <div className="br-user-role">Bursary</div>
          </div>
        </div>
        {isProfileDropdownOpen && (
          <div className="br-profile-dropdown-menu">
            <p>Settings</p>
            <p>Logout</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default BursaryHeader;
