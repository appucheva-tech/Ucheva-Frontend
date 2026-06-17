import React from "react";
import "./AdminAttendance.css";
import { useNavigate, useLocation } from "react-router-dom";
import Ifeanacho from "../../assets/Ifeanacho.jpg";

const AdminAttendance = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const categories = ["Staff Attendance", "Student Attendance"];
  const activeTab = pathname.includes("AdminStudentAttendance") ? 1 : 0;

  const attendanceData = [
    {
      name: "Mr. John Okafor",
      role: "Teacher",
      checkIn: "8:30 AM",
      checkOut: "4:30 PM",
      date: "18 May 2026",
    },
    {
      name: "Mrs. Jane Adesany",
      role: "Teacher",
      checkIn: "07:45 AM",
      checkOut: "05:45 PM",
      date: "18 May 2026",
    },
    {
      name: "Mr. Peter Ibrahim",
      role: "Chef",
      checkIn: "07:52 AM",
      checkOut: "04:52 PM",
      date: "18 May 2026",
    },
    {
      name: "Mrs. Funke Adebay",
      role: "Security",
      checkIn: "08:25 AM",
      checkOut: "04:25 PM",
      date: "18 May 2026",
    },
    {
      name: "Mr. Samuel Eke",
      role: "Teacher",
      checkIn: "08:15 AM",
      checkOut: "06:15 PM",
      date: "18 May 2026",
    },
    {
      name: "Ms. Grace Bello",
      role: "School Nurse",
      checkIn: "--",
      checkOut: "--",
      date: "18 May 2026",
    },
    {
      name: "Mr. Daniel Moses",
      role: "Teacher",
      checkIn: "07:40 AM",
      checkOut: "06:40 PM",
      date: "18 May 2026",
    },
  ];
  return (
    <>
      <div className="attendanceContainer">
        <header className="pageHeader">
          <h1 className="headerTitle">Attendance</h1>
          <p className="headerSubtitle">
            View and monitor staff and student attendance records.
          </p>
        </header>

        <div className="attendanceContentCard">
          <div className="tabsGroup">
            {categories.map((tab, idx) => (
              <button
                key={tab}
                className={`tabItem ${activeTab === idx ? "activeTabItem" : ""}`}
                onClick={() =>
                  nav(
                    idx === 0
                      ? "/admin/AdminAttendance"
                      : "/admin/AdminStudentAttendance",
                  )
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="toolbarRow">
            <h2 className="sectionHeading">Staff Attendance</h2>
            <div className="toolbarControls">
              <div className="filterBox">
                <span className="filterLabel">Date Filter</span>
                <div className="datePickerMock">
                  <span className="calendarIcon">📅</span>
                  <span className="dateText">Monday, May 18 2026</span>
                </div>
              </div>
              <button className="resetButton">
                <svg
                  className="resetIcon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                Reset
              </button>
            </div>
          </div>

          <div className="tableResponsiveWrapper">
            <table className="attendanceTable">
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Role</th>
                  <th>Time Checked In</th>
                  <th>Time Checked Out</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((row, index) => (
                  <tr key={index}>
                    <td className="staffNameCell">{row.name}</td>
                    <td className="roleCell">{row.role}</td>
                    <td className="timeCell">{row.checkIn}</td>
                    <td className="timeCell">{row.checkOut}</td>
                    <td className="dateCell">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="paginationContainer">
            <div className="recordsCountInfo">Showing pages of 1 to 7</div>
            <div className="paginationControlsGroup">
              <button className="navArrow" disabled>
                &lt;
              </button>
              <button className="pageNumber activePage">1</button>
              <button className="pageNumber">2</button>
              <button className="pageNumber">3</button>
              <span className="paginationEllipsis">...</span>
              <button className="pageNumber">6</button>
              <button className="pageNumber">7</button>
              <button className="navArrow">&gt;</button>
            </div>
            <div className="pageSizeSelector">
              <span className="pageSizeLabel">Rows per page</span>
              <div className="customSelectWrapper">
                <select className="nativeSelect" defaultValue="10">
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <footer className="systemFooter">
          <span className="copyrightNote">
            © 2026 Ucheva school operating management system . All right
            reserved.
          </span>
          <span className="supportNote">
            Need help?{" "}
            <a href="#support" className="supportAnchor">
              Contact support
            </a>
          </span>
        </footer>
      </div>
    </>
  );
};

export default AdminAttendance;
