import React, { useState, useEffect, useRef } from "react";
import { FiCalendar, FiChevronDown, FiMenu } from "react-icons/fi";
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
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [isTermDropdownOpen, setIsTermDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // ── Refs for click outside ─────────────────────────────────────
  const sessionDropdownRef = useRef(null);
  const termDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // ── Profile data from API ─────────────────────────────────────
  const [profilePic, setProfilePic] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [term, setTerm] = useState("Third Term");
  const [session, setSession] = useState("2026/2027 Session");

  // ── Fetch same endpoint as CTSettings ─────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get("/classteacher/getprofiledetails");
        const data = res?.data?.classTeacherData || res?.data;

        const firstName = data?.firstName || reduxUser?.firstName || "";
        const lastName = data?.lastName || reduxUser?.lastName || "";
        setDisplayName(
          `${firstName} ${lastName}`.trim() || reduxUser?.schoolName || "User",
        );

        setRole(data?.staffType || reduxUser?.role || "Class Teacher");
        setProfilePic(
          data?.staffProfileUrl ||
            data?.adminUrl ||
            reduxUser?.profilePic ||
            null,
        );
        setTerm(reduxUser?.term || data?.currentTerm || "Third Term");

        const year = new Date().getFullYear();
        setSession(
          reduxUser?.academicSession ||
            data?.academicSession ||
            `${year}/${year + 1} Session`,
        );
      } catch (err) {
        console.error("Header profile fetch failed:", err);
        const firstName = reduxUser?.firstName || "";
        const lastName = reduxUser?.lastName || "";
        setDisplayName(
          `${firstName} ${lastName}`.trim() || reduxUser?.schoolName || "User",
        );
        setRole(reduxUser?.role || "Class Teacher");
        setProfilePic(reduxUser?.profilePic || null);
      }
    };

    fetchProfile();
  }, []);

  // ── Click outside handler ──────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close session dropdown if clicked outside
      if (
        sessionDropdownRef.current &&
        !sessionDropdownRef.current.contains(event.target)
      ) {
        setIsSessionDropdownOpen(false);
      }

      // Close term dropdown if clicked outside
      if (
        termDropdownRef.current &&
        !termDropdownRef.current.contains(event.target)
      ) {
        setIsTermDropdownOpen(false);
      }

      // Close profile dropdown if clicked outside
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
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

  const sessions = [
    "2024/2025 Session",
    "2025/2026 Session",
    "2026/2027 Session",
  ];
  const terms = ["First Term", "Second Term", "Third Term"];

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
    setIsSessionDropdownOpen(false);
    setIsTermDropdownOpen(false);
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
          {/* Session Dropdown */}
          <div className="ct-dropdown-section" ref={sessionDropdownRef}>
            <button
              className="ct-dropdown-button"
              onClick={() => {
                setIsSessionDropdownOpen((v) => !v);
                setIsTermDropdownOpen(false);
                setIsProfileDropdownOpen(false);
              }}
            >
              {session}
              <FiChevronDown
                className={isSessionDropdownOpen ? "rotate-icon" : ""}
              />
            </button>
            {isSessionDropdownOpen && (
              <div className="ct-dropdown-menu">
                {sessions.map((s, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      setSession(s);
                      setIsSessionDropdownOpen(false);
                    }}
                  >
                    {s}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Term Dropdown */}
          <div className="ct-dropdown-section" ref={termDropdownRef}>
            <button
              className="ct-dropdown-button"
              onClick={() => {
                setIsTermDropdownOpen((v) => !v);
                setIsSessionDropdownOpen(false);
                setIsProfileDropdownOpen(false);
              }}
            >
              {term}
              <FiChevronDown
                className={isTermDropdownOpen ? "rotate-icon" : ""}
              />
            </button>
            {isTermDropdownOpen && (
              <div className="ct-dropdown-menu">
                {terms.map((t, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      setTerm(t);
                      setIsTermDropdownOpen(false);
                    }}
                  >
                    {t}
                  </p>
                ))}
              </div>
            )}
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
                setIsSessionDropdownOpen(false);
                setIsTermDropdownOpen(false);
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

            {isProfileDropdownOpen && (
              <div className="ct-profile-dropdown-menu">
                <p
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    nav("/classteacher/settings");
                  }}
                >
                  Settings
                </p>
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
