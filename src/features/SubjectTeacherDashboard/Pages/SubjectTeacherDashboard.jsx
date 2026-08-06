import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "../SubjectTeacherDashboardStyles/SubjectTeacherDashboard.css";
import { apiClient } from "../../../config/AxiosInstance";
import { toast } from "react-toastify";
import { Html5QrcodeScanner } from "html5-qrcode";
import { MdMenuBook } from "react-icons/md";

const Skeleton = ({
  width = "100%",
  height = "1rem",
  radius = "6px",
  style = {},
}) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius,
      background:
        "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
      backgroundSize: "200% 100%",
      animation: "STD-shimmer 1.4s infinite",
      ...style,
    }}
  />
);

const LoadingSkeleton = () => (
  <div className="SubjectTeacherDashboard-dashboard-container">
    <style>{`
      @keyframes STD-shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>

    {/* Header skeleton */}
    <div
      className="SubjectTeacherDashboard-dashboard-header"
      style={{ marginBottom: "1.5rem" }}
    >
      <Skeleton
        width="220px"
        height="2rem"
        style={{ marginBottom: "0.5rem" }}
      />
      <Skeleton width="120px" height="1rem" />
    </div>

    {/* Stat cards skeleton */}
    <div
      className="SubjectTeacherDashboard-stats-cards-container"
      style={{ marginBottom: "1.5rem" }}
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="SubjectTeacherDashboard-stat-card"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <Skeleton width="48px" height="48px" radius="12px" />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Skeleton width="60%" height="0.85rem" />
            <Skeleton width="40%" height="1.2rem" />
          </div>
        </div>
      ))}
    </div>

    {/* Main content skeleton */}
    <div className="SubjectTeacherDashboard-main-content">
      <div
        className="SubjectTeacherDashboard-checked-in-card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        <Skeleton width="72px" height="72px" radius="16px" />
        <Skeleton width="60%" height="1.4rem" />
        <Skeleton width="80%" height="0.85rem" />
        <Skeleton width="100%" height="2.8rem" radius="10px" />
        <div
          style={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            marginTop: "0.5rem",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <Skeleton width="80%" height="0.75rem" />
              <Skeleton width="50%" height="1.1rem" />
            </div>
          ))}
        </div>
      </div>

      <div
        className="SubjectTeacherDashboard-announcements-card"
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        <Skeleton width="180px" height="1.3rem" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "0.75rem",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "4px",
                minHeight: "60px",
                borderRadius: "4px",
                background: "#e2e8f0",
              }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Skeleton width="40%" height="0.9rem" />
                <Skeleton width="25%" height="0.9rem" />
              </div>
              <Skeleton width="90%" height="0.8rem" />
              <Skeleton width="70%" height="0.8rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
/* ──────────────────────────────────────────────────────────────────────── */

const SubjectTeacherDashboard = () => {
  const scannerRef = useRef(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceStatus, setAttendanceStatus] = useState({
    isCheckedIn: false,
    checkInTime: null,
    message: "You have not checked in today",
  });
  const [showScanner, setShowScanner] = useState(false);

  // Get user from Redux store
  const staff = useSelector((state) => state.user?.user);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        "/subjectteacher/subject-teacher-dashboard",
      );
      const data = response?.data?.dashboard;
      setDashboardData(data);
      setAnnouncements(response?.data?.announcements || []);

      // Sync attendance status from server
      const checkedIn = data?.myAttendance?.toLowerCase() === "present";
      setAttendanceStatus((prev) => ({
        ...prev,
        isCheckedIn: checkedIn,
        message: checkedIn
          ? "You are securely checked in for today"
          : "You have not checked in today",
      }));
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Unable to load dashboard.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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

    // Stop scanner immediately to prevent multiple scans
    if (scannerRef.current) {
      scannerRef.current.clear().catch(() => {});
      scannerRef.current = null;
    }
    setShowScanner(false);

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

      const now = new Date();
      const timeString = now.toLocaleTimeString();

      setAttendanceStatus({
        isCheckedIn: true,
        checkInTime: timeString,
        message: `✅ Checked in successfully at ${timeString}`,
      });

      toast.success(`✅ Checked in successfully at ${timeString}`);

      // Refresh dashboard data
      await fetchDashboardData();
    } catch (error) {
      console.error("Check-in failed:", error);
      toast.error(
        error.response?.data?.message ||
          "❌ Check-in failed. Please try again.",
      );
      // Reopen scanner if check-in failed
      setShowScanner(true);
    }
  };

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
      "subject-teacher-reader",
      {
        fps: 10,
        qrbox: 250,
        aspectRatio: 1.0,
      },
      false,
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

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Get first name with proper capitalization
  const getFirstName = () => {
    if (!staff) return "User";
    const firstName = staff.firstName || "";
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  if (loading) return <LoadingSkeleton />;

  const attendanceLabel =
    dashboardData?.myAttendance === "present"
      ? "Checked In"
      : dashboardData?.myAttendance === "absent"
        ? "Absent"
        : "Not Marked";

  const attendanceClass =
    dashboardData?.myAttendance === "present"
      ? "SubjectTeacherDashboard-checked-in"
      : "SubjectTeacherDashboard-absent";

  return (
    <div className="SubjectTeacherDashboard-dashboard-container">
      {/* Header */}
      <div className="SubjectTeacherDashboard-dashboard-header">
        <div className="SubjectTeacherDashboard-header-greeting">
          <h1>
            {getGreeting()}, {getFirstName()} 👋
          </h1>
          <p>Welcome back.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="SubjectTeacherDashboard-stats-cards-container">
        <div className="SubjectTeacherDashboard-stat-card">
          <div className="SubjectTeacherDashboard-stat-content">
            <p className="SubjectTeacherDashboard-stat-label">My Attendance</p>
            <p
              className={`SubjectTeacherDashboard-stat-value ${attendanceClass}`}
            >
              {attendanceLabel}
            </p>
          </div>
          <div className="SubjectTeacherDashboard-stat-icon SubjectTeacherDashboard-blue-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                opacity="0.5"
                d="M14.6673 6.66732H1.33398V12.6673C1.33398 13.1978 1.5447 13.7065 1.91977 14.0815C2.29484 14.4566 2.80355 14.6673 3.33398 14.6673H12.6673C13.1978 14.6673 13.7065 14.4566 14.0815 14.0815C14.4566 13.7065 14.6673 13.1978 14.6673 12.6673V6.66732ZM4.66732 5.33398C4.49051 5.33398 4.32094 5.26375 4.19591 5.13872C4.07089 5.0137 4.00065 4.84413 4.00065 4.66732V2.00065C4.00065 1.82384 4.07089 1.65427 4.19591 1.52925C4.32094 1.40422 4.49051 1.33398 4.66732 1.33398C4.84413 1.33398 5.0137 1.40422 5.13872 1.52925C5.26375 1.65427 5.33398 1.82384 5.33398 2.00065V4.66732C5.33398 4.84413 5.26375 5.0137 5.13872 5.13872C5.0137 5.26375 4.84413 5.33398 4.66732 5.33398ZM11.334 5.33398C11.1572 5.33398 10.9876 5.26375 10.8626 5.13872C10.7376 5.0137 10.6673 4.84413 10.6673 4.66732V2.00065C10.6673 1.82384 10.7376 1.65427 10.8626 1.52925C10.9876 1.40422 11.1572 1.33398 11.334 1.33398C11.5108 1.33398 11.6804 1.40422 11.8054 1.52925C11.9304 1.65427 12.0007 1.82384 12.0007 2.00065V4.66732C12.0007 4.84413 11.9304 5.0137 11.8054 5.13872C11.6804 5.26375 11.5108 5.33398 11.334 5.33398Z"
                fill="#0062F6"
              />
              <path
                d="M12.6673 2.66602H12.0007V4.66602C12.0007 4.84283 11.9304 5.0124 11.8054 5.13742C11.6804 5.26244 11.5108 5.33268 11.334 5.33268C11.1572 5.33268 10.9876 5.26244 10.8626 5.13742C10.7376 5.0124 10.6673 4.84283 10.6673 4.66602V2.66602H5.33398V4.66602C5.33398 4.84283 5.26375 5.0124 5.13872 5.13742C5.0137 5.26244 4.84413 5.33268 4.66732 5.33268C4.49051 5.33268 4.32094 5.26244 4.19591 5.13742C4.07089 5.0124 4.00065 4.84283 4.00065 4.66602V2.66602H3.33398C2.80355 2.66602 2.29484 2.87673 1.91977 3.2518C1.5447 3.62687 1.33398 4.13558 1.33398 4.66602V6.66602H14.6673V4.66602C14.6673 4.13558 14.4566 3.62687 14.0815 3.2518C13.7065 2.87673 13.1978 2.66602 12.6673 2.66602Z"
                fill="#0062F6"
              />
            </svg>
          </div>
        </div>

        <div className="SubjectTeacherDashboard-stat-card">
          <div className="SubjectTeacherDashboard-stat-content">
            <p className="SubjectTeacherDashboard-stat-label">
              Assigned Classes
            </p>
            <p className="SubjectTeacherDashboard-stat-value">
              {dashboardData?.assignedClass?.length ?? 0}
            </p>
          </div>
          <div className="SubjectTeacherDashboard-stat-icon SubjectTeacherDashboard-purple-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 50 50"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22.1038 2.61003C22.1043 2.88361 22.1588 3.15441 22.264 3.40697C22.3692 3.65952 22.5231 3.88888 22.7169 4.08195C22.9108 4.27501 23.1408 4.42801 23.3937 4.5322C23.6467 4.6364 23.9177 4.68974 24.1913 4.68919L25.1965 4.68815C33.6851 4.68815 39.3632 4.91003 42.6382 5.09648C43.8653 5.16732 44.7173 5.99232 44.8403 7.06107C45.0798 9.16523 45.3132 12.3382 45.3132 16.7236C45.3132 21.109 45.0798 24.2819 44.8403 26.3861C44.7184 27.4527 43.8642 28.2809 42.6371 28.3506C39.6267 28.5215 34.5882 28.7236 27.2059 28.7548C26.9323 28.756 26.6616 28.811 26.4093 28.9168C26.157 29.0226 25.928 29.177 25.7353 29.3713C25.5427 29.5655 25.3902 29.7959 25.2866 30.0491C25.183 30.3023 25.1302 30.5734 25.1314 30.847C25.1326 31.1206 25.1876 31.3913 25.2934 31.6436C25.3992 31.8959 25.5536 32.1249 25.7479 32.3175C25.9421 32.5102 26.1725 32.6627 26.4257 32.7663C26.6789 32.8699 26.95 32.9226 27.2236 32.9215C34.6736 32.8902 39.7861 32.6861 42.8736 32.51C45.9694 32.3329 48.6101 30.0934 48.9798 26.8579C49.2392 24.5871 49.4798 21.2559 49.4798 16.7236C49.4798 12.1913 49.2392 8.86003 48.9798 6.58815C48.6101 3.35482 45.9726 1.11419 42.8757 0.938151C39.5153 0.745443 33.7569 0.521484 25.1965 0.521484L24.183 0.522526C23.9094 0.523073 23.6386 0.577501 23.386 0.682704C23.1335 0.787906 22.9041 0.941823 22.711 1.13567C22.518 1.32951 22.365 1.55948 22.2608 1.81245C22.1566 2.06542 22.1033 2.33644 22.1038 2.61003ZM21.7944 8.8944C21.7933 6.68499 20.9149 4.56644 19.3522 3.00454C17.7895 1.44264 15.6705 0.565234 13.4611 0.565234C8.85901 0.565234 5.12776 4.2944 5.12776 8.8944C5.12685 10.1389 5.40539 11.3678 5.94284 12.4902C6.48028 13.6127 7.26291 14.6002 8.23297 15.3798C4.91005 15.7725 2.1538 18.2184 1.56005 21.6017C1.11838 24.1163 0.675676 27.3069 0.525676 30.5944C0.442342 32.4152 1.61005 34.0048 3.28193 34.5809L4.83088 35.1142L5.43922 46.3579C5.48664 47.2033 5.85722 47.9982 6.47428 48.578C7.09134 49.1578 7.90766 49.4783 8.75438 49.473C9.60109 49.4678 10.4134 49.1373 11.0233 48.55C11.6331 47.9626 11.9939 47.1632 12.0309 46.3173L12.4194 37.0236C12.4194 36.1611 12.5986 35.4611 13.4611 35.4611C14.3236 35.4611 14.5028 36.1611 14.5028 37.0236L14.8934 46.3288C14.9303 47.1529 15.2803 47.9318 15.8721 48.5065C16.4639 49.0812 17.2527 49.4084 18.0776 49.4212C18.9024 49.4339 19.701 49.1313 20.3102 48.5752C20.9195 48.0191 21.2935 47.2513 21.3559 46.4288L22.9048 25.21L30.3819 24.0329C31.9465 23.7871 33.4038 22.6267 33.6267 20.8694C33.7819 19.6486 33.759 19.4559 33.6694 18.7027L33.6476 18.5131C33.433 16.6694 31.8392 15.5684 30.2101 15.484C26.5965 15.2965 22.7569 15.1923 18.9351 15.1746C19.8337 14.3935 20.5541 13.4284 21.0474 12.3448C21.5407 11.2611 21.7955 10.084 21.7944 8.89336"
                fill="#8B5CF6"
              />
            </svg>
          </div>
        </div>

        <div className="SubjectTeacherDashboard-stat-card">
          <div className="SubjectTeacherDashboard-stat-content">
            <p className="SubjectTeacherDashboard-stat-label">
              Student Handling
            </p>
            <p className="SubjectTeacherDashboard-stat-value">
              {dashboardData?.studentHandling ?? 0}
            </p>
          </div>
          <div className="SubjectTeacherDashboard-stat-icon SubjectTeacherDashboard-yellow-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 50 50"
              fill="none"
            >
              <path
                d="M44.2441 11.0177L25.4941 4.76769C25.1734 4.66077 24.8266 4.66077 24.5059 4.76769L5.75586 11.0177C5.44474 11.1214 5.17414 11.3204 4.98239 11.5865C4.79064 11.8525 4.68748 12.1722 4.6875 12.5001V28.1251C4.6875 28.5395 4.85212 28.9369 5.14515 29.23C5.43817 29.523 5.8356 29.6876 6.25 29.6876C6.6644 29.6876 7.06183 29.523 7.35485 29.23C7.64788 28.9369 7.8125 28.5395 7.8125 28.1251V14.6681L14.373 16.8536C12.63 19.6697 12.0757 23.0623 12.8319 26.2866C13.5881 29.511 15.5929 32.3035 18.4063 34.0509C14.8906 35.4298 11.8516 37.9239 9.62891 41.3341C9.51331 41.5059 9.43302 41.699 9.3927 41.9021C9.35238 42.1052 9.35283 42.3143 9.39403 42.5172C9.43523 42.7201 9.51635 42.9129 9.63269 43.0842C9.74902 43.2555 9.89824 43.4019 10.0717 43.5151C10.2451 43.6282 10.4393 43.7057 10.643 43.7431C10.8466 43.7805 11.0557 43.7771 11.258 43.733C11.4604 43.6889 11.6519 43.605 11.8215 43.4863C11.9911 43.3675 12.1355 43.2162 12.2461 43.0411C15.1895 38.5255 19.8379 35.9376 25 35.9376C30.1621 35.9376 34.8106 38.5255 37.7539 43.0411C37.9831 43.3817 38.3371 43.6185 38.7394 43.7002C39.1417 43.7818 39.56 43.7019 39.9039 43.4776C40.2477 43.2533 40.4895 42.9028 40.5769 42.5016C40.6644 42.1005 40.5904 41.6811 40.3711 41.3341C38.1484 37.9239 35.0977 35.4298 31.5938 34.0509C34.4044 32.3035 36.4073 29.5129 37.1634 26.2909C37.9194 23.0689 37.3669 19.6786 35.627 16.8634L44.2441 13.9923C44.5553 13.8886 44.826 13.6897 45.0178 13.4236C45.2096 13.1576 45.3129 12.8379 45.3129 12.5099C45.3129 12.1819 45.2096 11.8622 45.0178 11.5961C44.826 11.3301 44.5553 11.1311 44.2441 11.0275V11.0177ZM34.375 23.4376C34.3754 24.9198 34.0244 26.3809 33.3508 27.7011C32.6772 29.0213 31.7002 30.163 30.4999 31.0325C29.2996 31.902 27.9102 32.4745 26.4458 32.7031C24.9814 32.9317 23.4837 32.8098 22.0755 32.3475C20.6673 31.8851 19.3888 31.0955 18.3449 30.0433C17.301 28.9912 16.5214 27.7065 16.0701 26.2948C15.6189 24.883 15.5087 23.3844 15.7488 21.9218C15.9889 20.4592 16.5723 19.0744 17.4512 17.881L24.5059 20.2247C24.8266 20.3317 25.1734 20.3317 25.4941 20.2247L32.5488 17.881C33.7358 19.4904 34.3758 21.4378 34.375 23.4376Z"
                fill="#F59E0B"
              />
            </svg>
          </div>
        </div>

        <div className="SubjectTeacherDashboard-stat-card">
          <div className="SubjectTeacherDashboard-stat-content">
            <p className="SubjectTeacherDashboard-stat-label">
              Assigned Subject
            </p>
            <p className="SubjectTeacherDashboard-stat-value">
              {dashboardData?.assignedSubjects?.length ?? 0}
            </p>
          </div>
          <div className="SubjectTeacherDashboard-stat-icon SubjectTeacherDashboard-green-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 50 50"
              fill="none"
            >
              <path
                d="M26.041 36.0837C27.7299 35.1393 29.4334 34.4587 31.1514 34.0421C32.8695 33.6254 34.6382 33.4157 36.4577 33.4129C37.7077 33.4129 38.8313 33.4907 39.8285 33.6462C40.8257 33.8018 41.7056 34.0073 42.4681 34.2629C42.7875 34.3962 43.0813 34.3761 43.3493 34.2025C43.6174 34.0289 43.7507 33.7553 43.7493 33.3816V14.6004C43.7493 14.3601 43.6827 14.1462 43.5493 13.9587C43.416 13.7726 43.1889 13.6129 42.8681 13.4796C41.7223 13.0726 40.6799 12.7948 39.741 12.6462C38.8021 12.4976 37.7077 12.4219 36.4577 12.4191C34.6382 12.4191 32.8237 12.6872 31.0139 13.2233C29.2028 13.7608 27.5452 14.5664 26.041 15.64V36.0837ZM24.0993 38.3275C23.8257 38.2469 23.5646 38.1427 23.316 38.015C21.8021 37.1886 20.2257 36.5622 18.5868 36.1358C16.948 35.7094 15.266 35.4976 13.541 35.5004C12.4577 35.5004 11.3924 35.5907 10.3452 35.7712C9.29935 35.9532 8.28129 36.2448 7.29102 36.6462C6.53546 36.9476 5.82574 36.8566 5.16185 36.3733C4.49796 35.89 4.16602 35.2212 4.16602 34.3671V14.2316C4.16602 13.7164 4.30143 13.2379 4.57227 12.7962C4.8431 12.3546 5.22296 12.0476 5.71185 11.8754C6.94379 11.3434 8.21879 10.9546 9.53685 10.7087C10.8549 10.4629 12.1896 10.3393 13.541 10.3379C15.5827 10.3379 17.573 10.6316 19.5118 11.2191C21.4535 11.8066 23.2827 12.6608 24.9993 13.7816C26.7174 12.6608 28.5466 11.8066 30.4868 11.2191C32.4271 10.6316 34.4174 10.3379 36.4577 10.3379C37.8091 10.3379 39.1438 10.4615 40.4618 10.7087C41.7813 10.9546 43.0563 11.3434 44.2868 11.8754C44.7757 12.049 45.1556 12.3559 45.4264 12.7962C45.6973 13.2365 45.8327 13.715 45.8327 14.2316V34.3671C45.8327 35.2198 45.4743 35.8747 44.7577 36.3316C44.0396 36.7872 43.2757 36.8643 42.466 36.5629C41.5035 36.1879 40.5188 35.9171 39.5118 35.7504C38.5063 35.5823 37.4882 35.4983 36.4577 35.4983C34.7355 35.4983 33.0542 35.7108 31.4139 36.1358C29.7737 36.5608 28.1966 37.1865 26.6827 38.0129C26.4327 38.1421 26.1716 38.2469 25.8993 38.3275C25.6257 38.4094 25.3257 38.4504 24.9993 38.4504C24.673 38.4504 24.373 38.4094 24.0993 38.3275ZM28.9264 18.6421C28.9264 18.4893 28.9792 18.3351 29.0848 18.1796C29.1903 18.024 29.3153 17.9073 29.4598 17.8296C30.5195 17.349 31.6396 16.9809 32.8202 16.7254C34.0007 16.4726 35.2132 16.3462 36.4577 16.3462C37.1243 16.3462 37.7563 16.383 38.3535 16.4566C38.9507 16.5303 39.566 16.6365 40.1993 16.7754C40.3785 16.8171 40.5341 16.9108 40.666 17.0566C40.7993 17.2011 40.866 17.3796 40.866 17.5921C40.866 17.9421 40.7618 18.1962 40.5535 18.3546C40.3452 18.5129 40.066 18.549 39.716 18.4629C39.2021 18.3587 38.6764 18.2872 38.1389 18.2483C37.6 18.2094 37.0396 18.19 36.4577 18.19C35.341 18.19 34.2487 18.2969 33.1806 18.5108C32.1112 18.7247 31.0973 19.0233 30.1389 19.4066C29.782 19.5441 29.4903 19.5407 29.2639 19.3962C29.0375 19.2518 28.925 19.0004 28.9264 18.6421ZM28.9264 29.94C28.9264 29.7872 28.9792 29.6268 29.0848 29.4587C29.1903 29.2879 29.3153 29.1643 29.4598 29.0879C30.4667 28.6073 31.5868 28.2462 32.8202 28.0046C34.0535 27.7643 35.266 27.6441 36.4577 27.6441C37.1243 27.6441 37.7563 27.6809 38.3535 27.7546C38.9507 27.8282 39.566 27.9344 40.1993 28.0733C40.3785 28.115 40.5341 28.2087 40.666 28.3546C40.7993 28.499 40.866 28.6775 40.866 28.89C40.866 29.24 40.7618 29.4941 40.5535 29.6525C40.3452 29.8108 40.066 29.8469 39.716 29.7608C39.2021 29.6566 38.6764 29.5851 38.1389 29.5462C37.6 29.5073 37.0396 29.4879 36.4577 29.4879C35.3688 29.4879 34.2966 29.599 33.241 29.8212C32.1855 30.0448 31.1785 30.3622 30.2202 30.7733C29.8618 30.9372 29.5563 30.9351 29.3035 30.7671C29.0507 30.599 28.925 30.3233 28.9264 29.94ZM28.9264 24.3316C28.9264 24.1789 28.9792 24.0247 29.0848 23.8691C29.1903 23.7136 29.3153 23.5969 29.4598 23.5191C30.5195 23.0372 31.6396 22.6691 32.8202 22.415C34.0007 22.1622 35.2132 22.0358 36.4577 22.0358C37.1243 22.0358 37.7563 22.0726 38.3535 22.1462C38.9507 22.2198 39.566 22.3261 40.1993 22.465C40.3785 22.5066 40.5341 22.5997 40.666 22.7441C40.7993 22.8886 40.866 23.0678 40.866 23.2816C40.866 23.6316 40.7618 23.8858 40.5535 24.0441C40.3452 24.2025 40.066 24.2379 39.716 24.1504C39.2021 24.0462 38.6764 23.9754 38.1389 23.9379C37.6 23.899 37.0396 23.8796 36.4577 23.8796C35.341 23.8796 34.2487 23.9865 33.1806 24.2004C32.1112 24.4129 31.0973 24.7115 30.1389 25.0962C29.782 25.2323 29.4903 25.2289 29.2639 25.0858C29.0389 24.94 28.9264 24.6886 28.9264 24.3316Z"
                fill="#43B75D"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="SubjectTeacherDashboard-main-content">
        {/* QR / Attendance Card */}
        <div className="SubjectTeacherDashboard-checked-in-card">
          <div className="SubjectTeacherDashboard-qr-icon">
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

          <h2>
            {attendanceStatus.isCheckedIn
              ? "✅ Checked In Successfully"
              : "Not Checked In"}
          </h2>

          <p className="SubjectTeacherDashboard-check-in-description1">
            {attendanceStatus.message}
          </p>

          <p className="SubjectTeacherDashboard-check-in-description">
            {attendanceStatus.isCheckedIn
              ? "Have a wonderful session!"
              : "Please scan the QR code to mark your attendance"}
          </p>

          {/* QR Scanner - Direct implementation */}
          <div className="qr-scanner-wrapper">
            {!attendanceStatus.isCheckedIn ? (
              <>
                {!showScanner ? (
                  <button
                    className="SubjectTeacherDashboard-check-out-btn"
                    onClick={startScanner}
                  >
                    📷 Scan QR to Check In
                  </button>
                ) : (
                  <div className="scanner-container">
                    <div
                      id="subject-teacher-reader"
                      style={{ width: "100%", maxWidth: "400px" }}
                    />
                    <button className="qr-scan-close" onClick={stopScanner}>
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

          {attendanceStatus.isCheckedIn && attendanceStatus.checkInTime && (
            <div className="checkin-time-display">
              <span className="checkin-time-icon">🕐</span>
              Checked in at: {attendanceStatus.checkInTime}
            </div>
          )}

          {/* Student summary */}
          {dashboardData && (
            <div className="SubjectTeacherDashboard-student-summary">
              <div className="SubjectTeacherDashboard-summary-item">
                <span className="SubjectTeacherDashboard-summary-label">
                  Total Students
                </span>
                <span className="SubjectTeacherDashboard-summary-value">
                  {dashboardData.totalStudents ?? 0}
                </span>
              </div>
              <div className="SubjectTeacherDashboard-summary-item">
                <span className="SubjectTeacherDashboard-summary-label">
                  Present Today
                </span>
                <span className="SubjectTeacherDashboard-summary-value">
                  {dashboardData.studentsPresent ?? 0}
                </span>
              </div>
              <div className="SubjectTeacherDashboard-summary-item">
                <span className="SubjectTeacherDashboard-summary-label">
                  Male
                </span>
                <span className="SubjectTeacherDashboard-summary-value">
                  {dashboardData.maleStudents ?? 0}
                </span>
              </div>
              <div className="SubjectTeacherDashboard-summary-item">
                <span className="SubjectTeacherDashboard-summary-label">
                  Female
                </span>
                <span className="SubjectTeacherDashboard-summary-value">
                  {dashboardData.femaleStudents ?? 0}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Announcements */}
        <div className="SubjectTeacherDashboard-announcements-card">
          <h2>Recent Announcements</h2>
          <div className="SubjectTeacherDashboard-announcements-list">
            {announcements.length === 0 ? (
              <p className="SubjectTeacherDashboard-no-announcements">
                No announcements at this time.
              </p>
            ) : (
              announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="SubjectTeacherDashboard-announcement-item"
                >
                  <div className="SubjectTeacherDashboard-announcement-left-border"></div>
                  <div className="SubjectTeacherDashboard-announcement-content">
                    <div className="SubjectTeacherDashboard-announcement-header">
                      <h3>{announcement.title}</h3>
                      <span className="SubjectTeacherDashboard-announcement-date">
                        {announcement.date}
                      </span>
                    </div>
                    <p>{announcement.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectTeacherDashboard;
