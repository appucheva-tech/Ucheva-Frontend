import React from "react";
import { NavLink } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import "./LayoutStyles/SubjectTeacherSidebar.css";

const SubjectTeacherSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`SubjectTeacherSidebar_Container ${isOpen ? "SubjectTeacherSidebar-mobile-open" : ""}`}
    >
      <div className="SubjectTeacherSidebar-sidebar-logo">
        <div className="SubjectTeacherSidebar-logo-icon">
          <img
            src="https://i.postimg.cc/zDtBJb6C/logo-cont.png"
            alt="Ucheva Logo"
            className="SubjectTeacherSidebar-Ucheva"
          />
        </div>
      </div>

      <nav className="SubjectTeacherSidebar-nav">
        <NavLink
          to="/subjectteacherdashboard"
          end
          className={({ isActive }) =>
            `SubjectTeacherSidebar-nav-link ${isActive ? "SubjectTeacherSidebar-active" : ""}`
          }
          onClick={toggleSidebar}
        >
          <span className="SubjectTeacherSidebar-nav-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M0 13.3333C0 12.05 -9.93411e-08 11.4083 0.289167 10.9367C0.450833 10.6725 0.6725 10.4508 0.936667 10.2892C1.4075 10 2.05 10 3.33333 10C4.61667 10 5.25833 10 5.73 10.2892C5.99417 10.4508 6.21583 10.6725 6.3775 10.9367C6.66667 11.4075 6.66667 12.05 6.66667 13.3333C6.66667 14.6167 6.66667 15.2583 6.3775 15.7308C6.21583 15.9942 5.99417 16.2158 5.73 16.3775C5.25917 16.6667 4.61667 16.6667 3.33333 16.6667C2.05 16.6667 1.40833 16.6667 0.936667 16.3775C0.672792 16.2161 0.450901 15.9945 0.289167 15.7308C-9.93411e-08 15.2583 0 14.6167 0 13.3333ZM10 13.3333C10 12.05 10 11.4083 10.2892 10.9367C10.4508 10.6725 10.6725 10.4508 10.9367 10.2892C11.4075 10 12.05 10 13.3333 10C14.6167 10 15.2583 10 15.7308 10.2892C15.9942 10.4508 16.2158 10.6725 16.3775 10.9367C16.6667 11.4075 16.6667 12.05 16.6667 13.3333C16.6667 14.6167 16.6667 15.2583 16.3775 15.7308C16.2158 15.9942 15.9942 16.2158 15.7308 16.3775C15.2583 16.6667 14.6167 16.6667 13.3333 16.6667C12.05 16.6667 11.4083 16.6667 10.9367 16.3775C10.6728 16.2161 10.4509 15.9945 10.2892 15.7308C10 15.2583 10 14.6167 10 13.3333ZM0 3.33333C0 2.05 -9.93411e-08 1.40833 0.289167 0.936667C0.450833 0.6725 0.6725 0.450833 0.936667 0.289167C1.4075 -9.93411e-08 2.05 0 3.33333 0C4.61667 0 5.25833 -9.93411e-08 5.73 0.289167C5.99417 0.450833 6.21583 0.6725 6.3775 0.936667C6.66667 1.4075 6.66667 2.05 6.66667 3.33333C6.66667 4.61667 6.66667 5.25833 6.3775 5.73C6.21583 5.99417 5.99417 6.21583 5.73 6.3775C5.25917 6.66667 4.61667 6.66667 3.33333 6.66667C2.05 6.66667 1.40833 6.66667 0.936667 6.3775C0.672696 6.21587 0.450797 5.99397 0.289167 5.73C-9.93411e-08 5.25917 0 4.61667 0 3.33333ZM10 3.33333C10 2.05 10 1.40833 10.2892 0.936667C10.4508 0.6725 10.6725 0.450833 10.9367 0.289167C11.4075 -9.93411e-08 12.05 0 13.3333 0C14.6167 0 15.2583 -9.93411e-08 15.7308 0.289167C15.9942 0.450833 16.2158 0.6725 16.3775 0.936667C16.6667 1.4075 16.6667 2.05 16.6667 3.33333C16.6667 4.61667 16.6667 5.25833 16.3775 5.73C16.2158 5.99417 15.9942 6.21583 15.7308 6.3775C15.2583 6.66667 14.6167 6.66667 13.3333 6.66667C12.05 6.66667 11.4083 6.66667 10.9367 6.3775C10.6727 6.21587 10.4508 5.99397 10.2892 5.73C10 5.25917 10 4.61667 10 3.33333Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="SubjectTeacherSidebar-nav-text">Dashboard</span>
        </NavLink>

        <NavLink
          to="/subjectteacherdashboard/scores"
          className={({ isActive }) =>
            `SubjectTeacherSidebar-nav-link ${isActive ? "SubjectTeacherSidebar-active" : ""}`
          }
          onClick={toggleSidebar}
        >
          <span className="SubjectTeacherSidebar-nav-icon">
            <IoWalletOutline size={20} />
          </span>
          <span className="SubjectTeacherSidebar-nav-text">Scores</span>
        </NavLink>

        <NavLink
          to="/subjectteacherdashboard/announcement"
          className={({ isActive }) =>
            `SubjectTeacherSidebar-nav-link ${isActive ? "SubjectTeacherSidebar-active" : ""}`
          }
          onClick={toggleSidebar}
        >
          <span className="SubjectTeacherSidebar-nav-icon">
            <FiSettings size={20} />
          </span>
          <span className="SubjectTeacherSidebar-nav-text">Announcement</span>
        </NavLink>

        <NavLink
          to="/subjectteacherdashboard/settings"
          className={({ isActive }) =>
            `SubjectTeacherSidebar-nav-link ${isActive ? "SubjectTeacherSidebar-active" : ""}`
          }
          onClick={toggleSidebar}
        >
          <span className="SubjectTeacherSidebar-nav-icon">
            <FiSettings size={20} />
          </span>
          <span className="SubjectTeacherSidebar-nav-text">Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default SubjectTeacherSidebar;
