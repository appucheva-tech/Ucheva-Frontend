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
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ── New Intake State ─────────────────────────────────────
  const [newIntake, setNewIntake] = useState({
    totalStudentsLast30Days: 0,
    loading: true,
    error: false,
  });

  // Filter states
  const [filters, setFilters] = useState({
    class: "all",
    gender: "all",
    department: "all",
  });

  // ── Fetch new intake data ──────────────────────────────────────────
  const fetchNewIntake = async () => {
    setNewIntake((prev) => ({ ...prev, loading: true, error: false }));
    try {
      const res = await apiClient.get("/admin/newIntake");
      console.log("New intake response:", res);

      const totalStudents = res?.data?.totalStudentsLast30Days || 0;
      setNewIntake({
        totalStudentsLast30Days: totalStudents,
        loading: false,
        error: false,
      });
    } catch (error) {
      console.error("Error fetching new intake:", error);
      setNewIntake((prev) => ({ ...prev, loading: false, error: true }));
      toast.error("Failed to fetch new intake data");
    }
  };

  const fetchAllStudents = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/student/getAllStudents", {
        headers: { "x-tenant": subdomain },
      });
      console.log(response);
      const studentData = response.data?.studentsData || [];
      console.log("see this:", studentData);

      setStudents(studentData);
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
        headers: { "x-tenant": subdomain },
      });
      console.log("Classes Response:", response);
      setClasses(response.data.classes || []);
    } catch (error) {
      console.error("Failed to fetch classes", error.message);
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await apiClient.delete(`/student/student/${selectedStudentId}`, {
        headers: { "x-tenant": subdomain },
      });
      toast.success("Student deleted successfully!");
      setShowDeleteModal(false);
      setSelectedStudentId(null);
      await fetchAllStudents();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete student");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditStudent = (studentId) => {
    nav(`/admin/AdminEditStudent/${studentId}`);
  };

  useEffect(() => {
    fetchAllStudents();
    fetchClasses();
    fetchNewIntake(); // Fetch new intake data
  }, []);

  useEffect(() => {
    let filtered = [...students];

    if (filters.class !== "all") {
      filtered = filtered.filter((student) => {
        const studentClass = student.classes || student.studentClass || "";
        const selectedClass = classes.find((c) => c.id === filters.class);
        return selectedClass && studentClass === selectedClass.className;
      });
    }

    if (filters.gender !== "all") {
      filtered = filtered.filter(
        (student) =>
          student.gender &&
          student.gender.toLowerCase() === filters.gender.toLowerCase(),
      );
    }

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
            onClick={() => nav("/admin/AdminStudent2")}
          >
            <FaPlus /> Add Student
          </button>
        </header>

        <div className="AdministrationStudent-metrics-grid">
          <div className="AdministrationStudent-metric-card AdministrationStudent-card-students">
            <div className="AdministrationStudent-card-content">
              <div className="AdministrationStudent-text-section">
                <span className="AdministrationStudent-card-label">
                  Total Students
                </span>
                <span className="AdministrationStudent-card-value">
                  {students.length}
                </span>
              </div>
              <div className="AdministrationStudent-icon-wrapper AdministrationStudent-icon-students">
                <PiStudentFill className="AdministrationStudent-DashIcon" />
              </div>
            </div>
          </div>

          <div className="AdministrationStudent-metric-card AdministrationStudent-card-staff">
            <div className="AdministrationStudent-card-content">
              <div className="AdministrationStudent-text-section">
                <span className="AdministrationStudent-card-label">
                  Total Male
                </span>
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
                <span className="AdministrationStudent-card-label">
                  Total Female
                </span>
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

          {/* ── New Intake Card ── */}
          <div className="AdministrationStudent-metric-card AdministrationStudent-card-fees">
            <div className="AdministrationStudent-card-content">
              <div className="AdministrationStudent-text-section">
                <span className="AdministrationStudent-card-label">
                  New Intake
                </span>
                <span className="AdministrationStudent-card-value">
                  {newIntake.loading ? (
                    "..."
                  ) : newIntake.error ? (
                    <span style={{ fontSize: "0.8rem", color: "#ef4444" }}>
                      Error
                    </span>
                  ) : (
                    newIntake.totalStudentsLast30Days
                  )}
                </span>
              </div>
              <div className="AdministrationStudent-icon-wrapper AdministrationStudent-icon-fees">
                <FaSackDollar className="AdministrationStudent-DashIcon" />
              </div>
            </div>
            {newIntake.error && (
              <div
                className="AdministrationStudent-card-footer"
                style={{
                  padding: "0.5rem 1.25rem",
                  borderTop: "1px solid #f1f5f9",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={fetchNewIntake}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Retry
                </button>
              </div>
            )}
            {!newIntake.loading &&
              !newIntake.error &&
              newIntake.totalStudentsLast30Days > 0 && (
                <div
                  className="AdministrationStudent-card-footer"
                  style={{
                    padding: "0.5rem 1.25rem",
                    borderTop: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#10b981",
                  }}
                >
                  <FaArrowTrendUp style={{ fontSize: "0.875rem" }} />
                  <span style={{ fontSize: "0.75rem", fontWeight: "500" }}>
                    +{newIntake.totalStudentsLast30Days} this month
                  </span>
                </div>
              )}
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
              <label className="AdministrationStudent-filterLabel">
                Gender
              </label>
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
              <label className="AdministrationStudent-filterLabel">
                Department
              </label>
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
          <button
            className="AdministrationStudent-resetBtn"
            onClick={resetFilters}
          >
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
                  <tr key={student.id || index}>
                    <td className="AdministrationStudent-studentName">
                      {student.fullName || "--"}
                    </td>
                    <td className="AdministrationStudent-genderText">
                      {student.gender}
                    </td>
                    <td className="AdministrationStudent-classText">
                      {student.classes || student.className || "--"}
                    </td>
                    <td className="AdministrationStudent-deptText">
                      {student.department || "--"}
                    </td>
                    <td className="AdministrationStudent-phoneText">
                      {student.parentGuardiansPhoneNumber ||
                        student.phoneNumber ||
                        "--"}
                    </td>
                    <td>
                      <div className="AdministrationStudent-actionButtons">
                        <button
                          className="AdministrationStudent-editBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditStudent(student.id);
                          }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>

                        <button
                          className="AdministrationStudent-deleteBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudentId(student.id);
                            setShowDeleteModal(true);
                          }}
                        >
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
              <div className="AdministrationStudent-paginationInfo">
                Showing pages of 1 to 7
              </div>

              <div className="AdministrationStudent-paginationControls">
                <button className="AdministrationStudent-arrowBtn" disabled>
                  &lt;
                </button>
                <button className="AdministrationStudent-pageBtn AdministrationStudent-activePage">
                  1
                </button>
                <button className="AdministrationStudent-pageBtn">2</button>
                <button className="AdministrationStudent-pageBtn">3</button>
                <span className="AdministrationStudent-ellipsis">...</span>
                <button className="AdministrationStudent-pageBtn">6</button>
                <button className="AdministrationStudent-pageBtn">7</button>
                <button className="AdministrationStudent-arrowBtn">&gt;</button>
              </div>

              <div className="AdministrationStudent-rowsPerPageGroup">
                <span className="AdministrationStudent-rowsLabel">
                  Rows per page
                </span>
                <div className="AdministrationStudent-rowsSelectWrapper">
                  <select
                    className="AdministrationStudent-rowsSelect"
                    defaultValue="10"
                  >
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="footerRow">
          <span className="copyrightText">
            ©️ {new Date().getFullYear()} Ucheva school operating management
            system. All rights reserved.
          </span>
          <span className="supportText">
            Need help?{" "}
            <a href="#support" className="supportLink">
              Contact support
            </a>
          </span>
        </footer>
      </div>

      {/* Delete Student Modal */}
      {showDeleteModal && (
        <div className="modalOverlay" onClick={() => setShowDeleteModal(false)}>
          <div
            className="modalContent deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHeader">
              <h2>Delete Student</h2>
              <button
                className="closeBtn"
                onClick={() => setShowDeleteModal(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ width: "18px", height: "18px" }}
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="modalBody">
              <p className="deleteWarningText">
                Are you sure you want to delete this student? This action cannot
                be undone.
              </p>
            </div>
            <div className="modalFooter">
              <button
                className="cancelBtn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="confirmDeleteBtn"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminStudents;
