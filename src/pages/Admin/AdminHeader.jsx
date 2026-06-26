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

  const role = "Admin";
  const adminName = "Eric Ugochukwu";

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

        {/* Hamburger - mobile only */}
        <button
          className="AdminHdr-hamburger"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <div className="AdminHdr-right-group">
          <div className="AdminHdr-meta-container">
            <div className="AdminHdr-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Monday, 18 May 2026
            </div>
            <span>|</span>
            <div className="AdminHdr-meta-item">2025/2026 Session ▾</div>
            <span>|</span>
            <div className="AdminHdr-meta-item">Third Term ▾</div>
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
              <HiOutlineBuildingOffice2 size={20} />
            </div>

            {isProfileDropdownOpen && (
              <div className="AdminHdr-dropdown-menu">
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

      {showLogoutModal && (
        <div
          className="AdminHdr-modal-overlay"
          onClick={() => !isLoggingOut && setShowLogoutModal(false)}
        >
          <div className="AdminHdr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="AdminHdr-modal-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <h2 className="AdminHdr-modal-title">Logout</h2>
            <p className="AdminHdr-modal-message">Are you sure you want to logout?</p>
            <div className="AdminHdr-modal-actions">
              <button
                className="AdminHdr-modal-cancel"
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                className={`AdminHdr-modal-confirm${isLoggingOut ? " loading" : ""}`}
                onClick={handleLogoutConfirm}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <><span className="AdminHdr-spinner" /> Logging out...</>
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