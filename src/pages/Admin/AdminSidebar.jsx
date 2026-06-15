import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiStudent } from "react-icons/pi";
import { LuCircleFadingPlus } from "react-icons/lu";
import { FaPersonChalkboard } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { SiGoogleforms } from "react-icons/si";
import { CiVolumeHigh } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import "./AdminSidebar.css";
import Logo from "../../assets/Logo.svg";

const Sidebar = () => {
  const nav = useNavigate();
  const getNavClass = ({ isActive }) => {
    return isActive ? "menu-item active" : "menu-item";
  };

  return (
    <div className="Adminsidebar">
      <div className="Adminsidebar-brand">
        <img
          src={Logo}
          alt=""
          className="AdminDashboardLogo"
          onClick={() => nav("/")}
        />
      </div>

      <nav className="sidebar-menu">
        <NavLink to="dashboard" end className={getNavClass}>
          <RxDashboard className="menu-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="AdminStaff" className={getNavClass}>
          <HiOutlineUsers className="menu-icon" />
          <span>Staff</span>
        </NavLink>

        <NavLink to="AdminStudents" className={getNavClass}>
          <PiStudent className="menu-icon" />
          <span>Students</span>
        </NavLink>

        <NavLink to="AdminAttendance" className={getNavClass}>
          <LuCircleFadingPlus className="menu-icon" />
          <span>Attendance</span>
        </NavLink>

        <NavLink to="AdminSubjects" className={getNavClass}>
          <LuCircleFadingPlus className="menu-icon" />
          <span>Subjects</span>
        </NavLink>

        <NavLink to="AdminClass" className={getNavClass}>
          <FaPersonChalkboard className="menu-icon" />
          <span>Class</span>
        </NavLink>

        <NavLink to="AdminFees" className={getNavClass}>
          <IoWalletOutline className="menu-icon" />
          <span>Fees</span>
        </NavLink>

        <NavLink to="AdminReportCards" className={getNavClass}>
          <SiGoogleforms className="menu-icon" />
          <span>Report Cards</span>
        </NavLink>

        <NavLink to="AdminAnnouncement" className={getNavClass}>
          <CiVolumeHigh className="menu-icon" />
          <span>Announcement</span>
        </NavLink>

        <NavLink to="AdminWallet" className={getNavClass}>
          <LuCircleFadingPlus className="menu-icon" />
          <span>Wallet</span>
        </NavLink>

        <NavLink to="AdminSettings" className={getNavClass}>
          <IoSettingsOutline className="menu-icon" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
