import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiGrid, FiSettings, FiMenu, FiX } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import "./LayoutStyles/Sidebar.css";

const Sidebar = () => {
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

      <div className={`sidebar ${isMobileMenuOpen ? "mobile-open" : ""}`}>
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
            to="/parentdashboard"
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
            to="/parentdashboard/payment"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">
              <IoWalletOutline size={20} />
            </span>
            <span className="nav-text">Payment</span>
          </NavLink>

          <NavLink
            to="/parentdashboard/settings"
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

export default Sidebar;
