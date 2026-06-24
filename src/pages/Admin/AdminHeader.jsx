import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import "./AdminHeader.css";

const AdminHeader = ({ setSidebarOpen }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const popupRef = useRef(null);

  const user = useSelector((state) => state.user.user);

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
    <header className="AdministrationHeader-BAdminDashboard-header">
      <IoMdMenu
        className="AdministrationHeader-AdminMenuBtn"
        onClick={() => setSidebarOpen(true)}
      />
      <div className="AdministrationHeader-search-container">
        <input
          type="text"
          placeholder="Search students, staff, classes, etc..."
          className="AdministrationHeader-search-input"
        />
        <button className="AdministrationHeader-search-button" aria-label="Search">
          <svg
            className="AdministrationHeader-search-icon"
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

      {/* Right Side Wrapper */}
      <div className="AdministrationHeader-header-right-group">
        <div className="AdministrationHeader-meta-container">
          <div className="AdministrationHeader-date-display">
            <svg
              className="AdministrationHeader-calendar-icon"
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
        </div>

        {/* Profile & toast Triggers */}
        <div className="AdministrationHeader-profile-container">
          <div className="AdministrationHeader-notification-wrapper" ref={popupRef}>
            <button
              className="AdministrationHeader-notification-button"
              aria-label="Notifications"
              onClick={(e) => {
                e.stopPropagation();
                setIsNotifOpen(!isNotifOpen);
              }}
            >
              <svg
                className="AdministrationHeader-bell-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="AdministrationHeader-notification-badge"></span>
            </button>

            {isNotifOpen && (
              <div className="AdministrationHeader-notification-popup">
                <div className="AdministrationHeader-popup-header">
                  <h2>Notifications</h2>
                  <button
                    className="AdministrationHeader-close-btn"
                    onClick={() => setIsNotifOpen(false)}
                  >
                    &times;
                  </button>
                </div>
                <div className="AdministrationHeader-notification-list">
                  <div className="AdministrationHeader-notification-item AdministrationHeader-unread">
                    <div className="AdministrationHeader-notification-content">
                      <h3>System Update</h3>
                      <p>Welcome to your workspace dashboard panel.</p>
                      <span className="AdministrationHeader-time-stamp">Just now</span>
                    </div>
                    <span className="AdministrationHeader-unread-dot"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic profile section */}
          <div className="AdministrationHeader-user-profile AdministrationHeader-unique-school-avatar">
            <HiOutlineBuildingOffice2 className="AdministrationHeader-school-avatar-fallback-icon" />
          </div>

          <div className="AdministrationHeader-Auser-info">
            <span className="AdministrationHeader-user-name">
              {user?.schoolName
                ? user.schoolName.charAt(0).toUpperCase() +
                  user.schoolName.slice(1)
                : "Curve Academy"}
            </span>
            <span className="AdministrationHeader-user-role">
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