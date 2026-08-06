import React, { useState, useEffect, useRef, useMemo } from "react";
import "./AdminSubjects.css";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { apiClient } from "../../../config/AxiosInstance";
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
    classId: [],
    department: "",
    teacherID: "",
  });

  const [editFormData, setEditFormData] = useState({
    subjectName: "",
    classId: [],
    department: "",
    teacherID: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditDropdownOpen, setIsEditDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const editDropdownRef = useRef(null);

  const classMap = useMemo(() => {
    const map = {};
    classes.forEach((c) => {
      map[c._id] = c.className;
    });
    return map;
  }, [classes]);

  const getTeacherId = (teacher) => teacher?._id || teacher?.id || "";

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
      if (data.classId.length === 0) {
        errors.classId = "Please select at least one class";
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

  const handleSectionChange = (classId) => {
    setFormData((prev) => {
      const isSelected = prev.classId.includes(classId);
      const newclassId = isSelected
        ? prev.classId.filter((id) => id !== classId)
        : [...prev.classId, classId];
      return {
        ...prev,
        classId: newclassId,
      };
    });
    clearValidationError("classId", false);
  };

  const handleEditSectionChange = (classId) => {
    setEditFormData((prev) => {
      const isSelected = prev.classId.includes(classId);
      return {
        ...prev,
        classId: isSelected
          ? prev.classId.filter((id) => id !== classId)
          : [...prev.classId, classId],
      };
    });
    clearValidationError("classId", true);
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

      let subjectData = [];
      if (response.data.subjects) {
        subjectData = response.data.subjects;
      } else if (response.data.data) {
        subjectData = response.data.data;
      } else if (Array.isArray(response.data)) {
        subjectData = response.data;
      } else {
        subjectData = [];
      }
      setSubjects(subjectData);
      setFilteredSubjects(subjectData);
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
        applicableClasses: formData.classId,
        applicableDepartment: formData.department || "General",
        teacherId: formData.teacherID,
      };
      await apiClient.post("/subject/subject", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        subjectName: "",
        classId: [],
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
        applicableClasses: editFormData.classId,
        applicableDepartment: editFormData.department || "General",
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

  const isObjectId = (value) =>
    typeof value === "string" && /^[a-f\d]{24}$/i.test(value);

  const handleEditClick = (subject) => {
    setSelectedSubjectId(subject._id);

    let classId = [];
    const rawClasses = Array.isArray(subject.applicableClasses)
      ? subject.applicableClasses
      : typeof subject.applicableClasses === "string"
        ? subject.applicableClasses.split(",").map((c) => c.trim())
        : [];

    if (rawClasses.length > 0) {
      if (rawClasses.every(isObjectId)) {
        classId = rawClasses;
      } else {
        classId = classes
          .filter((c) => rawClasses.includes(c.className))
          .map((c) => c._id);
      }
    }

    setEditFormData({
      subjectName: subject.subjectName || "",
      classId,
      department: subject.applicableDepartment || "",
      teacherID: subject.teacherId || subject.subjectTeacherId || "",
    });

    setEditValidationErrors({});
    setShowEditModal(true);
  };

  const handleDeleteClick = (subject) => {
    setSelectedSubjectId(subject._id);
    setShowDeleteModal(true);
  };

  const getSelectedSectionNames = (selectedclassId, classesList) => {
    if (!selectedclassId || selectedclassId.length === 0)
      return "Select Classes";
    const names = classesList
      .filter((c) => selectedclassId.includes(c._id))
      .map((c) => c.className);
    return names.length > 0 ? names.join(", ") : "Select Classes";
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
    <div className="SUB-dropdown-checkbox-container" ref={dropdownRef}>
      <div
        className={`SUB-dropdown-checkbox-input ${error ? "SUB-error" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="SUB-selected-text">
          {getSelectedSectionNames(selectedSections, classes)}
        </span>
        <FaChevronDown
          className={`SUB-dropdown-icon ${isOpen ? "SUB-open" : ""}`}
        />
      </div>
      {error && <span className="SUB-error-message">{error}</span>}
      {isOpen && (
        <div className="SUB-dropdown-checkbox-menu">
          {classes.map((item) => (
            <label key={item._id} className="SUB-dropdown-checkbox-item">
              <input
                type="checkbox"
                checked={selectedSections.includes(item._id)}
                onChange={() => onSectionChange(item._id)}
              />
              <span>{item.className}</span>
            </label>
          ))}
          {classes.length === 0 && (
            <div className="SUB-dropdown-empty">No classes available</div>
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
      <div className="SUB-sdashboard-container">
        <header className="SUB-dashboard-header">
          <div>
            <h1 className="SUB-welcome-text">Subject Management</h1>
            <p className="SUB-subtitle-text">
              Create and manage subjects offered in your school.
            </p>
          </div>
          <button className="SUB-AddSubject" onClick={() => setShowModal(true)}>
            + Add Subject
          </button>
        </header>

        <div className="SUB-metrics-grid">
          <div className="SUB-metric-card SUB-card-students">
            <div className="SUB-card-content">
              <div className="SUB-text-section">
                <span className="SUB-card-label">Total Subjects</span>
                <span className="SUB-card-value">{subjects.length}</span>
              </div>
              <div className="SUB-icon-wrapper SUB-icon-students">
                <PiStudentFill className="SUB-DashIcon" />
              </div>
            </div>
            <div className="SUB-card-footer SUB-trend-up">All subjects</div>
          </div>

          <div className="SUB-metric-card SUB-card-staff">
            <div className="SUB-card-content">
              <div className="SUB-text-section">
                <span className="SUB-card-label">Snr</span>
                <span className="SUB-card-value">
                  {
                    subjects.filter(
                      (s) =>
                        Array.isArray(s.applicableClasses) &&
                        s.applicableClasses.some((id) => {
                          const name = classMap[id] || id;
                          return name.toLowerCase().includes("senior");
                        }),
                    ).length
                  }
                </span>
              </div>
              <div className="SUB-icon-wrapper SUB-icon-staff">
                <HiMiniUserGroup className="SUB-DashIcon" />
              </div>
            </div>
            <div className="SUB-card-footer SUB-trend-up">Senior Class</div>
          </div>

          <div className="SUB-metric-card SUB-card-attendance">
            <div className="SUB-card-content">
              <div className="SUB-text-section">
                <span className="SUB-card-label">Jnr</span>
                <span className="SUB-card-value">
                  {
                    subjects.filter(
                      (s) =>
                        Array.isArray(s.applicableClasses) &&
                        s.applicableClasses.some((id) => {
                          const name = classMap[id] || id;
                          return name.toLowerCase().includes("junior");
                        }),
                    ).length
                  }
                </span>
              </div>
              <div className="SUB-icon-wrapper SUB-icon-attendance">
                <PiCalendarBlankFill className="SUB-DashIcon" />
              </div>
            </div>
            <div className="SUB-card-footer SUB-trend-up">Junior Class</div>
          </div>

          <div className="SUB-metric-card SUB-card-fees">
            <div className="SUB-card-content">
              <div className="SUB-text-section">
                <span className="SUB-card-label">Levels Covered</span>
                <span className="SUB-card-value">
                  {
                    new Set(
                      subjects.flatMap((s) =>
                        Array.isArray(s.applicableClasses)
                          ? s.applicableClasses.map((id) => classMap[id] || id)
                          : [],
                      ),
                    ).size
                  }
                </span>
              </div>
              <div className="SUB-icon-wrapper SUB-icon-fees">
                <FaSackDollar className="SUB-DashIcon" />
              </div>
            </div>
            <div className="SUB-card-footer SUB-trend-pct">Nur, Pry, Sec.</div>
          </div>
        </div>
      </div>

      <div className="SUB-tableContainer">
        <div className="SUB-filterSection">
          <div className="SUB-filterGroup">
            <label className="SUB-filterLabel">Filter By Class</label>
            <div className="SUB-selectWrapper">
              <select
                className="SUB-selectInput"
                value={filterSection}
                onChange={(e) => setFilterSection(e.target.value)}
              >
                <option value="all">All Classes</option>
                {classes.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.className}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="SUB-filterGroup">
            <label className="SUB-filterLabel">Filter By Department</label>
            <div className="SUB-selectWrapper">
              <select
                className="SUB-selectInput"
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
            className="SUB-resetBtn"
            onClick={() => {
              setFilterSection("all");
              setFilterDepartment("all");
            }}
          >
            <svg
              className="SUB-resetIcon"
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

        <div className="SUB-tableWrapper">
          {isLoading && (
            <div className="SUB-loadingStateContainer">
              <div className="SUB-loadingSpinner"></div>
              <div className="SUB-loadingMessage">Loading subjects...</div>
            </div>
          )}

          {isNoData && (
            <div className="SUB-emptyStateContainer">
              <div className="SUB-emptyStateIcon">{emptyIcon}</div>
              <div className="SUB-emptyStateMessage">{emptyMessage}</div>
              <div className="SUB-emptyStateSubMessage">
                Click "Add Subject" to get started.
              </div>
            </div>
          )}

          {!isLoading && filteredSubjects.length > 0 && (
            <>
              <table className="SUB-subjectTable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject Name</th>
                    <th>Applicable Department</th>
                    <th>Applicable Classes</th>
                    <th>Assigned Teacher</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map((subject, index) => (
                    <tr key={subject._id || index}>
                      <td>{index + 1}</td>
                      <td>{subject.subjectName || "N/A"}</td>
                      <td>{subject.applicableDepartment || "General"}</td>
                      <td>
                        {Array.isArray(subject.applicableClasses) &&
                        subject.applicableClasses.length > 0
                          ? subject.applicableClasses
                              .map((id) => classMap[id] || id)
                              .join(", ")
                          : "No classes assigned"}
                      </td>
                      <td>
                        {subject.subjectTeacher ||
                          subject.teacherName ||
                          "Not Assigned"}
                      </td>
                      <td>
                        <div className="SUB-actionButtons">
                          <button
                            className="SUB-editBtn"
                            onClick={() => handleEditClick(subject)}
                            title="Edit Subject"
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
                            className="SUB-deleteBtn"
                            onClick={() => handleDeleteClick(subject)}
                            title="Delete Subject"
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

              <div className="SUB-paginationRow">
                <div className="SUB-paginationInfo">
                  Showing {filteredSubjects.length} subjects
                </div>
                <div className="SUB-paginationControls">
                  <button className="SUB-arrowBtn" disabled>
                    &lt;
                  </button>
                  <button className="SUB-pageBtn SUB-activePage">1</button>
                  <button className="SUB-pageBtn">2</button>
                  <button className="SUB-pageBtn">3</button>
                  <span className="SUB-ellipsis">...</span>
                  <button className="SUB-pageBtn">6</button>
                  <button className="SUB-pageBtn">7</button>
                  <button className="SUB-arrowBtn">&gt;</button>
                </div>
                <div className="SUB-rowsPerPageGroup">
                  <span className="SUB-rowsLabel">Rows per page</span>
                  <div className="SUB-rowsSelectWrapper">
                    <select className="SUB-rowsSelect" defaultValue="10">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Subject Modal */}
      {showModal && (
        <div className="SUB-modalOverlay">
          <div className="SUB-subjectModal">
            <div className="SUB-modalHeader">
              <h2>Add New Subject</h2>
              <button
                className="SUB-closeBtn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="SUB-modalBody">
              <div className="SUB-formGroup">
                <label>Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  placeholder="e.g. Mathematics 101"
                  value={formData.subjectName}
                  onChange={handleChange}
                  className={validationErrors.subjectName ? "SUB-error" : ""}
                />
                {validationErrors.subjectName && (
                  <span className="SUB-error-message">
                    {validationErrors.subjectName}
                  </span>
                )}
                <small>
                  Subject name can include letters and numbers (e.g.,
                  Mathematics 101)
                </small>
              </div>
              <div className="SUB-formGroup">
                <label>Applicable Classes</label>
                <DropdownCheckbox
                  isOpen={isDropdownOpen}
                  setIsOpen={setIsDropdownOpen}
                  selectedSections={formData.classId}
                  onSectionChange={handleSectionChange}
                  dropdownRef={dropdownRef}
                  classes={classes}
                  error={validationErrors.classId}
                />
                <small>
                  Select the class level(s) this subject is applicable to.
                </small>
              </div>
              <div className="SUB-formGroup">
                <label>Applicable Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={validationErrors.department ? "SUB-error" : ""}
                >
                  <option value="">Select Department</option>
                  <option value="General">General</option>
                  <option value="Science">Science</option>
                  <option value="Art">Art</option>
                  <option value="Commercial">Commercial</option>
                </select>
                {validationErrors.department && (
                  <span className="SUB-error-message">
                    {validationErrors.department}
                  </span>
                )}
                <small>
                  ⚠️ Department name can only contain letters (no numbers
                  allowed)
                </small>
              </div>
              <div className="SUB-formGroup">
                <label>Subject Teacher</label>
                <select
                  name="teacherID"
                  value={formData.teacherID}
                  onChange={handleChange}
                  className={validationErrors.teacherID ? "SUB-error" : ""}
                >
                  <option value="">Select Teacher</option>
                  {Array.isArray(teachers) &&
                    teachers.map((teacher) => (
                      <option
                        key={getTeacherId(teacher)}
                        value={getTeacherId(teacher)}
                      >
                        {teacher.fullName ||
                          teacher.name ||
                          teacher.firstName + " " + teacher.lastName}
                      </option>
                    ))}
                </select>
                {validationErrors.teacherID && (
                  <span className="SUB-error-message">
                    {validationErrors.teacherID}
                  </span>
                )}
                <small>Select the teacher assigned to this subject.</small>
              </div>
            </div>
            <div className="SUB-modalActions">
              <button
                className="SUB-cancelBtn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="SUB-createBtn"
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
        <div className="SUB-modalOverlay">
          <div className="SUB-editSubjectModal">
            <div className="SUB-editModalHeader">
              <h2>Edit Subject</h2>
              <button
                className="SUB-editCloseBtn"
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
            <div className="SUB-editModalBody">
              <div className="SUB-editFormGroup">
                <label>Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  value={editFormData.subjectName}
                  onChange={handleEditChange}
                  className={
                    editValidationErrors.subjectName ? "SUB-error" : ""
                  }
                />
                {editValidationErrors.subjectName && (
                  <span className="SUB-error-message">
                    {editValidationErrors.subjectName}
                  </span>
                )}
                <small>
                  Subject name can include letters and numbers (e.g.,
                  Mathematics 101)
                </small>
              </div>
              <div className="SUB-editFormGroup">
                <label>Applicable Classes</label>
                <DropdownCheckbox
                  isOpen={isEditDropdownOpen}
                  setIsOpen={setIsEditDropdownOpen}
                  selectedSections={editFormData.classId}
                  onSectionChange={handleEditSectionChange}
                  dropdownRef={editDropdownRef}
                  classes={classes}
                  error={editValidationErrors.classId}
                />
                <small>
                  Select the class level(s) this subject is applicable to.
                </small>
              </div>
              <div className="SUB-editFormGroup">
                <label>Applicable Department</label>
                <div className="SUB-editSelectWrapper">
                  <select
                    name="department"
                    value={editFormData.department}
                    onChange={handleEditChange}
                    className={
                      editValidationErrors.department ? "SUB-error" : ""
                    }
                  >
                    <option value="">Select Department</option>
                    <option value="General">General</option>
                    <option value="Science">Science</option>
                    <option value="Art">Art</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                {editValidationErrors.department && (
                  <span className="SUB-error-message">
                    {editValidationErrors.department}
                  </span>
                )}
                <small>
                  ⚠️ Department name can only contain letters (no numbers
                  allowed)
                </small>
              </div>
              <div className="SUB-editFormGroup">
                <label>Subject Teacher</label>
                <div className="SUB-editSelectWrapper">
                  <select
                    name="teacherID"
                    value={editFormData.teacherID}
                    onChange={handleEditChange}
                    className={
                      editValidationErrors.teacherID ? "SUB-error" : ""
                    }
                  >
                    <option value="">Select Teacher</option>
                    {Array.isArray(teachers) &&
                      teachers.map((teacher) => (
                        <option
                          key={getTeacherId(teacher)}
                          value={getTeacherId(teacher)}
                        >
                          {teacher.fullName ||
                            teacher.name ||
                            teacher.firstName + " " + teacher.lastName}
                        </option>
                      ))}
                  </select>
                </div>
                {editValidationErrors.teacherID && (
                  <span className="SUB-error-message">
                    {editValidationErrors.teacherID}
                  </span>
                )}
                <small>Update the teacher assigned to this subject.</small>
              </div>
            </div>
            <div className="SUB-editModalActions">
              <button
                className="SUB-editCancelBtn"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="SUB-editSaveBtn"
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
        <div
          className="SUB-modalOverlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="SUB-modalContent SUB-deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="SUB-modalHeader">
              <h2>Delete Subject</h2>
              <button
                className="SUB-closeBtn"
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
            <div className="SUB-modalBody">
              <p className="SUB-deleteWarningText">
                Are you sure you want to delete this subject? This action cannot
                be undone.
              </p>
            </div>
            <div className="SUB-modalFooter">
              <button
                className="SUB-cancelBtn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="SUB-confirmDeleteBtn"
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