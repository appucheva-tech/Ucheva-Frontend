import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../../../config/AxiosInstance";
import "./AttendancePage.css";

const AttendancePage = () => {
  const { token } = useParams();

  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("Not checked in");
  const [loading, setLoading] = useState(false);

  const handleCheckIn = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);
    setStatus("Fetching your current location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          await apiClient.post("/staffattendance/check-in", {
            token: token,
            latitude,
            longitude,
          });

          setLocation({ latitude, longitude });
          setStatus("Attendance recorded successfully.");
        } catch (error) {
          console.error(error);

          setStatus(
            error.response?.data?.message ||
              "Unable to record attendance."
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);

        switch (error.code) {
          case 1:
            setStatus("Location access denied.");
            break;

          case 2:
            setStatus("Location unavailable.");
            break;

          case 3:
            setStatus("Location request timed out.");
            break;

          default:
            setStatus("Unable to obtain your location.");
        }
      }
    );
  };

  return (
    <div className="attendance-container">
      <div className="attendance-card">
        <h1>Attendance Check-In</h1>
        <p className="subtitle">
          Verify your attendance using your current location.
        </p>

        <div className="status-grid">
          <div className="info-card">
            <span>Status</span>
            <h3>{status}</h3>
          </div>

          <div className="info-card">
            <span>Location</span>
            <h3>{location ? "Captured" : "Not Captured"}</h3>
          </div>
        </div>

        <button
          className="attendance-btn"
          onClick={handleCheckIn}
          disabled={loading}
        >
          {loading ? "Checking In..." : "Check In"}
        </button>

        {location && (
          <div className="location-card">
            <h2>Captured Coordinates</h2>

            <div className="coordinate-row">
              <span>Latitude</span>
              <strong>{location.latitude}</strong>
            </div>

            <div className="coordinate-row">
              <span>Longitude</span>
              <strong>{location.longitude}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;