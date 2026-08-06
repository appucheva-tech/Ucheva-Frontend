import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../../global/userSlice";
import { persistor } from "../../../../global/store";
import { apiClient } from "../../../../config/AxiosInstance";
import "./LayoutStyles/SubjectTeacherHeader.css";
import { IoNotifications } from "react-icons/io5";

const SubjectTeacherHeader = ({ toggleSidebar, isSidebarOpen }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const staff = useSelector((state) => state.user?.user);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dateString = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Update profile image whenever staff changes
  useEffect(() => {
    console.log("Staff changed in Header:", staff);

    if (staff) {
      // PRIORITIZE profileImage - it has the newly uploaded image
      // staffProfileUrl might have the old image
      const image =
        staff?.profileImage || // NEW: This has the updated image
        staff?.staffProfileUrl || // OLD: This might have the old image
        staff?.profilePicture ||
        staff?.profileUrl ||
        null;

      console.log("Profile image found:", image);
      setProfileImage(image);
    }
  }, [staff]);

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

  // Capitalize first letter of each word
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get only the first letter of the first name (capitalized)
  const getUserInitial = () => {
    if (!staff) return "?";
    const firstName = staff.firstName || "";
    return firstName.charAt(0).toUpperCase();
  };

  // Get full name with proper capitalization
  const getFullName = () => {
    if (!staff) return "Loading...";
    const firstName = staff.firstName || "";
    const lastName = staff.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();
    return capitalizeWords(fullName);
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
            <button
              onClick={() => nav("/subjectteacherdashboard/announcement")}
              className="SubjectTeacherHeader-notification-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M14 26.2493C15.933 26.2493 17.5 24.6823 17.5 22.7493C17.5 22.6755 17.4977 22.6022 17.4932 22.5294C17.4801 22.318 17.2975 22.1643 17.0857 22.1619L10.9283 22.092C10.7165 22.0896 10.5305 22.2392 10.5126 22.4503C10.5043 22.5488 10.5 22.6486 10.5 22.7493C10.5 24.6823 12.067 26.2493 14 26.2493Z"
                  fill="#03173C"
                />
                <path
                  d="M5.83398 10.5C5.83398 5.98968 9.49032 1.75 14.0007 1.75C18.511 1.75 22.1673 5.98968 22.1673 10.5V13.3708C22.1673 14.8841 22.8145 16.3253 23.9456 17.3307C25.1593 18.4095 24.3962 20.4167 22.7723 20.4167H5.22904C3.60513 20.4167 2.84201 18.4095 4.05574 17.3307C5.18683 16.3253 5.83398 14.8841 5.83398 13.3708V10.5Z"
                  fill="#03173C"
                />
              </svg>
            </button>

            <div
              className="SubjectTeacherHeader-profile-section"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="SubjectTeacherHeader-profile-avatar">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={`${staff?.firstName ?? "User"}'s avatar`}
                  />
                ) : (
                  <div className="SubjectTeacherHeader-avatar-placeholder">
                    {getUserInitial()}
                  </div>
                )}
              </div>

              <div className="SubjectTeacherHeader-profile-info">
                <p className="SubjectTeacherHeader-text-profile-name">
                  {getFullName()}
                </p>

                <p className="SubjectTeacherHeader-text-profile-role">
                  {staff?.role || "Subject Teacher"}
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
        <div
          className="logout-modal-overlay"
          onClick={() => !isLoggingOut && setShowLogoutModal(false)}
        >
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal-icon">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <h2 className="logout-modal-title">Logout</h2>
            <p className="logout-modal-message">
              Are you sure you want to logout?
            </p>
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
