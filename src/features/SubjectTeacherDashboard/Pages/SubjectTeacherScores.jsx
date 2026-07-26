import React, { useEffect, useState } from "react";
import "../SubjectTeacherDashboardStyles/SubjectTeacherScores.css";
import { apiClient } from "../../../config/AxiosInstance";
import { toast } from "react-toastify";

const SubjectTeacherScores = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeScores, setSeeScores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch existing scores
  useEffect(() => {
    const seeTheScore = async () => {
      try {
        const scoreRes = await apiClient.get(`/subjectteacher/getscores/`);
        setSeeScores(scoreRes.data.scores || []);
      } catch (error) {
        console.log(error.response?.data?.message);
        setSeeScores([]);
      }
    };
    seeTheScore();
  }, []);

  // Get subjects when scores are loaded
  useEffect(() => {
    if (seeScores.length >= 0) {
      getSubjects();
    }
  }, [seeScores]);

  const getSubjects = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/subjectteacher/get-all-subjects");
      const data = res.data.subjects || [];
      setSubjects(data);

      if (data.length > 0) {
        fetchSubject(data[0]);
      }
    } catch (err) {
      console.log("Error fetching subjects:", err);
      toast.error("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubject = async (subject) => {
    try {
      setLoading(true);

      const res = await apiClient.get(
        `/subjectteacher/get-students/${subject.classId}`,
      );

      const list = res.data.getStudents || [];

      // Filter scores for this subject
      const scoreMap = {};
      seeScores.forEach((s) => {
        if (s.subject === subject.subjectName) {
          scoreMap[s.studentId] = {
            ca: s.continuousAssessment || s.ca || "",
            exam: s.exam || "",
          };
        }
      });

      // Merge with students
      const finalMap = {};
      list.forEach((student) => {
        const id = student.id || student._id;
        finalMap[id] = {
          ca: scoreMap[id]?.ca ?? "",
          exam: scoreMap[id]?.exam ?? "",
        };
      });

      setSelectedSubject(subject);
      setStudents(list);
      setScores(finalMap);
      setCurrentPage(1);
    } catch (err) {
      console.log("Error fetching students:", err);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (studentId, field, value) => {
    let val = Number(value);

    if (field === "ca" && val > 40) {
      toast.error("CA cannot be more than 40");
      return;
    }

    if (field === "exam" && val > 60) {
      toast.error("Exam cannot be more than 60");
      return;
    }

    if (val < 0) val = 0;

    setScores((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: val,
      },
    }));
  };

  const handleSaveScores = async () => {
    if (!selectedSubject) {
      toast.error("Please select a subject first");
      return;
    }

    try {
      setSaving(true);

      const isInvalid = Object.values(scores).some(
        (s) => (s.ca || 0) > 40 || (s.exam || 0) > 60,
      );

      if (isInvalid) {
        toast.error("Fix invalid scores before saving");
        return;
      }

      const payload = {
        subject: selectedSubject?.subjectName || selectedSubject?.name,
        score: Object.keys(scores).map((id) => ({
          studentId: id,
          continuousAssessment: Number(scores[id]?.ca || 0),
          exam: Number(scores[id]?.exam || 0),
        })),
      };

      const saveScore = await apiClient.post(
        `/classteacher/mark-score/${selectedSubject.id || selectedSubject._id}`,
        payload,
      );

      toast.success(saveScore.data.message || "Scores saved successfully!");
    } catch (err) {
      console.error("Error saving scores:", err);
      toast.error(err.response?.data?.message || "Failed to save scores");
    } finally {
      setSaving(false);
    }
  };

  const totalPages = Math.ceil(students.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedStudents = students.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  return (
    <div className="SubjectTeacherScores-scores-container">
      {/* Header Section */}
      <div className="SubjectTeacherScores-header-section">
        <h1 className="SubjectTeacherScores-main-title">Scores</h1>
        <p className="SubjectTeacherScores-subtitle">
          Select a subject and class to enter scores
        </p>
      </div>

      {/* Subject Selection Cards */}
      <div className="SubjectTeacherScores-subject-cards">
        {loading && subjects.length === 0 ? (
          <div style={{ padding: "10px" }}>Loading subjects...</div>
        ) : subjects.length === 0 ? (
          <div style={{ padding: "10px" }}>No subjects available</div>
        ) : (
          subjects.map((subject) => (
            <button
              key={subject.id || subject._id}
              className={`SubjectTeacherScores-subject-card ${
                selectedSubject?.id === subject.id ||
                selectedSubject?._id === subject._id
                  ? "SubjectTeacherScores-active"
                  : ""
              }`}
              onClick={() => fetchSubject(subject)}
            >
              <div className="SubjectTeacherScores-subject-name">
                {subject.subjectName || subject.name || "Unknown Subject"}
              </div>
              <div className="SubjectTeacherScores-subject-class">
                {subject.applicableClasses ||
                  subject.className ||
                  subject.class ||
                  "No Class"}
              </div>
            </button>
          ))
        )}
      </div>

      {/* Selected Subject Header with Save Button */}
      <div className="SubjectTeacherScores-selected-subject-header">
        <h2 className="SubjectTeacherScores-selected-subject-title">
          {selectedSubject
            ? `${selectedSubject.subjectName || selectedSubject.name || "Subject"} - ${
                selectedSubject.applicableClasses ||
                selectedSubject.className ||
                selectedSubject.class ||
                ""
              }`
            : "No subject selected"}
        </h2>
        <button
          className="SubjectTeacherScores-save-button"
          onClick={handleSaveScores}
          disabled={saving || !selectedSubject}
        >
          {saving ? "Saving..." : "Save Scores"}
        </button>
      </div>

      {/* Table Section */}
      <div className="SubjectTeacherScores-table-wrapper">
        <table className="SubjectTeacherScores-scores-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Admission Number</th>
              <th>
                <div className="SubjectTeacherScores-header-cell">CA</div>
                <div className="SubjectTeacherScores-header-marks">
                  (40 Marks)
                </div>
              </th>
              <th>
                <div className="SubjectTeacherScores-header-cell">Exam</div>
                <div className="SubjectTeacherScores-header-marks">
                  (60 Marks)
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Loading students...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No students found for this subject
                </td>
              </tr>
            ) : (
              displayedStudents.map((student) => {
                const id = student.id || student._id;
                return (
                  <tr key={id}>
                    <td className="SubjectTeacherScores-student-name">
                      {student.firstName || ""} {student.lastName || ""}
                    </td>
                    <td className="SubjectTeacherScores-admission-number">
                      {student.admissionNumber || "N/A"}
                    </td>
                    <td>
                      <input
                        type="number"
                        max={40}
                        min={0}
                        className="SubjectTeacherScores-score-input"
                        value={scores[id]?.ca || ""}
                        onChange={(e) =>
                          handleScoreChange(id, "ca", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        max={60}
                        min={0}
                        className="SubjectTeacherScores-score-input"
                        value={scores[id]?.exam || ""}
                        onChange={(e) =>
                          handleScoreChange(id, "exam", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {students.length > 0 && (
        <div className="SubjectTeacherScores-pagination-section">
          <div className="SubjectTeacherScores-showing-text">
            Page {currentPage} of {totalPages || 1}
          </div>

          <div className="SubjectTeacherScores-pagination-controls">
            <button
              className="SubjectTeacherScores-pagination-nav"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={i}
                  className={`SubjectTeacherScores-pagination-number ${
                    currentPage === pageNum ? "SubjectTeacherScores-active" : ""
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 7 && (
              <span className="SubjectTeacherScores-pagination-dots">...</span>
            )}

            {totalPages > 7 && (
              <>
                <button
                  className="SubjectTeacherScores-pagination-number"
                  onClick={() => setCurrentPage(totalPages - 1)}
                >
                  {totalPages - 1}
                </button>
                <button
                  className="SubjectTeacherScores-pagination-number"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              className="SubjectTeacherScores-pagination-nav"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>

          <div className="SubjectTeacherScores-rows-per-page">
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
      )}

      {/* Info Box */}
      <div className="SubjectTeacherScores-info-box">
        <span className="SubjectTeacherScores-info-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.713 16.713C12.9043 16.521 13 16.2833 13 16V12C13 11.7167 12.904 11.4793 12.712 11.288C12.52 11.0967 12.2827 11.0007 12 11C11.7173 10.9993 11.48 11.0953 11.288 11.288C11.096 11.4807 11 11.718 11 12V16C11 16.2833 11.096 16.521 11.288 16.713C11.48 16.905 11.7173 17.0007 12 17C12.2827 16.9993 12.5203 16.9043 12.713 16.713ZM12.713 8.712C12.9043 8.52067 13 8.28333 13 8C13 7.71667 12.904 7.47933 12.712 7.288C12.52 7.09667 12.2827 7.00067 12 7C11.7173 6.99933 11.48 7.09533 11.288 7.288C11.096 7.48067 11 7.718 11 8C11 8.282 11.096 8.51967 11.288 8.713C11.48 8.90633 11.7173 9.002 12 9C12.2827 8.998 12.5203 8.902 12.713 8.712ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
              fill="#0095FF"
            />
          </svg>
        </span>
        <span className="SubjectTeacherScores-info-text">
          Enter scores for the selected subject and click Save Scores.
        </span>
      </div>
    </div>
  );
};

export default SubjectTeacherScores;
