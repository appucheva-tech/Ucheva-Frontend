import React, { useEffect, useState } from "react";
import "./AdminStudents.css";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaPlus, FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../config/AxiosInstance";
import { toast } from "react-toastify";

const AdminStudents = () => {
  const nav = useNavigate();
  const subdomain = window.location.hostname.split(".")[0];

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    class: "all",
    gender: "all",
    department: "all",
  });

  const fetchAllStudents = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/student/getAllStudents", {
        headers: {
          "x-tenant": subdomain,
        },
      });

      console.log(response);

      const studentData = response.data?.studentsData || [];
      setStudents(studentData);
      console.log(studentData);
      setFilteredStudents(studentData);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to fetch students");

      setStudents([]);
      setFilteredStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await apiClient.get("/class/classes", {
        headers: {
          "x-tenant": subdomain,
        },
      });

      console.log("Classes Response:", response);
      setClasses(response.data.classes || []);
    } catch (error) {
      console.error("Failed to fetch classes", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllStudents();
    fetchClasses();
  }, []);

  // Filter students whenever filters or students change
  useEffect(() => {
    let filtered = [...students];

    // Filter by class
    if (filters.class !== "all") {
      filtered = filtered.filter((student) => {
        const studentClass = student.classes || student.studentClass || "";
        const selectedClass = classes.find((c) => c.id === filters.class);
        return selectedClass && studentClass === selectedClass.className;
      });
    }

    // Filter by gender
    if (filters.gender !== "all") {
      filtered = filtered.filter(
        (student) =>
          student.gender &&
          student.gender.toLowerCase() === filters.gender.toLowerCase(),
      );
    }

    // Filter by department
    if (filters.department !== "all") {
      filtered = filtered.filter(
        (student) => student.department === filters.department,
      );
    }

    setFilteredStudents(filtered);
  }, [filters, students, classes]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      class: "all",
      gender: "all",
      department: "all",
    });
  };

  return (
    <>
      <div className="AdministrationStudent-ddashboard-container">
        <header className="AdministrationStudent-dashboard-header">
          <h1 className="AdministrationStudent-welcome-text">
            Student Management{" "}
            <span className="AdministrationStudent-subtitle-text">
              Manage student records, view details and track student
              information.
            </span>
          </h1>
          <button
            className="AdministrationStudent-AddStudent"
            onClick={() => {
              nav("/admin/AdminStudent2");
            }}
          >
            <FaPlus /> Add Student
          </button>
        </header>

        <div className="AdministrationStudent-metrics-grid">
          <div className="AdministrationStudent-metric-card AdministrationStudent-card-students">
            <div className="AdministrationStudent-card-content">
              <div className="AdministrationStudent-text-section">
                <span className="AdministrationStudent-card-label">Total Students</span>
                <span className="AdministrationStudent-card-value">{students.length}</span>
              </div>
              <div className="AdministrationStudent-icon-wrapper AdministrationStudent-icon-students">
                <PiStudentFill className="AdministrationStudent-DashIcon" />
              </div>
            </div>
          </div>

          <div className="AdministrationStudent-metric-card AdministrationStudent-card-staff">
            <div className="AdministrationStudent-card-content">
              <div className="AdministrationStudent-text-section">
                <span className="AdministrationStudent-card-label">Total Male</span>
                <span className="AdministrationStudent-card-value">
                  {
                    students.filter(
                      (s) => s.gender && s.gender.toLowerCase() === "male",
                    ).length
                  }
                </span>
              </div>
              <div className="AdministrationStudent-icon-wrapper AdministrationStudent-icon-staff">
                <HiMiniUserGroup className="AdministrationStudent-DashIcon" />
              </div>
            </div>
          </div>

          <div className="AdministrationStudent-metric-card AdministrationStudent-card-attendance">
            <div className="AdministrationStudent-card-content">
              <div className="AdministrationStudent-text-section">
                <span className="AdministrationStudent-card-label">Total Female</span>
                <span className="AdministrationStudent-card-value">
                  {
                    students.filter(
                      (s) => s.gender && s.gender.toLowerCase() === "female",
                    ).length
                  }
                </span>
              </div>
              <div className="AdministrationStudent-icon-wrapper AdministrationStudent-icon-attendance">
                <PiCalendarBlankFill className="AdministrationStudent-DashIcon" />
              </div>
            </div>
          </div>

          <div className="AdministrationStudent-metric-card AdministrationStudent-card-fees">
            <div className="AdministrationStudent-card-content">
              <div className="AdministrationStudent-text-section">
                <span className="AdministrationStudent-card-label">New Intake</span>
                <span className="AdministrationStudent-card-value">{0}</span>
              </div>
              <div className="AdministrationStudent-icon-wrapper AdministrationStudent-icon-fees">
                <FaSackDollar className="AdministrationStudent-DashIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="AdministrationStudent-tableContainer">
        <div className="AdministrationStudent-filterSection">
          <div className="AdministrationStudent-filtersGroup">
            <div className="AdministrationStudent-filterItem">
              <label className="AdministrationStudent-filterLabel">Class</label>
              <div className="AdministrationStudent-selectWrapper">
                <select
                  className="AdministrationStudent-selectInput"
                  value={filters.class}
                  onChange={(e) => handleFilterChange("class", e.target.value)}
                >
                  <option value="all">All Classes</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.className}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="AdministrationStudent-filterItem">
              <label className="AdministrationStudent-filterLabel">Gender</label>
              <div className="AdministrationStudent-selectWrapper">
                <select
                  className="AdministrationStudent-selectInput"
                  value={filters.gender}
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
                >
                  <option value="all">All Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
            </div>
            <div className="AdministrationStudent-filterItem">
              <label className="AdministrationStudent-filterLabel">Department</label>
              <div className="AdministrationStudent-selectWrapper">
                <select
                  className="AdministrationStudent-selectInput"
                  value={filters.department}
                  onChange={(e) =>
                    handleFilterChange("department", e.target.value)
                  }
                >
                  <option value="all">All Departments</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Science">Science</option>
                  <option value="Art">Art</option>
                </select>
              </div>
            </div>
          </div>
          <button className="AdministrationStudent-resetBtn" onClick={resetFilters}>
            <svg
              className="AdministrationStudent-resetIcon"
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

        <div className="AdministrationStudent-tableWrapper">
          <table className="AdministrationStudent-studentTable">
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
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    Loading students...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No students found with the selected filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, index) => (
                  <tr key={student.id || student._id || index}>
                    <td className="AdministrationStudent-studentName">{student.fullName}</td>

                    <td className="AdministrationStudent-genderText">{student.gender}</td>

                    <td className="AdministrationStudent-classText">
                      {student.classes || student.studentClass || "--"}
                    </td>

                    <td className="AdministrationStudent-deptText">{student.department || "--"}</td>

                    <td className="AdministrationStudent-phoneText">
                      {student.parentGuardiansPhoneNumber ||
                        student.phoneNumber ||
                        "--"}
                    </td>

                    <td>
                      <div className="AdministrationStudent-actionButtons">
                        <button className="AdministrationStudent-editBtn">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>

                        <button className="AdministrationStudent-deleteBtn">
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
                ))
              )}
            </tbody>
          </table>

          {filteredStudents.length > 0 && (
            <div className="AdministrationStudent-paginationRow">
              <div className="AdministrationStudent-paginationInfo">Showing pages of 1 to 7</div>

              <div className="AdministrationStudent-paginationControls">
                <button className="AdministrationStudent-arrowBtn" disabled>
                  &lt;
                </button>
                <button className="AdministrationStudent-pageBtn AdministrationStudent-activePage">1</button>
                <button className="AdministrationStudent-pageBtn">2</button>
                <button className="AdministrationStudent-pageBtn">3</button>
                <span className="AdministrationStudent-ellipsis">...</span>
                <button className="AdministrationStudent-pageBtn">6</button>
                <button className="AdministrationStudent-pageBtn">7</button>
                <button className="AdministrationStudent-arrowBtn">&gt;</button>
              </div>

              <div className="AdministrationStudent-rowsPerPageGroup">
                <span className="AdministrationStudent-rowsLabel">Rows per page</span>
                <div className="AdministrationStudent-rowsSelectWrapper">
                  <select className="AdministrationStudent-rowsSelect" defaultValue="10">
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="AdministrationStudent-footerRow">
          <span className="AdministrationStudent-copyrightText">
            © 2026 Ucheva school operating management system . All right
            reserved.
          </span>
          <span className="AdministrationStudent-supportText">
            Need help?{" "}
            <a href="#support" className="AdministrationStudent-supportLink">
              Contact support
            </a>
          </span>
        </footer>
      </div>
    </>
  );
};

export default AdminStudents;