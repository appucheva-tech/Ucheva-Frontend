import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminStudentAttendance.css";

const StudentAttendance = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const activeTab = pathname.includes("AdminStudentAttendance") ? 1 : 0;
  const students = [
    {
      name: "David Okafor",
      class: "JSS 2A",
      teacher: "Mrs. Adeola",
      status: "Present",
      date: "18 May 2026",
    },
    {
      name: "Precious Adebay",
      class: "JSS 2A",
      teacher: "Mrs. Adeola",
      status: "Present",
      date: "18 May 2026",
    },
    {
      name: "Emmanuel John",
      class: "JSS 2A",
      teacher: "Mrs. Adeola",
      status: "Present",
      date: "18 May 2026",
    },
    {
      name: "Gloria Solomon",
      class: "JSS 2A",
      teacher: "Mrs. Adeola",
      status: "Present",
      date: "18 May 2026",
    },
    {
      name: "Michael Uche",
      class: "JSS 2A",
      teacher: "Mrs. Adeola",
      status: "Present",
      date: "18 May 2026",
    },
    {
      name: "Sarah James",
      class: "JSS 2A",
      teacher: "Mrs. Adeola",
      status: "Absent",
      date: "18 May 2026",
    },
    {
      name: "Clinton Uche",
      class: "JSS 2A",
      teacher: "Mrs. Adeola",
      status: "Present",
      date: "18 May 2026",
    },
  ];

  return (
    <div className="Napp-container">
        <h1 className="Napp-h1">Attendance</h1>
        <p className="Napp-p">View and monitor staff and student attendance records.</p>
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
                <i className="Nicon-chevron-down"></i>
              </div>
            </div>
            <div className="Nfilter-group">
              <label htmlFor="status-filter">Status</label>
              <div className="Nselect-wrapper">
                <select id="status-filter">
                  <option value="all">All Status</option>
                </select>
                <i className="Nicon-chevron-down"></i>
              </div>
            </div>
            <div className="Nfilter-group">
              <label>Date Filter</label>
              <div className="Ndate-wrapper">
                <i className="Nicon-calendar"></i>
                <input type="text" value="Monday, May 18 2026" readOnly />
              </div>
            </div>
            <button className="Nreset-button">
              <i className="Nicon-reset"></i> Reset
            </button>
          </div>
        </div>

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
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="Nname">{student.name}</td>
                  <td className="Nclass">{student.class}</td>
                  <td className="Nteacher">{student.teacher}</td>
                  <td>
                    <span
                      className={`Nstatus-badge N${student.status.toLowerCase()}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>{student.date}</td>
                  <td>
                    <button
                      className="Nnotify-button"
                      disabled={student.status === "Present"}
                    >
                      <i className="Nicon-whatsapp"></i> Notify Parent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="Npagination-container">
          <span className="Npagination-info">Showing pages of 1 to 7</span>
          <div className="Npagination-controls">
            <button className="Nprev-page" disabled>
              <i className="Nicon-chevron-left"></i>
            </button>
            <button className="Npage-number Nactive">1</button>
            <button className="Npage-number">2</button>
            <button className="Npage-number">3</button>
            <span className="Npagination-dots">...</span>
            <button className="Npage-number">6</button>
            <button className="Npage-number">7</button>
            <button className="Nnext-page">
              <i className="Nicon-chevron-right"></i>
            </button>
          </div>
          <div className="Nrows-per-page">
            <label htmlFor="rows-select">Rows per page</label>
            <select id="rows-select">
              <option value="10">10</option>
            </select>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentAttendance;
