import { React, useState, useEffect } from "react";
import "./AdminAttendance.css";
import { useNavigate, useLocation } from "react-router-dom";
import { apiClient } from "../../../config/AxiosInstance";

const AdminAttendance = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const categories = ["Staff Attendance", "Student Attendance"];
  const activeTab = pathname.includes("AdminStudentAttendance") ? 1 : 0;

  const [staff, setStaffs] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [loadingAttendance, setLoadingAttendance] = useState(true);
  const [loadingStudentAttendance, setLoadingStudentAttendance] =
    useState(true);
  const subdomain = window.location.hostname.split(".")[0];

  useEffect(() => {
    const getTodayAttendance = async () => {
      try {
        const res = await apiClient.get("/staffattendance/today", {
          headers: { "x-tenant": subdomain },
        });
        setAttendance(res?.data?.Attendance || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAttendance(false);
      }
    };

    const getTodayStudentAttendance = async () => {
      try {
        const res = await apiClient.get("/studentattendance/today", {
          headers: { "x-tenant": subdomain },
        });
        setStudentAttendance(res?.data?.Attendance || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStudentAttendance(false);
      }
    };

    getTodayAttendance();
    getTodayStudentAttendance();
  }, []);

  const getCurrentAttendance = () => {
    if (activeTab === 0) return attendance;
    return studentAttendance;
  };

  const getCurrentLoading = () => {
    if (activeTab === 0) return loadingAttendance;
    return loadingStudentAttendance;
  };

  const currentAttendance = getCurrentAttendance();
  const currentLoading = getCurrentLoading();

  return (
    <>
      <div className="Navy-attendanceContainer">
        <header className="Navy-pageHeader">
          <h1 className="Navy-headerTitle">Attendance</h1>
          <p className="Navy-headerSubtitle">
            View and monitor staff and student attendance records.
          </p>
        </header>

        <div className="Navy-attendanceContentCard">
          <div className="Navy-tabsGroup">
            {categories.map((tab, idx) => (
              <button
                key={tab}
                className={`Navy-tabItem ${activeTab === idx ? "Navy-activeTabItem" : ""}`}
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

          <div className="Navy-toolbarRow">
            <h2 className="Navy-sectionHeading">
              {activeTab === 0 ? "Staff Attendance" : "Student Attendance"}
            </h2>
            <div className="Navy-toolbarControls">
              <div className="Navy-filterBox">
                <span className="Navy-filterLabel">Date Filter</span>
                <div className="Navy-datePickerMock">
                  <span className="Navy-calendarIcon">📅</span>
                  <span className="Navy-dateText">Monday, May 18 2026</span>
                </div>
              </div>
              <button className="Navy-resetButton">
                <svg
                  className="Navy-resetIcon"
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

          <div className="Navy-tableResponsiveWrapper">
            <table className="Navy-attendanceTable">
              <thead>
                <tr>
                  <th>{activeTab === 0 ? "Staff Name" : "Student Name"}</th>
                  <th>{activeTab === 0 ? "Role" : "Class"}</th>
                  <th>Time Checked In</th>
                  <th>Time Checked Out</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {currentLoading ? (
                  <tr>
                    <td colSpan="5" className="Navy-loadingCell">
                      <span className="Navy-loadingText">
                        Loading attendance...
                      </span>
                    </td>
                  </tr>
                ) : currentAttendance.length > 0 ? (
                  currentAttendance.map((row, index) => (
                    <tr key={row.id || row._id || index}>
                      <td className="Navy-staffNameCell">
                        {activeTab === 0
                          ? row.staff?.firstName + " " + row.staff?.lastName
                          : row.student?.firstName +
                            " " +
                            row.student?.lastName}
                      </td>
                      <td className="Navy-roleCell">
                        {activeTab === 0
                          ? row.staff?.staffType
                          : row.student?.class}
                      </td>
                      <td className="Navy-timeCell">
                        {row.timeCheckedIn
                          ? new Date(row.timeCheckedIn).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "--"}
                      </td>
                      <td className="Navy-timeCell">
                        {row.timeCheckedOut
                          ? new Date(row.timeCheckedOut).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )
                          : "--"}
                      </td>
                      <td className="Navy-dateCell">
                        {row.date
                          ? new Date(row.date).toLocaleDateString()
                          : "--"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="Navy-emptyCell">
                      <span className="Navy-emptyText">
                        No attendance records found.
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="Navy-paginationContainer">
            <div className="Navy-recordsCountInfo">Showing pages of 1 to 7</div>
            <div className="Navy-paginationControlsGroup">
              <button className="Navy-navArrow" disabled>
                &lt;
              </button>
              <button className="Navy-pageNumber Navy-activePage">1</button>
              <button className="Navy-pageNumber">2</button>
              <button className="Navy-pageNumber">3</button>
              <span className="Navy-paginationEllipsis">...</span>
              <button className="Navy-pageNumber">6</button>
              <button className="Navy-pageNumber">7</button>
              <button className="Navy-navArrow">&gt;</button>
            </div>
            <div className="Navy-pageSizeSelector">
              <span className="Navy-pageSizeLabel">Rows per page</span>
              <div className="Navy-customSelectWrapper">
                <select className="Navy-nativeSelect" defaultValue="10">
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAttendance;
