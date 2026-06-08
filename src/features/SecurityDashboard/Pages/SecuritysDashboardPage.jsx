import React from "react";
import "../SecurityStyles/SecuritysDashboard.css";

const SecuritysDashboardPage = () => {
  return (
    <div className="security-dashboard">
      <div className="header-section">
        <h1 className="greeting">Good morning, Mr Davis 👋</h1>
        <p className="welcome-text">Welcome back.</p>
      </div>

      <div className="content-grid">
        <div className="check-in-card">
          <div className="qr-icon">
            <svg
              viewBox="0 0 24 24"
              width="64"
              height="64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="2" width="8" height="8" fill="#0052CC" />
              <rect x="14" y="2" width="8" height="8" fill="#0052CC" />
              <rect x="2" y="14" width="8" height="8" fill="#0052CC" />
              <rect x="6" y="6" width="2" height="2" fill="white" />
              <rect x="18" y="6" width="2" height="2" fill="white" />
              <rect x="6" y="18" width="2" height="2" fill="white" />
              <rect x="14" y="14" width="2" height="2" fill="#0052CC" />
              <rect x="18" y="14" width="2" height="2" fill="#0052CC" />
              <rect x="14" y="18" width="2" height="2" fill="#0052CC" />
              <rect x="18" y="18" width="2" height="2" fill="#0052CC" />
            </svg>
          </div>
          <h2 className="check-in-title">Checked In Succesful</h2>
          <p className="check-in-time">Check-in Time 7:42 AM</p>
          <p className="check-in-instruction">
            Please scan the QR code to mark your attendance
          </p>
          <button className="scan-button">Scan QR to Check Out</button>
        </div>

        <div className="announcements-card">
          <h2 className="announcements-title">Recent Announcements</h2>
          <div className="announcements-list">
            <div className="announcement-item">
              <div className="announcement-left">
                <h3 className="announcement-name">Staff Meeting</h3>
                <p className="announcement-description">
                  All staff members are required to attend the mo...
                </p>
              </div>
              <p className="announcement-date">May 18, 2026</p>
            </div>

            <div className="announcement-item">
              <div className="announcement-left">
                <h3 className="announcement-name">Resumption</h3>
                <p className="announcement-description">
                  School will resume normal activities on Monday. Please ...
                </p>
              </div>
              <p className="announcement-date">May 15, 2026</p>
            </div>

            <div className="announcement-item">
              <div className="announcement-left">
                <h3 className="announcement-name">Environmental Notice</h3>
                <p className="announcement-description">
                  Weekly environmental sanitation will be held on...
                </p>
              </div>
              <p className="announcement-date">May 13, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritysDashboardPage;
