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

const AdminDashboard = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [sumarry, setSumarry] = useState({});
const [attendanceData, setAttendanceData] = useState([]);
const [loadingAttendance, setLoadingAttendance] = useState(false);
  useEffect(() => {
    const getDashboardSummary = async () => {
      try {
        const res = await apiClient.get("/admin/dashboard");

        setSumarry(res?.data?.summary);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    getDashboardSummary();
  }, []);


const formatTime = (time) => {
  if (!time) return "--";

  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
const getTodayAttendance = async () => {
  try {
    setLoadingAttendance(true);

    const response = await apiClient.get("/staffattendance/today");

    setAttendanceData(response.data.Attendance || []);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingAttendance(false);
  }
};
useEffect(() => {
  getTodayAttendance();
}, []);

  return (
    <div className="Bddashboard-container">
      <div className="dashboard-header">
        <div className="header-text-group">
          <h1 className="welcome-text">
            Good morning, Mr Eric <span className="wave-emoji">👋</span>
          </h1>
          <p className="subtitle-text">
            Here's an overview of Green Field Academy activities today.
          </p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card card-total">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Total Students</span>
              <span className="card-value">{sumarry.totalStudents}</span>
            </div>
            <div className="icon-wrapper icon-students">
              <PiStudentFill className="DashIcon" />
            </div>
          </div>
          <div className="card-footer trend-up">
            <FiTrendingUp className="trend-icon" />
            <span>12 from last week</span>
          </div>
        </div>

        <div className="metric-card card-teaching">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Total Staff</span>
              <span className="card-value">{sumarry.totalStaff}</span>
            </div>
            <div className="icon-wrapper icon-staff">
              <HiMiniUserGroup className="DashIcon" />
            </div>
          </div>
          <div className="card-footer trend-up">
            <FiTrendingUp className="trend-icon" />
            <span>2 from last week</span>
          </div>
        </div>

        <div className="metric-card card-non-teaching">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Attendance Rate</span>
              <span className="card-value">
                {sumarry.totalStaffAttendancePercent}%
              </span>
            </div>
            <div className="icon-wrapper icon-attendance">
              <PiCalendarBlankFill className="DashIcon" />
            </div>
          </div>
          <div className="card-footer trend-up">
            <FiTrendingUp className="trend-icon" />
            <span>2 from last week</span>
          </div>
        </div>

        <div className="metric-card card-teachers">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Fees Collected</span>
              <span className="card-value">{sumarry.totalFeesCollected}</span>
            </div>
            <div className="icon-wrapper icon-fees">
              <FaSackDollar className="DashIcon" />
            </div>
          </div>
          <div className="card-footer trend-fees">
            <FiTrendingUp className="trend-icon" />
            <span>72% fee collected</span>
          </div>
        </div>
      </div>

   


<div className="dashboard-split-grid">
  <div className="dashboard-panel">
    <div className="panel-header">
      <h2 className="panel-title">Today's Staff Attendance</h2>

      <button className="view-all-link">
        View All <FiExternalLink />
      </button>
    </div>

    <div className="panel-table-wrapper">
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
          {loadingAttendance ? (
            <tr>
              <td colSpan="4">Loading attendance...</td>
            </tr>
          ) : attendanceData.length > 0 ? (
            attendanceData.map((attendance) => (
              <tr key={attendance.id}>
                <td className="font-medium text-slate">
                  {attendance.staff?.fullName || "N/A"}
                </td>

                <td>
                  {attendance.staff?.staffType || "Staff"}
                </td>

                <td>
                  {formatTime(attendance.timeCheckedIn)}
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      attendance.timeCheckedOut
                        ? "badge-checked-out"
                        : attendance.status === "present"
                        ? "badge-checked-in"
                        : "badge-absent"
                    }`}
                  >
                    {attendance.timeCheckedOut
                      ? "Checked Out"
                      : attendance.status === "present"
                      ? "Checked In"
                      : "Absent"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No attendance records for today.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

  {/* Quick Actions */}
  <div className="dashboard-panel">
    <div className="panel-header">
      <h2 className="panel-title">Quick Actions</h2>
    </div>

    <div className="actions-grid">
      ...
    </div>
  </div>
</div>












      <div className="dashboard-split-grid">
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Recent Announcements</h2>
          </div>
          <div className="announcements-list">
            <div className="announcement-item color-blue">
              <h3>PTA Meeting</h3>
              <span className="announcement-date">
                Scheduled - May 28, 2026
              </span>
              <p>
                All parents are invited to attend the quarterly meeting to
                discuss upcoming changes...
              </p>
            </div>

            <div className="announcement-item color-sky">
              <h3>Mid-term break notice</h3>
              <span className="announcement-date">May 18, 2026</span>
              <p>
                School will close for mid-term break from May 20th to 24th...
              </p>
            </div>

            <div className="announcement-item color-navy">
              <h3>Sports Day Event</h3>
              <span className="announcement-date">May 15, 2026</span>
              <p>Annual inter-house sports competition will be held...</p>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Fee Collection Summary</h2>
          </div>
          <div className="fees-summary-container">
            <div className="donut-chart-wrapper">
              <svg viewBox="0 0 100 100" className="donut-svg">
                <circle cx="50" cy="50" r="40" className="donut-bg" />
                <circle cx="50" cy="50" r="40" className="donut-fill" />
              </svg>
              <div className="donut-text">
                <span className="percentage">72%</span>
                <span className="label">collected</span>
              </div>
            </div>

            <div className="fees-ledger-pane">
              <div className="ledger-item">
                <div className="ledger-label-group">
                  <span className="ledger-marker marker-collected"></span>
                  <span className="ledger-name">Collected</span>
                </div>
                <span className="ledger-value font-semibold">N1,200,000</span>
              </div>
              <div className="ledger-item">
                <div className="ledger-label-group">
                  <span className="ledger-marker marker-outstanding"></span>
                  <span className="ledger-name">Outstanding</span>
                </div>
                <span className="ledger-value font-semibold">N400,000</span>
              </div>
              <hr className="ledger-divider" />
              <div className="ledger-item total-row">
                <span className="ledger-name font-medium text-slate">
                  Total fee
                </span>
                <span className="ledger-value font-bold text-slate">
                  N1,600,000
                </span>
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
