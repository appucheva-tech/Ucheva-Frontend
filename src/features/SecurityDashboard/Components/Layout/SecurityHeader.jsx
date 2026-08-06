import React, { useState } from "react";
import "./LayoutStyles/SecurityHeader.css";
import { useNavigate } from "react-router-dom";

const SecurityHeader = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const nav = useNavigate();

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

  // Dummy logout handler - just closes modal and navigates
  const handleLogoutConfirm = () => {
    setIsLoggingOut(true);
    // Simulate logout delay
    setTimeout(() => {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
      nav("/");
    }, 1500);
  };

  // Dummy user data
  const displayName = "Davis Okon";
  const userInitial = "D";
  const profileImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-06-08%20at%2001.19.58-Oiqgh9nJfGFrfHkzeDIrGzdlaTniyn.png";

  return (
    <>
      <header className="security-header">
        <div className="security-date-section">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="security-calendar-icon"
          >
            <g clipPath="url(#clip0_6831_9990)">
              <mask
                id="mask0_6831_9990"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="14"
                height="14"
              >
                <path d="M14 0H0V14H14V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_6831_9990)">
                <path
                  d="M4.66602 3.35352C4.42685 3.35352 4.22852 3.15518 4.22852 2.91602V1.16602C4.22852 0.926849 4.42685 0.728516 4.66602 0.728516C4.90518 0.728516 5.10352 0.926849 5.10352 1.16602V2.91602C5.10352 3.15518 4.90518 3.35352 4.66602 3.35352Z"
                  fill="currentColor"
                />
                <path
                  d="M9.33398 3.35352C9.09482 3.35352 8.89648 3.15518 8.89648 2.91602V1.16602C8.89648 0.926849 9.09482 0.728516 9.33398 0.728516C9.57315 0.728516 9.77148 0.926849 9.77148 1.16602V2.91602C9.77148 3.15518 9.57315 3.35352 9.33398 3.35352Z"
                  fill="currentColor"
                />
                <path
                  d="M11.9577 5.73828H2.04102C1.80185 5.73828 1.60352 5.53995 1.60352 5.30078C1.60352 5.06161 1.80185 4.86328 2.04102 4.86328H11.9577C12.1968 4.86328 12.3952 5.06161 12.3952 5.30078C12.3952 5.53995 12.1968 5.73828 11.9577 5.73828Z"
                  fill="currentColor"
                />
                <path
                  d="M9.33333 13.2702H4.66667C2.5375 13.2702 1.3125 12.0452 1.3125 9.91602V4.95768C1.3125 2.82852 2.5375 1.60352 4.66667 1.60352H9.33333C11.4625 1.60352 12.6875 2.82852 12.6875 4.95768V9.91602C12.6875 12.0452 11.4625 13.2702 9.33333 13.2702ZM4.66667 2.47852C2.99833 2.47852 2.1875 3.28935 2.1875 4.95768V9.91602C2.1875 11.5843 2.99833 12.3952 4.66667 12.3952H9.33333C11.0017 12.3952 11.8125 11.5843 11.8125 9.91602V4.95768C11.8125 3.28935 11.0017 2.47852 9.33333 2.47852H4.66667Z"
                  fill="currentColor"
                />
                <path
                  d="M4.95833 8.45768C4.8825 8.45768 4.80667 8.44018 4.73667 8.41102C4.66667 8.38185 4.60251 8.34102 4.54417 8.28852C4.49167 8.23018 4.45083 8.16602 4.42166 8.09602C4.39249 8.02602 4.375 7.95018 4.375 7.87435C4.375 7.72268 4.43917 7.57102 4.54417 7.46018C4.60251 7.40768 4.66667 7.36685 4.73667 7.33768C4.84167 7.29102 4.95834 7.27935 5.07501 7.30268C5.11001 7.30852 5.145 7.32018 5.18 7.33768C5.215 7.34935 5.25 7.36685 5.285 7.39018C5.31417 7.41352 5.34333 7.43685 5.37249 7.46018C5.39583 7.48935 5.42499 7.51852 5.44249 7.54768C5.46583 7.58268 5.48334 7.61768 5.49501 7.65268C5.51251 7.68768 5.52417 7.72268 5.53001 7.75768C5.53584 7.79852 5.54167 7.83352 5.54167 7.87435C5.54167 8.02602 5.47749 8.17768 5.37249 8.28852C5.26166 8.39352 5.11 8.45768 4.95833 8.45768Z"
                  fill="currentColor"
                />
                <path
                  d="M6.99935 8.45897C6.84768 8.45897 6.69602 8.39481 6.58518 8.28981C6.56185 8.26064 6.53852 8.23147 6.51518 8.20231C6.49185 8.16731 6.47435 8.13236 6.46268 8.09736C6.44518 8.06236 6.43352 8.02736 6.42768 7.99236C6.42185 7.95153 6.41602 7.91647 6.41602 7.87564C6.41602 7.79981 6.43352 7.72397 6.46268 7.65397C6.49185 7.58397 6.53268 7.51986 6.58518 7.46153C6.74852 7.2982 7.01102 7.24564 7.22102 7.33897C7.29685 7.36814 7.35518 7.40903 7.41352 7.46153C7.51852 7.57236 7.58268 7.72397 7.58268 7.87564C7.58268 7.91647 7.57685 7.95153 7.57102 7.99236C7.56518 8.02736 7.55352 8.06236 7.53602 8.09736C7.52435 8.13236 7.50685 8.16731 7.48352 8.20231C7.46018 8.23147 7.43685 8.26064 7.41352 8.28981C7.35518 8.34231 7.29685 8.3832 7.22102 8.41236C7.15102 8.44153 7.07518 8.45897 6.99935 8.45897Z"
                  fill="currentColor"
                />
                <path
                  d="M4.95833 10.5C4.8825 10.5 4.80667 10.4825 4.73667 10.4534C4.66667 10.4242 4.60251 10.3833 4.54417 10.3308C4.49167 10.2725 4.45083 10.2142 4.42166 10.1384C4.39249 10.0684 4.375 9.99249 4.375 9.91665C4.375 9.76499 4.43917 9.61338 4.54417 9.50255C4.60251 9.45005 4.66667 9.40915 4.73667 9.37999C4.9525 9.28665 5.20916 9.33921 5.37249 9.50255C5.39583 9.53171 5.42499 9.56088 5.44249 9.59005C5.46583 9.62505 5.48334 9.65999 5.49501 9.69499C5.51251 9.72999 5.52417 9.76499 5.53001 9.80582C5.53584 9.84082 5.54167 9.88165 5.54167 9.91665C5.54167 10.0683 5.47749 10.22 5.37249 10.3308C5.26166 10.4358 5.11 10.5 4.95833 10.5Z"
                  fill="currentColor"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_6831_9990">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span className="security-date-text">
            <span>{formatDate()}</span>
          </span>
        </div>

        <button
          className="security-notification-button"
          onClick={() => nav("/securitydashboard/announcement")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="security-bell-icon"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M14 26.2493C15.933 26.2493 17.5 24.6823 17.5 22.7493C17.5 22.6755 17.4977 22.6022 17.4932 22.5294C17.4801 22.318 17.2975 22.1643 17.0857 22.1619L10.9283 22.092C10.7165 22.0896 10.5305 22.2392 10.5126 22.4503C10.5043 22.5488 10.5 22.6486 10.5 22.7493C10.5 24.6823 12.067 26.2493 14 26.2493Z"
              fill="currentColor"
            />
            <path
              d="M5.83398 10.5C5.83398 5.98968 9.49032 1.75 14.0007 1.75C18.511 1.75 22.1673 5.98968 22.1673 10.5V13.3708C22.1673 14.8841 22.8145 16.3253 23.9456 17.3307C25.1593 18.4095 24.3962 20.4167 22.7723 20.4167H5.22904C3.60513 20.4167 2.84201 18.4095 4.05574 17.3307C5.18683 16.3253 5.83398 14.8841 5.83398 13.3708V10.5Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className="security-profile-section-wrapper">
          <div
            className="security-profile-section"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="security-profile-avatar"
              />
            ) : (
              <div className="security-profile-avatar-placeholder">
                <span className="security-profile-initial">{userInitial}</span>
              </div>
            )}
            <div className="security-profile-info">
              <p className="security-profile-name">{displayName}</p>
              <p className="security-profile-role">Security</p>
            </div>
          </div>
          {isProfileDropdownOpen && (
            <div className="security-profile-dropdown-menu">
              <p
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  nav("/securitydashboard/settings");
                }}
              >
                Settings
              </p>
              <p
                className="security-dropdown-logout"
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
      </header>

      {showLogoutModal && (
        <div
          className="security-logout-modal-overlay"
          onClick={() => !isLoggingOut && setShowLogoutModal(false)}
        >
          <div
            className="security-logout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="security-logout-modal-icon">
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
            <h2 className="security-logout-modal-title">Logout</h2>
            <p className="security-logout-modal-message">
              Are you sure you want to logout?
            </p>
            <div className="security-logout-modal-actions">
              <button
                className="security-logout-modal-cancel"
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                className={`security-logout-modal-confirm${isLoggingOut ? " loading" : ""}`}
                onClick={handleLogoutConfirm}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <span className="security-logout-spinner" />
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

export default SecurityHeader;