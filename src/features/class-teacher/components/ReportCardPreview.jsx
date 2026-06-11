import React from "react";
import "./ReportCardPreview.css";

const ReportCardPreview = () => {
  // export default function ReportCardPreview()
  const subjects = [
    {
      name: "English Language",
      ca: 32,
      exam: 54,
      total: 86,
      grade: "A",
      remark: "Excellent",
    },
    {
      name: "Mathematics",
      ca: 30,
      exam: 52,
      total: 82,
      grade: "A",
      remark: "Excellent",
    },
    {
      name: "Basic Science",
      ca: 28,
      exam: 48,
      total: 76,
      grade: "B",
      remark: "Very Good",
    },
    {
      name: "Social Studies",
      ca: 26,
      exam: 44,
      total: 70,
      grade: "B",
      remark: "Very Good",
    },
    {
      name: "Civic Education",
      ca: 34,
      exam: 56,
      total: 90,
      grade: "A",
      remark: "Excellent",
    },
    {
      name: "Computer Studies",
      ca: 31,
      exam: 50,
      total: 81,
      grade: "A",
      remark: "Excellent",
    },
    {
      name: "French Language",
      ca: 27,
      exam: 43,
      total: 70,
      grade: "B",
      remark: "Very Good",
    },
    {
      name: "Agricultural Science",
      ca: 29,
      exam: 47,
      total: 76,
      grade: "B",
      remark: "Very Good",
    },
    {
      name: "Physical & Health Edu.",
      ca: 35,
      exam: 55,
      total: 90,
      grade: "A",
      remark: "Excellent",
    },
    {
      name: "Christian Religious Studies",
      ca: 36,
      exam: 58,
      total: 94,
      grade: "A",
      remark: "Excellent",
    },
  ];

  const gradeKey = [
    { grade: "A", range: "70-100", remark: "Excellent" },
    { grade: "B", range: "60-69", remark: "Very Good" },
    { grade: "C", range: "50-59", remark: "Good" },
    { grade: "D", range: "45-49", remark: "Fair" },
    { grade: "E", range: "0-44", remark: "Needs Improvement" },
  ];

  return (
    <div className="report-card-container">
      <div className="report-card">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="school-logo-placeholder">
              <div className="logo-shield">
                <div className="logo-inner"></div>
              </div>
            </div>
            <div className="school-info">
              <h1 className="school-name">GREENFIELD ACADEMY</h1>
              <p className="school-address">
                23 Education Drive, Gbagada, Lagos, Nigeria.
              </p>
              <p className="school-contact">
                Email: info@greenfieldacademy.edu | Tel: 0803 123 4567
              </p>
            </div>
          </div>
          <hr className="header-divider" />
        </div>

        {/* Title Section */}
        <div className="title-section">
          <h2 className="report-title">ACADEMIC REPORT CARD</h2>
          <p className="session-info">2024/2025 ACADEMIC SESSION</p>
          <div className="term-badge">FIRST TERM</div>
        </div>

        {/* Student Information */}
        <div className="student-info">
          <div className="info-row">
            <div className="info-field">
              <label>
                STUDENT NAME:<span>David John</span>
              </label>
            </div>
            <div className="info-field">
              <label>
                DATE OF BIRTH:<span>19th March, 2012</span>
              </label>
            </div>
            <div className="info-field">
              <label>
                TOTAL SCHOOL DAYS:<span>65</span>
              </label>
            </div>
          </div>
          <div className="info-row">
            <div className="info-field">
              <label>
                ADMISSION NUMBER:<span>J51/0023</span>
              </label>
            </div>
            <div className="info-field">
              <label>
                TERM:<span>First Term</span>
              </label>
            </div>
            <div className="info-field">
              <label>
                DAYS PRESENT:<span>58</span>
              </label>
            </div>
          </div>
          <div className="info-row">
            <div className="info-field">
              <label>
                CLASS:<span>JSS 1A</span>
              </label>
            </div>
            <div className="info-field">
              <label>
                CLASS TEACHER:<span>Mrs. Sandra Okoro</span>
              </label>
            </div>
            <div className="info-field">
              <label>
                ATTENDANCE:<span>89.2%</span>
              </label>
            </div>
          </div>
        </div>

        {/* Subjects Table */}
        <div className="subjects-table-container">
          <table className="subjects-table">
            <thead className="subjects-table-Contents">
              <tr>
                <th>SUBJECT</th>
                <th>
                  CA <span className="max-marks">(40 Marks)</span>
                </th>
                <th>
                  EXAM <span className="max-marks">(60 Marks)</span>
                </th>
                <th>
                  TOTAL <span className="max-marks">(100 Marks)</span>
                </th>
                <th>GRADE</th>
                <th>TEACHER REMARK</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td className="subject-name">{subject.name}</td>
                  <td className="score">{subject.ca}</td>
                  <td className="score">{subject.exam}</td>
                  <td className="score">{subject.total}</td>
                  <td className="grade">{subject.grade}</td>
                  <td className="remark">{subject.remark}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td className="label">TOTAL SCORE</td>
                <td className="total-score">308</td>
                <td className="total-score">507</td>
                <td className="total-score">816</td>
                <td colSpan="2"></td>
              </tr>
              <tr className="average-row">
                <td className="label">AVERAGE SCORE</td>
                <td colSpan="3" className="average-score">
                  81.6
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr className="grade-row">
                <td className="label">OVERALL GRADE</td>
                <td colSpan="3" className="overall-grade">
                  A
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr className="remark-row">
                <td className="label">OVERALL REMARK</td>
                <td colSpan="4" className="overall-remark">
                  Excellent
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Section with Grade Key and Remarks */}
        <div className="bottom-section">
          <div className="grade-key-section">
            <h3 className="section-title">KEY TO GRADES</h3>
            <table className="grade-key-table">
              <thead>
                <tr>
                  <th>GRADE</th>
                  <th>SCORE RANGE</th>
                  <th>REMARK</th>
                </tr>
              </thead>
              <tbody>
                {gradeKey.map((item, index) => (
                  <tr key={index}>
                    <td className="grade-cell">{item.grade}</td>
                    <td className="range-cell">{item.range}</td>
                    <td className="remark-cell">{item.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="remarks-section">
            <div className="class-teacher-remark">
              <h3 className="section-title">CLASS TEACHER&apos;S REMARK</h3>
              <div className="signature-line">
                <span className="signature">Kfft</span>
              </div>
              <div className="date-line">Date: 26 May 2026</div>
            </div>

            <div className="principal-remark">
              <h3 className="section-title">PRINCIPAL&apos;S REMARK</h3>
              <p className="remark-text">
                David has shown a commendable performance this term.
                <br />
                Keep up the good work.
              </p>
              <div className="signature-section">
                <div className="sig-item">
                  <label>Signature:</label>
                  <div className="sig-line"></div>
                </div>
                <div className="sig-item">
                  <label>Date: 30 May 2026</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCardPreview;
