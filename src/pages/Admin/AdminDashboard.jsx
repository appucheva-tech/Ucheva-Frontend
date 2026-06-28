import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import { FiTrendingUp, FiExternalLink } from "react-icons/fi";
import { IoQrCodeOutline, IoMegaphoneOutline } from "react-icons/io5";
import { LuUserPlus, LuFileSpreadsheet } from "react-icons/lu";
import { HiChevronRight } from "react-icons/hi";
import { PiCalendarBlank } from "react-icons/pi";
import { apiClient } from "../../config/AxiosInstance";
import QRModal from "./QRModal";
import { useNavigate } from "react-router-dom";
import { getGreeting } from "../../helpers/greeting";
import { useSelector } from "react-redux";

import LoadingScreen from "../../components/Loading-Screen";
import ErrorScreen from "../../components/Error-Screen";
import EmptyState from "../../components/EmptyState";

const AdminDashboard = () => {
  const user = useSelector((state) => state.user.user.schoolName);

  const [dashboardData, setDashboardData] = useState(null);
  const [summary, setSummary] = useState({});
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState(false);

  const [attendance, setAttendance] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceError, setAttendanceError] = useState(false);

  // ── Announcements ────────────────────────────────────────
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);
  const [announcementsError, setAnnouncementsError] = useState(false);

  // ── Fee Summary (derived from dashboard) ────────────────
  const [feeSummary, setFeeSummary] = useState({
    collected: 0,
    outstanding: 0,
    total: 0,
    percent: 0,
  });

  const [showQRModal, setShowQRModal] = useState(false);
  const nav = useNavigate();
  const subdomain = window.location.hostname.split(".")[0];

  // ── Fetch dashboard (includes summary + fee data) ──────
  const fetchDashboard = async () => {
    setSummaryLoading(true);
    setSummaryError(false);
    try {
      const res = await apiClient.get("/admin/dashboard");
      console.log("Dashboard response:", res);

      const data = res?.data?.dashboard || res?.data;
      const summaryData = res?.data?.summary || {};

      setDashboardData(data);
      setSummary(summaryData);

      // ── Extract fee data from dashboard ──────────────────
      // Fee data is in dashboard.cards.feesCollected
      const feesCollected = data?.cards?.feesCollected?.value || 0;
      const feesPercent = data?.cards?.feesCollected?.percentCollected || 0;

      // Calculate outstanding from the summary
      const totalFees = summaryData.totalFeesCollected || 0;

      // Alternative: Calculate from feeRecords if needed
      // const feeRecords = data?.feeRecords || [];
      // const totalFees = feeRecords.reduce((sum, record) => sum + (record.totalAmount || 0), 0);

      const collected = feesCollected;
      const total = totalFees > 0 ? totalFees : collected; // fallback
      const outstanding = Math.max(0, total - collected);
      const percent =
        feesPercent || (total > 0 ? Math.round((collected / total) * 100) : 0);

      setFeeSummary({
        collected,
        outstanding,
        total,
        percent,
      });
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      setSummaryError(true);
    } finally {
      setSummaryLoading(false);
    }
  };

  // ── Fetch attendance ──────────────────────────────────────────
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

  // ── Fetch announcements ──────────────────────────────────
  const fetchAnnouncements = async () => {
    setAnnouncementsLoading(true);
    setAnnouncementsError(false);
    try {
      const res = await apiClient.get("/announcement/recent-announcement");
      setAnnouncements(res?.data?.getAll || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setAnnouncementsError(true);
    } finally {
      setAnnouncementsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard(); // This now handles both summary and fee data
    fetchAttendance();
    fetchAnnouncements();
  }, []);

  // ── Donut chart math ──────────────────────────────────────────
  const RADIUS = 54;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 339.3
  const filledArc = (feeSummary.percent / 100) * CIRCUMFERENCE;
  const gapArc = CIRCUMFERENCE - filledArc;

  // ── Format currency ───────────────────────────────────────────
  const formatNaira = (val) => `₦${Number(val || 0).toLocaleString("en-NG")}`;

  // ── Announcement border colours (cycle through 3) ─────────────
  const borderColors = ["color-blue", "color-sky", "color-navy"];

  // ── Format announcement date ──────────────────────────────────
  const formatAnnouncementDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (summaryLoading && attendanceLoading) return <LoadingScreen />;

  if (summaryError && attendanceError) {
    return (
      <ErrorScreen
        title="Dashboard Sync Failed"
        message="We couldn't load your dashboard. Check your connection and try again."
        onRetry={() => {
          fetchDashboard();
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

      {/* ── Metric cards ── */}
      {summaryError ? (
        <ErrorScreen
          title="Metrics Unavailable"
          message="We couldn't load your summary stats. You can still use the rest of the dashboard."
          onRetry={fetchDashboard}
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
                <span className="card-value">
                  {formatNaira(summary.totalFeesCollected || 0)}
                </span>
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

      {/* ── Attendance + Quick Actions ── */}
      <div className="dashboard-split-grid">
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
                        {staff.staff?.firstName + " " + staff.staff?.lastName}
                      </td>
                      <td>{staff.staff?.staffType || "N/A"}</td>
                      <td>
                        {staff.checkInTime
                          ? new Date(staff.timeCheckedIn).toLocaleTimeString(
                              [],
                              { hour: "2-digit", minute: "2-digit" },
                            )
                          : new Date(staff.timeCheckedOut).toLocaleTimeString(
                              [],
                              { hour: "2-digit", minute: "2-digit" },
                            )}
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
                  <h3>Send Announcement</h3>
                  <p>Notify staff or parents</p>
                </div>
              </div>
              <div className="next_icon_holder">
                <HiChevronRight className="action-arrow" />
              </div>
            </div>

            <div
              className="action-button-card action-reports"
              onClick={() => nav("/admin/AdminReportCards")}
            >
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

      {/* ══════════════════════════════════════════════════════════
          Announcements + Fee Collection Summary Section
      ══════════════════════════════════════════════════════════ */}
      <div className="dashboard-split-grid">
        {/* ── Recent Announcements ── */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Recent Announcements</h2>
          </div>

          <div className="announcements-list">
            {announcementsLoading ? (
              <LoadingScreen />
            ) : announcementsError ? (
              <ErrorScreen
                title="Unavailable"
                message="Could not load announcements."
                onRetry={fetchAnnouncements}
              />
            ) : announcements.length === 0 ? (
              <div className="empty-state-container1">
                <div className="empty-state-icon">📢</div>
                <p className="empty-state-title">No announcements yet</p>
                <p className="empty-state-description">
                  Announcements posted this term will appear here.
                </p>
              </div>
            ) : (
              announcements.slice(0, 3).map((item, i) => (
                <div
                  key={item.id || i}
                  className={`announcement-item ${borderColors[i % borderColors.length]}`}
                >
                  <h3>{item.title}</h3>

                  <span className="announcement-date">
                    <PiCalendarBlank
                      style={{
                        display: "inline",
                        marginRight: 4,
                        verticalAlign: "middle",
                      }}
                    />
                    {item.status
                      ? `${item.status.charAt(0).toUpperCase() + item.status.slice(1)} · `
                      : ""}
                    {formatAnnouncementDate(item.scheduledAt || item.createdAt)}
                  </span>

                  <p>{item.content || ""}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Fee Collection Summary ── */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Fee Collection Summary</h2>
          </div>

          {summaryLoading ? (
            <LoadingScreen />
          ) : summaryError ? (
            <ErrorScreen
              title="Fee Data Unavailable"
              message="Could not load fee collection data."
              onRetry={fetchDashboard}
            />
          ) : (
            <div className="fees-summary-container">
              {/* Donut chart */}
              <div className="donut-chart-wrapper">
                <svg className="donut-svg" viewBox="0 0 120 120">
                  {/* Background track */}
                  <circle
                    cx="60"
                    cy="60"
                    r={RADIUS}
                    fill="none"
                    stroke="#fff7ed"
                    strokeWidth="12"
                  />
                  {/* Filled arc */}
                  <circle
                    cx="60"
                    cy="60"
                    r={RADIUS}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${filledArc} ${gapArc}`}
                    strokeDashoffset={CIRCUMFERENCE * 0.25}
                    style={{ transition: "stroke-dasharray 0.6s ease" }}
                  />
                </svg>
                <div className="donut-text">
                  <span className="percentage">{feeSummary.percent}%</span>
                  <span className="label">collected</span>
                </div>
              </div>

              {/* Ledger */}
              <div className="fees-ledger-pane">
                <div className="ledger-item">
                  <div className="ledger-label-group">
                    <span className="ledger-marker marker-collected" />
                    <span className="ledger-name">Collected</span>
                  </div>
                  <span className="ledger-value font-semibold">
                    {formatNaira(feeSummary.collected)}
                  </span>
                </div>

                <div className="ledger-item">
                  <div className="ledger-label-group">
                    <span className="ledger-marker marker-outstanding" />
                    <span className="ledger-name">Outstanding</span>
                  </div>
                  <span className="ledger-value font-semibold">
                    {formatNaira(feeSummary.outstanding)}
                  </span>
                </div>

                <hr className="ledger-divider" />

                <div className="ledger-item total-row">
                  <span className="ledger-name font-bold">Total fee</span>
                  <span className="ledger-value font-bold">
                    {formatNaira(feeSummary.total)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* ══════════════════════════════════════════════════════════ */}

      <QRModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
    </div>
  );
};

export default AdminDashboard;
