import React, { useState } from "react";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import "./LayoutStyles/Header.css";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <header className="header">
      <div className="date-section">
        <FiCalendar />
        <span>{formatDate()}</span>
      </div>

      <div className="dropdown-section">
        <button
          className="dropdown-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Efe Ogeremu
          <FiChevronDown />
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <a href="#profile">Profile</a>
            <a href="#settings">Settings</a>
            <a href="#logout">Logout</a>
          </div>
        )}
      </div>

      <div className="profile-section">
        <img
          src="https://i.postimg.cc/8cXMb41Q/Ucheva-profile.jpg"
          alt=""
          className="user-profile"
        />
        <div className="user-info">
          <div className="user-name">Omoniyi Omosimsola</div>
          <div className="user-role">Parent</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
