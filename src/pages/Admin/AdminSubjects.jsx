import React, { useState, useEffect, useRef } from "react";
import "./AdminSubjects.css";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
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
  const [classes, setClasses] = useState([]);
  const [filterSection, setFilterSection] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

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
  });

  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditDropdownOpen, setIsEditDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const editDropdownRef = useRef(null);

  // Close dropdown when clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSectionChange = (sectionId) => {
    setFormData((prev) => {
      const isSelected = prev.sections.includes(sectionId);
      if (isSelected) {
        return {
          ...prev,
          sections: prev.sections.filter((id) => id !== sectionId),
        };
      } else {
        return {
          ...prev,
          sections: [...prev.sections, sectionId],
        };
      }
    });
  };

  const handleEditSectionChange = (sectionId) => {
    setEditFormData((prev) => {
      const isSelected = prev.sections.includes(sectionId);
      if (isSelected) {
        return {
          ...prev,
          sections: prev.sections.filter((id) => id !== sectionId),
        };
      } else {
        return {
          ...prev,
          sections: [...prev.sections, sectionId],
        };
      }
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Filter subjects based on selected section and department
  useEffect(() => {
    let filtered = subjects;

    // Filter by section
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

    // Filter by department
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

    fetchClasses();
  }, [subdomain]);

  const fetchSubjects = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get("/subject/allsubjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      const data =
        response.data.data || response.data.subjects || response.data;
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setTeachers(response?.data?.staffsData || response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        subjectName: formData.subjectName,
        applicableClasses: formData.sections,
        applicableDepartment: formData.department,
        teacherId: formData.teacherID,
      };

      console.log("Payload being sent:", payload);

      await apiClient.post("/subject/subject", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        subjectName: "",
        sections: [],
        department: "",
        teacherID: "",
      });

      setShowModal(false);
      fetchSubjects();
      toast.success("Subject created successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
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
    try {
      setLoading(true);

      const payload = {
        subjectName: editFormData.subjectName,
        applicableClasses: editFormData.sections,
        applicableDepartment: editFormData.department,
      };

      console.log("Update Payload:", payload);
      // Add your update API call here

      setShowEditModal(false);
      toast.success("Subject updated successfully!");
      fetchSubjects();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (subject) => {
    setEditFormData({
      subjectName: subject.subjectName || "",
      sections: Array.isArray(subject.applicableClasses)
        ? subject.applicableClasses
        : subject.applicableClasses
          ? subject.applicableClasses.split(",")
          : [],
      department: subject.department || "",
    });
    setShowEditModal(true);
  };

  // Get selected section names for display
  const getSelectedSectionNames = (sectionIds) => {
    if (!sectionIds || sectionIds.length === 0) return "Select Classes";
    const names = sectionIds.map((id) => {
      const found = classes.find((c) => c.id === id);
      return found ? found.className : id;
    });
    return names.join(", ");
  };

  // Dropdown checkbox component
  const DropdownCheckbox = ({
    isOpen,
    setIsOpen,
    selectedSections,
    onSectionChange,
    placeholder,
    dropdownRef,
    classes,
  }) => {
    return (
      <div className="dropdown-checkbox-container" ref={dropdownRef}>
        <div
          className="dropdown-checkbox-input"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="selected-text">
            {getSelectedSectionNames(selectedSections)}
          </span>
          <FaChevronDown className={`dropdown-icon ${isOpen ? "open" : ""}`} />
        </div>
        {isOpen && (
          <div className="dropdown-checkbox-menu">
            {classes.map((item) => (
              <label key={item.id} className="dropdown-checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedSections.includes(item.id)}
                  onChange={() => onSectionChange(item.id)}
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
  };

  // Empty State Component
  const EmptyState = ({ message, icon }) => (
    <tr>
      <td colSpan="5">
        <div className="emptyStateContainer">
          <div className="emptyStateIcon">{icon || "📚"}</div>
          <div className="emptyStateMessage">
            {message || "No subjects found"}
          </div>
          <div className="emptyStateSubMessage">
            Click the "Add Subject" button to create your first subject.
          </div>
        </div>
      </td>
    </tr>
  );

  // Loading State Component
  const LoadingState = () => (
    <tr>
      <td colSpan="5">
        <div className="loadingStateContainer">
          <div className="loadingSpinner"></div>
          <div className="loadingMessage">Loading subjects...</div>
        </div>
      </td>
    </tr>
  );

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
                        s.applicableClasses.some((id) => {
                          const cls = classes.find((c) => c.id === id);
                          return (
                            cls &&
                            cls.className.toLowerCase().includes("senior")
                          );
                        }),
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
                        s.applicableClasses.some((id) => {
                          const cls = classes.find((c) => c.id === id);
                          return (
                            cls &&
                            cls.className.toLowerCase().includes("junior")
                          );
                        }),
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
                  <option key={item.id} value={item.id}>
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
              {isLoading ? (
                <LoadingState />
              ) : filteredSubjects.length === 0 ? (
                <EmptyState
                  message={
                    filterSection === "all" && filterDepartment === "all"
                      ? "No subjects created yet"
                      : "No subjects found for the selected filters"
                  }
                  icon={
                    filterSection === "all" && filterDepartment === "all"
                      ? "📚"
                      : "🔍"
                  }
                />
              ) : (
                filteredSubjects.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.subjectName}</td>
                    <td>{subject.applicableDepartment || "N/A"}</td>
                    <td>
                      {Array.isArray(subject.applicableClasses)
                        ? subject.applicableClasses
                            .map((id) => {
                              const found = classes.find((c) => c.id === id);
                              return found ? found.className : id;
                            })
                            .join(", ")
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
                ))
              )}
            </tbody>
          </table>

          {filteredSubjects.length > 0 && (
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
          )}
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
              <label>Applicable Classes</label>
              <DropdownCheckbox
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
                selectedSections={formData.sections}
                onSectionChange={handleSectionChange}
                placeholder="Select Classes"
                dropdownRef={dropdownRef}
                classes={classes}
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
              >
                <option value="">Select Department</option>
                <option value="General">General</option>
                <option value="Science">Science</option>
                <option value="Art">Art</option>
                <option value="Commercial">Commercial</option>
              </select>
              <small>Helps you classify the type of subject.</small>
            </div>

            <div className="formGroup">
              <label>Subject Teacher</label>
              <select
                name="teacherID"
                value={formData.teacherID}
                onChange={handleChange}
              >
                <option value="">Select Teacher</option>
                {Array.isArray(teachers) &&
                  teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.fullName}
                    </option>
                  ))}
              </select>
              <small>Select the teacher assigned to this subject.</small>
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

            <div className="editFormGroup">
              <label>Subject Name</label>
              <input
                type="text"
                name="subjectName"
                value={editFormData.subjectName}
                onChange={handleEditChange}
              />
            </div>

            <div className="editFormGroup">
              <label>Applicable Classes</label>
              <DropdownCheckbox
                isOpen={isEditDropdownOpen}
                setIsOpen={setIsEditDropdownOpen}
                selectedSections={editFormData.sections}
                onSectionChange={handleEditSectionChange}
                placeholder="Select Classes"
                dropdownRef={editDropdownRef}
                classes={classes}
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
                >
                  <option value="">Select Department</option>
                  <option value="General">General</option>
                  <option value="Science">Science</option>
                  <option value="Art">Art</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              <small>Helps you classify the type of subject.</small>
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
    </>
  );
};

export default AdminSubjects;
