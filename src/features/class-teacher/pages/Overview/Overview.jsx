import React, { useState, useEffect, useRef } from "react";
import "./Overview.css";
import PH from "../../../../assets/ph.svg";
import UIM from "../../../../assets/uim.svg";
import Streamline from "../../../../assets/streamline.svg";
import Material from "../../../../assets/material.svg";
import { apiClient } from "../../../../config/AxiosInstance";
import LoadingScreen from "../../../../components/Loading-Screen";
import ErrorScreen from "../../../../components/Error-Screen";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify";

const Overview = () => {
  const scannerRef = useRef(null);
  const [serverData, setServerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState({
    isCheckedIn: false,
    checkInTime: null,
    message: "You have not checked in today",
  });
  const [showScanner, setShowScanner] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(
        "/classteacher/class-teacher-dashboard",
      );
      setServerData(response.data);

      // Update attendance status based on server data
      const checkedIn =
        response.data?.dashboard?.myAttendance?.toLowerCase() === "present";
      setAttendanceStatus((prev) => ({
        ...prev,
        isCheckedIn: checkedIn,
        message: checkedIn
          ? "You are securely checked in for today"
          : "You have not checked in today",
      }));

      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard payload:", err);
      setError("Failed to load dashboard statistics.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Start scanner
  const startScanner = () => {
    setShowScanner(true);
  };

  // Stop scanner
  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(() => {});
      scannerRef.current = null;
    }
    setShowScanner(false);
  };

  // Handle QR scan success
  const handleScanSuccess = async (decodedText) => {
    console.log("Attendance QR scanned:", decodedText);

    try {
      // Parse the QR code data
      let scanData;
      try {
        scanData = JSON.parse(decodedText);
      } catch {
        scanData = { token: decodedText };
      }

      // Call the actual attendance API
      const response = await apiClient.post("/staffattendance/check-in", {
        token: scanData.token || scanData,
        timestamp: new Date().toISOString(),
      });

      // Update attendance status
      const now = new Date();
      const timeString = now.toLocaleTimeString();

      setAttendanceStatus({
        isCheckedIn: true,
        checkInTime: timeString,
        message: `✅ Checked in successfully at ${timeString}`,
      });

      toast.success("✅ Attendance recorded successfully!");

      // Refresh dashboard data
      await fetchDashboardData();

      // Stop scanner after successful check-in
      stopScanner();
    } catch (error) {
      console.error("Check-in failed:", error);
      toast.error(error.response?.data?.message || "❌ Check-in failed. Please try again.");
    }
  };

  // Handle scan error
  const handleScanError = (error) => {
    // Silent logging - don't show errors to user
    console.log("Scan error:", error);
  };

  // Initialize scanner when showScanner is true
  useEffect(() => {
    if (!showScanner) return;

    // Clean up any existing scanner
    if (scannerRef.current) {
      scannerRef.current.clear().catch(() => {});
      scannerRef.current = null;
    }

    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: 250,
        aspectRatio: 1.0,
      },
      false
    );

    scanner.render(handleScanSuccess, handleScanError);
    scannerRef.current = scanner;

    // Cleanup on unmount or when scanner closes
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [showScanner]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !serverData) {
    return (
      <ErrorScreen
        message={error || "No data received from server."}
        onRetry={fetchDashboardData}
      />
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
                {dashboard?.assignedClass || "No Class Assigned"}
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
              {attendanceStatus.message}
              <span className="CTReminder-instruction-text">
                {attendanceStatus.isCheckedIn
                  ? "Have a wonderful session tracking classes!"
                  : "Please scan the QR code to mark your attendance"}
              </span>
            </ul>

            {/* QR Scanner - Direct implementation */}
            <div className="qr-scanner-wrapper">
              {!attendanceStatus.isCheckedIn ? (
                <>
                  {!showScanner ? (
                    <button
                      className="qr-scan-button"
                      onClick={startScanner}
                    >
                      📷 Scan QR to Check In
                    </button>
                  ) : (
                    <div className="scanner-container">
                      <div id="reader" style={{ width: "100%", maxWidth: "400px" }} />
                      <button
                        className="qr-scan-close"
                        onClick={stopScanner}
                      >
                        ✕ Close Scanner
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="checked-in-status">
                  <span className="checkin-icon">✅</span>
                  <span className="checkin-text">Already Checked In</span>
                  {attendanceStatus.checkInTime && (
                    <span className="checkin-time">
                      at {attendanceStatus.checkInTime}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Optional: Show check-in time if checked in */}
            {attendanceStatus.isCheckedIn && attendanceStatus.checkInTime && (
              <div className="checkin-time-display">
                <span className="checkin-time-icon">🕐</span>
                Checked in at: {attendanceStatus.checkInTime}
              </div>
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