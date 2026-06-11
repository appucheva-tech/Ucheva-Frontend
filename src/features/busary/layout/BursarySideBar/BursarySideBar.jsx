import React, { useState } from "react";
import "./BursarySideBar.css";
import { PiSquaresFourBold, PiCertificateBold } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { MdOutlineCreditScore } from "react-icons/md";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate, NavLink } from "react-router-dom";

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleNavigation = (path, dashboardName) => {
    navigate(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="br-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`br-sidebar-container ${sidebarOpen ? "mobile-open" : ""}`}
      >
        {/* Logo Section */}
        <div className="br-sidebar-logo">
          <div className="br-logo-icon">
            <img
              src="https://i.postimg.cc/Y9zb4hsp/Ucheva-Logo.png"
              alt="Ucheva Logo"
              className="br-logo"
            />
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          className="br-sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        {/* Navigation Menu */}
        <nav className="br-sidebar-nav">
          <NavLink
            to="/bursary"
            className={({ isActive }) =>
              `br-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="br-nav-icon">
              <PiSquaresFourBold />
            </span>
            <span className="br-nav-text">Dashboard</span>
          </NavLink>

          <NavLink
            to="bursaryFees"
            className={({ isActive }) =>
              `br-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="br-nav-icon">
              <FaPersonChalkboard />
            </span>
            <span className="br-nav-text">Fees</span>
          </NavLink>

          <NavLink
            to="bursaryAnnouncement"
            className={({ isActive }) =>
              `br-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="br-nav-icon">
              <HiMiniSpeakerWave />
            </span>
            <span className="br-nav-text">Announcement</span>
          </NavLink>

          <NavLink
            to="bursarySettings"
            className={({ isActive }) =>
              `br-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="br-nav-icon">
              <IoSettingsOutline />
            </span>
            <span className="br-nav-text">Settings</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
