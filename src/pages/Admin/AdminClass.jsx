import React from "react";
import "./AdminClass.css";
import Ifeanacho from "../../assets/Ifeanacho.jpg";

const AdminClass = () => {
  const classData = [
    {
      name: "SS 1A",
      section: "Senior Secondary",
      teacher: "Adaeze Clinton",
      students: "24",
    },
    {
      name: "JSS 2C",
      section: "Junior Secondary",
      teacher: "Emeka Ugonna",
      students: "20",
    },
    {
      name: "PRY 1",
      section: "Primary",
      teacher: "Tolu Adesunya",
      students: "15",
    },
    {
      name: "NRY 2",
      section: "Nursery",
      teacher: "Chidi Okoronkwo",
      students: "18",
    },
    {
      name: "SS 3B",
      section: "Senior Secondary",
      teacher: "Grace Obidi",
      students: "28",
    },
    {
      name: "SS 2A",
      section: "Senior Secondary",
      teacher: "Ifeanyi Okafor",
      students: "28",
    },
    {
      name: "JSS 1B",
      section: "Junior Secondary",
      teacher: "Ngozi Bassey",
      students: "22",
    },
  ];
  return (
    <>
      <div className="tableContainer">
        <div className="headerRow">
          <div>
            <h1 className="title">Class Management</h1>
            <p className="subtitle">
              Create classes, assign class teachers and manage class
              information.
            </p>
          </div>
          <button className="addClassBtn">
            <span className="plusIcon">+</span> Add Class
          </button>
        </div>

        <div className="filterSection">
          <div className="filterGroup">
            <label className="filterLabel">Section</label>
            <div className="selectWrapper">
              <select className="selectInput" defaultValue="all">
                <option value="all">All Sections</option>
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
          <table className="classTable">
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Section</th>
                <th>Class Teacher</th>
                <th>Total Student</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((cls, index) => (
                <tr key={index}>
                  <td className="className textLink">{cls.name}</td>
                  <td className="sectionText">{cls.section}</td>
                  <td className="teacherText textLink">{cls.teacher}</td>
                  <td className="studentText textLink">{cls.students}</td>
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

export default AdminClass;
