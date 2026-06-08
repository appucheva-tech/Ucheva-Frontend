import React, { useState } from "react";
import "../SecurityStyles/SecurityAnnouncement.css";

export default function SecurityAnnouncement() {
  const [activeTab, setActiveTab] = useState("all");

  const announcements = [
    {
      id: 1,
      title: "Staff Meeting Reminder",
      description:
        "All staff members are required to attend the meeting scheduled for Monday, 19th May 2026 by 2:00 PM in the school hall. Thank you.",
      date: "May 18, 2026",
      time: "8:30 AM",
    },
    {
      id: 2,
      title: "Resumption of Normal Activities",
      description:
        "This is to inform all staff that the school will resume normal activities on Monday, 19th May 2026. Please be punctual.",
      date: "May 15, 2026",
      time: "4:45 PM",
    },
    {
      id: 3,
      title: "Environmental Sanitation Exercise",
      description:
        "Weekly environmental sanitation exercise will hold on Saturday, 24th May 2026. All staff are expected to participate.",
      date: "May 13, 2026",
      time: "9:00 AM",
    },
    {
      id: 4,
      title: "Emergency Closure Update",
      description:
        "Due to the forecasted heavy rainfall, the school will be closed on Tuesday, 20th May 2026 for safety purposes.",
      date: "May 12, 2026",
      time: "6:20 PM",
    },
  ];

  return (
    <div className="security-announcement">
      <div className="announcement-header">
        <h1>Announcements</h1>
        <p>Stay updated with school notices and updates.</p>
      </div>

      <div className="announcement-tabs">
        <button
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All (12)
        </button>
        <button
          className={`tab ${activeTab === "unread" ? "active" : ""}`}
          onClick={() => setActiveTab("unread")}
        >
          Unread (2)
        </button>
        <button
          className={`tab ${activeTab === "read" ? "active" : ""}`}
          onClick={() => setActiveTab("read")}
        >
          Read (1)
        </button>
      </div>

      <div className="announcement-list">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="announcement-card">
            <div className="announcement-content">
              <h2>{announcement.title}</h2>
              <p>{announcement.description}</p>
              <div className="announcement-meta">
                <span className="meta-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {announcement.date}
                </span>
                <span className="meta-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {announcement.time}
                </span>
              </div>
            </div>
            <div className="announcement-arrow">
              <svg
                width="20"
                height="20"
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
}
