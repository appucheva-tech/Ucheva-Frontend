import React, { useState, useEffect } from "react";
import "./Overview.css";
import PH from "../../../../assets/ph.svg";
import UIM from "../../../../assets/uim.svg";
import Streamline from "../../../../assets/streamline.svg";
import Material from "../../../../assets/material.svg";
import { apiClient } from "../../../../config/AxiosInstance";

const Overview = () => {
  const [serverData, setServerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(
          "/classteacher/class-teacher-dashboard",
        );
        setServerData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard payload:", err);
        setError("Failed to load dashboard statistics.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ==================== SKELETON SHIMMER LOADING ROW RENDER ====================
  if (isLoading) {
    return (
      <main className="CTDash">
        <article className="CTDashWrapper">
          <div className="CTGreetings">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-subtitle"></div>
          </div>

          {/* Sits side-by-side in accurate horizontal layout row context */}
          <article className="CTCards">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="skeleton-overview-card">
                <div className="skeleton-card-inner-left">
                  <div className="skeleton skeleton-text-lbl"></div>
                  <div className="skeleton skeleton-text-val"></div>
                </div>
                <div className="skeleton skeleton-img-circle"></div>
              </div>
            ))}
          </article>

          <section className="CTCheckIn">
            <div className="skeleton-panel-box"></div>
            <div className="skeleton-panel-box"></div>
          </section>
        </article>
      </main>
    );
  }

  if (error || !serverData) {
    return (
      <main className="CTDash overview-state-error">
        <p className="overview-error-text">
          {error || "No data received from server."}
        </p>
      </main>
    );
  }

  const { dashboard } = serverData;
  const isCheckedIn = dashboard?.myAttendance?.toLowerCase() === "present";

  return (
    <main className="CTDash">
      <article className="CTDashWrapper">
        <nav className="CTGreetings">
          Good morning 👋
          <span className="CTGreetings-subtitle">Welcome back.</span>
        </nav>

        <article className="CTCards">
          {/* Card 1: Attendance */}
          <div className="myAttendance overview-shadow-card">
            <nav className="CTtext">
              My Attendance
              <div
                className={`CTPending CTPending-status-${dashboard?.myAttendance?.toLowerCase() || "absent"}`}
              >
                {dashboard?.myAttendance || "Absent"}
              </div>
            </nav>
            <div className="CTImageHolder1">
              <img className="CTImg" src={UIM} alt="Attendance Indicator" />
            </div>
          </div>

          {/* Card 2: Assigned Class */}
          <div className="AssignedClass overview-shadow-card">
            <nav className="CTtext">
              Assigned Class
              <div className="CTClassRoom">
                {dashboard?.assignedClass?.[0] || "No Class Assigned"}
              </div>
            </nav>
            <div className="CTImageHolder2">
              <img
                className="CTImg"
                src={Streamline}
                alt="Classroom Indicator"
              />
            </div>
          </div>

          {/* Card 3: Total Students */}
          <div className="TotalStudents overview-shadow-card">
            <nav className="CTtext">
              Total Students
              <div className="CTStudents">{dashboard?.totalStudents ?? 0}</div>
            </nav>
            <div className="CTImageHolder3">
              <img className="CTImg" src={PH} alt="Students Count" />
            </div>
          </div>

          {/* Card 4: Assigned Subjects */}
          <div className="CTSubject overview-shadow-card">
            <nav className="CTtext4">
              Assigned Subjects
              <div className="SubjectDigit">
                {dashboard?.assignedSubjects ?? 0}
              </div>
            </nav>
            <div className="CTImageHolder4">
              <img className="CTImg" src={Material} alt="Subjects Managed" />
            </div>
          </div>
        </article>

        <section className="CTCheckIn">
          {/* QR Check-In Box Wrapper */}
          <div className="CTQR overview-shadow-card">
            <nav className="CTQRHolder">
              <img
                className="CTQRImg"
                src="src/assets/Icon.png"
                alt="QR Validation Frame"
              />
            </nav>
            <ul className="CTReminder">
              {isCheckedIn
                ? "You are securely checked in for today"
                : "You have not checked in today"}
              <span className="CTReminder-instruction-text">
                {isCheckedIn
                  ? "Have a wonderful session tracking classes!"
                  : "Please scan the QR code to mark your attendance"}
              </span>
            </ul>
            {!isCheckedIn && (
              <button className="CTScan">Scan QR to Check In</button>
            )}
          </div>

          {/* Announcement Block Box Wrapper */}
          <div className="CTAnnouncement overview-shadow-card">
            <nav className="CTAnnounceHead">Recent Announcements</nav>
            <article className="CTAnnouncementView">
              <p className="CTAnnouncement-empty-text">
                No announcements listed for this term cycle.
              </p>
            </article>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Overview;
