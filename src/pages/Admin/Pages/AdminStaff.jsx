import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStaff.css";
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import { apiClient } from "../../../config/AxiosInstance";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Your three state components ───────────────────────────────────────────────
import LoadingScreen from "../../../components/Loading-Screen"; // adjust path
import ErrorScreen from "../../../components/Error-Screen"; // adjust path
import EmptyState from "../../../components/EmptyState"; // adjust path

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

  const [filters, setFilters] = useState({ staffType: "all", role: "all" });

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
    if (filters.role !== "all") {
      filtered = filtered.filter(
        (s) =>
          (s.staffType || s.role || "").toLowerCase() ===
          filters.role.toLowerCase(),
      );
    }
    setFilteredStaff(filtered);
  }, [filters, staffList]);

  const handleFilterChange = (filterType, value) =>
    setFilters((prev) => ({ ...prev, [filterType]: value }));

  const resetFilters = () => setFilters({ staffType: "all", role: "all" });

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
      <div className="ADS-Bdashboard-container">
        {/* ── Header ── */}
        <div className="ADS-dashboard-header">
          <div className="ADS-header-text-group">
            <h1 className="ADS-welcome-text">Staff Management</h1>
            <p className="ADS-subtitle-text">
              Manage Teaching and non-teaching staff records. Add, edit and
              assign staff to classes or subjects.
            </p>
          </div>
          <button className="ADS-AddStaff" onClick={handleAddStaff}>
            <FaPlus /> Add Staff
          </button>
        </div>

        {/* ── Metrics ── */}
        <div className="ADS-metrics-grid">
          <div className="ADS-metric-card ADS-card-total">
            <div className="ADS-card-content">
              <div className="ADS-text-section">
                <span className="ADS-card-label">Total Staff</span>
                <span className="ADS-card-value">{metrics.total}</span>
              </div>
              <div className="ADS-icon-wrapper ADS-icon-students">
                <PiStudentFill className="ADS-DashIcon" />
              </div>
            </div>
          </div>

          <div className="ADS-metric-card ADS-card-teaching">
            <div className="ADS-card-content">
              <div className="ADS-text-section">
                <span className="ADS-card-label">Teaching Staff</span>
                <span className="ADS-card-value">{metrics.classTeachers}</span>
              </div>
              <div className="ADS-icon-wrapper ADS-icon-staff">
                <HiMiniUserGroup className="ADS-DashIcon" />
              </div>
            </div>
          </div>

          <div className="ADS-metric-card ADS-card-non-teaching">
            <div className="ADS-card-content">
              <div className="ADS-text-section">
                <span className="ADS-card-label">Non-Teaching Staff</span>
                <span className="ADS-card-value">{metrics.subjectTeachers}</span>
              </div>
              <div className="ADS-icon-wrapper ADS-icon-attendance">
                <PiCalendarBlankFill className="ADS-DashIcon" />
              </div>
            </div>
          </div>

          <div className="ADS-metric-card ADS-card-active">
            <div className="ADS-card-content">
              <div className="ADS-text-section">
                <span className="ADS-card-label">Class Teachers</span>
                <span className="ADS-card-value">{metrics.activeStaff}</span>
              </div>
              <div className="ADS-icon-wrapper ADS-icon-fees">
                <FaSackDollar className="ADS-DashIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ADS-tableContainer">
        {/* ── Empty state ── */}
        {staffList.length === 0 ? (
          <EmptyState
            title="No Staff Records Found"
            message="Your personnel deployment is empty. Get started by adding profiles to your staff workspace."
            // actionText="Add Staff Member"
            onAction={handleAddStaff}
          />
        ) : (
          <>
            {/* ── Staff List Title ── */}
            <h2 className="ADS-staffListTitle">Staff List</h2>

            {/* ── Filters ── */}
            <div className="ADS-filterSection">
              <div className="ADS-filterGroup">
                <label className="ADS-filterLabel">Staff Type</label>
                <div className="ADS-selectWrapper">
                  <select
                    className="ADS-StaffselectInput"
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

              {/* ── Role Filter ── */}
              <div className="ADS-filterGroup">
                <label className="ADS-filterLabel">Role</label>
                <div className="ADS-selectWrapper">
                  <select
                    className="ADS-StaffselectInput"
                    value={filters.role}
                    onChange={(e) =>
                      handleFilterChange("role", e.target.value)
                    }
                  >
                    <option value="all">All Roles</option>
                    <option value="class teacher">Class Teacher</option>
                    <option value="subject teacher">Subject Teacher</option>
                  </select>
                </div>
              </div>

              <button className="ADS-resetBtn" onClick={resetFilters}>
                <svg
                  className="ADS-resetIcon"
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
            <div className="ADS-tableWrapper">
              <table className="ADS-staffTable">
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
                        <td className="ADS-staffName ADS-card-content-populated">
                          {staff.fullName ||
                            `${staff.firstName || ""} ${staff.lastName || ""}`.trim() ||
                            "Unnamed Staff"}
                        </td>
                        <td className="ADS-roleText ADS-card-content-populated">
                          {staff.staffType || staff.role || "--"}
                        </td>
                        <td className="ADS-classText">
                          {staff.assignedClass || "--"}
                        </td>
                        <td className="ADS-subjectText ADS-card-content-populated">
                          {staff.assignedSubject || staff.subject || "--"}
                        </td>
                        <td>{staff.phoneNumber || staff.phone || "--"}</td>
                        <td>
                          <div className="ADS-actionButtons">
                            <button
                              className="ADS-editBtn"
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
                              className="ADS-deleteBtn"
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
                <div className="ADS-paginationRow">
                  <div className="ADS-paginationInfo">
                    Showing 1 to {filteredStaff.length} of{" "}
                    {filteredStaff.length} records
                  </div>
                  <div className="ADS-paginationControls">
                    <button className="ADS-arrowBtn" disabled>
                      &lt;
                    </button>
                    <button className="ADS-pageBtn ADS-activePage">1</button>
                    <button className="ADS-arrowBtn" disabled>
                      &gt;
                    </button>
                  </div>
                  <div className="ADS-rowsPerPageGroup">
                    <span className="ADS-rowsLabel">Rows per page</span>
                    <div className="ADS-rowsSelectWrapper">
                      <select className="ADS-rowsSelect" defaultValue="10">
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── Delete modal ── */}
      {isDeleteOpen && (
        <div className="ADS-modalOverlay" onClick={() => setIsDeleteOpen(false)}>
          <div
            className="ADS-modalContent ADS-deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ADS-modalHeader">
              <h2>Delete Staff</h2>
              <button
                className="ADS-closeBtn"
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
            <div className="ADS-modalBody">
              <p className="ADS-deleteWarningText">
                Are you sure you want to delete this staff member? This action
                cannot be undone.
              </p>
            </div>
            <div className="ADS-modalFooter">
              <button
                className="ADS-cancelBtn"
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </button>
              <button
                className="ADS-confirmDeleteBtn"
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