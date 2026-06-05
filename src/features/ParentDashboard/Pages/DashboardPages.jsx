import React, { useEffect, useRef } from "react";
import "../css/DashboardPages.css";

const Dashboard = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 80;

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#e8e8e8";
    ctx.lineWidth = 12;
    ctx.stroke();

    const percentage = 96.4;
    const angle = (percentage / 100) * 2 * Math.PI - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle);
    ctx.strokeStyle = "#ffa500";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.stroke();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="greeting-section">
        <h1 className="greeting-title">Good morning, Mrs Ola 👋</h1>
        <p className="greeting-subtitle">
          Here&apos;s Efe&apos;s activity summary for today.
        </p>
      </div>

      <div className="student-card">
        <div className="student-header">
          <div className="student-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="#2563eb">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
          <h2 className="student-name">Efe Ogeremu</h2>
        </div>

        <div className="student-details">
          <div className="detail-item">
            <span className="detail-label">Class</span>
            <span className="detail-value">JSS1A</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Fee Status</span>
            <span className="detail-value">Fully Paid</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Attendance</span>
            <span className="detail-value attendance-badge">Present</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Current Term</span>
            <span className="detail-value">First Term . 2025/2026</span>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="payment-section">
          <h3 className="section-title">Payment History</h3>
          <table className="payment-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Term</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Apr 28, 2026</td>
                <td>Third Term</td>
                <td>N50,000</td>
                <td>
                  <span className="status-badge full-payment">
                    Full Payment
                  </span>
                </td>
              </tr>
              <tr>
                <td>Feb 22, 2026</td>
                <td>Second Term</td>
                <td>N25,000</td>
                <td>
                  <span className="status-badge paid-completely">
                    Paid Completely
                  </span>
                </td>
              </tr>
              <tr>
                <td>Jan 12, 2026</td>
                <td>Second Term</td>
                <td>N25,000</td>
                <td>
                  <span className="status-badge part-payment">
                    Part Payment
                  </span>
                </td>
              </tr>
              <tr>
                <td>Sep 08, 2025</td>
                <td>First Term</td>
                <td>N50,000</td>
                <td>
                  <span className="status-badge full-payment">
                    Full Payment
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attendance-section">
          <h3 className="section-title">Monthly Attendance</h3>
          <div className="attendance-chart">
            <canvas ref={canvasRef} width="200" height="200"></canvas>
            <div className="attendance-text">
              <div className="percentage">96.4%</div>
              <div className="days">18 Days Present</div>
            </div>
          </div>
          <div className="attendance-legend">
            <div className="legend-item">
              <span className="legend-dot present"></span>
              <span>Present</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot absent"></span>
              <span>Absent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
