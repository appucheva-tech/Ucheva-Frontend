import React, { useState, useEffect, useRef } from "react";
import { FiCalendar, FiMenu } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../../global/userSlice";
import { persistor } from "../../../../global/store";
import { apiClient } from "../../../../config/AxiosInstance";
import "./Header.css";

const Header = ({ setSidebarOpen }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  // ── Redux user (fallback source) ──────────────────────────────
  const reduxUser = useSelector((state) => state.user.user);

  // ── Dropdown states ───────────────────────────────────────────
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // ── Refs for click outside ─────────────────────────────────────
  const profileDropdownRef = useRef(null);

  // ── Profile data from API ─────────────────────────────────────
  const [profilePic, setProfilePic] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [term, setTerm] = useState("");
  const [session, setSession] = useState("");

  // ── Fetch admin profile (same endpoint as AdminHeader) ────────
  const fetchAdminProfile = async () => {
    try {
      const res = await apiClient.get("/admin/profile");
      console.log("Admin Profile Response:", res.data);

      const adminProfile = res.data?.adminProfile;

      if (adminProfile) {
        // Map admin profile data
        const firstName = adminProfile.adminFirstName || "";
        const lastName = adminProfile.adminLastName || "";
        setDisplayName(
          `${firstName} ${lastName}`.trim() || reduxUser?.schoolName || "Admin",
        );

        setRole(adminProfile.role || "Class Teacher");
        setProfilePic(
          adminProfile.adminUrl ||
            adminProfile.schoolLogoUrl ||
            reduxUser?.profilePic ||
            null,
        );

        // ── Map session and term from admin profile ──
        // This will automatically update when admin changes it
        const year = new Date().getFullYear();
        const academicSession =
          adminProfile.academicSession || `${year}/${year + 1} Session`;
        setSession(academicSession);

        const currentTerm = adminProfile.term || "First Term";
        setTerm(currentTerm);
      } else {
        // Fallback to Redux data if adminProfile is not available
        const firstName = reduxUser?.firstName || "";
        const lastName = reduxUser?.lastName || "";
        setDisplayName(
          `${firstName} ${lastName}`.trim() || reduxUser?.schoolName || "User",
        );
        setRole(reduxUser?.role || "Class Teacher");
        setProfilePic(reduxUser?.profilePic || null);

        const year = new Date().getFullYear();
        setSession(reduxUser?.academicSession || `${year}/${year + 1} Session`);
        setTerm(reduxUser?.term || "First Term");
      }
    } catch (err) {
      console.error("Header profile fetch failed:", err);

      // Fallback to Redux data on error
      const firstName = reduxUser?.firstName || "";
      const lastName = reduxUser?.lastName || "";
      setDisplayName(
        `${firstName} ${lastName}`.trim() || reduxUser?.schoolName || "User",
      );
      setRole(reduxUser?.role || "Class Teacher");
      setProfilePic(reduxUser?.profilePic || null);

      const year = new Date().getFullYear();
      setSession(reduxUser?.academicSession || `${year}/${year + 1} Session`);
      setTerm(reduxUser?.term || "First Term");
    }
  };

  // ── Fetch profile on mount ────────────────────────────────────
  useEffect(() => {
    fetchAdminProfile();
  }, []);

  // ── Click outside handler ──────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown if clicked outside
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ── Date formatter ────────────────────────────────────────────
  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ── Logout ────────────────────────────────────────────────────
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

  // ── Close all dropdowns ───────────────────────────────────────
  const closeAll = () => {
    setIsProfileDropdownOpen(false);
  };

  return (
    <div>
      <header className="ct-header">
        {/* ── LEFT: Menu toggle + Date ── */}
        <div className="ct-header-left">
          <button
            className="ct-header-mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open Sidebar"
          >
            <FiMenu />
          </button>

          <div className="ct-date-section">
            <FiCalendar />
            <span>{formatDate()}</span>
          </div>
        </div>

        {/* ── RIGHT: Session, Term, Notifications, Profile ── */}
        <div className="ct-header-right">
          {/* Session Display (Read-only, from admin profile) */}
          <div className="ct-session-display">
            <span className="ct-session-label">{session}</span>
          </div>

          {/* Term Display (Read-only, from admin profile) */}
          <div className="ct-term-display">
            <span className="ct-term-label">{term}</span>
          </div>

          {/* Notifications */}
          <div className="ct-notification-section" aria-label="Notifications">
            <IoNotifications />
            <span className="ct-notification-badge" />
          </div>

          {/* Profile */}
          <div className="ct-profile-section-wrapper" ref={profileDropdownRef}>
            <div
              className="ct-profile-section"
              onClick={() => {
                setIsProfileDropdownOpen((v) => !v);
                closeAll();
              }}
            >
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile avatar"
                  className="ct-user-profile"
                />
              ) : (
                <div className="ct-user-avatar-fallback">
                  {displayName.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              <div className="ct-user-info">
                <span className="ct-user-name">{displayName}</span>
                <span className="ct-user-role">{role}</span>
              </div>
            </div>

            {/* Profile Dropdown (Only Logout option) */}
            {isProfileDropdownOpen && (
              <div className="ct-profile-dropdown-menu">
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

      {/* ── Logout Modal ──────────────────────────────────────── */}
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
    </div>
  );
};

export default Header;
