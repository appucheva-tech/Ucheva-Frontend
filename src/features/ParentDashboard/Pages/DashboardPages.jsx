import React, { useState, useEffect } from "react";
import "../css/DashboardPages.css";
import { apiClient } from "../../../config/AxiosInstance";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const studentId = useSelector((state) => state.user.user.id);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardDetails = async () => {
    if (!studentId) return;
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(`/parent/dashboard`);
      setDashboardData(response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch student dashboard records.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardDetails();
  }, [studentId]);

  // Proper Loading Interface State
  if (loading) {
    return (
      <div className="parent-dashboard-view flex-center-view">
        <div className="dashboard-loading-card">
          <div className="loading-spinner-ring"></div>
          <h3 className="loading-state-title">Loading Dashboard</h3>
          <p className="loading-state-subtitle">
            Fetching academic progress and payment history details...
          </p>
        </div>
      </div>
    );
  }

  // Proper Error Display State
  if (error) {
    return (
      <div className="parent-dashboard-view flex-center-view">
        <div className="dashboard-error-wrapper">
          <div className="error-icon-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3 className="error-state-title">Something went wrong</h3>
          <p className="error-state-subtitle">{error}</p>
          <button
            onClick={fetchDashboardDetails}
            className="error-retry-action-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Destructure data safely
  const {
    parentName = "Mrs Ola",
    studentName = "Efe Ogeremu",
    studentClass = "JSS1A",
    feeStatus = "Fully Paid",
    attendanceStatus = "Present",
    currentTerm = "First Term . 2025/2026",
    attendancePercentage = 96.4,
    daysPresent = 18,
    paymentHistory = [],
  } = dashboardData || {};

  const totalCircumference = 534.07;
  const targetStrokeDashoffset =
    (attendancePercentage / 100) * totalCircumference;

  return (
    <div className="parent-dashboard-view">
      <div className="parent-dashboard-container">
        {/* Banner Welcome Section */}
        <div className="parent-welcome-header">
          <h1 className="parent-greeting-title">
            Good morning, {parentName} 👋
          </h1>
          <p className="parent-greeting-subtitle">
            Here's {studentName.split(" ")[0]}'s activity summary for today.
          </p>
        </div>

        {/* Student Profile Overview Card */}
        <div className="student-summary-banner">
          <div className="student-avatar-box">
            <div className="student-badge-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M44.2441 11.0177L25.4941 4.76769C25.1734 4.66077 24.8266 4.66077 24.5059 4.76769L5.75586 11.0177C5.44474 11.1214 5.17414 11.3204 4.98239 11.5865C4.79064 11.8525 4.68748 12.1722 4.6875 12.5001V28.1251C4.6875 28.5395 4.85212 28.9369 5.14515 29.23C5.43817 29.523 5.8356 29.6876 6.25 29.6876C6.6644 29.6876 7.06183 29.523 7.35485 29.23C7.64788 28.9369 7.8125 28.5395 7.8125 28.1251V14.6681L14.373 16.8536C12.63 19.6697 12.0757 23.0623 12.8319 26.2866C13.5881 29.511 15.5929 32.3035 18.4063 34.0509C14.8906 35.4298 11.8516 37.9239 9.62891 41.3341C9.51331 41.5059 9.43302 41.699 9.3927 41.9021C9.35238 42.1052 9.35283 42.3143 9.39403 42.5172C9.43523 42.7201 9.51635 42.9129 9.63269 43.0842C9.74902 43.2555 9.89824 43.4019 10.0717 43.5151C10.2451 43.6282 10.4393 43.7057 10.643 43.7431C10.8466 43.7805 11.0557 43.7771 11.258 43.733C11.4604 43.6889 11.6519 43.605 11.8215 43.4863C11.9911 43.3675 12.1355 43.2162 12.2461 43.0411C15.1895 38.5255 19.8379 35.9376 25 35.9376C30.1621 35.9376 34.8106 38.5255 37.7539 43.0411C37.9831 43.3817 38.3371 43.6185 38.7394 43.7002C39.1417 43.7818 39.56 43.7019 39.9039 43.4776C40.2477 43.2533 40.4895 42.9028 40.5769 42.5016C40.6644 42.1005 40.5904 41.6811 40.3711 41.3341C38.1484 37.9239 35.0977 35.4298 31.5938 34.0509C34.4044 32.3035 36.4073 29.5129 37.1634 26.2909C37.9194 23.0689 37.3669 19.6786 35.627 16.8634L44.2441 13.9923C44.5553 13.8886 44.826 13.6897 45.0178 13.4236C45.2096 13.1576 45.3129 12.8379 45.3129 12.5099C45.3129 12.1819 45.2096 11.8622 45.0178 11.5961C44.826 11.3301 44.5553 11.1311 44.2441 11.0275V11.0177ZM34.375 23.4376C34.3754 24.9198 34.0244 26.3809 33.3508 27.7011C32.6772 29.0213 31.7002 30.163 30.4999 31.0325C29.2996 31.902 27.9102 32.4745 26.4458 32.7031C24.9814 32.9317 23.4837 32.8098 22.0755 32.3475C20.6673 31.8851 19.3888 31.0955 18.3449 30.0433C17.301 28.9912 16.5214 27.7065 16.0701 26.2948C15.6189 24.883 15.5087 23.3844 15.7488 21.9218C15.9889 20.4592 16.5723 19.0744 17.4512 17.881L24.5059 20.2247C24.8266 20.3317 25.1734 20.3317 25.4941 20.2247L32.5488 17.881C33.7358 19.4904 34.3758 21.4378 34.375 23.4376Z"
                  fill="#0062F6"
                />
              </svg>
            </div>
          </div>

          <div className="student-summary-info">
            <h2 className="student-profile-name">{studentName}</h2>
            <div className="student-quick-metrics">
              <div className="metric-column">
                <span className="metric-label-text">Class</span>
                <span className="metric-value-text">{studentClass}</span>
              </div>
              <div className="metric-column">
                <span className="metric-label-text">Fee Status</span>
                <span className="metric-value-text fee-paid-highlight">
                  {feeStatus}
                </span>
              </div>
              <div className="metric-column">
                <span className="metric-label-text">Attendance</span>
                <span className="metric-value-text">
                  <span
                    className={`badge-pill-${attendanceStatus.toLowerCase().replace(" ", "-") || "present"}`}
                  >
                    {attendanceStatus}
                  </span>
                </span>
              </div>
              <div className="metric-column">
                <span className="metric-label-text">Current Term</span>
                <span className="metric-value-text">{currentTerm}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Split Cards Grid */}
        <div className="parent-grid-layout">
          {/* Card Left: Payment History Component */}
          <div className="parent-dashboard-card main-history-card">
            <h3 className="card-section-title">Payment History</h3>
            <div className="table-viewport-container">
              {paymentHistory.length === 0 ? (
                <p className="no-records-fallback">
                  No payment historical logs available.
                </p>
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
                    {paymentHistory.map((item, index) => (
                      <tr key={index}>
                        <td data-label="Date">{item.date}</td>
                        <td data-label="Term">{item.term}</td>
                        <td data-label="Amount">{item.amount}</td>
                        <td data-label="Status">
                          <span
                            className="payment-status-badge"
                            style={{
                              color: item.statusColor || "#43b75d",
                              backgroundColor: item.background || "#EAFDF1",
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Card Right: Monthly Attendance Component */}
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
                      strokeDasharray: `${targetStrokeDashoffset} ${totalCircumference}`,
                    }}
                  />
                </svg>
                <div className="radial-center-labels">
                  <p className="radial-percentage">{attendancePercentage}%</p>
                  <p className="radial-subtext">{daysPresent} Days Present</p>
                </div>
              </div>

              <div className="attendance-legend-stack">
                <div className="legend-row-item">
                  <span className="legend-color-dot dot-present"></span>
                  <span className="legend-text">Present</span>
                </div>
                <div className="legend-row-item">
                  <span className="legend-color-dot dot-absent"></span>
                  <span className="legend-text">Absent</span>
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
