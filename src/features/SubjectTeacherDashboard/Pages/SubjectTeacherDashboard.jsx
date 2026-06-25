import React, { useEffect, useState } from "react";
import "../SubjectTeacherDashboardStyles/SubjectTeacherDashboard.css";
import { apiClient } from "../../../config/AxiosInstance";
import { toast } from "react-toastify";
import QRScannerComponent from "../../Components/QRScannerComponent";

/* ─── Skeleton helpers ─────────────────────────────────────────────────── */
const Skeleton = ({
  width = "100%",
  height = "1rem",
  radius = "6px",
  style = {},
}) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius,
      background:
        "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
      backgroundSize: "200% 100%",
      animation: "STD-shimmer 1.4s infinite",
      ...style,
    }}
  />
);

const LoadingSkeleton = () => (
  <div className="SubjectTeacherDashboard-dashboard-container">
    <style>{`
      @keyframes STD-shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>

    {/* Header skeleton */}
    <div
      className="SubjectTeacherDashboard-dashboard-header"
      style={{ marginBottom: "1.5rem" }}
    >
      <Skeleton
        width="220px"
        height="2rem"
        style={{ marginBottom: "0.5rem" }}
      />
      <Skeleton width="120px" height="1rem" />
    </div>

    {/* Stat cards skeleton */}
    <div
      className="SubjectTeacherDashboard-stats-cards-container"
      style={{ marginBottom: "1.5rem" }}
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="SubjectTeacherDashboard-stat-card"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <Skeleton width="48px" height="48px" radius="12px" />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Skeleton width="60%" height="0.85rem" />
            <Skeleton width="40%" height="1.2rem" />
          </div>
        </div>
      ))}
    </div>

    {/* Main content skeleton */}
    <div className="SubjectTeacherDashboard-main-content">
      <div
        className="SubjectTeacherDashboard-checked-in-card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        <Skeleton width="72px" height="72px" radius="16px" />
        <Skeleton width="60%" height="1.4rem" />
        <Skeleton width="80%" height="0.85rem" />
        <Skeleton width="100%" height="2.8rem" radius="10px" />
        <div
          style={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            marginTop: "0.5rem",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <Skeleton width="80%" height="0.75rem" />
              <Skeleton width="50%" height="1.1rem" />
            </div>
          ))}
        </div>
      </div>

      <div
        className="SubjectTeacherDashboard-announcements-card"
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        <Skeleton width="180px" height="1.3rem" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "0.75rem",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "4px",
                minHeight: "60px",
                borderRadius: "4px",
                background: "#e2e8f0",
              }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Skeleton width="40%" height="0.9rem" />
                <Skeleton width="25%" height="0.9rem" />
              </div>
              <Skeleton width="90%" height="0.8rem" />
              <Skeleton width="70%" height="0.8rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
/* ──────────────────────────────────────────────────────────────────────── */

const SubjectTeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceStatus, setAttendanceStatus] = useState({
    isCheckedIn: false,
    checkInTime: null,
    message: "You have not checked in today",
  });
  const [showScanner, setShowScanner] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        "/subjectteacher/subject-teacher-dashboard",
      );
      const data = response?.data?.dashboard;
      setDashboardData(data);
      setAnnouncements(response?.data?.announcements || []);

      // Sync attendance status from server
      const checkedIn = data?.myAttendance?.toLowerCase() === "present";
      setAttendanceStatus((prev) => ({
        ...prev,
        isCheckedIn: checkedIn,
        message: checkedIn
          ? "You are securely checked in for today"
          : "You have not checked in today",
      }));
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Unable to load dashboard.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handle QR scan success
  const handleScanSuccess = async (decodedText) => {
    console.log("Attendance QR scanned:", decodedText);
    try {
      // await apiClient.post("/attendance/check-in", {
      //   qrCode: decodedText,
      //   timestamp: new Date().toISOString(),
      // });

      const now = new Date();
      const timeString = now.toLocaleTimeString();

      setAttendanceStatus({
        isCheckedIn: true,
        checkInTime: timeString,
        message: `Checked in successfully at ${timeString}`,
      });

      setShowScanner(false);
      toast.success(`Checked in successfully at ${timeString}`);
      await fetchDashboardData();
    } catch (error) {
      console.error("Check-in failed:", error);
      toast.error("Check-in failed. Please try again.");
    }
  };

  const handleScanError = (error) => {
    console.error("Scan error:", error);
  };

  if (loading) return <LoadingSkeleton />;

  const attendanceLabel =
    dashboardData?.myAttendance === "present"
      ? "Checked In"
      : dashboardData?.myAttendance === "absent"
        ? "Absent"
        : "Not Marked";

  const attendanceClass =
    dashboardData?.myAttendance === "present"
      ? "SubjectTeacherDashboard-checked-in"
      : "SubjectTeacherDashboard-absent";

  return (
    <div className="SubjectTeacherDashboard-dashboard-container">
      {/* Header */}
      <div className="SubjectTeacherDashboard-dashboard-header">
        <div className="SubjectTeacherDashboard-header-greeting">
          <h1>Good morning, Emeka 👋</h1>
          <p>Welcome back.</p>
        </div>
      </div>

      {/* Stat Cards */}
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
            <p
              className={`SubjectTeacherDashboard-stat-value ${attendanceClass}`}
            >
              {attendanceLabel}
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
            <p className="SubjectTeacherDashboard-stat-value">
              {dashboardData?.assignedClass?.length ?? 0}
            </p>
          </div>
        </div>

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
            <p className="SubjectTeacherDashboard-stat-value">
              {dashboardData?.studentHandling ?? 0}
            </p>
          </div>
        </div>

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
            <p className="SubjectTeacherDashboard-stat-value">
              {dashboardData?.assignedSubjects?.length ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="SubjectTeacherDashboard-main-content">
        {/* QR / Attendance Card */}
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

          <h2>
            {attendanceStatus.isCheckedIn
              ? "Checked In Successful"
              : "Not Checked In"}
          </h2>

          <p className="SubjectTeacherDashboard-check-in-description">
            {attendanceStatus.message}
          </p>

          <p className="SubjectTeacherDashboard-check-in-description">
            {attendanceStatus.isCheckedIn
              ? "Have a wonderful session!"
              : "Please scan the QR code to mark your attendance"}
          </p>

          {/* QR Scanner — mirrors Overview.jsx logic exactly */}
          <div className="qr-scanner-wrapper">
            {!attendanceStatus.isCheckedIn ? (
              <>
                <button
                  className="SubjectTeacherDashboard-check-out-btn"
                  onClick={() => setShowScanner(true)}
                  disabled={showScanner}
                >
                  {showScanner ? "Scanning..." : "📷 Scan QR to Check In"}
                </button>

                {showScanner && (
                  <div className="scanner-container">
                    <QRScannerComponent
                      onScanSuccess={handleScanSuccess}
                      onScanError={handleScanError}
                      isCheckedIn={attendanceStatus.isCheckedIn}
                      buttonText="Scan QR to Check In"
                    />
                    <button
                      className="qr-scan-close"
                      onClick={() => setShowScanner(false)}
                    >
                      ✕ Close Scanner
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="checked-in-status">
                <span className="checkin-icon">✅</span>
                <span className="checkin-text">Already Checked In</span>
                {attendanceStatus.checkInTime && (
                  <span className="checkin-time">
                    at {attendanceStatus.checkInTime}
                  </span>
                )}
              </div>
            )}
          </div>

          {attendanceStatus.isCheckedIn && attendanceStatus.checkInTime && (
            <div className="checkin-time-display">
              <span className="checkin-time-icon">🕐</span>
              Checked in at: {attendanceStatus.checkInTime}
            </div>
          )}

          {/* Student summary */}
          {dashboardData && (
            <div className="SubjectTeacherDashboard-student-summary">
              <div className="SubjectTeacherDashboard-summary-item">
                <span className="SubjectTeacherDashboard-summary-label">
                  Total Students
                </span>
                <span className="SubjectTeacherDashboard-summary-value">
                  {dashboardData.totalStudents ?? 0}
                </span>
              </div>
              <div className="SubjectTeacherDashboard-summary-item">
                <span className="SubjectTeacherDashboard-summary-label">
                  Present Today
                </span>
                <span className="SubjectTeacherDashboard-summary-value">
                  {dashboardData.studentsPresent ?? 0}
                </span>
              </div>
              <div className="SubjectTeacherDashboard-summary-item">
                <span className="SubjectTeacherDashboard-summary-label">
                  Male
                </span>
                <span className="SubjectTeacherDashboard-summary-value">
                  {dashboardData.maleStudents ?? 0}
                </span>
              </div>
              <div className="SubjectTeacherDashboard-summary-item">
                <span className="SubjectTeacherDashboard-summary-label">
                  Female
                </span>
                <span className="SubjectTeacherDashboard-summary-value">
                  {dashboardData.femaleStudents ?? 0}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Announcements */}
        <div className="SubjectTeacherDashboard-announcements-card">
          <h2>Recent Announcements</h2>
          <div className="SubjectTeacherDashboard-announcements-list">
            {announcements.length === 0 ? (
              <p className="SubjectTeacherDashboard-no-announcements">
                No announcements at this time.
              </p>
            ) : (
              announcements.map((announcement) => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectTeacherDashboard;
