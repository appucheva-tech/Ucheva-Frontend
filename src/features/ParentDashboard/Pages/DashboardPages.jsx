import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "../css/DashboardPages.css";
import { apiClient } from "../../../config/AxiosInstance";
import { FaUserGraduate } from "react-icons/fa6";
import LoadingScreen from "../../../components/Loading-Screen";

const DashboardPage = () => {
  const { selectedStudent, parentName } = useOutletContext();
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

  if (loading) return <LoadingScreen />;
  if (error)
    return (
      <div className="parent-flex-center-view">
        <p className="parent-error-text">{error}</p>
      </div>
    );

  const {
    student = {},
    paymentHistory = [],
    monthlyAttendance = {},
    parent = {},
  } = dashboardData?.dashboard || {};

  const fullParentName =
    parent?.name ||
    dashboardData?.parentName ||
    dashboardData?.dashboard?.parentName ||
    parentName ||
    "Parent";

  // Extract only the first name for greeting
  const parentDisplayName = fullParentName.split(" ")[0];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="parent-dashboard-view parent-nunito-content">
      <div className="parent-dashboard-container">
        <div className="parent-dashboard-header">
          <h1 className="parent-greeting-title">
            {getGreeting()}, {parentDisplayName} 👋
          </h1>
          <p className="parent-greeting-subtitle">
            Here's {student.name || "your child"}'s activity summary for today.
          </p>
        </div>

        <div className="parent-student-summary-banner">
          <div className="parent-student-avatar-box">
            <div className="parent-student-badge-icon">
              <FaUserGraduate size={32} />
            </div>
          </div>
          <div className="parent-student-summary-info">
            <h2 className="parent-student-profile-name">{student.name}</h2>
            <div className="parent-student-quick-metrics">
              <div className="parent-metric-column">
                <span className="parent-metric-label-text">Class</span>
                <span className="parent-metric-value-text">
                  {student.class}
                </span>
              </div>
              <div className="parent-metric-column">
                <span className="parent-metric-label-text">Fee Status</span>
                <span
                  className={`parent-metric-value-text ${student.feeStatus === "unpaid" ? "parent-fee-unpaid" : "parent-fee-paid"}`}
                >
                  {student.feeStatus}
                </span>
              </div>
              <div className="parent-metric-column">
                <span className="parent-metric-label-text">Attendance</span>
                <span className="parent-badge-pill-present">
                  {student.attendanceStatus || "Present"}
                </span>
              </div>
              <div className="parent-metric-column">
                <span className="parent-metric-label-text">Current Term</span>
                <span className="parent-metric-value-text">
                  {student.currentTerm} . {student.session}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="parent-grid-layout">
          <div className="parent-dashboard-card1 parent-main-history-card">
            <h3 className="parent-card-section-title">Payment History</h3>
            {paymentHistory.length === 0 ? (
              <div className="parent-empty-state-container">
                <div className="parent-empty-icon">📁</div>
                <p>No payment records found for this period.</p>
                <button
                  className="parent-refresh-btn"
                  onClick={fetchDashboardDetails}
                >
                  Try Refreshing
                </button>
              </div>
            ) : (
              <table className="parent-payment-records-table">
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
                      <td data-label="Date">{item.date}</td>
                      <td data-label="Term">{item.term}</td>
                      <td data-label="Amount">{item.amount}</td>
                      <td data-label="Status">
                        <span className="parent-status-pill">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="parent-dashboard-card2 parent-side-attendance-card">
            <h3 className="parent-card-section-title">Monthly Attendance</h3>
            <div className="parent-attendance-chart-layout">
              <div className="parent-circular-progress-wrapper">
                <svg
                  className="parent-radial-chart-graphic"
                  viewBox="0 0 200 200"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    className="parent-radial-track"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    className="parent-radial-progress"
                    style={{
                      strokeDasharray: `${((monthlyAttendance.percentage || 0) / 100) * 534} 534`,
                    }}
                  />
                </svg>
                <div className="parent-radial-center-labels">
                  <p className="parent-radial-percentage">
                    {monthlyAttendance.percentage || 0}%
                  </p>
                  <p className="parent-radial-subtext">
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