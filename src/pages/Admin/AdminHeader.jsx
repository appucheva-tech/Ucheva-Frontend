import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const AdminHeader = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const popupRef = useRef(null);

  const user = useSelector((state) => state.user.user);

  // Fallback metadata matching your interface layout
  const academicSession = {
    dateString: "Monday, 18 May 2026",
    currentSession: "2025/2026 Session",
    currentTerm: "Third Term",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="BAdminDashboard-header">
      {/* Left Side: Search Input Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search students, staff, classes, etc..."
          className="search-input"
        />
        <button className="search-button" aria-label="Search">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {/* Right Side Wrapper: Forces everything else to align nicely on the right */}
      <div className="header-right-group">
        {/* Metadata Info (Now positioned on the right side) */}
        <div className="meta-container">
          <div className="date-display">
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
            <span>{academicSession.dateString}</span>
          </div>

          {/* <div className="divider"></div>

          <div className="dropdown">
            <span>{academicSession.currentSession}</span>
            <svg
              className="chevron-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div> */}
          {/* 
          <div className="divider"></div>

          <div className="dropdown">
            <span>{academicSession.currentTerm}</span>
            <svg
              className="chevron-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div> */}
        </div>

        {/* Profile & Alert Triggers */}
        <div className="profile-container">
          <div className="notification-wrapper" ref={popupRef}>
            <button
              className="notification-button"
              aria-label="Notifications"
              onClick={(e) => {
                e.stopPropagation();
                setIsNotifOpen(!isNotifOpen);
              }}
            >
              <svg
                className="bell-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-badge"></span>
            </button>

            {isNotifOpen && (
              <div className="notification-popup">
                <div className="popup-header">
                  <h2>Notifications</h2>
                  <button
                    className="close-btn"
                    onClick={() => setIsNotifOpen(false)}
                  >
                    &times;
                  </button>
                </div>
                <div className="notification-list">
                  <div className="notification-item unread">
                    <div className="notification-content">
                      <h3>System Update</h3>
                      <p>Welcome to your workspace dashboard panel.</p>
                      <span className="time-stamp">Just now</span>
                    </div>
                    <span className="unread-dot"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic profile section rendering from Redux state details */}
          <div className="user-profile unique-school-avatar">
            <HiOutlineBuildingOffice2 className="school-avatar-fallback-icon" />
          </div>

          <div className="Auser-info">
            <span className="user-name">
              {user?.schoolName
                ? user.schoolName.charAt(0).toUpperCase() +
                  user.schoolName.slice(1)
                : "Curve Academy"}
            </span>
            <span className="user-role">
              {user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : "Admin"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;