import React, { useEffect, useState } from "react";
import "./AdminFees.css";
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar, FaArrowTrendUp } from "react-icons/fa6";
import { apiClient } from "../../config/AxiosInstance";

// ── Your three state components ───────────────────────────────────────────────
import LoadingScreen from "../../components/Loading-Screen";     // adjust path
import ErrorScreen from "../../components/Error-Screen";         // adjust path
import EmptyState from "../../components/EmptyState";           // adjust path

const AdminFees = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // ── Fetch ─────────────────────────────────────────────────────────────────
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
      case "fully paid":  return "statusFull";
      case "part payment": return "statusPart";
      case "unpaid":       return "statusUnpaid";
      default:             return "";
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isLoading) return <LoadingScreen />;

  // ── Error state ───────────────────────────────────────────────────────────
  if (hasError) {
    return (
      <ErrorScreen
        title="Fee Dashboard Unavailable"
        message="We couldn't load your fee management data. Check your connection and try again."
        onRetry={fetchFeesDashboard}
      />
    );
  }

  // ── No data returned (API succeeded but empty) ────────────────────────────
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
      {/* ── Header + metrics ── */}
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="welcome-text">Fee Management</h1>
          <p className="subtitle-text">
            {data?.overviewText || "Set up fee structures and monitor student fee payments."}
          </p>
        </header>

        <div className="metrics-grid">
          <div className="metric-card card-students">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Total Students</span>
                <span className="card-value">{cards?.totalStudents?.value || 0}</span>
              </div>
              <div className="icon-wrapper icon-students">
                <PiStudentFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FaArrowTrendUp className="arrow" />{" "}
              {cards?.totalStudents?.fromLastWeek || 0} from last week
            </div>
          </div>

          <div className="metric-card card-staff">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Total Staff</span>
                <span className="card-value">{cards?.totalStaff?.value || 0}</span>
              </div>
              <div className="icon-wrapper icon-staff">
                <HiMiniUserGroup className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FaArrowTrendUp className="arrow" />{" "}
              {cards?.totalStaff?.fromLastWeek || 0} from last week
            </div>
          </div>

          <div className="metric-card card-attendance">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Attendance Rate</span>
                <span className="card-value">{cards?.attendanceRate?.value || 0}%</span>
              </div>
              <div className="icon-wrapper icon-attendance">
                <PiCalendarBlankFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FaArrowTrendUp className="arrow" />{" "}
              {cards?.attendanceRate?.fromLastWeek || 0} from last week
            </div>
          </div>

          <div className="metric-card card-fees">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Fees Collected</span>
                <span className="card-value">₦{cards?.feesCollected?.value || 0}</span>
              </div>
              <div className="icon-wrapper icon-fees">
                <FaSackDollar className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-pct">
              <FaArrowTrendUp className="arrow" />{" "}
              {cards?.feesCollected?.percentCollected || 0}% fee collected
            </div>
          </div>
        </div>
      </div>

      {/* ── Table section ── */}
      <div className="tableContainer">
        <div className="filterSection">
          <div className="filtersGroup">
            <div className="filterItem">
              <label className="filterLabel">Class Section</label>
              <select className="selectInput">
                <option>{data?.filters?.classSection || "All Classes"}</option>
              </select>
            </div>
            <div className="filterItem">
              <label className="filterLabel">Payment Status</label>
              <select className="selectInput">
                <option>{data?.filters?.paymentStatus || "All Status"}</option>
              </select>
            </div>
            <div className="filterItem">
              <label className="filterLabel">Term</label>
              <select className="selectInput">
                <option>{data?.filters?.term || "Third Term"}</option>
              </select>
            </div>
          </div>

          <div className="actionRowButtons">
            <button className="exportBtn">Export</button>
            <button className="resetBtn">Reset</button>
          </div>
        </div>

        {/* ── Fee records: empty or table ── */}
        {feeRecords.length === 0 ? (
          <EmptyState
            title="No Fee Records Found"
            message="No payment records match the current filters. Try adjusting your selection or check back later."
          />
        ) : (
          <div className="tableWrapper">
            <table className="feesTable">
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
                    <td>{row.studentName}</td>
                    <td>{row.class}</td>
                    <td>₦{row.totalAmount}</td>
                    <td>₦{row.amountPaid}</td>
                    <td>{row.paymentType}</td>
                    <td>
                      <span className={`statusBadge ${getStatusClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td>
                      {row.date ? new Date(row.date).toLocaleDateString() : "--"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="footerRow">
        <span>© {new Date().getFullYear()} Ucheva school operating management system</span>
      </footer>
    </>
  );
};

export default AdminFees;