import React, { useState } from "react";
import "./AdminSubjects.css";
import Ifeanacho from "../../assets/Ifeanacho.jpg";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminSubjects = () => {
  const baseUrl = import.meta.env.VITE_Base_Url;
  const token = useSelector((state) => state?.user?.token);
  console.log(token);
  const subjectData = [
    {
      name: "Mathematics",
      departments: "General",
      section: "All Sections",
      teachers: "8",
    },
    {
      name: "English Language",
      departments: "General",
      section: "All Sections",
      teachers: "8",
    },
    {
      name: "Civic Education",
      departments: "General",
      section: "PRY, JSS, SS",
      teachers: "7",
    },
    {
      name: "Basic Science",
      departments: "General",
      section: "PRY, JSS, SS",
      teachers: "5",
    },
    { name: "Chemistry", departments: "Science", section: "SS", teachers: "1" },
    {
      name: "Further Maths",
      departments: "Science",
      section: "SS",
      teachers: "1",
    },
    { name: "Government", departments: "Art", section: "SS", teachers: "1" },
  ];
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    subjectName: "",
    section: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        subjectName: formData.subjectName,
        section: formData.section,
        department: formData.department,

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      console.log("Payload:", payload);

      await axios.post(`${baseUrl}/subject/subject`, payload);

      setShowModal(false);

      setFormData({
        subjectName: "",
        section: "",
        department: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="sdashboard-container">
        <header className="dashboard-header">
          <div>
            <h1 className="welcome-text">
              Good morning, Mr Eric <span className="wave-emoji">👋</span>
            </h1>
            <p className="subtitle-text">
              Here's an overview of Green Field Academy activities today.
            </p>
          </div>
          <button className="AddSubject" onClick={() => setShowModal(true)}>
            + Add Subject
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
          <div className="filterGroup">
            <label className="filterLabel">Filter By</label>
            <div className="selectWrapper">
              <select className="selectInput" defaultValue="all">
                <option value="all">All Section</option>
              </select>
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
          <table className="subjectTable">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Applicable Departments</th>
                <th>Applicable Section</th>
                <th>Assigned Teachers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjectData.map((subject, index) => (
                <tr key={index}>
                  <td className="subjectName">{subject.name}</td>
                  <td className="deptText">{subject.departments}</td>
                  <td className="sectionText">{subject.section}</td>
                  <td className="teachersText">{subject.teachers}</td>
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
      {showModal && (
        <div className="modalOverlay">
          <div className="subjectModal">
            <div className="modalHeader">
              <h2>Add New Subject</h2>

              <button className="closeBtn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <div className="formGroup">
              <label>Subject Name</label>

              <input
                type="text"
                name="subjectName"
                placeholder="e.g. Mathematics"
                value={formData.subjectName}
                onChange={handleChange}
              />
            </div>

            <div className="formGroup">
              <label>Applicable Section</label>

              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
              >
                <option value="">Select Level</option>
                <option value="PRY">Primary</option>
                <option value="JSS">JSS</option>
                <option value="SS">SS</option>
              </select>

              <small>
                Select the class level(s) this subject is applicable to.
              </small>
            </div>

            <div className="formGroup">
              <label>Applicable Departments</label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="General">General</option>
                <option value="Science">Science</option>
                <option value="Art">Art</option>
                <option value="Commercial">Commercial</option>
              </select>

              <small>Helps you classify the type of subject.</small>
            </div>

            <div className="modalActions">
              <button className="cancelBtn" onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button
                className="createBtn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Subject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSubjects;
