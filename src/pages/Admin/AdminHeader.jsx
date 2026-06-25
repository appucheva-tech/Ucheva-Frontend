import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import "./AdminHeader.css";

const AdminHeader = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user.user);

  // Using hardcoded values to match your image exactly
  // You can replace these with state or props as needed
  const adminName = "Eric Ugochukwu";
  const role = "Admin";

  return (
    <header className="AdministrationHeader-BAdminDashboard-header">
      {/* Search */}
      <div className="AdministrationHeader-search-container">
        <input
          type="text"
          placeholder="Search staff by name, role..."
          className="AdministrationHeader-search-input"
        />
        <button className="AdministrationHeader-search-button">
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

      {/* Right Side */}
      <div className="AdministrationHeader-header-right-group">
        {/* Metadata - Will hide automatically on small screens due to CSS */}
        <div className="AdministrationHeader-meta-container">
          <div className="AdministrationHeader-meta-item">
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
            Monday, 18 May 2026
          </div>
          <span>|</span>
          <div className="AdministrationHeader-meta-item">
            2025/2026 Session ▾
          </div>
          <span>|</span>
          <div className="AdministrationHeader-meta-item">Third Term ▾</div>
        </div>

        {/* Profile */}
        <div
          className="profile-section-wrapper"
          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
        >
          <div className="AdministrationHeader-Auser-info">
            <span className="AdministrationHeader-user-name">{adminName}</span>
            <span className="AdministrationHeader-user-role">{role}</span>
          </div>
          <div className="user-profile unique-school-avatar">
            <HiOutlineBuildingOffice2 size={20} />
          </div>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown-menu">
              <button className="profile-dropdown-item">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
