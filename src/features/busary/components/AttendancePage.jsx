import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AttendancePage.css";
import { apiClient } from "../../../config/AxiosInstance";
import { useSelector } from "react-redux";

const AttendancePage = () => {
  const staffUser = useSelector((state) => state.staff.staffUser);
  const staffToken = useSelector((state) => state.staff.staffToken);
  console.log("Staff User:", staffUser);
  console.log("Staff Token:", staffToken);

  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const { token } = useParams();

  const handleCheckIn = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }
    setStatus("Fetching location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        axios
          .post(`/staffattendance/checkin`, {
            token,
            latitude,
            longitude,
          })
          .then((res) => {
            console.log("Saved:", res?.data);
            setLocation({ latitude, longitude });
            setStatus("Checked in successfully ✅");
          })
          .catch((err) => {
            console.log(err);
            setStatus("Failed to save attendance ❌" || err.message);
          });
      },
      (error) => {
        console.log(error);
        setStatus("Location access denied ❌");
      },
    );
  };

  return (
    <div className="fm-page">
      <div className="fm-wrapper">
        {/* HEADER */}
        <div className="fm-header">
          <h1>Attendance</h1>
          <p>Check in by capturing your live location</p>
        </div>

        {/* STATUS CARDS */}
        <div className="fm-cards">
          <div className="fm-attendance">
            <div className="fm-text">
              <span>Status</span>
              <div className="fm-number">{status || "Not checked in"}</div>
            </div>
          </div>

          <div className="fm-collection-rate">
            <div className="fm-text">
              <span>Location</span>
              <div className="fm-percentage">
                {location ? "Captured" : "Not captured"}
              </div>
            </div>
          </div>
        </div>

        {/* ACTION */}
        <div className="fm-filter-box">
          <div className="fm-filters">
            <div className="fm-field">
              <label>Attendance Action</label>

              <button className="fm-export" onClick={handleCheckIn}>
                Check In
              </button>
            </div>
          </div>
        </div>

        {/* LOCATION DISPLAY */}
        {location && (
          <div className="fm-table-card">
            <div className="fm-table-wrapper">
              <table className="fm-table">
                <thead>
                  <tr>
                    <th>Latitude</th>
                    <th>Longitude</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{location.latitude}</td>
                    <td>{location.longitude}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
