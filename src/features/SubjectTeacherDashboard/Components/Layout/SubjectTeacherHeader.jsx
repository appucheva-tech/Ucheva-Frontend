import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../../global/userSlice";
import { persistor } from "../../../../global/store";
import { apiClient } from "../../../../config/AxiosInstance";
import "./LayoutStyles/SubjectTeacherHeader.css";

// const SubjectTeacherHeader = ({ toggleSidebar, isSidebarOpen }) => {
//   const nav = useNavigate();
//   const dispatch = useDispatch();
//   const staff = useSelector((state) => state.user?.user);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
// import React from "react";
// import { useSelector } from "react-redux";
// import "./LayoutStyles/SubjectTeacherHeader.css";
// }
const SubjectTeacherHeader = ({ toggleSidebar, isSidebarOpen }) => {
  const staff = useSelector((state) => state.user?.user);

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dateString = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await apiClient.post("/subjectteacher/logout");
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
      <header className="SubjectTeacherHeader-teacher-header nunito-content">
        <div className="SubjectTeacherHeader-header-left">
          <button
            className={`SubjectTeacherHeader-menu-toggle ${
              isSidebarOpen ? "open" : ""
            }`}
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        <div className="SubjectTeacherHeader-header-right-items">
          <div className="SubjectTeacherHeader-date-wrapper">
            <svg
              className="SubjectTeacherHeader-calendar-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2"></rect>
              <path d="M16 2v4"></path>
              <path d="M8 2v4"></path>
              <path d="M3 10h18"></path>
            </svg>
            <span className="SubjectTeacherHeader-date-text">
              {dayName}, {dateString}
            </span>
          </div>

          <div className="SubjectTeacherHeader-session-wrapper">
            <span className="SubjectTeacherHeader-text-session">
              2025/2026 Session
            </span>
            <span className="SubjectTeacherHeader-text-term">Third Term</span>
          </div>

          <div className="SubjectTeacherHeader-profile-combined">
            <button className="SubjectTeacherHeader-notification-btn">
              {/* Bell SVG */}
            </button>

            <div
              className="SubjectTeacherHeader-profile-section"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="SubjectTeacherHeader-profile-avatar">
                <img
                  src={
                    staff?.profileImage ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
                  }
                  alt={`${staff?.firstName ?? "User"}'s avatar`}
                />
              </div>

              <div className="SubjectTeacherHeader-profile-info">
                <p className="SubjectTeacherHeader-text-profile-name">
                  {staff ? `${staff.firstName}` : "Loading..."}
                </p>

                <p className="SubjectTeacherHeader-text-profile-role">
                  {staff?.role}
                </p>
              </div>
            </div>

            {isProfileDropdownOpen && (
              <div className="SubjectTeacherHeader-profile-dropdown">
                <p onClick={() => setIsProfileDropdownOpen(false)}>Settings</p>
                <p
                  className="SubjectTeacherHeader-logout-item"
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
  );
};

export default SubjectTeacherHeader;