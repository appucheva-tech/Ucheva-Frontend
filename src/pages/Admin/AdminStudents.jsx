import React from "react";
import "./AdminStudents.css";
import Ifeanacho from "../../assets/Ifeanacho.jpg";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaPlus, FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AdminStudents = () => {
  const nav = useNavigate();
  const studentData = [
    {
      name: "Adaeze Clinton",
      gender: "Female",
      class: "JSS 1A",
      department: "Science",
      phone: "08032456789",
    },
    {
      name: "Emeka Ugonna",
      gender: "Male",
      class: "JSS 2C",
      department: "--",
      phone: "08061234567",
    },
    {
      name: "Tolu Adesunya",
      gender: "Male",
      class: "PRY 1",
      department: "--",
      phone: "08029876543",
    },
    {
      name: "Chidi Okoronkwo",
      gender: "Male",
      class: "NRY 2",
      department: "--",
      phone: "08098765432",
    },
    {
      name: "Grace Obidi",
      gender: "Female",
      class: "SS 3B",
      department: "Food & Nut.",
      phone: "08101122233",
    },
    {
      name: "Ifeanyi Okafor",
      gender: "Male",
      class: "SS 2A",
      department: "Art",
      phone: "08055567788",
    },
    {
      name: "Ngozi Bassey",
      gender: "Female",
      class: "JSS 1B",
      department: "--",
      phone: "08073345566",
    },
  ];

  return (
    <>
      <div className="ddashboard-container">
        <header className="dashboard-header">
          <h1 className="welcome-text">
            Good morning, Mr Eric 👋{" "}
            <span className="subtitle-text">
              Here's an overview of Green Field Academy activities today.
            </span>
          </h1>
          <button
            className="AddStudent"
            onClick={() => {
              nav("/admin/AdminStudent2");
            }}
          >
            <FaPlus /> Add Student
          </button>
        </header>

        <div className="metrics-grid">
          <div className="metric-card card-students">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Total Students</span>
                <span className="card-value">342</span>
              </div>
              <div className="icon-wrapper icon-students">
                <PiStudentFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FaArrowTrendUp className="arrow" /> 12 from last week
            </div>
          </div>

          <div className="metric-card card-staff">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Total Staff</span>
                <span className="card-value">28</span>
              </div>
              <div className="icon-wrapper icon-staff">
                <HiMiniUserGroup className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FaArrowTrendUp className="arrow" /> 2 from last week
            </div>
          </div>

          <div className="metric-card card-attendance">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Attendance Rate</span>
                <span className="card-value">93%</span>
              </div>
              <div className="icon-wrapper icon-attendance">
                <PiCalendarBlankFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FaArrowTrendUp className="arrow" /> 2 from last week
            </div>
          </div>

          <div className="metric-card card-fees">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Fees Collected</span>
                <span className="card-value">N1,200,000</span>
              </div>
              <div className="icon-wrapper icon-fees">
                <FaSackDollar className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-pct">
              <FaArrowTrendUp className="arrow" /> 72% fee collected
            </div>
          </div>
        </div>
      </div>
      <div className="tableContainer">
        <div className="filterSection">
          <div className="filtersGroup">
            <div className="filterItem">
              <label className="filterLabel">Class</label>
              <div className="selectWrapper">
                <select className="selectInput" defaultValue="all">
                  <option value="all">All Classes</option>
                </select>
              </div>
            </div>
            <div className="filterItem">
              <label className="filterLabel">Gender</label>
              <div className="selectWrapper">
                <select className="selectInput" defaultValue="all">
                  <option value="all">All Gender</option>
                </select>
              </div>
            </div>
            <div className="filterItem">
              <label className="filterLabel">Department</label>
              <div className="selectWrapper">
                <select className="selectInput" defaultValue="all">
                  <option value="all">All Departments</option>
                </select>
              </div>
            </div>
          </div>
          <button className="resetBtn">
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

        <div className="tableWrapper">
          <table className="studentTable">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Department</th>
                <th>Parent Phone No.</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={index}>
                  <td className="studentName">{student.name}</td>
                  <td className="genderText">{student.gender}</td>
                  <td className="classText">{student.class}</td>
                  <td className="deptText">{student.department}</td>
                  <td className="phoneText">{student.phone}</td>
                  <td>
                    <div className="actionButtons">
                      <button className="editBtn">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className="deleteBtn">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="paginationRow">
            <div className="paginationInfo">Showing pages of 1 to 7</div>

            <div className="paginationControls">
              <button className="arrowBtn" disabled>
                &lt;
              </button>
              <button className="pageBtn activePage">1</button>
              <button className="pageBtn">2</button>
              <button className="pageBtn">3</button>
              <span className="ellipsis">...</span>
              <button className="pageBtn">6</button>
              <button className="pageBtn">7</button>
              <button className="arrowBtn">&gt;</button>
            </div>

            <div className="rowsPerPageGroup">
              <span className="rowsLabel">Rows per page</span>
              <div className="rowsSelectWrapper">
                <select className="rowsSelect" defaultValue="10">
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <footer className="footerRow">
          <span className="copyrightText">
            © 2026 Ucheva school operating management system . All right
            reserved.
          </span>
          <span className="supportText">
            Need help?{" "}
            <a href="#support" className="supportLink">
              Contact support
            </a>
          </span>
        </footer>
      </div>
    </>
  );
};

export default AdminStudents;
