import React, { useState } from "react";
import "../SubjectTeacherDashboardStyles/SubjectTeacherAnnouncement.css";

const SubjectTeacherAnnouncement = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const announcements = [
    {
      id: 1,
      title: "Staff Meeting Reminder",
      description:
        "All staff members are required to attend the meeting scheduled for Monday, 19th May 2026 by 2:00 PM in the school hall. Thank you.",
      date: "May 18, 2026",
      time: "8:30 AM",
      read: true,
    },
    {
      id: 2,
      title: "Resumption of Normal Activities",
      description:
        "This is to inform all staff that the school will resume normal activities on Monday, 19th May 2026. Please be punctual.",
      date: "May 15, 2026",
      time: "4:45 PM",
      read: true,
    },
    {
      id: 3,
      title: "Environmental Sanitation Exercise",
      description:
        "Weekly environmental sanitation exercise will hold on Saturday, 24th May 2026. All staff are expected to participate.",
      date: "May 13, 2026",
      time: "9:00 AM",
      read: false,
    },
    {
      id: 4,
      title: "Emergency Closure Update",
      description:
        "Due to the forecasted heavy rainfall, the school will be closed on Tuesday, 20th May 2026 for safety purposes.",
      date: "May 12, 2026",
      time: "6:20 PM",
      read: true,
    },
  ];

  const filters = [
    { key: "all", label: "All", count: 12 },
    { key: "unread", label: "Unread", count: 2 },
    { key: "read", label: "Read", count: 1 },
  ];

  const getFilteredAnnouncements = () => {
    if (activeFilter === "unread") {
      return announcements.filter((a) => !a.read);
    }
    if (activeFilter === "read") {
      return announcements.filter((a) => a.read);
    }
    return announcements;
  };

  const filteredAnnouncements = getFilteredAnnouncements();

  return (
    <div className="SubjectTeacher-announcement-container">
      <div className="SubjectTeacher-announcement-header">
        <h1 className="SubjectTeacher-announcement-title">Announcements</h1>
        <p className="SubjectTeacher-announcement-subtitle">
          Stay updated with school notices and updates.
        </p>
      </div>

      <div className="SubjectTeacher-announcement-filters">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`SubjectTeacher-filter-tab ${activeFilter === filter.key ? "SubjectTeacher-active" : ""}`}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      <div className="SubjectTeacher-announcements-list">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="SubjectTeacher-announcement-card"
          >
            <div className="SubjectTeacher-announcement-content">
              <h3 className="SubjectTeacher-announcement-card-title">
                {announcement.title}
              </h3>
              <p className="SubjectTeacher-announcement-card-description">
                {announcement.description}
              </p>
              <div className="SubjectTeacher-announcement-meta">
                <span className="SubjectTeacher-announcement-date">
                  📅 {announcement.date}
                </span>
                <span className="SubjectTeacher-announcement-time">
                  🕐 {announcement.time}
                </span>
              </div>
            </div>
            <div className="SubjectTeacher-announcement-arrow">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectTeacherAnnouncement;
