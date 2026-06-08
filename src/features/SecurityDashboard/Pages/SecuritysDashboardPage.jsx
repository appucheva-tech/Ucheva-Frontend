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
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <path
                d="M14.5833 6.25H8.33333C7.18274 6.25 6.25 7.18274 6.25 8.33333V14.5833C6.25 15.7339 7.18274 16.6667 8.33333 16.6667H14.5833C15.7339 16.6667 16.6667 15.7339 16.6667 14.5833V8.33333C16.6667 7.18274 15.7339 6.25 14.5833 6.25Z"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M41.6673 6.25H35.4173C34.2667 6.25 33.334 7.18274 33.334 8.33333V14.5833C33.334 15.7339 34.2667 16.6667 35.4173 16.6667H41.6673C42.8179 16.6667 43.7507 15.7339 43.7507 14.5833V8.33333C43.7507 7.18274 42.8179 6.25 41.6673 6.25Z"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.5833 33.334H8.33333C7.18274 33.334 6.25 34.2667 6.25 35.4173V41.6673C6.25 42.8179 7.18274 43.7507 8.33333 43.7507H14.5833C15.7339 43.7507 16.6667 42.8179 16.6667 41.6673V35.4173C16.6667 34.2667 15.7339 33.334 14.5833 33.334Z"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M43.7507 33.334H37.5007C36.3956 33.334 35.3358 33.773 34.5544 34.5544C33.773 35.3358 33.334 36.3956 33.334 37.5007V43.7507"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M43.75 43.75V43.7708"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25.0007 14.584V20.834C25.0007 21.9391 24.5617 22.9989 23.7803 23.7803C22.9989 24.5617 21.9391 25.0007 20.834 25.0007H14.584"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.25 25H6.27083"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25 6.25H25.0208"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25 33.334V33.3548"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M33.334 25H35.4173"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M43.75 25V25.0208"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25 43.7493V41.666"
                stroke="#0062F6"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
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
