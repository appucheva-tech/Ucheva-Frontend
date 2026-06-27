import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { clearUser } from "../../global/userSlice";
import { persistor } from "../../global/store";
import { apiClient } from "../../config/AxiosInstance";
import "./AdminHeader.css";

const AdminHeader = ({ setSidebarOpen }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  const user = useSelector((state) => state.user.user);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const fullName =
    user?.adminFirstName && user?.adminLastName
      ? `${user.adminFirstName} ${user.adminLastName}`
      : "Admin";
  const adminName = fullName;
  const role = user?.role || "Admin";
  const profileInitial = fullName.charAt(0).toUpperCase();

  const currentSession = user?.academicSession || "No Session";
  const currentTerm = user?.term || "No Term";

<<<<<<< HEAD
=======
  // // Dynamic values from your Redux state
  // const adminName = user?.schoolName || "Admin"; // Using schoolName as the display name
  // const role = user?.role || "Admin";
  // const profileInitial = adminName.charAt(0).toUpperCase();

  // // Assuming these are fetched from your settings or global state
  // const currentSession = "2025/2026 Session";
  // const currentTerm = "Third Term";

>>>>>>> 9b88fc74a336f52646724175afd5a02fbd67b80e
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      nav("/");
    }
  };

  return (
    <>
      <header className="AdminHdr-header">
        <button
          className="AdminHdr-hamburger"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="AdminHdr-search-container">
          <input
            type="text"
            placeholder="Search staff by name, role..."
            className="AdminHdr-search-input"
          />
          <button className="AdminHdr-search-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <div className="AdminHdr-right-group">
          <div className="AdminHdr-meta-container">
            <div className="AdminHdr-meta-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <span>|</span>
            <div className="AdminHdr-meta-item">{currentSession} ▾</div>
            <span>|</span>
            <div className="AdminHdr-meta-item">{currentTerm} ▾</div>
          </div>

          <div
            className="AdminHdr-profile-wrapper"
            ref={dropdownRef}
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div className="AdminHdr-user-info">
              <span className="AdminHdr-user-name">{adminName}</span>
              <span className="AdminHdr-user-role">{role}</span>
            </div>

            <div className="AdminHdr-avatar">
              {/* Avatar logic: Use HiOutlineBuildingOffice2 if no profile image */}
              <div className="AdminHdr-avatar-inner">{profileInitial}</div>
            </div>

            {isProfileDropdownOpen && (
              <div className="AdminHdr-dropdown-menu">
                <button
                  className="AdminHdr-dropdown-item"
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    nav("/admin/settings");
                  }}
                >
                  Settings
                </button>
                <button
                  className="AdminHdr-dropdown-item"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Modal remains as you had it */}
      {showLogoutModal && (
        <div
          className="AdminHdr-modal-overlay"
          onClick={() => !isLoggingOut && setShowLogoutModal(false)}
        >
          <div className="AdminHdr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="AdminHdr-modal-icon">⚠️</div>
            <div className="AdminHdr-modal-title">Confirm Logout</div>
            <div className="AdminHdr-modal-message">
              Are you sure you want to log out of your admin account?
            </div>
            <div className="AdminHdr-modal-actions">
              <button
                className="AdminHdr-modal-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="AdminHdr-modal-confirm"
                onClick={handleLogoutConfirm}
                disabled={isLoggingOut}
              >
                {isLoggingOut && <span className="AdminHdr-spinner"></span>}
                {isLoggingOut ? "Logging out..." : "Yes, Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
