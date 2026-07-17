import React, { useState } from "react";
import { FiCalendar, FiChevronDown, FiMenu } from "react-icons/fi";
import "./LayoutStyles/Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../../global/userSlice";
import { persistor } from "../../../../global/store";
import { apiClient } from "../../../../config/AxiosInstance";

const Header = ({
  onMenuClick,
  students,
  selectedStudent,
  setSelectedStudent,
}) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const formatDate = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return today.toLocaleDateString("en-US", options);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await apiClient.post("/parent/logout");
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
      <header className="parentdashboard-header nunito-content">
        <div className="header-left-section">
          <button
            className="header-mobile-toggle"
            onClick={onMenuClick}
            aria-label="Open Menu"
          >
            <FiMenu size={22} />
          </button>
        </div>

        <div className="header-actions-right">
          <div className="date-section">
            <FiCalendar />
            <span>{formatDate()}</span>
          </div>

          <div className="dropdown-section">
            <button
              className="dropdown-button"
              onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
            >
              {selectedStudent ? selectedStudent.fullName : "Select Student"}
              <FiChevronDown />
            </button>

            {isStudentDropdownOpen && (
              <div className="dropdown-menu">
                {students.map((student) => (
                  <p
                    key={student.id}
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsStudentDropdownOpen(false);
                    }}
                    className={
                      selectedStudent?.id === student.id ? "active-student" : ""
                    }
                  >
                    {student.fullName}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="profile-section-wrapper">
            <div
              className="profile-section"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="user-profile"
                />
              ) : (
                <img
                  src="https://i.postimg.cc/8cXMb41Q/Ucheva-profile.jpg"
                  alt="Profile"
                  className="user-profile"
                />
              )}
              <div className="user-info">
                <div className="user-name_s">
                  {user?.name || selectedStudent?.fullName || "Parent"}
                </div>
                <div className="user-roles">Parent</div>
              </div>
            </div>
            {isProfileDropdownOpen && (
              <div className="profile-dropdown-menu">
                <p onClick={() => nav("/parentdashboard/settings")}>Settings</p>
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
        </div>
      </header>

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

export default Header;