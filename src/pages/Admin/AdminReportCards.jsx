import React, { useState, useEffect } from 'react';
import './AdminReportCards.css';
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import { apiClient } from "../../config/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Your three state components ───────────────────────────────────────────────
import LoadingScreen from '../../components/Loading-Screen';     // adjust path
import ErrorScreen from '../../components/Error-Screen';         // adjust path
import EmptyState from '../../components/EmptyState';           // adjust path

const AdminReportCards = () => {
  const [reportData, setReportData] = useState([]);
  const [metrics, setMetrics] = useState({
    generatedCards: 0,
    readyToSend: 0,
    pendingCards: 0,
    sentToParents: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // ── Fetch report cards ────────────────────────────────────────────────────
  const fetchReportCards = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await apiClient.get("/admin/report-cards");
      const data = response.data?.reportCards || response.data?.data || [];
      setReportData(data);

      // Derive metrics from the returned data, or use API-provided summary
      const summary = response.data?.summary;
      setMetrics({
        generatedCards: summary?.generatedCards ?? data.length,
        readyToSend:    summary?.readyToSend    ?? data.filter((r) => r.status === "Ready to send").length,
        pendingCards:   summary?.pendingCards   ?? data.filter((r) => r.status === "Pending").length,
        sentToParents:  summary?.sentToParents  ?? data.filter((r) => r.status === "Sent to Parent").length,
      });
    } catch (error) {
      console.error("Failed to fetch report cards:", error);
      setHasError(true);
      toast.error(error.response?.data?.message || "Failed to fetch report cards");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReportCards();
  }, []);
import React, { useEffect, useState } from "react";
import "./AdminReportCards.css";
import { FaArrowsRotate } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../config/AxiosInstance";
import { toast } from "react-toastify";

const AdminReportCards = () => {
  const nav = useNavigate();
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    classSection: "all",
    status: "all",
    term: "third",
  });

  // Fetch real data from API - matching CTreport pattern
  const fetchReportCards = async () => {
    try {
      setLoading(true);
      setError(null);

      // Using the same endpoint pattern as CTreport
      const response = await apiClient.get("/classteacher/all-studentshju");
      console.log(response);

      // Map the response to match the expected structure
      const data = response?.data?.data || response?.data?.reportCards || [];
      setReportData(data);
    } catch (err) {
      console.error("Error fetching report cards:", err);
      setError(err.response?.data?.message || "Failed to load report cards");
      toast.error("Failed to load report cards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportCards();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      classSection: "all",
      status: "all",
      term: "third",
    });
    toast.info("Filters reset");
  };

  // Get status class for badge styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'Sent to Parent': return 'statusSent';
      case 'Pending':        return 'statusPending';
      case 'Ready to send':  return 'statusReady';
      default:               return '';
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isLoading) return <LoadingScreen />;

  // ── Error state ───────────────────────────────────────────────────────────
  if (hasError) {
    return (
      <ErrorScreen
        title="Report Cards Unavailable"
        message="We couldn't load report card records. Check your connection and try again."
        onRetry={fetchReportCards}
      />
    );
  }

  return (
    <>
      {/* ── Header + metrics ── */}
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="welcome-text">Report Cards</h1>
          <p className="subtitle-text">
            Review, finalize and send report cards to parents.
          </p>
        </header>

        <div className="metrics-grid">
          <div className="metric-card card-students">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Generated Cards</span>
                <span className="card-value">{metrics.generatedCards}</span>
              </div>
              <div className="icon-wrapper icon-students">
                <PiStudentFill className="DashIcon" />
              </div>
            </div>
          </div>

          <div className="metric-card card-staff">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Ready to Send</span>
                <span className="card-value">{metrics.readyToSend}</span>
              </div>
              <div className="icon-wrapper icon-staff">
                <HiMiniUserGroup className="DashIcon" />
              </div>
            </div>
          </div>

          <div className="metric-card card-attendance">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Pending Cards</span>
                <span className="card-value">{metrics.pendingCards}</span>
              </div>
              <div className="icon-wrapper icon-attendance">
                <PiCalendarBlankFill className="DashIcon" />
              </div>
            </div>
          </div>

          <div className="metric-card card-fees">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Sent to Parents</span>
                <span className="card-value">{metrics.sentToParents}</span>
              </div>
              <div className="icon-wrapper icon-fees">
                <FaSackDollar className="DashIcon" />
              </div>
            </div>
          </div>
    switch (status?.toLowerCase()) {
      case "sent to parent":
      case "sent":
        return "statusSent";
      case "pending":
        return "statusPending";
      case "ready to send":
      case "ready":
      case "ready for review":
        return "statusReady";
      case "awaiting score":
        return "statusAwaiting";
      case "remark added":
        return "statusRemark";
      case "submitted to admin":
        return "statusSubmitted";
      default:
        return "";
    }
  };

  // Handle navigation to student report
  const handleStudentClick = (admissionNumber) => {
    nav(`/admin/reportcards/studentreport/${admissionNumber}`);
  };

  // Loading skeleton for table rows
  const LoadingSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={i}>
          <td className="checkboxCol">
            <div className="skeleton-checkbox" />
          </td>
          <td>
            <div className="skeleton-text" style={{ width: "120px" }} />
          </td>
          <td>
            <div className="skeleton-text" style={{ width: "100px" }} />
          </td>
          <td>
            <div className="skeleton-text" style={{ width: "80px" }} />
          </td>
          <td>
            <div className="skeleton-text" style={{ width: "130px" }} />
          </td>
          <td>
            <div className="skeleton-badge" />
          </td>
          <td>
            <div className="skeleton-action" />
          </td>
        </tr>
      ))}
    </>
  );

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-btn" onClick={fetchReportCards}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="CTreportContainer">
      <article className="CTreportWrapper">
        <div className="CTSReportHead">
          Report Cards
          <span>Review, finalize and send report cards to parents.</span>
        </div>

        <div className="classSectionHolder">
          <nav className="classSection">
            <article className="classSectionInput">
              Class Section
              <div className="SectionInputHolder">
                <select
                  name="classSection"
                  className="SelectSectionInput"
                  value={filters.classSection}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Classes</option>
                  <option value="JSS 1">JSS 1</option>
                  <option value="JSS 2">JSS 2</option>
                  <option value="JSS 3">JSS 3</option>
                  <option value="SS 1">SS 1</option>
                  <option value="SS 2">SS 2</option>
                  <option value="SS 3">SS 3</option>
                </select>
              </div>
            </article>
            <article className="classSectionInput">
              Status
              <div className="SectionInputHolder">
                <select
                  name="status"
                  className="SelectSectionInput"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Status</option>
                  <option value="awaiting score">Awaiting Score</option>
                  <option value="remark added">Remark Added</option>
                  <option value="ready for review">Ready for Review</option>
                  <option value="submitted to admin">Submitted to Admin</option>
                  <option value="sent to parent">Sent to Parent</option>
                </select>
              </div>
            </article>
            <article className="classSectionInput">
              Term
              <div className="SectionInputHolder">
                <select
                  name="term"
                  className="SelectSectionInput"
                  value={filters.term}
                  onChange={handleFilterChange}
                >
                  <option value="first">First Term</option>
                  <option value="second">Second Term</option>
                  <option value="third">Third Term</option>
                </select>
              </div>
            </article>
          </nav>
          <button className="resetBtnRecord" onClick={handleResetFilters}>
            <FaArrowsRotate />
            Reset
          </button>
        </div>
      </div>

      {/* ── Table section ── */}
      <div className="tableContainer">
        <div className="filterSection">
          <div className="filtersGroup">
            <div className="filterItem">
              <label className="filterLabel">Class Section</label>
              <div className="selectWrapper">
                <select className="selectInput" defaultValue="all">
                  <option value="all">All Classes</option>
                </select>
              </div>
            </div>
            <div className="filterItem">
              <label className="filterLabel">Status</label>
              <div className="selectWrapper">
                <select className="selectInput" defaultValue="all">
                  <option value="all">All Status</option>
                </select>
              </div>
            </div>
            <div className="filterItem">
              <label className="filterLabel">Term</label>
              <div className="selectWrapper">
                <select className="selectInput" defaultValue="third">
                  <option value="third">Third Term</option>
                </select>
              </div>
            </div>
          </div>

          <button className="resetBtn">
            <svg className="resetIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            Reset
          </button>
        </div>

        <div className="tableWrapper">
          {reportData.length === 0 ? (
            <EmptyState
              title="No Report Cards Found"
              message="No report cards have been generated yet. They will appear here once teachers submit assessments."
            />
          ) : (
            <table className="reportTable">
              <thead>
                <tr>
                  <th className="checkboxCol">
                    <input type="checkbox" className="customCheckbox" />
                  </th>
                  <th>Student Name</th>
                  <th>Admission No.</th>
                  <th>Class</th>
                  <th>Class Teacher</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, index) => (
                  <tr key={row.id || index}>
                    <td className="checkboxCol">
                      <input type="checkbox" className="customCheckbox" />
                    </td>
                    <td className="studentName">{row.name || row.studentName}</td>
                    <td className="textValue">{row.admissionNo || row.admissionNumber}</td>
                    <td className="textValue">{row.class || row.className}</td>
                    <td className="textValue">{row.teacher || row.teacherName}</td>
                    <td>
                      <span className={`statusBadge ${getStatusClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td>
                      <button className="moreActionsBtn">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="5" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="12" cy="19" r="2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportData.length > 0 && (
            <div className="paginationRow">
              <div className="paginationInfo">
                Showing 1 to {reportData.length} of {reportData.length} records
              </div>
              <div className="paginationControls">
                <button className="arrowBtn" disabled>&lt;</button>
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
            © {new Date().getFullYear()} Ucheva school operating management system. All rights reserved.
          </span>
          <span className="supportText">
            Need help?{" "}
            <a href="#support" className="supportLink">Contact support</a>
          </span>
        </footer>
      </div>
    </>
  );
};

export default AdminReportCards;
        <article className="CTActualTable2">
          <div className="CTActualTableTop2">
            <input className="CTTableContentValue2" type="checkbox" disabled />
            <nav className="CTTableContentValue2">Student Name</nav>
            <nav className="CTTableContentValue2">Admission Number</nav>
            <nav className="CTTableContentValue2">Class</nav>
            <nav className="CTTableContentValue2">Class Teacher</nav>
            <nav className="CTTableContentValue2">Status</nav>
            <nav className="CTTableContentValue2">Actions</nav>
          </div>

          {loading ? (
            // Loading state
            Array.from({ length: 5 }).map((_, index) => (
              <ul className="CTActualTableInfo2" key={`skeleton-${index}`}>
                <input className="CTTableValueName2" type="checkbox" disabled />
                <nav className="CTTableValueName2">
                  <div className="skeleton-text" style={{ width: "100px" }} />
                </nav>
                <nav className="CTTableValueName2">
                  <div className="skeleton-text" style={{ width: "80px" }} />
                </nav>
                <nav className="CTTableValueName2">
                  <div className="skeleton-text" style={{ width: "60px" }} />
                </nav>
                <nav className="CTTableValueName2">
                  <div className="skeleton-text" style={{ width: "100px" }} />
                </nav>
                <nav className="CTTableValueName2">
                  <div
                    className="skeleton-badge"
                    style={{ width: "80px", height: "20px" }}
                  />
                </nav>
                <nav className="CTTableValueAction">
                  <div
                    className="skeleton-action"
                    style={{ width: "20px", height: "20px" }}
                  />
                </nav>
              </ul>
            ))
          ) : reportData.length === 0 ? (
            <ul
              className="CTActualTableInfo2"
              style={{ justifyContent: "center", padding: "2rem" }}
            >
              <nav
                className="CTTableValueName2"
                style={{ width: "100%", textAlign: "center" }}
              >
                No report cards found
              </nav>
            </ul>
          ) : (
            reportData.map((report) => (
              <ul
                className="CTActualTableInfo2"
                key={report.id || report._id}
                onClick={() =>
                  handleStudentClick(
                    report.admissionNumber || report.admissionNo,
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <input className="CTTableValueName2" type="checkbox" />
                <nav className="CTTableValueName2">
                  {report.studentName || report.name || report.fullName || "-"}
                </nav>
                <nav className="CTTableValueName2">
                  {report.admissionNumber || report.admissionNo || "-"}
                </nav>
                <nav className="CTTableValueName2">
                  {report.className || report.class || "-"}
                </nav>
                <nav className="CTTableValueName2">
                  {report.classTeacher || report.teacher || "-"}
                </nav>
                <nav className="CTTableValueName2">
                  <span
                    className={`statusBadge ${getStatusClass(report.status)}`}
                  >
                    {report.status || "N/A"}
                  </span>
                </nav>
                <Link
                  className="LinkToST"
                  to={`/admin/reportcards/studentreport/${report.admissionNumber || report.admissionNo}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <nav className="CTTableValueAction">:</nav>
                </Link>
              </ul>
            ))
          )}

          <div className="pagination">
            <span>
              Showing pages 1 of {Math.ceil(reportData.length / 10) || 1}
            </span>

            <div className="pages">
              <button disabled>{`<`}</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <span>...</span>
              <button>6</button>
              <button>7</button>
              <button disabled>{`>`}</button>
            </div>
            <nav className="CTPageTypeHolder">
              Rows per page
              <div className="CTPageTypeWrapper">
                <select className="CTPageType">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </nav>
          </div>
        </article>
      </article>
    </main>
  );
};

export default AdminReportCards;
