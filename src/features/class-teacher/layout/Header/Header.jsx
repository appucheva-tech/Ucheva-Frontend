import React, { useState } from "react";
import { FiCalendar, FiChevronDown, FiMenu } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import "./Header.css";

const Header = ({ setSidebarOpen }) => {
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [isTermDropdownOpen, setIsTermDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const formatDate = () => {
    const today = new Date();
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
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
    <header className="ct-header">
      {/* LEFT CONTENT BLOCK: Clean Menu Toggle & Date */}
      <div className="ct-header-left">
        <button
          className="ct-header-mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open Sidebar Navigation"
        >
          <FiMenu />
        </button>

        <div className="ct-date-section">
          <FiCalendar />
          <span>{formatDate()}</span>
        </div>
      </div>

      {/* RIGHT CONTENT BLOCK: Dropdowns, Notifications & Profile Card */}
      <div className="ct-header-right">
        {/* Session Dropdown */}
        <div className="ct-dropdown-section">
          <button
            className="ct-dropdown-button"
            onClick={() => {
              setIsSessionDropdownOpen(!isSessionDropdownOpen);
              setIsTermDropdownOpen(false);
              setIsProfileDropdownOpen(false);
            }}
          >
            2026/2027 Session
            <FiChevronDown
              className={isSessionDropdownOpen ? "rotate-icon" : ""}
            />
          </button>
          {isSessionDropdownOpen && (
            <div className="ct-dropdown-menu">
              {sessions.map((session, index) => (
                <p key={index} onClick={() => setIsSessionDropdownOpen(false)}>
                  {session}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Term Dropdown */}
        <div className="ct-dropdown-section">
          <button
            className="ct-dropdown-button"
            onClick={() => {
              setIsTermDropdownOpen(!isTermDropdownOpen);
              setIsSessionDropdownOpen(false);
              setIsProfileDropdownOpen(false);
            }}
          >
            Third Term
            <FiChevronDown
              className={isTermDropdownOpen ? "rotate-icon" : ""}
            />
          </button>
          {isTermDropdownOpen && (
            <div className="ct-dropdown-menu">
              {terms.map((term, index) => (
                <p key={index} onClick={() => setIsTermDropdownOpen(false)}>
                  {term}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon Button */}
        <div
          className="ct-notification-section"
          aria-label="Notifications Picker"
        >
          <IoNotifications />
          <span className="ct-notification-badge" />
        </div>

        {/* User Account Profile Node */}
        <div className="ct-profile-section-wrapper">
          <div
            className="ct-profile-section"
            onClick={() => {
              setIsProfileDropdownOpen(!isProfileDropdownOpen);
              setIsSessionDropdownOpen(false);
              setIsTermDropdownOpen(false);
            }}
          >
            <img
              src="https://i.postimg.cc/8cXMb41Q/Ucheva-profile.jpg"
              alt="Profile avatar"
              className="ct-user-profile"
            />
            <div className="ct-user-info">
              <span className="ct-user-name">Kareem Habeeb</span>
              <span className="ct-user-role">Class Teacher</span>
            </div>
          </div>
          {isProfileDropdownOpen && (
            <div className="ct-profile-dropdown-menu">
              <p onClick={() => setIsProfileDropdownOpen(false)}>Settings</p>
              <p
                className="ct-logout-item"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
