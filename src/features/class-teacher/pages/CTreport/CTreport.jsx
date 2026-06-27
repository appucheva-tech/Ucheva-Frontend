import React, { useEffect, useState } from "react";
import "./CTreport.css";
import { FaArrowsRotate } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { apiClient } from "../../../../config/AxiosInstance";

<<<<<<< HEAD


const CTreport = () => {
const [studentReport, getStudentReport] = useState([])

useEffect(()=>{
  const fetchStudentReport = async () =>{
    try {
      const res = await apiClient.get ("/")
      
    } catch (error) {
      console.log("error:", error.data.message)
    }
  }
},[])
=======
const CTreport = () => {
  const [studentReport, getStudentReport] = useState([]);

  useEffect(() => {
    const fetchStudentReport = async () => {
      try {
        const res = await apiClient.get("/student/getAllStudents");
        console.log(res);
      } catch (error) {
        console.log("error:", error.data.message);
      }
    };
  }, []);
>>>>>>> 8b47e7baa1bf319a2a4dab9f1cb9fc2363a6bf85

  return (
    <main className="CTreportContainer">
      <article className="CTreportWrapper">
        <div className="CTSReportHead">
          Report Cards
          <span>Add remarks and submit report cards to the admin.</span>
        </div>
        <div className="classSectionHolder">
          <nav className="classSection">
            <article className="classSectionInput">
              Class Section
              <div className="SectionInputHolder">
                <select name="" className="SelectSectionInput">
                  <option value="All Classes" selected disabled>
                    Select Option
                  </option>
                  <option value="All Classes">All Classes</option>
                  <option value="All Classes">My Classes</option>
                </select>
              </div>
            </article>
            <article className="classSectionInput">
              Status
              <div className="SectionInputHolder">
                <select name="" className="SelectSectionInput">
                  <option value="All Classes" selected disabled>
                    Select Option
                  </option>
                  <option value="All Classes">Awaitind Score</option>
                  <option value="All Classes">Remark Added</option>
                  <option value="All Classes">Ready for Review</option>
                  <option value="All Classes">Submitted to Admin</option>
                </select>
              </div>
            </article>
            <article className="classSectionInput">
              Term
              <div className="SectionInputHolder">
                <select name="" className="SelectSectionInput">
                  <option value="All Classes" selected disabled>
                    Select Option
                  </option>
                  <option value="All Classes">First Term</option>
                  <option value="All Classes">Second Term</option>
                  <option value="All Classes">Third Term</option>
                </select>
              </div>
            </article>
          </nav>
          <button className="resetBtnRecord">
            <FaArrowsRotate />
            Reset
          </button>
        </div>
        <article className="CTActualTable2">
          <div className="CTActualTableTop2">
            <input className="CTTableContentValue2" type="checkbox" disabled />
            <nav className="CTTableContentValue2">Student Name</nav>
            <nav className="CTTableContentValue2">Admission Number</nav>
            <nav className="CTTableContentValue2">Status</nav>
            <nav className="CTTableContentValue2">Actions</nav>
          </div>

          <ul className="CTActualTableInfo2">
            <input className="CTTableValueName2" type="checkbox" />
            <nav className="CTTableValueName2">Adeaze Clinton</nav>
            <nav className="CTTableValueName2">UCH/2026/001</nav>
            <nav className="CTTableValueName2">Ready for review</nav>
            <Link className="LinkToST" to="/CTdashboard/studentreport">
              <nav className="CTTableValueAction">:</nav>
            </Link>
          </ul>

          <div className="pagination">
            <span>Showing pages 1 of 7</span>

            <div className="pages">
              <button>{`<`}</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <span>...</span>
              <button>6</button>
              <button>7</button>
              <button>{`>`}</button>
            </div>
            <nav className="CTPageTypeHolder">
              Rows per page
              <div className="CTPageTypeWrapper">
                <select className="CTPageType">
                  <option>10</option>
                  <option>20</option>
                </select>
              </div>
            </nav>
          </div>
        </article>
      </article>
    </main>
  );
};

export default CTreport;
