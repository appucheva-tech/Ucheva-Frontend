import React, { useEffect, useState } from "react";
import "../SubjectTeacherDashboardStyles/SubjectTeacherScores.css";
import { apiClient } from "../../../config/AxiosInstance";
import { toast } from "react-toastify";

const SubjectTeacherScores = () => {
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [scores, setScores] = useState({});

  const subjects = [
    { name: "Mathematics", class: "JSS 1" },
    { name: "Mathematics", class: "JSS 2" },
    { name: "Mathematics", class: "JSS 3" },
    { name: "Mathematics", class: "JSS 3" },
    { name: "Further Maths", class: "SS 1A" },
  ];

  const students = [
    { name: "Adaeze Clinton", admission: "UCH/2026/001", ca: 54, exam: 54 },
    { name: "Emeka Ugonna", admission: "UCH/2026/002", ca: 50, exam: 50 },
    { name: "Tolu Adesunya", admission: "UCH/2026/003", ca: 45, exam: 45 },
    { name: "Chidi Okoronkwo", admission: "UCH/2026/004", ca: 48, exam: 48 },
    { name: "Grace Obidi", admission: "UCH/2026/005", ca: 40, exam: 40 },
    { name: "Ifeanyi Okafor", admission: "UCH/2026/006", ca: 38, exam: 38 },
    { name: "Ngozi Bassey", admission: "UCH/2026/007", ca: 30, exam: 30 },
  ];

  const handleScoreChange = (studentIndex, scoreType, value) => {
    const key = `${studentIndex}-${scoreType}`;
    setScores({ ...scores, [key]: value });
  };

  const handleSaveScores = () => {
    console.log("Scores saved:", scores);
  };

  const totalPages = Math.ceil(students.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedStudents = students.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await apiClient.get("");
      } catch (error) {
        toast.messae(error.data?.message)
      }
    };
  }, []);

  return (
    <div className="scores-container">
      {/* Header Section */}
      <div className="header-section">
        <h1 className="main-title">Scores</h1>
        <p className="subtitle">Select a subject and class to enter scores</p>
      </div>

      {/* Subject Selection Cards */}
      <div className="subject-cards">
        {subjects.map((subject, index) => (
          <button
            key={index}
            className={`subject-card ${selectedSubject === index ? "active" : ""}`}
            onClick={() => setSelectedSubject(index)}
          >
            <div className="subject-name">{subject.name}</div>
            <div className="subject-class">{subject.class}</div>
          </button>
        ))}
      </div>

      {/* Selected Subject Header with Save Button */}
      <div className="selected-subject-header">
        <h2 className="selected-subject-title">
          {subjects[selectedSubject].name} - {subjects[selectedSubject].class}
        </h2>
        <button className="save-button" onClick={handleSaveScores}>
          Save Scores
        </button>
      </div>

      {/* Table Section */}
      <div className="table-wrapper">
        <table className="scores-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Admission Number</th>
              <th>
                <div className="header-cell">CA</div>
                <div className="header-marks">(40 Marks)</div>
              </th>
              <th>
                <div className="header-cell">Exam</div>
                <div className="header-marks">(60 Marks)</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedStudents.map((student, index) => (
              <tr key={index}>
                <td className="student-name">{student.name}</td>
                <td className="admission-number">{student.admission}</td>
                <td>
                  <input
                    type="number"
                    className="score-input"
                    defaultValue={student.ca}
                    onChange={(e) =>
                      handleScoreChange(
                        startIndex + index,
                        "ca",
                        e.target.value,
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="score-input"
                    defaultValue={student.exam}
                    onChange={(e) =>
                      handleScoreChange(
                        startIndex + index,
                        "exam",
                        e.target.value,
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="pagination-section">
        <div className="showing-text">Showing pages of 1 to {totalPages}</div>

        <div className="pagination-controls">
          <button className="pagination-nav">‹</button>
          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => (
            <button
              key={i + 1}
              className={`pagination-number ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          {totalPages > 7 && <span className="pagination-dots">...</span>}
          {totalPages > 7 && (
            <>
              <button
                className="pagination-number"
                onClick={() => setCurrentPage(totalPages - 1)}
              >
                {totalPages - 1}
              </button>
              <button
                className="pagination-number"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
          <button className="pagination-nav">›</button>
        </div>

        <div className="rows-per-page">
          <label>Rows per page</label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Info Box */}
      <div className="info-box">
        <span className="info-icon">ℹ</span>
        <span className="info-text">
          Enter scores for 1st Term. All changes are auto-saved.
        </span>
      </div>
    </div>
  );
};

export default SubjectTeacherScores;
