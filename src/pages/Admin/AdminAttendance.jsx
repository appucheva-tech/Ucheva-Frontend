import { React, useState, useEffect } from "react";
import "./AdminAttendance.css";
import { useNavigate, useLocation } from "react-router-dom";
import Ifeanacho from "../../assets/Ifeanacho.jpg";
import { apiClient } from "../../config/AxiosInstance";

const AdminAttendance = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const categories = ["Staff Attendance", "Student Attendance"];
  const activeTab = pathname.includes("AdminStudentAttendance") ? 1 : 0;

  const [staff, setStaffs] = useState([]);

  const [attendance, setAttendance] = useState([]);
  const [loadingAttendance, setLoadingAttendance] = useState(true);
  const subdomain = window.location.hostname.split(".")[0];

  useEffect(() => {
    const getTodayAttendance = async () => {
      try {
        const res = await apiClient.get("/staffattendance/today", {
          headers: {
            "x-tenant": subdomain,
          },
        });
        setAttendance(res?.data?.Attendance || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAttendance(false);
      }
    };

    getTodayAttendance();
  }, []);

  return (
    <>
      <div className="attendanceContainer">
        <header className="pageHeader">
          <h1 className="headerTitle">Attendance</h1>
          <p className="headerSubtitle">
            View and monitor staff and student attendance records.
          </p>
        </header>

        <div className="attendanceContentCard">
          <div className="tabsGroup">
            {categories.map((tab, idx) => (
              <button
                key={tab}
                className={`tabItem ${activeTab === idx ? "activeTabItem" : ""}`}
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

          <div className="toolbarRow">
            <h2 className="sectionHeading">Staff Attendance</h2>
            <div className="toolbarControls">
              <div className="filterBox">
                <span className="filterLabel">Date Filter</span>
                <div className="datePickerMock">
                  <span className="calendarIcon">📅</span>
                  <span className="dateText">Monday, May 18 2026</span>
                </div>
              </div>
              <button className="resetButton">
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
          </div>

          <div className="tableResponsiveWrapper">
            <table className="attendanceTable">
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Role</th>
                  <th>Time Checked In</th>
                  <th>Time Checked Out</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {loadingAttendance ? (
                  <tr>
                    <td colSpan="5" className="dateCell">
                      Loading attendance...
                    </td>
                  </tr>
                ) : attendance.length > 0 ? (
                  attendance.map((row, index) => (
                    <tr key={row.id || row._id || index}>
                      <td className="staffNameCell">
                        {row.staff?.fullName ||
                          row.staffName ||
                          row.name ||
                          "N/A"}
                      </td>

                      <td className="roleCell">
                        {row.staff?.role || row.staffRole || row.role || "N/A"}
                      </td>

                      <td className="timeCell">
                        {row.checkInTime
                          ? new Date(row.checkInTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "--"}
                      </td>

                      <td className="timeCell">
                        {row.checkOutTime
                          ? new Date(row.checkOutTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "--"}
                      </td>

                      <td className="dateCell">
                        {row.createdAt
                          ? new Date(row.createdAt).toLocaleDateString()
                          : "--"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="dateCell">
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="paginationContainer">
            <div className="recordsCountInfo">Showing pages of 1 to 7</div>
            <div className="paginationControlsGroup">
              <button className="navArrow" disabled>
                &lt;
              </button>
              <button className="pageNumber activePage">1</button>
              <button className="pageNumber">2</button>
              <button className="pageNumber">3</button>
              <span className="paginationEllipsis">...</span>
              <button className="pageNumber">6</button>
              <button className="pageNumber">7</button>
              <button className="navArrow">&gt;</button>
            </div>
            <div className="pageSizeSelector">
              <span className="pageSizeLabel">Rows per page</span>
              <div className="customSelectWrapper">
                <select className="nativeSelect" defaultValue="10">
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <footer className="systemFooter">
          <span className="copyrightNote">
            © 2026 Ucheva school operating management system . All right
            reserved.
          </span>
          <span className="supportNote">
            Need help?{" "}
            <a href="#support" className="supportAnchor">
              Contact support
            </a>
          </span>
        </footer>
      </div>
    </>
  );
};

export default AdminAttendance;
