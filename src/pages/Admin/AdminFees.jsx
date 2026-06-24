import React, { useEffect, useState } from "react";
import "./AdminFees.css";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar, FaArrowTrendUp } from "react-icons/fa6";
import { apiClient } from "../../config/AxiosInstance";

const AdminFees = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeesDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await apiClient.get("/payment/dashboard");

        const dashboard = res?.data?.feesDashboard;
        setData(dashboard);

        console.log("Fees dashboard:", dashboard);
      } catch (err) {
        console.error(err);
        setError("Failed to load fees dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchFeesDashboard();
  }, []);

  const cards = data?.cards;
  const feeRecords = data?.feeRecords || [];

  const getStatusClass = (status) => {
    switch (status) {
      case "full payment":
      case "fully paid":
        return "statusFull";
      case "part payment":
        return "statusPart";
      case "unpaid":
        return "statusUnpaid";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="welcome-text">
            {data?.greeting || "Good morning"}{" "}
          </h1>
          <p className="subtitle-text">
            {data?.overviewText ||
              "Set up fee structures and monitor student fee payments."}
          </p>
        </header>

        {loading && <div style={{ padding: "20px" }}>Loading dashboard...</div>}

        {error && !loading && (
          <div style={{ padding: "20px", color: "red" }}>{error}</div>
        )}

        {!loading && !error && !data && (
          <div style={{ padding: "20px", textAlign: "center" }}>
            No dashboard data available.
          </div>
        )}

        {!loading && data && (
          <div className="metrics-grid">
            <div className="metric-card card-students">
              <div className="card-content">
                <div className="text-section">
                  <span className="card-label">Total Students</span>
                  <span className="card-value">
                    {cards?.totalStudents?.value || 0}
                  </span>
                </div>
                <div className="icon-wrapper icon-students">
                  <PiStudentFill className="DashIcon" />
                </div>
              </div>
              <div className="card-footer trend-up">
                <FaArrowTrendUp className="arrow" />{" "}
                {cards?.totalStudents?.fromLastWeek || 0} from last week
              </div>
            </div>

            <div className="metric-card card-staff">
              <div className="card-content">
                <div className="text-section">
                  <span className="card-label">Total Staff</span>
                  <span className="card-value">
                    {cards?.totalStaff?.value || 0}
                  </span>
                </div>
                <div className="icon-wrapper icon-staff">
                  <HiMiniUserGroup className="DashIcon" />
                </div>
              </div>
              <div className="card-footer trend-up">
                <FaArrowTrendUp className="arrow" />{" "}
                {cards?.totalStaff?.fromLastWeek || 0} from last week
              </div>
            </div>

            <div className="metric-card card-attendance">
              <div className="card-content">
                <div className="text-section">
                  <span className="card-label">Attendance Rate</span>
                  <span className="card-value">
                    {cards?.attendanceRate?.value || 0}%
                  </span>
                </div>
                <div className="icon-wrapper icon-attendance">
                  <PiCalendarBlankFill className="DashIcon" />
                </div>
              </div>
              <div className="card-footer trend-up">
                <FaArrowTrendUp className="arrow" />{" "}
                {cards?.attendanceRate?.fromLastWeek || 0} from last week
              </div>
            </div>

            <div className="metric-card card-fees">
              <div className="card-content">
                <div className="text-section">
                  <span className="card-label">Fees Collected</span>
                  <span className="card-value">
                    ₦{cards?.feesCollected?.value || 0}
                  </span>
                </div>
                <div className="icon-wrapper icon-fees">
                  <FaSackDollar className="DashIcon" />
                </div>
              </div>
              <div className="card-footer trend-pct">
                <FaArrowTrendUp className="arrow" />{" "}
                {cards?.feesCollected?.percentCollected || 0}% fee collected
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="tableContainer">
        <div className="filterSection">
          <div className="filtersGroup">
            <div className="filterItem">
              <label className="filterLabel">Class Section</label>
              <select className="selectInput">
                <option>{data?.filters?.classSection || "All Classes"}</option>
              </select>
            </div>

            <div className="filterItem">
              <label className="filterLabel">Payment Status</label>
              <select className="selectInput">
                <option>{data?.filters?.paymentStatus || "All Status"}</option>
              </select>
            </div>

            <div className="filterItem">
              <label className="filterLabel">Term</label>
              <select className="selectInput">
                <option>{data?.filters?.term || "Third Term"}</option>
              </select>
            </div>
          </div>

          <div className="actionRowButtons">
            <button className="exportBtn">Export</button>
            <button className="resetBtn">Reset</button>
          </div>
        </div>

        {loading && (
          <div style={{ padding: "20px" }}>Loading fee records...</div>
        )}

        {!loading && data && feeRecords.length === 0 && (
          <div style={{ padding: "20px", textAlign: "center" }}>
            No fee records found.
          </div>
        )}

        {!loading && feeRecords.length > 0 && (
          <div className="tableWrapper">
            <table className="feesTable">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Total Amount</th>
                  <th>Amount Paid</th>
                  <th>Payment Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {feeRecords.map((row, index) => (
                  <tr key={row.studentId || index}>
                    <td>{row.studentName}</td>
                    <td>{row.class}</td>
                    <td>₦{row.totalAmount}</td>
                    <td>₦{row.amountPaid}</td>
                    <td>{row.paymentType}</td>
                    <td>
                      <span
                        className={`statusBadge ${getStatusClass(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td>
                      {row.date
                        ? new Date(row.date).toLocaleDateString()
                        : "--"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="footerRow">
        <span>© 2026 Ucheva school operating management system</span>
      </footer>
    </>
  );
};

export default AdminFees;
