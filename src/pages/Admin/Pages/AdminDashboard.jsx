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
import { apiClient } from "../../../config/AxiosInstance";
import QRModal from "../QRModal";
import { useNavigate } from "react-router-dom";
import { getGreeting } from "../../../helpers/greeting";
import { useSelector } from "react-redux";

import LoadingScreen from "../../../components/Loading-Screen";
import ErrorScreen from "../../../components/Error-Screen";
import EmptyState from "../../../components/EmptyState";

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
  const formatNaira = (val) => `N${Number(val || 0).toLocaleString("en-NG")}`;

  // ── Announcement border colours (cycle through 3) ─────────────
  const borderColors = ["Army-color-blue", "Army-color-sky", "Army-color-navy"];

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
    <div className="Army-Bddashboard-container">
      <div className="Army-dashboard-header">
        <div className="Army-header-text-group">
          <h1 className="Army-welcome-text">
            {getGreeting(user)}
            <span className="Army-wave-emoji">👋</span>
          </h1>
          <p className="Army-subtitle-text">
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
        <div className="Army-metrics-grid1">
          <div className="Army-metric-card Army-card-total">
            <div className="Army-card-content">
              <div className="Army-text-section">
                <span className="Army-card-label">Total Students</span>
                <span className="Army-card-value">{summary.totalStudents}</span>
              </div>
              <div className="Army-icon-wrapper Army-icon-students">
                <PiStudentFill className="Army-DashIcon" />
              </div>
            </div>
            <div className="Army-card-footer Army-trend-up">
              <FiTrendingUp className="Army-trend-icon" />
            </div>
          </div>

          <div className="Army-metric-card Army-card-teaching">
            <div className="Army-card-content">
              <div className="Army-text-section">
                <span className="Army-card-label">Total Staff</span>
                <span className="Army-card-value">{summary.totalStaff}</span>
              </div>
              <div className="Army-icon-wrapper Army-icon-staff">
                <HiMiniUserGroup className="Army-DashIcon" />
              </div>
            </div>
            <div className="Army-card-footer Army-trend-up">
              <FiTrendingUp className="Army-trend-icon" />
            </div>
          </div>

          <div className="Army-metric-card Army-card-non-teaching">
            <div className="Army-card-content">
              <div className="Army-text-section">
                <span className="Army-card-label">Attendance Rate</span>
                <span className="Army-card-value">
                  {summary.totalStaffAttendancePercent}%
                </span>
              </div>
              <div className="Army-icon-wrapper Army-icon-attendance">
                <PiCalendarBlankFill className="Army-DashIcon" />
              </div>
            </div>
            <div className="Army-card-footer Army-trend-up">
              <FiTrendingUp className="Army-trend-icon" />
            </div>
          </div>

          <div className="Army-metric-card Army-card-teachers">
            <div className="Army-card-content">
              <div className="Army-text-section">
                <span className="Army-card-label">Fees Collected</span>
                <span className="Army-card-value">
                  {formatNaira(summary.totalFeesCollected || 0)}
                </span>
              </div>
              <div className="Army-icon-wrapper Army-icon-fees">
                <FaSackDollar className="Army-DashIcon" />
              </div>
            </div>
            <div className="Army-card-footer Army-trend-fees">
              <FiTrendingUp className="Army-trend-icon" />
            </div>
          </div>
        </div>
      )}

      {/* ── Attendance + Quick Actions ── */}
      <div className="Army-dashboard-split-grid">
        <div className="Army-dashboard-panel">
          <div className="Army-panel-header">
            <h2 className="Army-panel-title">Today's Staff Attendance</h2>
            <button className="Army-view-all-link">
              View All <FiExternalLink />
            </button>
          </div>

          <div className="Army-panel-table-wrapper">
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
                // actionText="Generate QR Code"
                onAction={() => setShowQRModal(true)}
              />
            ) : (
              <table className="Army-dashboard-table">
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
                      <td className="Army-font-medium Army-text-slate">
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
                        <span className="Army-status-badge Army-badge-checked-in">
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

        <div className="Army-dashboard-panel">
          <div className="Army-panel-header">
            <h2 className="Army-panel-title">Quick Actions</h2>
          </div>
          <div className="Army-actions-grid">
            <div
              onClick={() => setShowQRModal(true)}
              className="Army-action-button-card Army-action-qr"
            >
              <div className="Army-action-main-content">
                <div className="Army-action-icon-box">
                  <IoQrCodeOutline />
                </div>
                <div className="Army-action-text">
                  <h3>Generate QR Code</h3>
                  <p>For staff to mark attendance</p>
                </div>
              </div>
              <div className="Army-next_icon_holder">
                <HiChevronRight className="Army-action-arrow" />
              </div>
            </div>

            <div
              className="Army-action-button-card Army-action-students"
              onClick={() => nav("/admin/AdminStudent2")}
            >
              <div className="Army-action-main-content">
                <div className="Army-action-icon-box">
                  <LuUserPlus />
                </div>
                <div className="Army-action-text">
                  <h3>Add Students</h3>
                  <p>Register a student</p>
                </div>
              </div>
              <div className="Army-next_icon_holder">
                <HiChevronRight className="Army-action-arrow" />
              </div>
            </div>

            <div
              className="Army-action-button-card Army-action-announcements"
              onClick={() => nav("/admin/AdminClass")}
            >
              <div className="Army-action-main-content">
                <div className="Army-action-icon-box">
                  <IoMegaphoneOutline />
                </div>
                <div className="Army-action-text">
                  <h3>Send Announcement</h3>
                  <p>Notify staff or parents</p>
                </div>
              </div>
              <div className="Army-next_icon_holder">
                <HiChevronRight className="Army-action-arrow" />
              </div>
            </div>

            <div
              className="Army-action-button-card Army-action-reports"
              onClick={() => nav("/admin/AdminReportCards")}
            >
              <div className="Army-action-main-content">
                <div className="Army-action-icon-box">
                  <LuFileSpreadsheet />
                </div>
                <div className="Army-action-text">
                  <h3>View Report Cards</h3>
                  <p>View student results</p>
                </div>
              </div>
              <div className="Army-next_icon_holder">
                <HiChevronRight className="Army-action-arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          Announcements + Fee Collection Summary Section
      ══════════════════════════════════════════════════════════ */}
      <div className="Army-dashboard-split-grid">
        {/* ── Recent Announcements ── */}
        <div className="Army-dashboard-panel">
          <div className="Army-panel-header">
            <h2 className="Army-panel-title">Recent Announcements</h2>
          </div>

          <div className="Army-announcements-list">
            {announcementsLoading ? (
              <LoadingScreen />
            ) : announcementsError ? (
              <ErrorScreen
                title="Unavailable"
                message="Could not load announcements."
                onRetry={fetchAnnouncements}
              />
            ) : announcements.length === 0 ? (
              <div className="Army-empty-state-container1">
                <div className="Army-empty-state-icon">📢</div>
                <p className="Army-empty-state-title">No announcements yet</p>
                <p className="Army-empty-state-description">
                  Announcements posted this term will appear here.
                </p>
              </div>
            ) : (
              announcements.slice(0, 3).map((item, i) => (
                <div
                  key={item.id || i}
                  className={`Army-announcement-item ${borderColors[i % borderColors.length]}`}
                >
                  <h3>{item.title}</h3>

                  <span className="Army-announcement-date">
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
        <div className="Army-dashboard-panel">
          <div className="Army-panel-header">
            <h2 className="Army-panel-title">Fee Collection Summary</h2>
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
            <div className="Army-fees-summary-container">
              {/* Donut chart */}
              <div className="Army-donut-chart-wrapper">
                <svg className="Army-donut-svg" viewBox="0 0 120 120">
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
                <div className="Army-donut-text">
                  <span className="Army-percentage">{feeSummary.percent}%</span>
                  <span className="Army-label">collected</span>
                </div>
              </div>

              {/* Ledger */}
              <div className="Army-fees-ledger-pane">
                <div className="Army-ledger-item">
                  <div className="Army-ledger-label-group">
                    <span className="Army-ledger-marker Army-marker-collected" />
                    <span className="Army-ledger-name">Collected</span>
                  </div>
                  <span className="Army-ledger-value Army-font-semibold">
                    {formatNaira(feeSummary.collected)}
                  </span>
                </div>

                <div className="Army-ledger-item">
                  <div className="Army-ledger-label-group">
                    <span className="Army-ledger-marker Army-marker-outstanding" />
                    <span className="Army-ledger-name">Outstanding</span>
                  </div>
                  <span className="Army-ledger-value Army-font-semibold">
                    {formatNaira(feeSummary.outstanding)}
                  </span>
                </div>

                <hr className="Army-ledger-divider" />

                <div className="Army-ledger-item Army-total-row">
                  <span className="Army-ledger-name Army-font-bold">
                    Total fee
                  </span>
                  <span className="Army-ledger-value Army-font-bold">
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
