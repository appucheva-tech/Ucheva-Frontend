import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "../css/DashboardPages.css";
import { apiClient } from "../../../config/AxiosInstance";

const DashboardPage = () => {
  const { selectedStudent } = useOutletContext();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardDetails = async () => {
    if (!selectedStudent?.id) return;
    try {
      setLoading(true);
      const response = await apiClient.get(
        `parent/parentdashboard/${selectedStudent.id}`,
      );
      setDashboardData(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch dashboard records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardDetails();
  }, [selectedStudent?.id]);

  if (loading)
    return (
      <div className="flex-center-view">
        <div className="loading-spinner-ring"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex-center-view">
        <p className="error-text">{error}</p>
      </div>
    );

  const {
    student = {},
    paymentHistory = [],
    monthlyAttendance = {},
  } = dashboardData?.dashboard || {};

  return (
    <div className="parent-dashboard-view">
      <div className="parent-dashboard-container">
        {/* Banner */}
        <div className="student-summary-banner">
          <div className="student-avatar-box">
            {/* Use your avatar icon here */}
            <div className="student-badge-icon">🎓</div>
          </div>
          <div className="student-summary-info">
            <h2 className="student-profile-name">{student.name}</h2>
            <div className="student-quick-metrics">
              <div className="metric-column">
                <span className="metric-label-text">Class</span>
                <span className="metric-value-text">{student.class}</span>
              </div>
              <div className="metric-column">
                <span className="metric-label-text">Fee Status</span>
                <span
                  className={`metric-value-text ${student.feeStatus === "unpaid" ? "fee-unpaid" : "fee-paid"}`}
                >
                  {student.feeStatus}
                </span>
              </div>
              <div className="metric-column">
                <span className="metric-label-text">Attendance</span>
                <span className="badge-pill-present">
                  {student.attendanceStatus || "Present"}
                </span>
              </div>
              <div className="metric-column">
                <span className="metric-label-text">Current Term</span>
                <span className="metric-value-text">
                  {student.currentTerm} . {student.session}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="parent-grid-layout">
          <div className="parent-dashboard-card main-history-card">
            <h3 className="card-section-title">Payment History</h3>
            {paymentHistory.length === 0 ? (
              <div className="empty-state-container">
                <div className="empty-icon">📁</div>
                <p>No payment records found for this period.</p>
                <button className="refresh-btn" onClick={fetchDashboardDetails}>
                  Try Refreshing
                </button>
              </div>
            ) : (
              <table className="payment-records-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Term</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((item, i) => (
                    <tr key={i}>
                      <td>{item.date}</td>
                      <td>{item.term}</td>
                      <td>{item.amount}</td>
                      <td>
                        <span className="status-pill">{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="parent-dashboard-card side-attendance-card">
            <h3 className="card-section-title">Monthly Attendance</h3>
            <div className="attendance-chart-layout">
              <div className="circular-progress-wrapper">
                <svg className="radial-chart-graphic" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="85" className="radial-track" />
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    className="radial-progress"
                    style={{
                      strokeDasharray: `${((monthlyAttendance.percentage || 0) / 100) * 534} 534`,
                    }}
                  />
                </svg>
                <div className="radial-center-labels">
                  <p className="radial-percentage">
                    {monthlyAttendance.percentage || 0}%
                  </p>
                  <p className="radial-subtext">
                    {monthlyAttendance.presentDays || 0} Days Present
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
