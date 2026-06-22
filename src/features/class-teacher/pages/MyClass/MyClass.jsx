import { useEffect, useState } from "react";
import AttendanceModal from "./Popup";
import "./MyClass.css";
import { FaArrowsRotate } from "react-icons/fa6";
import PH from "../../../../assets/ph.svg";
import UIM from "../../../../assets/uim.svg";
import Streamline from "../../../../assets/streamline.svg";
import Material from "../../../../assets/material.svg";
import { apiClient } from "../../../../config/AxiosInstance";

const MyClass = () => {
  // State to hold data directly from the class-teacher-dashboard payload
  const [classData, setClassData] = useState({
    myClass: {
      myClass: ["SS2 B"],
      totalStudents: 0,
      totalFemale: 0,
      totalMale: 0,
      presentStudent: 0,
    },
    getAllStudents: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [feeFilter, setFeeFilter] = useState("All Fee Status");

  const resetFilter = () => setFeeFilter("All Fee Status");

  // Reusable callback to allow child components (Modal) to refresh dashboard state after bulk actions
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get("/classteacher/class-teacher-dashboard");

      if (res.data) {
        setClassData({
          myClass: res.data.myClass || classData.myClass,
          getAllStudents: res.data.getAllStudents || [],
        });
      }
      setError(null);
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
      setError(
        error?.message || "An error occurred while bringing in class records.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Filter students sourced from the response payload array
  const filteredStudents = classData.getAllStudents.filter((student) => {
    if (feeFilter === "All Fee Status") return true;
    const operationalFee = student.fee || student.feeStatus || "Unpaid";
    return operationalFee.toLowerCase() === feeFilter.toLowerCase();
  });

  // ==================== SKELETON LOADING INTERFACE ====================
  if (isLoading) {
    return (
      <div className="myClassPage skeleton-page">
        {/* Top Header Skeleton */}
        <div className="myClasstopHeader">
          <div className="skeleton skeleton-header-text"></div>
          <div className="skeleton skeleton-button"></div>
        </div>

        {/* Cards Skeleton Grid */}
        <article className="myClassCTClassCards">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="skeleton-card">
              <div className="skeleton skeleton-card-title"></div>
              <div className="skeleton skeleton-card-number"></div>
            </div>
          ))}
        </article>

        {/* Filter Row Skeleton */}
        <div className="myClassfilterBar">
          <div className="skeleton skeleton-filter-label"></div>
          <div className="skeleton skeleton-filter-btn"></div>
        </div>

        {/* Table Mock Rows Skeleton Container */}
        <div className="skeleton-table-container">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="skeleton-table-row">
              <div className="skeleton skeleton-td"></div>
              <div className="skeleton skeleton-td"></div>
              <div className="skeleton skeleton-td"></div>
              <div className="skeleton skeleton-td"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="myClassPage myClass-state-error">
        <p className="myClass-error-text">{error}</p>
      </div>
    );
  }

  const {
    myClass: classNameArray,
    totalStudents,
    totalFemale,
    totalMale,
    presentStudent,
  } = classData.myClass;

  return (
    <div className="myClassPage">
      <div className="myClasstopHeader">
        <nav
          className="myClasstopHeaderText"
          style={{ textTransform: "capitalize" }}
        >
          My Class — {classNameArray?.[0] || "N/A"}
          <span>{totalStudents ?? 0} students assigned to your class</span>
        </nav>
        <button className="myClassmarkBtn" onClick={() => setOpen(true)}>
          Mark Attendance
        </button>
      </div>

      <article className="myClassCTClassCards">
        <div className="myClassTotalStudents">
          <nav className="myClassCTClasstext">
            Total Students
            <div className="myClassCTtextnum">{totalStudents ?? 0}</div>
          </nav>
          <div className="myClassCTImageHolder1">
            <img className="myClassCTImg" src={UIM} alt="" />
          </div>
        </div>
        <div className="myClassTotalFemale">
          <nav className="myClassCTClasstext">
            Total Female
            <div className="myClassCTtextnum">{totalFemale ?? 0}</div>
          </nav>
          <div className="myClassCTImageHolder1">
            <img className="myClassCTImg" src={Streamline} alt="" />
          </div>
        </div>
        <div className="myClassTotalMale">
          <nav className="myClassCTClasstext">
            Total Male
            <div className="myClassCTtextnum">{totalMale ?? 0}</div>
          </nav>
          <div className="myClassCTImageHolder1">
            <img className="myClassCTImg" src={PH} alt="" />
          </div>
        </div>
        <div className="myClassTotalPresent">
          <nav className="myClassCTClasstext">
            Total Present
            <div className="myClassCTtextnum">{presentStudent ?? 0}</div>
          </nav>
          <div className="myClassCTImageHolder1">
            <img className="myClassCTImg" src={Material} alt="" />
          </div>
        </div>
      </article>

      <div className="myClassfilterBar">
        <nav className="myClassfilterBarLabel">
          Fee status
          <article className="myClassCTSelectHolder">
            <select
              className="myClassCTClassSelect"
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
            >
              <option>All Fee Status</option>
              <option>Full Payment</option>
              <option>Part Payment</option>
              <option>Unpaid</option>
            </select>
          </article>
        </nav>
        <button onClick={resetFilter} className="myClassresetBtn">
          <FaArrowsRotate />
          Reset
        </button>
      </div>

      {filteredStudents.length > 0 ? (
        <div className="tableCard">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Admission Number</th>
                <th>Gender</th>
                <th>Attendance Status</th>
                <th>Fee Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((s, i) => {
                const name =
                  `${s.firstName || ""} ${s.lastName || ""}`.trim() ||
                  s.name ||
                  "Unknown Student";
                const admission = s.admissionNumber || s.admission || "N/A";
                const gender = s.gender || "N/A";
                const attendance =
                  s.attendanceStatus || s.attendance || "Absent";
                const fee = s.feeStatus || s.fee || "Unpaid";

                return (
                  <tr key={s._id || s.id || i}>
                    <td>{name}</td>
                    <td>{admission}</td>
                    <td>{gender}</td>
                    <td>
                      <span className={`badge ${attendance.toLowerCase()}`}>
                        {attendance}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`fee ${fee.replace(/\s+/g, "").toLowerCase()}`}
                      >
                        {fee}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            <span>Showing pages 1 of 1</span>

            <div className="pages">
              <button disabled>{`<`}</button>
              <button className="active">1</button>
              <button disabled>{`>`}</button>
            </div>
            <nav className="CTPageTypeHolder">
              Rows per page
              <div className="CTPageTypeWrapper">
                <select className="CTPageType" defaultValue="10">
                  <option>10</option>
                  <option>20</option>
                </select>
              </div>
            </nav>
          </div>
        </div>
      ) : (
        <div className="myClass-empty-state-card">
          <div className="empty-state-icon-container">
            <svg
              className="empty-state-icon-svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3>No Student Records Found</h3>
          <p>
            {feeFilter === "All Fee Status"
              ? "There are currently no students registered or assigned to this class roster group."
              : `No records match the active fee selection category: "${feeFilter}".`}
          </p>
          {feeFilter !== "All Fee Status" && (
            <button onClick={resetFilter} className="empty-clear-btn">
              Clear Filter Context
            </button>
          )}
        </div>
      )}

      {/* Render modal passing down the core database arrays and success callback hooks */}
      {open && (
        <AttendanceModal
          students={classData.getAllStudents}
          onClose={() => setOpen(false)}
          onSuccess={fetchDashboardData}
        />
      )}
    </div>
  );
};

export default MyClass;
