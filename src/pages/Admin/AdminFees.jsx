import React, { useEffect, useState } from "react";
import "./AdminFees.css";
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar, FaArrowTrendUp } from "react-icons/fa6";
import { apiClient } from "../../config/AxiosInstance";

import LoadingScreen from "../../components/Loading-Screen";
import ErrorScreen from "../../components/Error-Screen";
import EmptyState from "../../components/EmptyState";

const AdminFees = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchFeesDashboard = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await apiClient.get("/payment/dashboard");
      setData(res?.data?.feesDashboard || null);
    } catch (err) {
      console.error(err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeesDashboard();
  }, []);

  const cards = data?.cards;
  const feeRecords = data?.feeRecords || [];

  const getStatusClass = (status) => {
    switch (status) {
      case "full payment":
      case "fully paid":
        return "fee-status-full";
      case "part payment":
        return "fee-status-part";
      case "unpaid":
        return "fee-status-unpaid";
      default:
        return "";
    }
  };

  if (isLoading) return <LoadingScreen />;

  if (hasError) {
    return (
      <ErrorScreen
        title="Fee Dashboard Unavailable"
        message="We couldn't load your fee management data. Check your connection and try again."
        onRetry={fetchFeesDashboard}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="No Fee Data Available"
        message="Your fee dashboard has no data yet. Fee records will appear here once students are assigned to classes with fee structures."
      />
    );
  }

  return (
    <>
      {/* ── Header + Metric Cards ── */}
      <div className="fee-dashboard">
        <header className="fee-dashboard-header">
          <h1 className="fee-dashboard-title">Fee Management</h1>
          <p className="fee-dashboard-subtitle">
            {data?.overviewText ||
              "Set up fee structures and monitor student fee payments."}
          </p>
        </header>

        <div className="fee-metrics-grid">
          <div className="fee-metric-card fee-metric-students">
            <div className="fee-metric-content">
              <div className="fee-metric-text">
                <span className="fee-metric-label">Total Students</span>
                <span className="fee-metric-value">
                  {cards?.totalStudents?.value || 0}
                </span>
              </div>
              <div className="fee-metric-icon fee-icon-students">
                <PiStudentFill className="fee-dash-icon" />
              </div>
            </div>
            <div className="fee-metric-footer fee-trend-up">
              <FaArrowTrendUp className="fee-trend-arrow" />
              {cards?.totalStudents?.fromLastWeek || 0} from last week
            </div>
          </div>

          <div className="fee-metric-card fee-metric-staff">
            <div className="fee-metric-content">
              <div className="fee-metric-text">
                <span className="fee-metric-label">Total Staff</span>
                <span className="fee-metric-value">
                  {cards?.totalStaff?.value || 0}
                </span>
              </div>
              <div className="fee-metric-icon fee-icon-staff">
                <HiMiniUserGroup className="fee-dash-icon" />
              </div>
            </div>
            <div className="fee-metric-footer fee-trend-up">
              <FaArrowTrendUp className="fee-trend-arrow" />
              {cards?.totalStaff?.fromLastWeek || 0} from last week
            </div>
          </div>

          <div className="fee-metric-card fee-metric-attendance">
            <div className="fee-metric-content">
              <div className="fee-metric-text">
                <span className="fee-metric-label">Attendance Rate</span>
                <span className="fee-metric-value">
                  {cards?.attendanceRate?.value || 0}%
                </span>
              </div>
              <div className="fee-metric-icon fee-icon-attendance">
                <PiCalendarBlankFill className="fee-dash-icon" />
              </div>
            </div>
            <div className="fee-metric-footer fee-trend-up">
              <FaArrowTrendUp className="fee-trend-arrow" />
              {cards?.attendanceRate?.fromLastWeek || 0} from last week
            </div>
          </div>

          <div className="fee-metric-card fee-metric-collected">
            <div className="fee-metric-content">
              <div className="fee-metric-text">
                <span className="fee-metric-label">Fees Collected</span>
                <span className="fee-metric-value">
                  ₦{cards?.feesCollected?.value || 0}
                </span>
              </div>
              <div className="fee-metric-icon fee-icon-collected">
                <FaSackDollar className="fee-dash-icon" />
              </div>
            </div>
            <div className="fee-metric-footer fee-trend-pct">
              <FaArrowTrendUp className="fee-trend-arrow" />
              {cards?.feesCollected?.percentCollected || 0}% fee collected
            </div>
          </div>
        </div>
      </div>

      {/* ── Table Section ── */}
      <div className="fee-table-section">
        {/* Filters */}
        <div className="fee-filter-bar">
          <div className="fee-filter-group">
            <div className="fee-filter-item">
              <label className="fee-filter-label">Class Section</label>
              <select className="fee-select">
                <option>{data?.filters?.classSection || "All Classes"}</option>
              </select>
            </div>
            <div className="fee-filter-item">
              <label className="fee-filter-label">Payment Status</label>
              <select className="fee-select">
                <option>{data?.filters?.paymentStatus || "All Status"}</option>
              </select>
            </div>
            <div className="fee-filter-item">
              <label className="fee-filter-label">Term</label>
              <select className="fee-select">
                <option>{data?.filters?.term || "Third Term"}</option>
              </select>
            </div>
          </div>

          <div className="fee-action-btns">
            <button className="fee-export-btn">Export</button>
            <button className="fee-reset-btn">Reset</button>
          </div>
        </div>

        {/* Records */}
        {feeRecords.length === 0 ? (
          <EmptyState
            title="No Fee Records Found"
            message="No payment records match the current filters. Try adjusting your selection or check back later."
          />
        ) : (
          <div className="fee-table-wrap">
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Total Amount</th>
                  <th>Amount Paid</th>
                  <th>Payment Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feeRecords.map((row, index) => (
                  <tr key={row.studentId || index}>
                    <td className="fee-student-name">{row.studentName}</td>
                    <td>{row.class}</td>
                    <td>₦{row.totalAmount}</td>
                    <td>₦{row.amountPaid}</td>
                    <td>{row.paymentType}</td>
                    <td>
                      <span
                        className={`fee-status-badge ${getStatusClass(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td>
                      {row.date
                        ? new Date(row.date).toLocaleDateString()
                        : "--"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="fee-footer">
        <span>
          © {new Date().getFullYear()} Ucheva school operating management system
        </span>
      </footer>
    </>
  );
};

export default AdminFees;
