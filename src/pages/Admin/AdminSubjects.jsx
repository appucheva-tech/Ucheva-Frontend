import React, { useState, useEffect, useRef } from "react";
import "./AdminSubjects.css";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { apiClient } from "../../config/AxiosInstance";
import { toast } from "react-toastify";

const AdminSubjects = () => {
  const subdomain = window.location.hostname.split(".")[0];
  const token = useSelector((state) => state?.user?.token);

  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [filterSection, setFilterSection] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [editValidationErrors, setEditValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    subjectName: "",
    sections: [],
    department: "",
    teacherID: "",
  });

  const [editFormData, setEditFormData] = useState({
    subjectName: "",
    sections: [],
    department: "",
    teacherID: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditDropdownOpen, setIsEditDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const editDropdownRef = useRef(null);

  const validateTextOnly = (value) => {
    const textOnlyRegex = /^[A-Za-z\s\-']+$/;
    return textOnlyRegex.test(value);
  };

  const validateAlphanumeric = (value) => {
    const alphanumericRegex = /^[A-Za-z0-9\s\-']+$/;
    return alphanumericRegex.test(value);
  };

  const getValidationErrorMessage = (field, value) => {
    if (!value || value.trim() === "") {
      return `${field} is required`;
    }

    if (field === "Subject Name") {
      if (!validateAlphanumeric(value)) {
        return "Subject name can only contain letters, numbers, spaces, and hyphens";
      }
      if (value.length < 2) {
        return "Subject name must be at least 2 characters long";
      }
      if (value.length > 100) {
        return "Subject name cannot exceed 100 characters";
      }
    }

    if (field === "Department") {
      if (!validateTextOnly(value)) {
        return "Department can only contain letters, spaces, and hyphens (no numbers)";
      }
      if (value.length < 2) {
        return "Department must be at least 2 characters long";
      }
    }

    return null;
  };

  const validateForm = (data, isEdit = false) => {
    const errors = {};
    const setErrors = isEdit ? setEditValidationErrors : setValidationErrors;

    const nameError = getValidationErrorMessage(
      "Subject Name",
      data.subjectName,
    );
    if (nameError) {
      errors.subjectName = nameError;
    }

    if (data.department && data.department !== "") {
      const deptError = getValidationErrorMessage(
        "Department",
        data.department,
      );
      if (deptError) {
        errors.department = deptError;
      }
    }

    if (!isEdit) {
      if (data.sections.length === 0) {
        errors.sections = "Please select at least one class";
      }
      if (!data.teacherID) {
        errors.teacherID = "Please select a teacher";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearValidationError = (field, isEdit = false) => {
    const setErrors = isEdit ? setEditValidationErrors : setValidationErrors;
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      const filteredValue = value.replace(/[^A-Za-z\s\-]/g, "");
      setFormData({ ...formData, [name]: filteredValue });
      clearValidationError(name, false);
      return;
    }

    if (name === "subjectName") {
      setFormData({ ...formData, [name]: value });
      clearValidationError(name, false);
      return;
    }

    setFormData({ ...formData, [name]: value });
    clearValidationError(name, false);
  };

  const handleSectionChange = (className) => {
    setFormData((prev) => {
      const isSelected = prev.sections.includes(className);
      const newSections = isSelected
        ? prev.sections.filter((name) => name !== className)
        : [...prev.sections, className];
      return {
        ...prev,
        sections: newSections,
      };
    });
    clearValidationError("sections", false);
  };

  const handleEditSectionChange = (className) => {
    setEditFormData((prev) => {
      const isSelected = prev.sections.includes(className);
      return {
        ...prev,
        sections: isSelected
          ? prev.sections.filter((name) => name !== className)
          : [...prev.sections, className],
      };
    });
    clearValidationError("sections", true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      const filteredValue = value.replace(/[^A-Za-z\s\-]/g, "");
      setEditFormData({ ...editFormData, [name]: filteredValue });
      clearValidationError(name, true);
      return;
    }

    if (name === "subjectName") {
      setEditFormData({ ...editFormData, [name]: value });
      clearValidationError(name, true);
      return;
    }

    setEditFormData({ ...editFormData, [name]: value });
    clearValidationError(name, true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        editDropdownRef.current &&
        !editDropdownRef.current.contains(event.target)
      ) {
        setIsEditDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let filtered = subjects;
    if (filterSection !== "all") {
      filtered = filtered.filter((subject) => {
        if (Array.isArray(subject.applicableClasses)) {
          return subject.applicableClasses.includes(filterSection);
        } else if (typeof subject.applicableClasses === "string") {
          return subject.applicableClasses === filterSection;
        }
        return false;
      });
    }
    if (filterDepartment !== "all") {
      filtered = filtered.filter(
        (subject) => subject.applicableDepartment === filterDepartment,
      );
    }
    setFilteredSubjects(filtered);
  }, [filterSection, filterDepartment, subjects]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await apiClient.get("/class/classes", {
          headers: { "x-tenant": subdomain },
        });
        setClasses(response.data.classes || []);
      } catch (error) {
        console.error("Failed to fetch classes", error.message);
        toast.error(error.message);
      }
    };
    fetchClasses();
  }, [subdomain]);

  const fetchSubjects = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get("/subject/allsubjects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data =
        response.data.subjects || response.data.data || response.data;
      setSubjects(data);
      setFilteredSubjects(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch subjects");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await apiClient.get("/staff/all-staffs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(response?.data?.staffsData || response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm(formData, false)) {
      toast.error("Please fix the validation errors before submitting");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        subjectName: formData.subjectName.trim(),
        applicableClasses: formData.sections,
        applicableDepartment: formData.department,
        teacherId: formData.teacherID,
      };
      await apiClient.post("/subject/subject", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        subjectName: "",
        sections: [],
        department: "",
        teacherID: "",
      });
      setValidationErrors({});
      setShowModal(false);
      fetchSubjects();
      toast.success("Subject created successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to create subject",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSubjects();
      fetchTeachers();
    }
  }, [token]);

  const handleUpdate = async () => {
    if (!validateForm(editFormData, true)) {
      toast.error("Please fix the validation errors before submitting");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        subjectName: editFormData.subjectName.trim(),
        applicableClasses: editFormData.sections,
        applicableDepartment: editFormData.department,
        teacherId: editFormData.teacherID || null,
      };
      await apiClient.put(
        `/subject/updatesubject/${selectedSubjectId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setShowEditModal(false);
      setEditValidationErrors({});
      toast.success("Subject updated successfully!");
      fetchSubjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update subject");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await apiClient.delete(`/subject/deletesubject/${selectedSubjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      toast.success("Subject deleted successfully!");
      fetchSubjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete subject");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (subject) => {
    setSelectedSubjectId(subject.id);
    setEditFormData({
      subjectName: subject.subjectName || "",
      sections: Array.isArray(subject.applicableClasses)
        ? subject.applicableClasses
        : subject.applicableClasses
          ? subject.applicableClasses.split(",")
          : [],
      department: subject.applicableDepartment || "",
      teacherID: subject.teacherId || subject.subjectTeacherId || "",
    });
    setEditValidationErrors({});
    setShowEditModal(true);
  };

  const handleDeleteClick = (subject) => {
    setSelectedSubjectId(subject.id);
    setShowDeleteModal(true);
  };

  const getSelectedSectionNames = (sectionNames) => {
    if (!sectionNames || sectionNames.length === 0) return "Select Classes";
    return sectionNames.join(", ");
  };

  const DropdownCheckbox = ({
    isOpen,
    setIsOpen,
    selectedSections,
    onSectionChange,
    dropdownRef,
    classes,
    error,
  }) => (
    <div className="dropdown-checkbox-container" ref={dropdownRef}>
      <div
        className={`dropdown-checkbox-input ${error ? "error" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="selected-text">
          {getSelectedSectionNames(selectedSections)}
        </span>
        <FaChevronDown className={`dropdown-icon ${isOpen ? "open" : ""}`} />
      </div>
      {error && <span className="error-message">{error}</span>}
      {isOpen && (
        <div className="dropdown-checkbox-menu">
          {classes.map((item) => (
            <label key={item.id} className="dropdown-checkbox-item">
              <input
                type="checkbox"
                checked={selectedSections.includes(item.className)}
                onChange={() => onSectionChange(item.className)}
              />
              <span>{item.className}</span>
            </label>
          ))}
          {classes.length === 0 && (
            <div className="dropdown-empty">No classes available</div>
          )}
        </div>
      )}
    </div>
  );

  const isNoData = !isLoading && filteredSubjects.length === 0;
  const emptyMessage =
    filterSection === "all" && filterDepartment === "all"
      ? "No subjects created yet"
      : "No subjects found for the selected filters";
  const emptyIcon =
    filterSection === "all" && filterDepartment === "all" ? "📚" : "🔍";

  return (
    <>
      <div className="sdashboard-container">
        <header className="dashboard-header">
          <div>
            <h1 className="welcome-text">Subject Management</h1>
            <p className="subtitle-text">
              Create and manage subjects offered in your school.
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
                <span className="card-label">Total Subjects</span>
                <span className="card-value">{subjects.length}</span>
              </div>
              <div className="icon-wrapper icon-students">
                <PiStudentFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">All subjects</div>
          </div>

          <div className="metric-card card-staff">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Snr</span>
                <span className="card-value">
                  {
                    subjects.filter(
                      (s) =>
                        Array.isArray(s.applicableClasses) &&
                        s.applicableClasses.some((c) =>
                          c.toLowerCase().includes("senior"),
                        ),
                    ).length
                  }
                </span>
              </div>
              <div className="icon-wrapper icon-staff">
                <HiMiniUserGroup className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">Senior Class</div>
          </div>

          <div className="metric-card card-attendance">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Jnr</span>
                <span className="card-value">
                  {
                    subjects.filter(
                      (s) =>
                        Array.isArray(s.applicableClasses) &&
                        s.applicableClasses.some((c) =>
                          c.toLowerCase().includes("junior"),
                        ),
                    ).length
                  }
                </span>
              </div>
              <div className="icon-wrapper icon-attendance">
                <PiCalendarBlankFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">Junior Class</div>
          </div>

          <div className="metric-card card-fees">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Levels Covered</span>
                <span className="card-value">
                  {
                    new Set(
                      subjects.flatMap((s) =>
                        Array.isArray(s.applicableClasses)
                          ? s.applicableClasses
                          : [],
                      ),
                    ).size
                  }
                </span>
              </div>
              <div className="icon-wrapper icon-fees">
                <FaSackDollar className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-pct">Nur, Pry, Sec.</div>
          </div>
        </div>
      </div>

      <div className="tableContainer">
        <div className="filterSection">
          <div className="filterGroup">
            <label className="filterLabel">Filter By Class</label>
            <div className="selectWrapper">
              <select
                className="selectInput"
                value={filterSection}
                onChange={(e) => setFilterSection(e.target.value)}
              >
                <option value="all">All Classes</option>
                {classes.map((item) => (
                  <option key={item.id} value={item.className}>
                    {item.className}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filterGroup">
            <label className="filterLabel">Filter By Department</label>
            <div className="selectWrapper">
              <select
                className="selectInput"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="General">General</option>
                <option value="Science">Science</option>
                <option value="Art">Art</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>

          <button
            className="resetBtn"
            onClick={() => {
              setFilterSection("all");
              setFilterDepartment("all");
            }}
          >
            <svg
              className="resetIcon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            Reset Filters
          </button>
        </div>

        <div className="tableWrapper">
          {isLoading && (
            <div className="loadingStateContainer">
              <div className="loadingSpinner"></div>
              <div className="loadingMessage">Loading subjects...</div>
            </div>
          )}

          {isNoData && (
            <div className="emptyStateContainer">
              <div className="emptyStateIcon">{emptyIcon}</div>
              <div className="emptyStateMessage">{emptyMessage}</div>
              <div className="emptyStateSubMessage">
                Click "Add Subject" to get started.
              </div>
            </div>
          )}

          {!isLoading && filteredSubjects.length > 0 && (
            <>
              <table className="subjectTable">
                <thead>
                  <tr>
                    <th>Subject Name</th>
                    <th>Applicable Departments</th>
                    <th>Applicable Classes</th>
                    <th>Assigned Teachers</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.subjectName}</td>
                      <td>{subject.applicableDepartment || "N/A"}</td>
                      <td>
                        {Array.isArray(subject.applicableClasses)
                          ? subject.applicableClasses.join(", ")
                          : subject.applicableClasses || "N/A"}
                      </td>
                      <td>{subject.subjectTeacher || 0}</td>
                      <td>
                        <div className="actionButtons">
                          <button
                            className="editBtn"
                            onClick={() => handleEditClick(subject)}
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
                            className="deleteBtn"
                            onClick={() => handleDeleteClick(subject)}
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
            </>
          )}
        </div>

        <footer className="footerRow">
          <span className="copyrightText">
            © {new Date().getFullYear()} Ucheva school operating management
            system. All right reserved.
          </span>
          <span className="supportText">
            Need help?{" "}
            <a href="#support" className="supportLink">
              Contact support
            </a>
          </span>
        </footer>
      </div>

      {/* Add Subject Modal */}
      {showModal && (
        <div className="modalOverlay">
          <div className="subjectModal">
            <div className="modalHeader">
              <h2>Add New Subject</h2>
              <button className="closeBtn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modalBody">
              <div className="formGroup">
                <label>Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  placeholder="e.g. Mathematics 101"
                  value={formData.subjectName}
                  onChange={handleChange}
                  className={validationErrors.subjectName ? "error" : ""}
                />
                {validationErrors.subjectName && (
                  <span className="error-message">
                    {validationErrors.subjectName}
                  </span>
                )}
                <small>
                  Subject name can include letters and numbers (e.g.,
                  Mathematics 101)
                </small>
              </div>
              <div className="formGroup">
                <label>Applicable Classes</label>
                <DropdownCheckbox
                  isOpen={isDropdownOpen}
                  setIsOpen={setIsDropdownOpen}
                  selectedSections={formData.sections}
                  onSectionChange={handleSectionChange}
                  dropdownRef={dropdownRef}
                  classes={classes}
                  error={validationErrors.sections}
                />
                <small>
                  Select the class level(s) this subject is applicable to.
                </small>
              </div>
              <div className="formGroup">
                <label>Applicable Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={validationErrors.department ? "error" : ""}
                >
                  <option value="">Select Department</option>
                  <option value="General">General</option>
                  <option value="Science">Science</option>
                  <option value="Art">Art</option>
                  <option value="Commercial">Commercial</option>
                </select>
                {validationErrors.department && (
                  <span className="error-message">
                    {validationErrors.department}
                  </span>
                )}
                <small>
                  ⚠️ Department name can only contain letters (no numbers
                  allowed)
                </small>
              </div>
              <div className="formGroup">
                <label>Subject Teacher</label>
                <select
                  name="teacherID"
                  value={formData.teacherID}
                  onChange={handleChange}
                  className={validationErrors.teacherID ? "error" : ""}
                >
                  <option value="">Select Teacher</option>
                  {Array.isArray(teachers) &&
                    teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.fullName}
                      </option>
                    ))}
                </select>
                {validationErrors.teacherID && (
                  <span className="error-message">
                    {validationErrors.teacherID}
                  </span>
                )}
                <small>Select the teacher assigned to this subject.</small>
              </div>
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

      {/* Edit Subject Modal */}
      {showEditModal && (
        <div className="modalOverlay">
          <div className="editSubjectModal">
            <div className="editModalHeader">
              <h2>Edit Subject</h2>
              <button
                className="editCloseBtn"
                onClick={() => setShowEditModal(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="editModalBody">
              <div className="editFormGroup">
                <label>Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  value={editFormData.subjectName}
                  onChange={handleEditChange}
                  className={editValidationErrors.subjectName ? "error" : ""}
                />
                {editValidationErrors.subjectName && (
                  <span className="error-message">
                    {editValidationErrors.subjectName}
                  </span>
                )}
                <small>
                  Subject name can include letters and numbers (e.g.,
                  Mathematics 101)
                </small>
              </div>
              <div className="editFormGroup">
                <label>Applicable Classes</label>
                <DropdownCheckbox
                  isOpen={isEditDropdownOpen}
                  setIsOpen={setIsEditDropdownOpen}
                  selectedSections={editFormData.sections}
                  onSectionChange={handleEditSectionChange}
                  dropdownRef={editDropdownRef}
                  classes={classes}
                  error={editValidationErrors.sections}
                />
                <small>
                  Select the class level(s) this subject is applicable to.
                </small>
              </div>
              <div className="editFormGroup">
                <label>Applicable Department</label>
                <div className="editSelectWrapper">
                  <select
                    name="department"
                    value={editFormData.department}
                    onChange={handleEditChange}
                    className={editValidationErrors.department ? "error" : ""}
                  >
                    <option value="">Select Department</option>
                    <option value="General">General</option>
                    <option value="Science">Science</option>
                    <option value="Art">Art</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                {editValidationErrors.department && (
                  <span className="error-message">
                    {editValidationErrors.department}
                  </span>
                )}
                <small>
                  ⚠️ Department name can only contain letters (no numbers
                  allowed)
                </small>
              </div>
              <div className="editFormGroup">
                <label>Subject Teacher</label>
                <div className="editSelectWrapper">
                  <select
                    name="teacherID"
                    value={editFormData.teacherID}
                    onChange={handleEditChange}
                    className={editValidationErrors.teacherID ? "error" : ""}
                  >
                    <option value="">Select Teacher</option>
                    {Array.isArray(teachers) &&
                      teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.fullName}
                        </option>
                      ))}
                  </select>
                </div>
                {editValidationErrors.teacherID && (
                  <span className="error-message">
                    {editValidationErrors.teacherID}
                  </span>
                )}
                <small>Update the teacher assigned to this subject.</small>
              </div>
            </div>
            <div className="editModalActions">
              <button
                className="editCancelBtn"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="editSaveBtn"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Subject Modal */}
      {showDeleteModal && (
        <div className="modalOverlay" onClick={() => setShowDeleteModal(false)}>
          <div
            className="modalContent deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHeader">
              <h2>Delete Subject</h2>
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
                Are you sure you want to delete this subject? This action cannot
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
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSubjects;
