import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiStudent } from "react-icons/pi";
import { LuCircleFadingPlus } from "react-icons/lu";
import { FaPersonChalkboard } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { SiGoogleforms } from "react-icons/si";
import { CiVolumeHigh } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5"; // Import close icon
import "./AdminSidebar.css";
import rocket from "../../assets/rokect.svg";
import Logo from "../../assets/Logo.svg";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  // ← Add props here
  const nav = useNavigate();
  const getNavClass = ({ isActive }) => {
    return isActive ? "menu-item active" : "menu-item";
  };

  // Close sidebar when a menu item is clicked (mobile)
  const handleMenuClick = () => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`Adminsidebar ${sidebarOpen ? "open" : ""}`}>
      {" "}
      {/* ← Add conditional class */}
      <div className="Adminsidebar-brand">
        <img
          src={Logo}
          alt="Ucheva Logo"
          className="AdminDashboardLogo"
          onClick={() => {
            nav("/");
            handleMenuClick(); // Close sidebar on mobile when logo is clicked
          }}
        />
        {/* Close button for mobile */}
        <IoClose
          className="sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
        />
      </div>
      <nav className="sidebar-menu">
        <NavLink
          to="dashboard"
          end
          className={getNavClass}
          onClick={handleMenuClick} // ← Close on mobile
        >
          <RxDashboard className="menu-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="AdminClass"
          className={getNavClass}
          onClick={handleMenuClick} // ← Close on mobile
        >
          <FaPersonChalkboard className="menu-icon" />
          <span>Class</span>
        </NavLink>

        <NavLink
          to="AdminStaff"
          className={getNavClass}
          onClick={handleMenuClick} // ← Close on mobile
        >
          <HiOutlineUsers className="menu-icon" />
          <span>Staff</span>
        </NavLink>

        <NavLink
          to="AdminStudents"
          className={getNavClass}
          onClick={handleMenuClick} // ← Close on mobile
        >
          <PiStudent className="menu-icon" />
          <span>Students</span>
        </NavLink>

        <NavLink
          to="AdminSubjects"
          className={getNavClass}
          onClick={handleMenuClick} // ← Close on mobile
        >
          <LuCircleFadingPlus className="menu-icon" />
          <span>Subjects</span>
        </NavLink>
        <NavLink
          to="AdminAttendance"
          className={getNavClass}
          onClick={handleMenuClick} // ← Close on mobile
        >
          <LuCircleFadingPlus className="menu-icon" />
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="AdminFees"
          className={getNavClass}
          onClick={handleMenuClick} // ← Close on mobile
        >
          <IoWalletOutline className="menu-icon" />
          <span>Fees</span>
        </NavLink>

        <NavLink
          to="AdminReportCards"
          className={getNavClass}
          onClick={handleMenuClick} // ← Close on mobile
        >
          <SiGoogleforms className="menu-icon" />
          <span>Report Cards</span>
        </NavLink>

        <NavLink
          to="AdminAnnouncement"
          className={getNavClass}
          onClick={handleMenuClick} // ← Close on mobile
        >
          <CiVolumeHigh className="menu-icon" />
          <span>Announcement</span>
        </NavLink>

        <NavLink
          to="AdminWallet"
          className={getNavClass}
          onClick={handleMenuClick} // ← Close on mobile
        >
          <LuCircleFadingPlus className="menu-icon" />
          <span>Wallet</span>
        </NavLink>

        <NavLink
          to="AdminSettings"
          className={getNavClass}
          onClick={handleMenuClick} // ← Close on mobile
        >
          <IoSettingsOutline className="menu-icon" />
          <span>Settings</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer-container">
        <div className="sidebar-upgrade-card">
          <div className="upgrade-rocket-emoji">
            <img src={rocket} alt="Rocket" className="rocket-image-asset" />
          </div>

          <p className="upgrade-card-text">You're on the starter plan.</p>
          <p className="upgrade-card-subtext">Upgrade to go to Pro</p>

          <button
            type="button"
            className="upgrade-action-btn"
            onClick={handleMenuClick} // ← Close on mobile
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
