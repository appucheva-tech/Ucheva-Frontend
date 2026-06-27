import React, { useState } from "react";
import { FiCalendar, FiChevronDown, FiMenu } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../../global/userSlice";
import { persistor } from "../../../../global/store";
import { apiClient } from "../../../../config/AxiosInstance";
import "./Header.css";

const Header = ({ setSidebarOpen }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [isTermDropdownOpen, setIsTermDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
=======
import { useSelector } from "react-redux";
import "./Header.css";

const Header = ({ setSidebarOpen }) => {
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [isTermDropdownOpen, setIsTermDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
>>>>>>> 8b47e7baa1bf319a2a4dab9f1cb9fc2363a6bf85
  console.log("User from Redux:", user);

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

<<<<<<< HEAD
  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await apiClient.post("/classteacher/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(clearUser());
      await persistor.purge();
      nav("/");
    }
  };

  return (
    <>
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
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      setShowLogoutModal(true);
                    }}
                  >
                    Logout
                  </p>
                </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal-overlay" onClick={() => !isLoggingOut && setShowLogoutModal(false)}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <h2 className="logout-modal-title">Logout</h2>
            <p className="logout-modal-message">Are you sure you want to logout?</p>
            <div className="logout-modal-actions">
              <button
                className="logout-modal-cancel"
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                className={`logout-modal-confirm${isLoggingOut ? " loading" : ""}`}
                onClick={handleLogoutConfirm}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <span className="logout-spinner" />
                    Logging out...
                  </>
                ) : (
                  "Yes, Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
=======
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
>>>>>>> 8b47e7baa1bf319a2a4dab9f1cb9fc2363a6bf85
  );
};

export default Header;
