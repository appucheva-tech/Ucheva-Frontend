import React from "react";
import "./LayoutStyles/SubjectTeacherHeader.css";

const SubjectTeacherHeader = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dateString = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="SubjectTeacherHeader-teacher-header" nunito-content>
      {/* Left Section - Date */}
      <div className="SubjectTeacherHeader-header-left">
        <svg
          className="SubjectTeacherHeader-calendar-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2"></rect>
          <path d="M16 2v4"></path>
          <path d="M8 2v4"></path>
          <path d="M3 10h18"></path>
        </svg>
        <span className="SubjectTeacherHeader-date-text">
          {dayName}, {dateString}
        </span>
      </div>

      {/* Center Section - Session Info */}
      <div className="SubjectTeacherHeader-header-center">
        <span className="SubjectTeacherHeader-session-text">
          2025/2026 Session
        </span>
        <span className="SubjectTeacherHeader-term-text">Third Term</span>
      </div>

      {/* Right Section - Notification and Profile */}
      <div className="SubjectTeacherHeader-header-right">
        <button className="SubjectTeacherHeader-notification-btn">
          <svg
            className="SubjectTeacherHeader-bell-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>

        <div className="SubjectTeacherHeader-profile-section">
          <div className="SubjectTeacherHeader-profile-avatar">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
              alt="Emeka Nnaneme"
            />
          </div>
          <div className="SubjectTeacherHeader-profile-info">
            <p className="SubjectTeacherHeader-profile-name">Emeka Nnaneme</p>
            <p className="SubjectTeacherHeader-profile-role">Teacher</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SubjectTeacherHeader;
