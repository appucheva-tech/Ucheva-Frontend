import React, { useState } from "react";
import "./SideBar.css";
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
          className="ct-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`ct-sidebar-container ${sidebarOpen ? "mobile-open" : ""}`}
      >
        {/* Logo Section */}
        <div className="ct-sidebar-logo">
          <div className="ct-logo-icon">
            <img
              src="https://i.postimg.cc/Y9zb4hsp/Ucheva-Logo.png"
              alt="Ucheva Logo"
              className="ct-logo"
            />
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          className="ct-sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        {/* Navigation Menu */}
        <nav className="ct-sidebar-nav">
          <NavLink
            to="/CTdashboard"
            className={({ isActive }) =>
              `ct-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="ct-nav-icon">
              <PiSquaresFourBold />
            </span>
            <span className="ct-nav-text">Dashboard</span>
          </NavLink>

          <NavLink
            to="myclass"
            className={({ isActive }) =>
              `ct-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="ct-nav-icon">
              <FaPersonChalkboard />
            </span>
            <span className="ct-nav-text">My Class</span>
          </NavLink>

          <NavLink
            to="CTscore"
            className={({ isActive }) =>
              `ct-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="ct-nav-icon">
              <MdOutlineCreditScore />
            </span>
            <span className="ct-nav-text">Scores</span>
          </NavLink>

          <NavLink
            to="CTreportcard"
            className={({ isActive }) =>
              `ct-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="ct-nav-icon">
              <PiCertificateBold />
            </span>
            <span className="ct-nav-text">Report Cards</span>
          </NavLink>

          <NavLink
            to="CTAnnouncement"
            className={({ isActive }) =>
              `ct-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="ct-nav-icon">
              <HiMiniSpeakerWave />
            </span>
            <span className="ct-nav-text">Announcement</span>
          </NavLink>

          <NavLink
            to="CTsettings"
            className={({ isActive }) =>
              `ct-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="ct-nav-icon">
              <IoSettingsOutline />
            </span>
            <span className="ct-nav-text">Settings</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
