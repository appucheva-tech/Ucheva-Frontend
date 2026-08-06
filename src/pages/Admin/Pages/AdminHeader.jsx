import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../global/userSlice";
import { persistor } from "../../../global/store";
import { apiClient } from "../../../config/AxiosInstance";
import "./AdminHeader.css";

const AdminHeader = ({ setSidebarOpen }) => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  const user = useSelector((state) => state.user.user);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const fullName =
    adminProfile?.adminFirstName && adminProfile?.adminLastName
      ? `${adminProfile.adminFirstName} ${adminProfile.adminLastName}`
      : user?.adminFirstName && user?.adminLastName
        ? `${user.adminFirstName} ${user.adminLastName}`
        : "Admin";

  const adminName = fullName;
  const role = user?.role || "Admin";
  const profileInitial = fullName.charAt(0).toUpperCase();

  const currentSession =
    adminProfile?.academicSession ||
    user?.academicSession ||
    new Date().getFullYear() ||
    "No Session";
  const currentTerm = adminProfile?.term || user?.term || "No Term";

  const profileImage =
    adminProfile?.adminUrl || adminProfile?.schoolLogoUrl || null;

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

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await apiClient("/admin/profile");
        setAdminProfile(res.data?.adminProfile);
      } catch (error) {
        console.error(
          "Error fetching admin profile:",
          error?.response?.data?.message || error.message,
        );
      }
    };
    fetchAdminProfile();
  }, []);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <header className="AdminHdr-header">
        {/* Top row: Hamburger | Meta (date, session, term) | Profile */}
        <div className="AdminHdr-top-row">
          <button
            className="AdminHdr-hamburger"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
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

          <div className="AdminHdr-meta-container">
            <span className="AdminHdr-meta-item AdminHdr-date">{today}</span>
            <span className="AdminHdr-meta-item AdminHdr-session">{currentSession}</span>
            <span className="AdminHdr-meta-item AdminHdr-term">{currentTerm}</span>
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
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={adminName}
                  className="AdminHdr-avatar-image"
                />
              ) : (
                <div className="AdminHdr-avatar-inner">{profileInitial}</div>
              )}
            </div>
            {isProfileDropdownOpen && (
              <div className="AdminHdr-dropdown-menu">
                <button
                  className="AdminHdr-dropdown-item"
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    nav("/admin/AdminSettings");
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

        {/* Row 2: Search bar (full width) */}
        <div className="AdminHdr-search-container">
          <input
            type="text"
            placeholder="Search students, staff, classes, etc..."
            className="AdminHdr-search-input"
          />
          <button className="AdminHdr-search-button" aria-label="Search">
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
      </header>

      {/* Logout Modal – unchanged */}
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