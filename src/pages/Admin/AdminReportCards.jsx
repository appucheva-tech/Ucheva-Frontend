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
