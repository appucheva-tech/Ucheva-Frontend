import React, { useState } from "react";
import { FiCalendar, FiChevronDown, FiMenu } from "react-icons/fi";
import "./LayoutStyles/Header.css";

const Header = ({ onMenuClick }) => {
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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

  const students = ["Efe Ogeremu", "simisola", "kareem"];

  return (
    <header className="parentdashboard-header">
      {/* Mobile Burger Button wired to the parent layout state */}
      <button
        className="header-mobile-toggle"
        onClick={onMenuClick}
        aria-label="Open Menu"
      >
        <FiMenu size={22} />
      </button>

      <div className="date-section">
        <FiCalendar />
        <span>{formatDate()}</span>
      </div>

      <div className="header-actions-right">
        <div className="dropdown-section">
          <button
            className="dropdown-button"
            onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
          >
            Efe Ogeremu
            <FiChevronDown />
          </button>
          {isStudentDropdownOpen && (
            <div className="dropdown-menu">
              {students.map((student, index) => (
                <p key={index}>{student}</p>
              ))}
            </div>
          )}
        </div>

        <div className="profile-section-wrapper">
          <div
            className="profile-section"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <img
              src="https://i.postimg.cc/8cXMb41Q/Ucheva-profile.jpg"
              alt="Profile"
              className="user-profile"
            />
            <div className="user-info">
              <div className="user-name">Omoniyi Omosimisola</div>
              <div className="user-role">Parent</div>
            </div>
          </div>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown-menu">
              <p>Settings</p>
              <p className="#logout">Logout</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
