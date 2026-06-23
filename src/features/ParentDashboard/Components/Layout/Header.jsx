import React, { useState } from "react";
import { FiCalendar, FiChevronDown, FiMenu } from "react-icons/fi";
import "./LayoutStyles/Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({
  onMenuClick,
  students,
  selectedStudent,
  setSelectedStudent,
}) => {
  const nav = useNavigate();
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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
    <header className="parentdashboard-header">
      <button
        className="header-mobile-toggle"
        onClick={onMenuClick}
        aria-label="Open Menu"
      >
        <FiMenu size={22} />
      </button>

      <div className="date-section">
        <FiCalendar />
        <span>{formatDate()}</span>
      </div>

      <div className="header-actions-right">
        <div className="dropdown-section">
          <button
            className="dropdown-button"
            onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
          >
            {selectedStudent ? selectedStudent.fullName : "Select Student"}
            <FiChevronDown />
          </button>

          {isStudentDropdownOpen && (
            <div className="dropdown-menu">
              {students.map((student) => (
                <p
                  key={student.id}
                  onClick={() => {
                    setSelectedStudent(student);
                    setIsStudentDropdownOpen(false);
                  }}
                  className={
                    selectedStudent?.id === student.id ? "active-student" : ""
                  }
                >
                  {student.fullName}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="profile-section-wrapper">
          <div
            className="profile-section"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <img
              src="https://i.postimg.cc/8cXMb41Q/Ucheva-profile.jpg"
              alt="Profile"
              className="user-profile"
              onClick={() => n}
            />
            <div className="user-info">
              <div className="user-name">{students.parentName}</div>
              <div className="user-role">Parent</div>
            </div>
          </div>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown-menu">
              <p>Settings</p>
              <p className="logout">Logout</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
