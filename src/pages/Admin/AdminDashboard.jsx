import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import { FiTrendingUp, FiExternalLink } from "react-icons/fi";
import { IoQrCodeOutline, IoMegaphoneOutline } from "react-icons/io5";
import { LuUserPlus, LuFileSpreadsheet } from "react-icons/lu";
import { HiChevronRight } from "react-icons/hi";
import { apiClient } from "../../config/AxiosInstance";
import QRModal from "./QRModal";
import { useNavigate } from "react-router-dom";
import { getGreeting } from "../../helpers/greeting";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const user = useSelector((state) => state.user.user.schoolName);
  const [attendanceTable, setAttendanceTable] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [sumarry, setSumarry] = useState({});
  const [attendance, setAttendance] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    const getDashboardSummary = async () => {
      try {
        const res = await apiClient.get("/admin/dashboard");

        setSumarry(res?.data?.summary);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    getDashboardSummary();
  }, []);

  useEffect(() => {
    const getTodayAttendance = async () => {
      try {
        const res = await apiClient.get("/staffattendance/today");
        console.log("res : ", res);
        setAttendance(res?.data?.Attendance);
        setAttendanceTable(true);
      } catch (error) {
        console.error(error);
      }
    };

    getTodayAttendance();
  }, []);

  return (
    <div className="Bddashboard-container">
      <div className="dashboard-header">
        <div className="header-text-group">
          <h1 className="welcome-text">
            {getGreeting(user)}
            <span className="wave-emoji">👋</span>
          </h1>
          <p className="subtitle-text">
            Here's an overview of Green Field Academy activities today.
          </p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card card-total">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Total Students</span>
              <span className="card-value">{sumarry.totalStudents}</span>
            </div>
            <div className="icon-wrapper icon-students">
              <PiStudentFill className="DashIcon" />
            </div>
          </div>
          <div className="card-footer trend-up">
            <FiTrendingUp className="trend-icon" />
            <span>12 from last week</span>
          </div>
        </div>

        <div className="metric-card card-teaching">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Total Staff</span>
              <span className="card-value">{sumarry.totalStaff}</span>
            </div>
            <div className="icon-wrapper icon-staff">
              <HiMiniUserGroup className="DashIcon" />
            </div>
          </div>
          <div className="card-footer trend-up">
            <FiTrendingUp className="trend-icon" />
            <span>2 from last week</span>
          </div>
        </div>

        <div className="metric-card card-non-teaching">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Attendance Rate</span>
              <span className="card-value">
                {sumarry.totalStaffAttendancePercent}%
              </span>
            </div>
            <div className="icon-wrapper icon-attendance">
              <PiCalendarBlankFill className="DashIcon" />
            </div>
          </div>
          <div className="card-footer trend-up">
            <FiTrendingUp className="trend-icon" />
            <span>2 from last week</span>
          </div>
        </div>

        <div className="metric-card card-teachers">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Fees Collected</span>
              <span className="card-value">{sumarry.totalFeesCollected}</span>
            </div>
            <div className="icon-wrapper icon-fees">
              <FaSackDollar className="DashIcon" />
            </div>
          </div>
          <div className="card-footer trend-fees">
            <FiTrendingUp className="trend-icon" />
            <span>72% fee collected</span>
          </div>
        </div>
      </div>

      <div className="dashboard-split-grid">
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Today's Staff Attendance</h2>
            <button className="view-all-link">
              View All <FiExternalLink />
            </button>
          </div>
          <div className="panel-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              {setAttendanceTable ? (
                <tbody>
                  <tr>
                    <td className="font-medium text-slate">Adaeze Clinton</td>
                    <td>Teacher</td>
                    <td>7:48 AM</td>
                    <td>
                      <span className="status-badge badge-checked-in">
                        Checked In
                      </span>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <span> loading.... </span>
              )}
            </table>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Quick Actions</h2>
          </div>
          <div className="actions-grid">
            <div
              onClick={() => setShowQRModal(true)}
              style={{ background: "red" }}
              className="action-button-card action-qr"
            >
              <div className="action-main-content">
                <div className="action-icon-box">
                  <IoQrCodeOutline />
                </div>
                <div className="action-text">
                  <h3>Generate QR Code</h3>
                  <p>For staff to mark attendance</p>
                </div>
              </div>
              <div className="next_icon_holder">
                <HiChevronRight className="action-arrow" />
              </div>
            </div>

            <div
              className="action-button-card action-students"
              style={{ background: "blue" }}
              onClick={() => nav("/admin/AdminStudent2")}
            >
              <div className="action-main-content">
                <div className="action-icon-box">
                  <LuUserPlus />
                </div>
                <div className="action-text">
                  <h3>Add Students</h3>
                  <p>Register a student</p>
                </div>
              </div>
              <div className="next_icon_holder">
                <HiChevronRight className="action-arrow" />
              </div>
            </div>

            <div className="action-button-card action-announcements">
              <div className="action-main-content">
                <div className="action-icon-box">
                  <IoMegaphoneOutline />
                </div>
                <div className="action-text">
                  <h3>Add Class</h3>
                  <p>Add Classes</p>
                </div>
              </div>
              <div className="next_icon_holder">
                <HiChevronRight className="action-arrow" />
              </div>
            </div>

            <div className="action-button-card action-reports">
              <div className="action-main-content">
                <div className="action-icon-box">
                  <LuFileSpreadsheet />
                </div>
                <div className="action-text">
                  <h3>View Report Cards</h3>
                  <p>View student results</p>
                </div>
              </div>
              <div className="next_icon_holder">
                <HiChevronRight className="action-arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <QRModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
    </div>
  );
};

export default AdminDashboard;
