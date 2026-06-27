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