import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
// Remove all react-icons imports and import your custom icons
import {
  DashboardIcon,
  ClassIcon,
  StaffIcon,
  StudentsIcon,
  SubjectsIcon,
  AttendanceIcon,
  FeesIcon,
  ReportCardsIcon,
  AnnouncementIcon,
  WalletIcon,
  SettingsIcon,
} from "./AdminIcon"
// Also keep the IoClose for the close button – you can keep that from react-icons or replace with your own.
import { IoClose } from "react-icons/io5";
import "./AdminSidebar.css";
import rocket from "../../../assets/rokect.svg";
import Logo from "../../../assets/Logo.svg";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const nav = useNavigate();
  const getNavClass = ({ isActive }) => {
    return isActive ? "menu-item1 active" : "menu-item1";
  };

  const handleMenuClick = () => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`Adminsidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="Adminsidebar-brand">
        <img
          src={Logo}
          alt="Ucheva Logo"
          className="AdminDashboardLogoHead"
          onClick={() => {
            nav("/");
            handleMenuClick();
          }}
        />
        <IoClose
          className="sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
        />
      </div>
      <nav className="sidebar-menu1">
        <NavLink
          to="dashboard"
          end
          className={getNavClass}
          onClick={handleMenuClick}
        >
          <DashboardIcon className="menu-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="AdminClass"
          className={getNavClass}
          onClick={handleMenuClick}
        >
          <ClassIcon className="menu-icon" />
          <span>Class</span>
        </NavLink>

        <NavLink
          to="AdminStaff"
          className={getNavClass}
          onClick={handleMenuClick}
        >
          <StaffIcon className="menu-icon" />
          <span>Staff</span>
        </NavLink>

        <NavLink
          to="AdminStudents"
          className={getNavClass}
          onClick={handleMenuClick}
        >
          <StudentsIcon className="menu-icon" />
          <span>Students</span>
        </NavLink>

        <NavLink
          to="AdminSubjects"
          className={getNavClass}
          onClick={handleMenuClick}
        >
          <SubjectsIcon className="menu-icon" />
          <span>Subjects</span>
        </NavLink>

        <NavLink
          to="AdminAttendance"
          className={getNavClass}
          onClick={handleMenuClick}
        >
          <AttendanceIcon className="menu-icon" />
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="AdminFees"
          className={getNavClass}
          onClick={handleMenuClick}
        >
          <FeesIcon className="menu-icon" />
          <span>Fees</span>
        </NavLink>

        <NavLink
          to="AdminReportCards"
          className={getNavClass}
          onClick={handleMenuClick}
        >
          <ReportCardsIcon className="menu-icon" />
          <span>Report Cards</span>
        </NavLink>

        <NavLink
          to="AdminAnnouncement"
          className={getNavClass}
          onClick={handleMenuClick}
        >
          <AnnouncementIcon className="menu-icon" />
          <span>Announcement</span>
        </NavLink>

        <NavLink
          to="AdminWallet"
          className={getNavClass}
          onClick={handleMenuClick}
        >
          <WalletIcon className="menu-icon" />
          <span>Wallet</span>
        </NavLink>

        <NavLink
          to="AdminSettings"
          className={getNavClass}
          onClick={handleMenuClick}
        >
          <SettingsIcon className="menu-icon" />
          <span>Settings</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer-container1">
        <div className="sidebar-upgrade-card1">
          <div className="upgrade-rocket-emoji1">
            <img src={rocket} alt="Rocket" className="rocket-image-asset" />
          </div>
          <p className="upgrade-card-text1">You're on the starter plan.</p>
          <p className="upgrade-card-subtext1">Upgrade to go to Pro</p>
          <button
            type="button"
            className="upgrade-action-btn1"
            onClick={() => {
              nav("/admin/suscribe");
            }}
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;