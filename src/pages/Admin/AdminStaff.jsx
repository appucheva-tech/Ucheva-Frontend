import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStaff.css";
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import { apiClient } from "../../config/AxiosInstance";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Your three state components ───────────────────────────────────────────────
import LoadingScreen from "../../components/Loading-Screen"; // adjust path
import ErrorScreen from "../../components/Error-Screen"; // adjust path
import EmptyState from "../../components/EmptyState"; // adjust path

const AdminStaff = () => {
  const nav = useNavigate();
  const popupRef = useRef(null);
  const subdomain = window.location.hostname.split(".")[0];

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteStaffId, setDeleteStaffId] = useState(null);

  const [filters, setFilters] = useState({ staffType: "all" });

  const [metrics, setMetrics] = useState({
    total: 0,
    classTeachers: 0,
    subjectTeachers: 0,
    activeStaff: 0,
  });

  // ── Fetch staff ─────────────────────────────────────────────────────────────
  const fetchStaffRecords = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await apiClient.get("/staff/all-staffs", {
        headers: { "x-tenant": subdomain },
      });

      const records = Array.isArray(response.data)
        ? response.data
        : response.data?.staffsData || response.data?.data || [];

      setStaffList(records);
      setFilteredStaff(records);

      const classTeachersCount = records.filter(
        (s) => (s.staffType || s.role || "").toLowerCase() === "class teacher",
      ).length;

      const subjectTeachersCount = records.filter(
        (s) =>
          (s.staffType || s.role || "").toLowerCase() === "subject teacher",
      ).length;

      const activeStaffCount = records.filter((s) => {
        const status = (
          s.status ||
          s.employmentStatus ||
          s.accountStatus ||
          ""
        ).toLowerCase();
        return status === "active" || status === "true";
      }).length;

      setMetrics({
        total: records.length,
        classTeachers: classTeachersCount,
        subjectTeachers: subjectTeachersCount,
        activeStaff: activeStaffCount,
      });
    } catch (error) {
      console.error("Failed fetching staff records:", error);
      setHasError(true);
      toast.error(
        error.response?.data?.message || "Failed to fetch staff records",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffRecords();
  }, [subdomain]);

  useEffect(() => {
    let filtered = [...staffList];
    if (filters.staffType !== "all") {
      filtered = filtered.filter(
        (s) =>
          (s.staffType || s.role || "").toLowerCase() ===
          filters.staffType.toLowerCase(),
      );
    }
    setFilteredStaff(filtered);
  }, [filters, staffList]);

  const handleFilterChange = (filterType, value) =>
    setFilters((prev) => ({ ...prev, [filterType]: value }));

  const resetFilters = () => setFilters({ staffType: "all" });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleAddStaff = () => nav("/admin/AdminStaff2");

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDeleteStaff = async () => {
    setLoading(true);
    try {
      await apiClient.delete(`/staff/deletestaff/${deleteStaffId}`, {
        headers: { "x-tenant": subdomain },
      });
      setStaffList((prev) => prev.filter((s) => s.id !== deleteStaffId));
      toast.success("Staff member deleted successfully!");
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Failed to delete staff:", error);
      toast.error(
        error.response?.data?.message ||
          "Error deleting staff. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditStaff = (e, staffId) => {
    e.stopPropagation();
    nav(`/admin/edit-staff/${staffId}`);
  };

  // ── Loading state ───────────────────────────────────────────────────────────
  if (isLoading) return <LoadingScreen />;

  // ── Error state ─────────────────────────────────────────────────────────────
  if (hasError) {
    return (
      <ErrorScreen
        title="Staff Records Unavailable"
        message="We couldn't load your staff records. Check your connection and try again."
        onRetry={fetchStaffRecords}
      />
    );
  }

  return (
    <>
      <div className="Bdashboard-container">
        {/* ── Header ── */}
        <div className="dashboard-header">
          <div className="header-text-group">
            <h1 className="welcome-text">Staff Management</h1>
            <p className="subtitle-text">
              Manage Teaching and non-teaching staff records. Add, edit and
              assign staff to classes or subjects.
            </p>
          </div>
          <button className="AddStaff" onClick={handleAddStaff}>
            <FaPlus /> Add Staff
          </button>
        </div>

        {/* ── Metrics ── */}
        <div className="metrics-grid">
          <div className="metric-card card-total">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Total Staff</span>
                <span className="card-value">{metrics.total}</span>
              </div>
              <div className="icon-wrapper icon-students">
                <PiStudentFill className="DashIcon" />
              </div>
            </div>
          </div>

          <div className="metric-card card-teaching">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Class Teachers</span>
                <span className="card-value">{metrics.classTeachers}</span>
              </div>
              <div className="icon-wrapper icon-staff">
                <HiMiniUserGroup className="DashIcon" />
              </div>
            </div>
          </div>

          <div className="metric-card card-non-teaching">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Subject Teachers</span>
                <span className="card-value">{metrics.subjectTeachers}</span>
              </div>
              <div className="icon-wrapper icon-attendance">
                <PiCalendarBlankFill className="DashIcon" />
              </div>
            </div>
          </div>

          <div className="metric-card card-active">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Active Staff</span>
                <span className="card-value">{metrics.activeStaff}</span>
              </div>
              <div className="icon-wrapper icon-staff">
                <HiMiniUserGroup className="DashIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tableContainer">
        {/* ── Empty state ── */}
        {staffList.length === 0 ? (
          <EmptyState
            title="No Staff Records Found"
            message="Your personnel deployment is empty. Get started by adding profiles to your staff workspace."
            actionText="Add Staff Member"
            onAction={handleAddStaff}
          />
        ) : (
          <>
            {/* ── Filters ── */}
            <div className="filterSection">
              <div className="filterGroup">
                <label className="filterLabel">Staff Type</label>
                <div className="selectWrapper">
                  <select
                    className="StaffselectInput"
                    value={filters.staffType}
                    onChange={(e) =>
                      handleFilterChange("staffType", e.target.value)
                    }
                  >
                    <option value="all">All Types</option>
                    <option value="class teacher">Class Teachers</option>
                    <option value="subject teacher">Subject Teachers</option>
                  </select>
                </div>
              </div>

              <button className="resetBtn" onClick={resetFilters}>
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

            {/* ── Table ── */}
            <div className="tableWrapper">
              <table className="staffTable">
                <thead>
                  <tr>
                    <th>Staff Name</th>
                    <th>Role</th>
                    <th>Assigned Class</th>
                    <th>Subject</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: 0, border: "none" }}>
                        <EmptyState
                          title="No results"
                          message="No staff match the selected filter. Try a different type or reset the filter."
                          actionText="Reset Filters"
                          onAction={resetFilters}
                        />
                      </td>
                    </tr>
                  ) : (
                    filteredStaff.map((staff, index) => (
                      <tr
                        key={staff.id || index}
                        style={{ cursor: "pointer" }}
                        onClick={() => nav(`/admin/staff-details/${staff.id}`)}
                      >
                        <td className="staffName card-content-populated">
                          {staff.fullName ||
                            `${staff.firstName || ""} ${staff.lastName || ""}`.trim() ||
                            "Unnamed Staff"}
                        </td>
                        <td className="roleText card-content-populated">
                          {staff.staffType || staff.role || "--"}
                        </td>
                        <td className="classText">
                          {staff.assignedClass || "--"}
                        </td>
                        <td className="subjectText card-content-populated">
                          {staff.assignedSubject || staff.subject || "--"}
                        </td>
                        <td>{staff.phoneNumber || staff.phone || "--"}</td>
                        <td>
                          <div className="actionButtons">
                            <button
                              className="editBtn"
                              aria-label="Edit staff"
                              onClick={(e) => handleEditStaff(e, staff.id)}
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
                              aria-label="Delete staff"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteStaffId(staff.id);
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

              {filteredStaff.length > 0 && (
                <div className="paginationRow">
                  <div className="paginationInfo">
                    Showing 1 to {filteredStaff.length} of{" "}
                    {filteredStaff.length} records
                  </div>
                  <div className="paginationControls">
                    <button className="arrowBtn" disabled>
                      &lt;
                    </button>
                    <button className="pageBtn activePage">1</button>
                    <button className="arrowBtn" disabled>
                      &gt;
                    </button>
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
          </>
        )}

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

      {/* ── Delete modal ── */}
      {isDeleteOpen && (
        <div className="modalOverlay" onClick={() => setIsDeleteOpen(false)}>
          <div
            className="modalContent deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHeader">
              <h2>Delete Staff</h2>
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
                Are you sure you want to delete this staff member? This action
                cannot be undone.
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
                onClick={handleDeleteStaff}
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

export default AdminStaff;
