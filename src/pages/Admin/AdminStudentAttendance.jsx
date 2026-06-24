import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminStudentAttendance.css";
import { apiClient } from "../../config/AxiosInstance";

const StudentAttendance = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const activeTab = pathname.includes("AdminStudentAttendance") ? 1 : 0;

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await apiClient.get("/classteacher/attendance/today");

        const data = res?.data?.Attendance || [];

        setStudents(data);
        console.log("Attendance response:", data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setError("Failed to fetch attendance data");
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const attendanceData = students;

  return (
    <div className="Napp-container">
      <h1 className="Napp-h1">Attendance</h1>
      <p className="Napp-p">
        View and monitor staff and student attendance records.
      </p>
      <section className="NContainer">
      <header className="Nheader">
        <nav className="Nnavigation">
          <button
            className={`Nnav-item ${activeTab === 0 ? "Nactive" : ""}`}
            onClick={() => nav("/admin/AdminAttendance")}
          >
            Staff Attendance
          </button>
          <button
            className={`Nnav-item ${activeTab === 1 ? "Nactive" : ""}`}
            onClick={() => nav("/admin/AdminStudentAttendance")}
          >
            Student Attendance
          </button>
        </nav>
      </header>

      <main className="Nmain-content">
        <div className="Ntitle-row">
          <h1 className="Ntitle">Student Attendance</h1>

          <div className="Nfilters">
            <div className="Nfilter-group">
              <label htmlFor="class-filter">Class</label>
              <div className="Nselect-wrapper">
                <select id="class-filter">
                  <option value="all">All Classes</option>
                </select>
              </div>
            </div>

            <div className="Nfilter-group">
              <label htmlFor="status-filter">Status</label>
              <div className="Nselect-wrapper">
                <select id="status-filter">
                  <option value="all">All Status</option>
                </select>
              </div>
            </div>

            <div className="Nfilter-group">
              <label>Date Filter</label>
              <div className="Ndate-wrapper">
                <input type="text" value="Today" readOnly />
              </div>
            </div>

            <button className="Nreset-button">Reset</button>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div style={{ padding: "20px" }}>Loading attendance...</div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div style={{ padding: "20px", color: "red" }}>{error}</div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && attendanceData.length === 0 && (
          <div style={{ padding: "20px", textAlign: "center" }}>
            No attendance records found for today.
          </div>
        )}

        {/* TABLE */}
        {!loading && !error && attendanceData.length > 0 && (
          <div className="Ntable-container">
            <table className="Nattendance-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Class Teacher</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {attendanceData.map((item, index) => (
                  <tr key={item.id || index}>
                    <td className="Nname">
                      {item?.student
                        ? `${item.student.firstName || ""} ${item.student.lastName || ""}`.trim()
                        : item.studentName || "N/A"}
                    </td>

                    <td className="Nclass">{item.studentClass || "N/A"}</td>

                    <td className="Nteacher">{item.classTeacher || "N/A"}</td>

                    <td>
                      <span
                        className={`Nstatus-badge N${(
                          item.status || "present"
                        ).toLowerCase()}`}
                      >
                        {item.status || "present"}
                      </span>
                    </td>

                    <td>{item.date || "N/A"}</td>

                    <td>
                      <button
                        className="Nnotify-button"
                        disabled={
                          (item.status || "present").toLowerCase() === "present"
                        }
                        onClick={() => {
                          const url = item?.whatsAppAction?.url;
                          if (url) window.open(url, "_blank");
                        }}
                      >
                        Notify Parent
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION (UNCHANGED) */}
        <div className="Npagination-container">
          <span className="Npagination-info">Showing pages of 1 to 7</span>
          <div className="Npagination-controls">
            <button className="Nprev-page" disabled>
              &lt;
            </button>
            <button className="Npage-number Nactive">1</button>
            <button className="Npage-number">2</button>
          </div>
        </div>
      </main>
      </section>
    </div>
  );
};

export default StudentAttendance;
