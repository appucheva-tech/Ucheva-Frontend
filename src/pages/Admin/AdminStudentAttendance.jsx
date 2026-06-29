import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminStudentAttendance.css";
import { apiClient } from "../../config/AxiosInstance";

const StudentAttendance = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const activeTab = pathname.includes("AdminStudentAttendance") ? 1 : 0;
  const subdomain = window.location.hostname.split(".")[0];

  // ── Data ──────────────────────────────────────────────────────
  const [allStudents, setAllStudents] = useState([]); // raw from API
  const [classes, setClasses] = useState([]); // from /admin/getclass
  const [loading, setLoading] = useState(true);
  const [classesLoading, setClassesLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Filters ───────────────────────────────────────────────────
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // ── Fetch student attendance ──────────────────────────────────
  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiClient.get("/classteacher/attendance/today", {
          headers: { "x-tenant": subdomain },
        });
        setAllStudents(res?.data?.Attendance || []);
      } catch (err) {
        console.error("Error fetching student attendance:", err);
        setError("Failed to fetch attendance data");
        setAllStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  // ── Fetch classes ─────────────────────────────────────────────
  useEffect(() => {
    const fetchClasses = async () => {
      setClassesLoading(true);
      try {
        const res = await apiClient.get("/admin/getclass");
        setClasses(res?.data?.classes || []);
      } catch (err) {
        console.error("Error fetching classes:", err);
      } finally {
        setClassesLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // ── Client-side filtering ─────────────────────────────────────
  const filtered = allStudents.filter((item) => {
    const itemClass = item.studentClass || item.student?.class || "";
    const itemStatus = (item.status || "present").toLowerCase();

    const classMatch = selectedClass === "all" || itemClass === selectedClass;
    const statusMatch =
      selectedStatus === "all" || itemStatus === selectedStatus;
    return classMatch && statusMatch;
  });

  const handleReset = () => {
    setSelectedClass("all");
    setSelectedStatus("all");
  };

  return (
    <div className="SAContainer">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <header className="SAHeader">
        <h1 className="SAHeaderTitle">Attendance</h1>
        <p className="SAHeaderSubtitle">
          View and monitor staff and student attendance records.
        </p>
      </header>

      <div className="SACard">
        {/* ── Tabs ─────────────────────────────────────────────── */}
        <div className="SATabs">
          {["Staff Attendance", "Student Attendance"].map((tab, idx) => (
            <button
              key={tab}
              className={`SATab ${activeTab === idx ? "SATabActive" : ""}`}
              onClick={() =>
                nav(
                  idx === 0
                    ? "/admin/AdminAttendance"
                    : "/admin/AdminStudentAttendance",
                )
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Toolbar ──────────────────────────────────────────── */}
        <div className="SAToolbar">
          <h2 className="SAToolbarTitle">Student Attendance</h2>

          <div className="SAFilters">
            {/* Class dropdown — from API */}
            <div className="SAFilterGroup">
              <label className="SAFilterLabel">Class</label>
              <div className="SASelectWrap">
                <select
                  className="SASelect"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  disabled={classesLoading}
                >
                  <option value="all">All Classes</option>
                  {classes.map((c) => (
                    <option key={c.classId} value={c.className}>
                      {c.className}
                    </option>
                  ))}
                </select>
                <span className="SASelectArrow">▾</span>
              </div>
            </div>

            {/* Status dropdown */}
            <div className="SAFilterGroup">
              <label className="SAFilterLabel">Status</label>
              <div className="SASelectWrap">
                <select
                  className="SASelect"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                </select>
                <span className="SASelectArrow">▾</span>
              </div>
            </div>

            {/* Date */}
            <div className="SAFilterGroup">
              <label className="SAFilterLabel">Date</label>
              <div className="SADateBox">
                <span>📅</span>
                <span>Today</span>
              </div>
            </div>

            <button className="SAResetBtn" onClick={handleReset}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="14"
                height="14"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              Reset
            </button>
          </div>
        </div>

        {/* ── Results count ─────────────────────────────────────── */}
        {!loading && !error && (
          <div className="SAResultCount">
            Showing <strong>{filtered.length}</strong> of{" "}
            <strong>{allStudents.length}</strong> records
            {selectedClass !== "all" && (
              <span className="SAFilterTag">{selectedClass} ✕</span>
            )}
            {selectedStatus !== "all" && (
              <span className="SAFilterTag">{selectedStatus} ✕</span>
            )}
          </div>
        )}

        {/* ── Table ────────────────────────────────────────────── */}
        <div className="SATableWrap">
          <table className="SATable">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Class Teacher</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="SAStateCell">
                    <div className="SASpinner" />
                    <span>Loading attendance...</span>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="SAStateCell SAStateError">
                    {error}
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="SAStateCell">
                    <div className="SAEmptyIcon">🎓</div>
                    <p className="SAEmptyTitle">No records found</p>
                    <p className="SAEmptyText">
                      {allStudents.length === 0
                        ? "No students have been marked for today yet."
                        : "No students match the selected filters."}
                    </p>
                    {allStudents.length > 0 && (
                      <button className="SAResetLink" onClick={handleReset}>
                        Clear filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => {
                  const status = (item.status || "present").toLowerCase();
                  const isAbsent = status === "absent";

                  return (
                    <tr key={item.id || index} className="SARow">
                      <td className="SANameCell">
                        <div className="SAAvatar">
                          {(item?.student?.firstName ||
                            item?.studentName ||
                            "?")[0].toUpperCase()}
                        </div>
                        <span>
                          {item?.student
                            ? `${item.student.firstName || ""} ${item.student.lastName || ""}`.trim()
                            : item.studentName || "N/A"}
                        </span>
                      </td>

                      <td className="SACell">
                        {item.studentClass || item.student?.class || "N/A"}
                      </td>

                      <td className="SACell">{item.classTeacher || "N/A"}</td>

                      <td>
                        <span className={`SABadge SABadge--${status}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>

                      <td className="SACell">
                        {item.date
                          ? new Date(item.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "--"}
                      </td>

                      <td>
                        <button
                          className={`SANotifyBtn ${!isAbsent ? "SANotifyBtn--disabled" : ""}`}
                          disabled={!isAbsent}
                          onClick={() => {
                            const url = item?.whatsAppAction?.url;
                            if (url) window.open(url, "_blank");
                          }}
                        >
                          Notify Parent
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ───────────────────────────────────────── */}
        <div className="SAPagination">
          <span className="SAPaginationInfo">
            Showing 1–{Math.min(10, filtered.length)} of {filtered.length}
          </span>
          <div className="SAPaginationControls">
            <button className="SAPaginationBtn" disabled>
              ‹
            </button>
            <button className="SAPaginationBtn SAPaginationBtn--active">
              1
            </button>
            <button className="SAPaginationBtn">2</button>
            <button className="SAPaginationBtn">3</button>
            <span className="SAPaginationEllipsis">…</span>
            <button className="SAPaginationBtn">7</button>
            <button className="SAPaginationBtn">›</button>
          </div>
          <div className="SARowsPerPage">
            <span>Rows per page</span>
            <div className="SASelectWrap">
              <select className="SASelect SASelectSm" defaultValue="10">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span className="SASelectArrow">▾</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
