import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiGrid, FiBell, FiSettings, FiMenu, FiX } from "react-icons/fi";
import "./LayoutStyles/SecuritySideBar.css";

const SecuritySidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      <div className={`sidebar ${isMobileMenuOpen ? "mobile-open" : ""} `}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <img
              src="https://i.postimg.cc/zDtBJb6C/logo-cont.png"
              alt="Ucheva Logo"
              className="Ucheva"
            />
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/securitydashboard"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">
              <FiGrid size={20} />
            </span>
            <span className="nav-text">Dashboard</span>
          </NavLink>

          <NavLink
            to="/securitydashboard/announcement"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">
              <FiBell size={20} />
            </span>
            <span className="nav-text">Announcement</span>
          </NavLink>

          <NavLink
            to="/securitydashboard/settings"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">
              <FiSettings size={20} />
            </span>
            <span className="nav-text">Settings</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default SecuritySidebar;
