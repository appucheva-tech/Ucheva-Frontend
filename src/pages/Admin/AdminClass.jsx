import React, { useState, useEffect } from "react";
import "./AdminClass.css";
import { apiClient } from "../../config/AxiosInstance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Your three state components ───────────────────────────────────────────────
import LoadingScreen from "../../components/Loading-Screen"; // adjust path
import ErrorScreen from "../../components/Error-Screen"; // adjust path
import EmptyState from "../../components/EmptyState"; // adjust path

const AdminClass = () => {
  const [teachers, setTeachers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [addClass, setAddClass] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Page-level fetch states ───────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const token = useSelector((state) => state?.user?.token);

  const [level, setLevel] = useState("");
  const [arm, setArm] = useState("");

  const [formData, setFormData] = useState({
    className: "",
    amount: "",
    paymentOption: "",
    teacherId: "",
    numberOfInstallments: "",
    id: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, className: `${level} ${arm}`.trim() }));
  }, [level, arm]);

  // ── Fetch classes ─────────────────────────────────────────────────────────
  const fetchAllClasses = async (showPageLoader = false) => {
    if (showPageLoader) setIsLoading(true);
    setHasError(false);
    try {
      const response = await apiClient.get("admin/getclass");
      setAddClass(response.data?.classes || []);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      if (showPageLoader) setIsLoading(false);
    }
  };

  // ── Fetch teachers ────────────────────────────────────────────────────────
  const fetchAllStaffs = async () => {
    try {
      const response = await apiClient.get("staff/all-staffs");
      setTeachers(response.data.staffsData || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        await Promise.all([fetchAllClasses(), fetchAllStaffs()]);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  // ── Create ────────────────────────────────────────────────────────────────
  const createClass = async () => {
    setLoading(true);
    try {
      const payload = {
        className: formData.className,
        amount: Number(formData.amount),
        paymentOption: formData.paymentOption.trim().toLowerCase(),
        numberOfInstallments:
          formData.paymentOption === "installment"
            ? Number(formData.numberOfInstallments)
            : 4,
      };
      if (formData.teacherId) payload.teacherId = formData.teacherId;

      const response = await apiClient.post("/class/create-class", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(response?.data?.message || "Class created successfully!");
      setFormData({
        className: "",
        amount: "",
        paymentOption: "",
        teacherId: "",
        numberOfInstallments: "",
        id: "",
      });
      setLevel("");
      setArm("");
      setIsOpen(false);
      await fetchAllClasses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create class");
    } finally {
      setLoading(false);
    }
  };

  // ── Edit ──────────────────────────────────────────────────────────────────
  const editClass = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.put(`/class/updateclasses/${id}`, {
        className: formData.className,
        amount: Number(formData.amount),
        paymentOption: formData.paymentOption,
        teacherId: formData.teacherId || undefined,
        numberOfInstallments:
          formData.paymentOption === "installment"
            ? Number(formData.numberOfInstallments)
            : undefined,
      });
      toast.success(response?.data?.message || "Class updated successfully!");
      setIsEditOpen(false);
      await fetchAllClasses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update class");
    } finally {
      setLoading(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const deleteClass = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.delete(`/class/deleteclasses/${id}`);
      toast.success(response?.data?.message || "Class deleted successfully!");
      setIsDeleteOpen(false);
      await fetchAllClasses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete class");
    } finally {
      setLoading(false);
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isLoading) return <LoadingScreen />;

  // ── Error state ───────────────────────────────────────────────────────────
  if (hasError) {
    return (
      <ErrorScreen
        title="Class Records Unavailable"
        message="We couldn't load your class data. Check your connection and try again."
        onRetry={() => {
          setIsLoading(true);
          Promise.all([fetchAllClasses(), fetchAllStaffs()]).finally(() =>
            setIsLoading(false),
          );
        }}
      />
    );
  }

  return (
    <>
      <div className="tableContainer">
        {/* ── Header ── */}
        <div className="headerRow">
          <div>
            <h1 className="title">Class Management</h1>
            <p className="subtitle">
              Create classes, assign class teachers and manage class
              information.
            </p>
          </div>
          <button className="addClassBtn" onClick={() => setIsOpen(true)}>
            <span className="plusIcon">+</span> Add Class
          </button>
        </div>

        {/* ── Mobile stats ── */}
        <div className="mobile-stats-grid">
          <div className="mobile-stat-card">
            <div className="stat-info">
              <div className="stat-label">Total Student</div>
              <div className="stat-value">
                {addClass.reduce(
                  (sum, cls) => sum + (cls.totalStudents || 0),
                  0,
                )}
              </div>
            </div>
            <div className="stat-icon-wrap blue">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>

          <div className="mobile-stat-card">
            <div className="stat-info">
              <div className="stat-label">Total Female</div>
              <div className="stat-value">
                {addClass.reduce(
                  (sum, cls) => sum + (cls.totalFemale || cls.femaleCount || 0),
                  0,
                )}
              </div>
            </div>
            <div className="stat-icon-wrap purple">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M12 13v8M9 18h6" />
              </svg>
            </div>
          </div>

          <div className="mobile-stat-card">
            <div className="stat-info">
              <div className="stat-label">Total Male</div>
              <div className="stat-value">
                {addClass.reduce(
                  (sum, cls) => sum + (cls.totalMale || cls.maleCount || 0),
                  0,
                )}
              </div>
            </div>
            <div className="stat-icon-wrap amber">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="10" cy="14" r="5" />
                <path d="M21 3l-6 6M21 3h-5M21 3v5" />
              </svg>
            </div>
          </div>

          <div className="mobile-stat-card">
            <div className="stat-info">
              <div className="stat-label">New-Intake</div>
              <div className="stat-value">
                {addClass.reduce(
                  (sum, cls) => sum + (cls.newIntake || cls.newStudents || 0),
                  0,
                )}
              </div>
            </div>
            <div className="stat-icon-wrap green">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="filterSection">
          <div className="filterGroup">
            <label className="filterLabel">Section</label>
            <div className="selectWrapper">
              <select className="selectInput" defaultValue="all">
                <option value="all" disabled>
                  All Sections
                </option>
                <option value="">Junior Secondary</option>
                <option value="">Senior Secondary</option>
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
          {/* ── Desktop table ── */}
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
              {addClass.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: 0, border: "none" }}>
                    <EmptyState
                      title="No Classes Yet"
                      message="You haven't created any classes yet. Start by creating your first class."
                      actionText="Create Class"
                      onAction={() => setIsOpen(true)}
                    />
                  </td>
                </tr>
              ) : (
                addClass.map((cls, index) => (
                  <tr key={index}>
                    <td className="className textLink">{cls.className}</td>
                    <td className="sectionText">Secondary</td>
                    <td className="teacherText textLink">
                      {cls.teacherName || "--"}
                    </td>
                    <td className="studentText textLink">
                      {cls.totalStudents}
                    </td>
                    <td>
                      <div className="actionButtons">
                        <button
                          className="editBtn"
                          aria-label="Edit class"
                          onClick={() => {
                            setFormData({
                              className: cls.className,
                              amount: cls.amount || "",
                              paymentOption: cls.paymentOption || "",
                              teacherId: cls.teacherId || "",
                              numberOfInstallments:
                                cls.numberOfInstallments || "",
                              id: cls.classId,
                            });
                            setIsEditOpen(true);
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
                          className="deleteBtn"
                          aria-label="Delete class"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              id: cls.classId,
                            }));
                            setIsDeleteOpen(true);
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

          {/* ── Mobile card list ── */}
          <div className="mobile-class-list">
            {addClass.length === 0 ? (
              <EmptyState
                title="No Classes Yet"
                message="You haven't created any classes yet."
                actionText="Create Class"
                onAction={() => setIsOpen(true)}
              />
            ) : (
              <>
                <div className="mobile-list-header">Class List</div>
                {addClass.map((cls, index) => (
                  <div className="mobile-class-card" key={index}>
                    <div className="card-left">
                      <span className="class-name">{cls.className}</span>
                      <div className="class-meta">
                        <span>Section: Senior Secondary</span>
                        <span>Class Teacher: {cls.teacherName || "--"}</span>
                        <span>Total Student: {cls.totalStudents}</span>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button
                        className="editBtn"
                        onClick={() => {
                          setFormData({
                            className: cls.className,
                            amount: cls.amount || "",
                            paymentOption: cls.paymentOption || "",
                            teacherId: cls.teacherId || "",
                            numberOfInstallments:
                              cls.numberOfInstallments || "",
                            id: cls.classId,
                          });
                          setIsEditOpen(true);
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
                        className="deleteBtn"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, id: cls.classId }));
                          setIsDeleteOpen(true);
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
                  </div>
                ))}
              </>
            )}
          </div>

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

      {/* ── Add class modal ── */}
      {isOpen && (
        <div className="modalOverlay" onClick={() => setIsOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h2>Add New Class</h2>
              <button className="closeBtn" onClick={() => setIsOpen(false)}>
                &times;
              </button>
            </div>
            <div className="modalBody">
              <div className="inputGroup">
                <label>Class Name</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <select
                    className="modalSelectWrapper"
                    style={{ flex: 2, padding: "8px" }}
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Level
                    </option>
                    <option value="JSS 1">JSS 1</option>
                    <option value="JSS 2">JSS 2</option>
                    <option value="JSS 3">JSS 3</option>
                    <option value="SS 1">SS 1</option>
                    <option value="SS 2">SS 2</option>
                    <option value="SS 3">SS 3</option>
                  </select>
                  <select
                    className="modalSelectWrapper"
                    style={{ flex: 1, padding: "8px" }}
                    value={arm}
                    onChange={(e) => setArm(e.target.value)}
                  >
                    <option value="" disabled>
                      Arm
                    </option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                  </select>
                </div>
              </div>

              <div className="inputGroup">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter class fee"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="inputGroup">
                <label>Payment Option</label>
                <div className="modalSelectWrapper">
                  <select
                    name="paymentOption"
                    value={formData.paymentOption}
                    onChange={handleChange}
                  >
                    <option value="">Select Payment Option</option>
                    <option value="full payment">Full Payment</option>
                    <option value="installment">Installment</option>
                  </select>
                </div>
              </div>

              {formData.paymentOption === "installment" && (
                <>
                  <div className="inputGroup">
                    <label>Number Of Installments</label>
                    <div className="modalSelectWrapper">
                      <select
                        name="numberOfInstallments"
                        value={formData.numberOfInstallments}
                        onChange={handleChange}
                      >
                        <option value="">Select Number</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                  </div>
                  {formData.numberOfInstallments && formData.amount && (
                    <div className="inputHelp">
                      Each installment: ₦
                      {(
                        Number(formData.amount) /
                        Number(formData.numberOfInstallments)
                      ).toLocaleString()}
                    </div>
                  )}
                </>
              )}

              <div className="inputGroup">
                <label>Assign Class Teacher (optional)</label>
                <div className="modalSelectWrapper">
                  <select
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleChange}
                  >
                    <option value="">Search and select a teacher</option>
                    {Array.isArray(teachers) &&
                      teachers.map((staff) => (
                        <option key={staff.id} value={staff.id}>
                          {staff.fullName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button
                className="createBtn"
                onClick={createClass}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Class"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit class modal ── */}
      {isEditOpen && (
        <div className="modalOverlay" onClick={() => setIsEditOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h2>Edit Class</h2>
              <button className="closeBtn" onClick={() => setIsEditOpen(false)}>
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
              <div className="inputGroup">
                <label>Class Name</label>
                <input
                  type="text"
                  name="className"
                  placeholder="e.g SS 1A"
                  value={formData.className}
                  onChange={handleChange}
                />
              </div>

              <div className="inputGroup">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter class fee"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="inputGroup">
                <label>Payment Option</label>
                <div className="modalSelectWrapper">
                  <select
                    name="paymentOption"
                    value={formData.paymentOption}
                    onChange={handleChange}
                  >
                    <option value="">Select Payment Option</option>
                    <option value="full payment">Full Payment</option>
                    <option value="installment">Installment</option>
                  </select>
                </div>
              </div>

              {formData.paymentOption === "installment" && (
                <>
                  <div className="inputGroup">
                    <label>Number Of Installments</label>
                    <div className="modalSelectWrapper">
                      <select
                        name="numberOfInstallments"
                        value={formData.numberOfInstallments}
                        onChange={handleChange}
                      >
                        <option value="">Select Number</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                  </div>
                  {formData.numberOfInstallments && formData.amount && (
                    <div className="inputHelp">
                      Each installment: ₦
                      {(
                        Number(formData.amount) /
                        Number(formData.numberOfInstallments)
                      ).toLocaleString()}
                    </div>
                  )}
                </>
              )}

              <div className="inputGroup">
                <label>Assign Class Teacher (optional)</label>
                <div className="modalSelectWrapper">
                  <select
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleChange}
                  >
                    <option value="">Search and select teacher</option>
                    {teachers.map((staff) => (
                      <option
                        key={staff.id || staff._id}
                        value={staff.id || staff._id}
                      >
                        {staff.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <button
                className="cancelBtn"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </button>
              <button
                className="saveChangesBtn"
                onClick={() => editClass(formData.id)}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete class modal ── */}
      {isDeleteOpen && (
        <div className="modalOverlay" onClick={() => setIsDeleteOpen(false)}>
          <div
            className="modalContent deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHeader">
              <h2>Delete Class</h2>
              <button
                className="closeBtn"
                onClick={() => setIsDeleteOpen(false)}
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
                Are you sure you want to delete this class? This action cannot
                be undone.
              </p>
            </div>
            <div className="modalFooter">
              <button
                className="cancelBtn"
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </button>
              <button
                className="confirmDeleteBtn"
                onClick={() => deleteClass(formData.id)}
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

export default AdminClass;
