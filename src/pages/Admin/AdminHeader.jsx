
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { apiClient } from "../../config/AxiosInstance";
import { clearUser } from "../../global/userSlice";
import { persistor } from "../../global/store";

import "./AdminHeader.css";

const AdminHeader = ({ setSidebarOpen }) => {
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
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
      }
    };

    fetchAdminProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setIsNotifOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);

    try {
      await apiClient.post("/admin/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(clearUser());
      await persistor.purge();

      nav("/login", { replace: true });
    }
  };

  return (
    <header className="AdministrationHeader-BAdminDashboard-header">
      {/* Mobile Menu */}
      <IoMdMenu
        className="AdministrationHeader-AdminMenuBtn"
        onClick={() => setSidebarOpen(true)}
      />

      {/* Search */}
      <div className="AdministrationHeader-search-container">
        <input
          type="text"
          placeholder="Search students, staff, classes, etc..."
          className="AdministrationHeader-search-input"
        />

        <button
          className="AdministrationHeader-search-button"
          aria-label="Search"
        >
          <svg
            className="AdministrationHeader-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
            />
          </svg>
        </button>
      </div>

      {/* Right Side */}
      <div className="AdministrationHeader-header-right-group">
        {/* Date Icon */}
        <div className="AdministrationHeader-meta-container">
          <div className="AdministrationHeader-date-display">
            <svg
              className="AdministrationHeader-calendar-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                ry="2"
              />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </div>

        {/* Notification */}
        <div
          className="AdministrationHeader-notification-wrapper"
          ref={popupRef}
        >
          <button
            className="AdministrationHeader-notification-button"
            aria-label="Notifications"
            onClick={(e) => {
              e.stopPropagation();
              setIsNotifOpen((prev) => !prev);
            }}
          >
            <svg
              className="AdministrationHeader-bell-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>

            <span className="AdministrationHeader-notification-badge" />
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

                    <p>
                      Welcome to your workspace dashboard
                      panel.
                    </p>

                    <span className="AdministrationHeader-time-stamp">
                      Just now
                    </span>
                  </div>

                  <span className="AdministrationHeader-unread-dot" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div
          className="profile-section-wrapper"
          ref={profileRef}
        >
          <div
            className="user-profile unique-school-avatar"
            onClick={() =>
              setIsProfileDropdownOpen((prev) => !prev)
            }
            style={{ cursor: "pointer" }}
          >
            <HiOutlineBuildingOffice2 className="school-avatar-fallback-icon" />
          </div>

          <div className="AdministrationHeader-Auser-info">
            <span className="AdministrationHeader-user-name">
              {user?.schoolName || "Curve Academy"}
            </span>

            <span className="AdministrationHeader-user-role">
              {user?.role || "Admin"}
            </span>
          </div>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown-menu">
              <div className="profile-dropdown-header">
                <strong>
                  {adminFirstName} {adminLastName}
                </strong>
              </div>

              <button
                className="profile-dropdown-item"
                onClick={() => {
                  setShowLogoutModal(true);
                  setIsProfileDropdownOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div
          className="logout-modal-overlay"
          onClick={() =>
            !isLoggingOut &&
            setShowLogoutModal(false)
          }
        >
          <div
            className="logout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="logout-modal-icon">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line
                  x1="21"
                  y1="12"
                  x2="9"
                  y2="12"
                />
              </svg>
            </div>

            <h2 className="logout-modal-title">
              Logout
            </h2>

            <p className="logout-modal-message">
              Are you sure you want to logout?
            </p>

            <div className="logout-modal-actions">
              <button
                className="logout-modal-cancel"
                disabled={isLoggingOut}
                onClick={() =>
                  setShowLogoutModal(false)
                }
              >
                Cancel
              </button>

              <button
                className={`logout-modal-confirm${
                  isLoggingOut ? " loading" : ""
                }`}
                disabled={isLoggingOut}
                onClick={handleLogoutConfirm}
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
    </header>
  );
};

export default AdminHeader;
