import React from "react";
import "./SideBar.css";
import { PiSquaresFourBold, PiCertificateBold } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { MdOutlineAccessTime, MdOutlineCreditScore } from "react-icons/md";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import ucheva from "../../../../assets/UchevaLogo.svg";

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile structural backing panel overlay overlay shade veil */}
      {sidebarOpen && (
        <div
          className="ct-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`ct-sidebar-container ${sidebarOpen ? "mobile-open" : ""}`}
      >
        {/* Header App Brand Logo Area */}
        <div className="ct-sidebar-logo">
          <div className="ct-logo-icon">
            <img src={ucheva} alt="Ucheva App Brand Logo" className="ct-logo" />
          </div>
        </div>

        {/* Floating Contextual Close Button Trigger (Mobile Only Viewport) */}
        {/* <button
          className="ct-sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close Sidebar Navigation Menu"
        >
          ✕
        </button> */}

        {/* Navigation Routed Links Segment Anchor Hub */}
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
          <NavLink
            to="attendance"
            className={({ isActive }) =>
              `ct-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="ct-nav-icon">
              <MdOutlineAccessTime />
            </span>
            <span className="ct-nav-text">Attendance</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
