import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStaff.css";
import Ifeanacho from "../../assets/Ifeanacho.jpg";
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import { apiClient } from "../../config/AxiosInstance";
import { PlusSquare } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const AdminStaff = () => {
  const nav = useNavigate();
  const popupRef = useRef(null);
  const subdomain = window.location.hostname.split(".")[0];

  // Component states
  const [isOpen, setIsOpen] = useState(false);

  // const staffList = [
  //   {
  //     _id: "1",
  //     name: "Ifeanacho Okafor",
  //     role: "Teacher",
  //     class: "JSS 1A",
  //     subject: "Mathematics",
  //     phone: "08012345678",
  //   },
  //   {
  //     _id: "2",
  //     name: "Grace Johnson",
  //     role: "Teacher",
  //     class: "SSS 2B",
  //     subject: "English Language",
  //     phone: "08087654321",
  //   },
  //   {
  //     _id: "3",
  //     name: "Samuel Adeyemi",
  //     role: "Administrator",
  //     class: "--",
  //     subject: "--",
  //     phone: "08123456789",
  //   },
  // ];
  // const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [staffList, setStaffList] = useState([] || null);
  // Dynamic Metrics states calculated from live API data
  const [metrics, setMetrics] = useState({
    total: 0,
    teaching: 0,
    nonTeaching: 0,
    classTeachers: 0,
  });

  // Fetch live staff data on mount
  useEffect(() => {
    const fetchStaffRecords = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get("/staff/staffs", {
          headers: { "x-tenant": subdomain },
        });

        console.log("response:  ", response);

        const records = Array.isArray(response.data)
          ? response.data
          : response.data?.staffData || response.data?.data || [];
        console.log(records);
        setStaffList(records);

        // Derive dashboard metric card counts directly from data
        const teachingCount = records.filter(
          (s) => s.role?.toLowerCase() === "teacher",
        ).length;
        const nonTeachingCount = records.filter(
          (s) => s.role?.toLowerCase() !== "teacher",
        ).length;
        const classTeachersCount = records.filter(
          (s) => s.class && s.class !== "--",
        ).length;

        setMetrics({
          total: records.length,
          teaching: teachingCount,
          nonTeaching: nonTeachingCount,
          classTeachers: classTeachersCount,
        });
      } catch (error) {
        console.error("Failed fetching live institutional staff logs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaffRecords();
  }, [subdomain]);

  // Click outside listener for notifications layout
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleAddStaff = () => {
    nav("/admin/AdminStaff2");
  };

  // Loading Viewport Layout
  if (isLoading) {
    return (
      <div className="tableContainer">
        <div className="dashboard-loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="Bdashboard-container">
        <div className="dashboard-header">
          <div className="header-text-group">
            <h1 className="welcome-text">Staff Management</h1>
            <p className="subtitle-text">
              Manage Teaching and non-teaching staff records. Add, edit and
              assign staff to classes or subjects.
            </p>
          </div>

          <button className="AddStaff" onClick={handleAddStaff}>
            {" "}
            <FaPlus /> Add Staff
          </button>
        </div>

        {/* Dynamic Metric Cards Component Grid */}
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
                <span className="card-label">Teaching Staff</span>
                <span className="card-value">{metrics.teaching}</span>
              </div>
              <div className="icon-wrapper icon-staff">
                <HiMiniUserGroup className="DashIcon" />
              </div>
            </div>
          </div>

          <div className="metric-card card-non-teaching">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Non-Teaching Staff</span>
                <span className="card-value">{metrics.nonTeaching}</span>
              </div>
              <div className="icon-wrapper icon-attendance">
                <PiCalendarBlankFill className="DashIcon" />
              </div>
            </div>
          </div>

          <div className="metric-card card-teachers">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Class Teachers</span>
                <span className="card-value">{metrics.classTeachers}</span>
              </div>
              <div className="icon-wrapper icon-fees">
                <FaSackDollar className="DashIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tableContainer">
        {staffList.length === 0 ? (
          /* Redesigned Premium Empty State Card Viewport */
          <div className="staff-empty-state-card">
            <div className="empty-state-icon-bg">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.656-5.64 9.094 9.094 0 00-3.741.479m4.656 5.64c.007.08.011.162.011.245v.39m-4.656-.635c0-.708-.19-1.371-.52-1.945M18 14v4.72m0 0H8M10.125 19.5H3.75A.75.75 0 013 18.75V18a3.75 3.75 0 013.75-3.75h.375a3.75 3.75 0 013.75 3.75v.75c0 .414-.336.75-.75.75z"
                />
                <circle cx="6.75" cy="9.75" r="2.25" />
                <circle cx="15" cy="7.5" r="2" />
              </svg>
            </div>
            <h3>No Team Records Configured</h3>
            <p>
              Your personnel deployment is empty. Get started by establishing
              structural configurations and adding profiles to your
              administration staff workspace.
            </p>
            <button className="empty-state-add-btn" onClick={handleAddStaff}>
              Create Personnel Profile
            </button>
          </div>
        ) : (
          <>
            <div className="filterSection">
              <div className="filterGroup">
                <label className="filterLabel">Staff Type</label>
                <div className="selectWrapper">
                  <select className="selectInput" defaultValue="all">
                    <option value="all">All Types</option>
                    <option value="teacher">Teaching Staff</option>
                    <option value="non-teacher">Non-Teaching Staff</option>
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
                  {staffList.map((staff, index) => (
                    <tr key={staff._id || index}>
                      <td className="staffName card-content-populated">
                        {staff.name ||
                          `${staff.firstName || ""} ${staff.lastName || ""}`.trim() ||
                          "Unnamed Staff"}
                      </td>
                      <td className="roleText card-content-populated">
                        {staff.staffRole || "--"}
                      </td>
                      <td className="classText">{staff.class || "test"}</td>
                      <td className="subjectText card-content-populated">
                        {staff.subject || "test"}
                      </td>
                      <td>{staff.phone || staff.phoneNumber || "test"}</td>
                      <td>
                        <div className="actionButtons">
                          <button className="editBtn" aria-label="Edit staff">
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
                <div className="paginationInfo">
                  Showing 1 to {staffList.length} of {staffList.length} records
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
            </div>
          </>
        )}

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

export default AdminStaff;
