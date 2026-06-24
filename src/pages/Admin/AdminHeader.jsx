import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { apiClient } from "../../config/AxiosInstance";
import { clearUser } from "../../global/userSlice";
import { persistor } from "../../global/store";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const popupRef = useRef(null);
  const profileRef = useRef(null);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await apiClient.get("/admin/profile");
        const profile = res.data?.adminProfile;
        if (profile) {
          setAdminFirstName(profile.adminFirstName || "");
          setAdminLastName(profile.adminLastName || "");
        }
      } catch {
        // silently fail
      }
    };
    fetchAdminProfile();
  }, []);

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await apiClient.post("/admin/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(clearUser());
      await persistor.purge();
      nav("/login");
    }
  };

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
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <header className="BAdminDashboard-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search students, staff, classes, etc..."
            className="search-input"
          />
          <button className="search-button" aria-label="Search">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <div className="header-right-group">
          <div className="meta-container">
            <div className="date-display">
              <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{academicSession.dateString}</span>
            </div>
          </div>

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
                <svg className="bell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span className="notification-badge"></span>
              </button>

              {isNotifOpen && (
                <div className="notification-popup">
                  <div className="popup-header">
                    <h2>Notifications</h2>
                    <button className="close-btn" onClick={() => setIsNotifOpen(false)}>
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

            {/* Clickable avatar with dropdown */}
            <div className="profile-section-wrapper" ref={profileRef}>
              <div
                className="user-profile unique-school-avatar"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                style={{ cursor: "pointer" }}
              >
                <HiOutlineBuildingOffice2 className="school-avatar-fallback-icon" />
              </div>

              {isProfileDropdownOpen && (
                <div className="profile-dropdown-menu">
                  <p
                    className="logout"
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

            <div className="Auser-info">
              <span className="user-name">
                {adminFirstName
                  ? `${adminFirstName} ${adminLastName}`.trim()
                  : user?.schoolName || ""}
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

export default AdminHeader;