import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import { FiTrendingUp, FiExternalLink } from "react-icons/fi";
import { IoQrCodeOutline, IoMegaphoneOutline } from "react-icons/io5";
import { LuUserPlus, LuFileSpreadsheet } from "react-icons/lu";
import { HiChevronRight } from "react-icons/hi";
import { apiClient } from "../../config/AxiosInstance";
import QRModal from "./QRModal";
import { useNavigate } from "react-router-dom";
import { getGreeting } from "../../helpers/greeting";
import { useSelector } from "react-redux";

// ── Your three state components ──────────────────────────────────────────────
import LoadingScreen from "../../components/Loading-Screen"; // adjust path
import ErrorScreen from "../../components/Error-Screen"; // adjust path
import EmptyState from "../../components/EmptyState"; // adjust path

const AdminDashboard = () => {
  const user = useSelector((state) => state.user.user.schoolName);

  // ── Summary (metrics cards) ───────────────────────────────────────────────
  const [summary, setSummary] = useState({});
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState(false);

  // ── Today's attendance (table) ────────────────────────────────────────────
  const [attendance, setAttendance] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceError, setAttendanceError] = useState(false);

  const [showQRModal, setShowQRModal] = useState(false);
  const nav = useNavigate();
  const subdomain = window.location.hostname.split(".")[0];

  // ── Fetch summary ─────────────────────────────────────────────────────────
  const fetchSummary = async () => {
    setSummaryLoading(true);
    setSummaryError(false);
    try {
      const res = await apiClient.get("/admin/dashboard");
      setSummary(res?.data?.summary);
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      setSummaryError(true);
    } finally {
      setSummaryLoading(false);
    }
  };

  // ── Fetch attendance ──────────────────────────────────────────────────────
  const fetchAttendance = async () => {
    setAttendanceLoading(true);
    setAttendanceError(false);
    try {
      const res = await apiClient.get("/staffattendance/today", {
        headers: { "x-tenant": subdomain },
      });
      setAttendance(res?.data?.Attendance || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setAttendanceError(true);
    } finally {
      setAttendanceLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchAttendance();
  }, []);

  if (summaryLoading && attendanceLoading) return <LoadingScreen />;

  if (summaryError && attendanceError) {
    return (
      <ErrorScreen
        title="Dashboard Sync Failed"
        message="We couldn't load your dashboard. Check your connection and try again."
        onRetry={() => {
          fetchSummary();
          fetchAttendance();
        }}
      />
    );
  }

  return (
    <div className="Bddashboard-container">
      <div className="dashboard-header">
        <div className="header-text-group">
          <h1 className="welcome-text">
            {getGreeting(user)}
            <span className="wave-emoji">👋</span>
          </h1>
          <p className="subtitle-text">
            Here's an overview of {user} activities today.
          </p>
        </div>
      </div>

      {summaryError ? (
        <ErrorScreen
          title="Metrics Unavailable"
          message="We couldn't load your summary stats. You can still use the rest of the dashboard."
          onRetry={fetchSummary}
        />
      ) : summaryLoading ? (
        <LoadingScreen />
      ) : (
        <div className="metrics-grid">
          <div className="metric-card card-total">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Total Students</span>
                <span className="card-value">{summary.totalStudents}</span>
              </div>
              <div className="icon-wrapper icon-students">
                <PiStudentFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FiTrendingUp className="trend-icon" />
            </div>
          </div>

          <div className="metric-card card-teaching">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Total Staff</span>
                <span className="card-value">{summary.totalStaff}</span>
              </div>
              <div className="icon-wrapper icon-staff">
                <HiMiniUserGroup className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FiTrendingUp className="trend-icon" />
            </div>
          </div>

          <div className="metric-card card-non-teaching">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Attendance Rate</span>
                <span className="card-value">
                  {summary.totalStaffAttendancePercent}%
                </span>
              </div>
              <div className="icon-wrapper icon-attendance">
                <PiCalendarBlankFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FiTrendingUp className="trend-icon" />
            </div>
          </div>

          <div className="metric-card card-teachers">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Fees Collected</span>
                <span className="card-value">{summary.totalFeesCollected}</span>
              </div>
              <div className="icon-wrapper icon-fees">
                <FaSackDollar className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-fees">
              <FiTrendingUp className="trend-icon" />
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom split: attendance table + quick actions ── */}
      <div className="dashboard-split-grid">
        {/* Attendance panel */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Today's Staff Attendance</h2>
            <button className="view-all-link">
              View All <FiExternalLink />
            </button>
          </div>

          <div className="panel-table-wrapper">
            {attendanceError ? (
              <ErrorScreen
                title="Attendance Unavailable"
                message="We couldn't fetch today's check-ins. Try refreshing."
                onRetry={fetchAttendance}
              />
            ) : attendanceLoading ? (
              <LoadingScreen />
            ) : attendance.length === 0 ? (
              <EmptyState
                title="No attendance yet"
                message="Staff have not checked in today. Share your QR code to get started."
                actionText="Generate QR Code"
                onAction={() => setShowQRModal(true)}
              />
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((staff) => (
                    <tr key={staff.id}>
                      <td className="font-medium text-slate">
                        {staff.staff?.fullName}
                      </td>
                      <td>{staff.staff?.role || "N/A"}</td>
                      <td>
                        {staff.checkInTime
                          ? new Date(staff.checkInTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "--"}
                      </td>
                      <td>
                        <span className="status-badge badge-checked-in">
                          Checked In
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick actions panel */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Quick Actions</h2>
          </div>
          <div className="actions-grid">
            <div
              onClick={() => setShowQRModal(true)}
              className="action-button-card action-qr"
            >
              <div className="action-main-content">
                <div className="action-icon-box">
                  <IoQrCodeOutline />
                </div>
                <div className="action-text">
                  <h3>Generate QR Code</h3>
                  <p>For staff to mark attendance</p>
                </div>
              </div>
              <div className="next_icon_holder">
                <HiChevronRight className="action-arrow" />
              </div>
            </div>

            <div
              className="action-button-card action-students"
              onClick={() => nav("/admin/AdminStudent2")}
            >
              <div className="action-main-content">
                <div className="action-icon-box">
                  <LuUserPlus />
                </div>
                <div className="action-text">
                  <h3>Add Students</h3>
                  <p>Register a student</p>
                </div>
              </div>
              <div className="next_icon_holder">
                <HiChevronRight className="action-arrow" />
              </div>
            </div>

            <div
              className="action-button-card action-announcements"
              onClick={() => nav("/admin/AdminClass")}
            >
              <div className="action-main-content">
                <div className="action-icon-box">
                  <IoMegaphoneOutline />
                </div>
                <div className="action-text">
                  <h3>Add Class</h3>
                  <p>Add Classes</p>
                </div>
              </div>
              <div className="next_icon_holder">
                <HiChevronRight className="action-arrow" />
              </div>
            </div>

            <div className="action-button-card action-reports">
              <div className="action-main-content">
                <div className="action-icon-box">
                  <LuFileSpreadsheet />
                </div>
                <div className="action-text">
                  <h3>View Report Cards</h3>
                  <p>View student results</p>
                </div>
              </div>
              <div className="next_icon_holder">
                <HiChevronRight className="action-arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <QRModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
    </div>
  );
};

export default AdminDashboard;
