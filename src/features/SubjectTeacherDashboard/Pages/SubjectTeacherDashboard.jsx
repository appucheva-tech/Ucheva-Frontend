import React, { useEffect, useState } from "react";
import "../SubjectTeacherDashboardStyles/SubjectTeacherDashboard.css";
import { apiClient } from "../../../config/AxiosInstance";
import { toast } from "react-toastify";
const SubjectTeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Staff Meeting",
      description: "All staff members are required to attend the mo...",
      date: "May 18, 2026",
    },
    {
      id: 2,
      title: "Resumption",
      description: "School will resume normal activities on Monday. Please ...",
      date: "May 15, 2026",
    },
    {
      id: 3,
      title: "Environmental Notice",
      description: "Weekly environmental sanitation will be held on...",
      date: "May 13, 2026",
    },
  ]);

  const fetchDashboardData = async () => {
    try {
      const response = await apiClient.get(
        "/subjectTeacher/subject-teacher-dashboard",
      );
      console.log("Dashbaord Data:", response?.data);
      // setAnnouncements(response.data?.announcements || []);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Unable to load announcements.";
      toast.error(errorMessage);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="SubjectTeacherDashboard-dashboard-container">
      {/* Header Section */}
      <div className="SubjectTeacherDashboard-dashboard-header">
        <div className="SubjectTeacherDashboard-header-greeting">
          <h1>Good morning, Emeka 👋</h1>
          <p>Welcome back.</p>
        </div>
      </div>

      <div className="SubjectTeacherDashboard-stats-cards-container">
        <div className="SubjectTeacherDashboard-stat-card">
          <div className="SubjectTeacherDashboard-stat-icon SubjectTeacherDashboard-blue-icon">
            <svg
              width="24"
              height="24"
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
          </div>
          <div className="SubjectTeacherDashboard-stat-content">
            <p className="SubjectTeacherDashboard-stat-label">My Attendance</p>
            <p className="SubjectTeacherDashboard-stat-value SubjectTeacherDashboard-checked-in">
              Checked In
            </p>
          </div>
        </div>

        <div className="SubjectTeacherDashboard-stat-card">
          <div className="SubjectTeacherDashboard-stat-icon SubjectTeacherDashboard-purple-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="SubjectTeacherDashboard-stat-content">
            <p className="SubjectTeacherDashboard-stat-label">
              Assigned Classes
            </p>
            <p className="SubjectTeacherDashboard-stat-value">6</p>
          </div>
        </div>

        {/* Student Handling Card */}
        <div className="SubjectTeacherDashboard-stat-card">
          <div className="SubjectTeacherDashboard-stat-icon SubjectTeacherDashboard-yellow-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9c0-1 .895-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"></path>
              <path d="M9 9v12m7-12v12M4 21h16"></path>
              <path d="M6.5 15h11"></path>
            </svg>
          </div>
          <div className="SubjectTeacherDashboard-stat-content">
            <p className="SubjectTeacherDashboard-stat-label">
              Student Handling
            </p>
            <p className="SubjectTeacherDashboard-stat-value">23</p>
          </div>
        </div>

        {/* Assigned Subject Card */}
        <div className="SubjectTeacherDashboard-stat-card">
          <div className="SubjectTeacherDashboard-stat-icon SubjectTeacherDashboard-green-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <div className="SubjectTeacherDashboard-stat-content">
            <p className="SubjectTeacherDashboard-stat-label">
              Assigned Subject
            </p>
            <p className="SubjectTeacherDashboard-stat-value">2</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="SubjectTeacherDashboard-main-content">
        {/* Checked In Card */}
        <div className="SubjectTeacherDashboard-checked-in-card">
          <div className="SubjectTeacherDashboard-qr-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="8" height="8"></rect>
              <rect x="13" y="3" width="8" height="8"></rect>
              <rect x="3" y="13" width="8" height="8"></rect>
              <rect x="14" y="14" width="6" height="6"></rect>
            </svg>
          </div>
          <h2>Checked In Succesful</h2>
          <p className="SubjectTeacherDashboard-check-in-time">
            Check-in Time 7:42 AM
          </p>
          <p className="SubjectTeacherDashboard-check-in-description">
            Please scan the QR code to mark your attendance
          </p>
          <button className="SubjectTeacherDashboard-check-out-btn">
            Scan QR to Check Out
          </button>
        </div>

        {/* Recent Announcements Card */}
        <div className="SubjectTeacherDashboard-announcements-card">
          <h2>Recent Announcements</h2>
          <div className="SubjectTeacherDashboard-announcements-list">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="SubjectTeacherDashboard-announcement-item"
              >
                <div className="SubjectTeacherDashboard-announcement-left-border"></div>
                <div className="SubjectTeacherDashboard-announcement-content">
                  <div className="SubjectTeacherDashboard-announcement-header">
                    <h3>{announcement.title}</h3>
                    <span className="SubjectTeacherDashboard-announcement-date">
                      {announcement.date}
                    </span>
                  </div>
                  <p>{announcement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectTeacherDashboard;
