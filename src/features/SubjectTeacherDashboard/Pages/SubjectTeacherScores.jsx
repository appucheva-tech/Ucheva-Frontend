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
  const [seeScores, setSeeScores] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

useEffect(() => {
  const seeTheScore = async () => {
    try {
      const scoreRes = await apiClient.get(
        `/subjectteacher/getscores/`
      );

      setSeeScores(scoreRes.data.scores);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  seeTheScore();
}, []);

useEffect(() => {

    getSubjects();
  
}, [seeScores]);


  const getSubjects = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/subjectteacher/get-all-subjects");

      const data = res.data.subjects;
      setSubjects(data);

      if (data.length > 0) {
        fetchSubject(data[0]);
}
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

const fetchSubject = async (subject) => {
  try {
    setLoading(true);

    const res = await apiClient.get(
      `/subjectteacher/get-students/${subject.classId}`
    );

    const list = res.data.getStudents || [];

    // 2. FILTER scores for this subject

  
const scoreMap = {};

seeScores.forEach((s) => {
  if (s.subject === subject.subjectName) {
    scoreMap[s.studentId] = {
      ca: s.continuousAssessment,
      exam: s.exam,
    };
  }
});
    // 4. Merge with students (PREFILL)
    const finalMap = {};
    list.forEach((student) => {
      const id = student.id;

      finalMap[id] = {
        ca: scoreMap[id]?.ca ?? "",
        exam: scoreMap[id]?.exam ?? "",
      };
    });

    // 5. Set state
    setSelectedSubject(subject);
    setStudents(list);
    setScores(finalMap);
    setCurrentPage(1);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  // =========================
  // SCORE CHANGE
  // =========================
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
  // =========================
  // SAVE SCORES
  // =========================
  const handleSaveScores = async () => {
    try {
      setSaving(true);

      const payload = {
        subject: selectedSubject?.subjectName,
        score: Object.keys(scores).map((id) => ({
          studentId: id,
          continuousAssessment: Number(scores[id]?.ca || 0),
          exam: Number(scores[id]?.exam || 0),
        })),
      };

      const isInvalid = Object.values(scores).some(
  (s) => s.ca > 40 || s.exam > 60
);

if (isInvalid) {
  toast.error("Fix invalid scores before saving");
  return;
}

const saveScore = await apiClient.post(
  `/classteacher/mark-score/${selectedSubject.id}`,
  payload
);
      toast(saveScore.data.message);
    } catch (err) {
      toast(err.data.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(students.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;

  const displayedStudents = students.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  return (
    <div className="scores-container">
      {/* HEADER */}
      <div className="header-section">
        <h1 className="main-title">Scores</h1>
        <p className="subtitle">Select a subject and class to enter scores</p>
      </div>
      {/* SUBJECT CARDS */}
      <div className="subject-cards">
        {subjects.map((subject) => (
          <button
            key={subject.id || subject._id}
            className={`subject-card ${
              selectedSubject?.id === subject.id ||
              selectedSubject?._id === subject._id
                ? "active"
                : ""
            }`}
            onClick={() => fetchSubject(subject)}
          >
            <div className="subject-name">
              {subject.subjectName || subject.name}
            </div>
            <div className="subject-class">
              {subject.applicableClasses || subject.class}
            </div>
          </button>
        ))}
      </div>
      {/* SUBJECT HEADER */}

      <div className="selected-subject-header">
        {/* <h2 className="selected-subject-title">




  {selectedSubject
    ? `${selectedSubject[0].subjectName || selectedSubject.name} - ${
        selectedSubject[0].applicableClasses ||
        selectedSubject.className ||
        ""
      }`
    : "Loading..."}
</h2> */}

        <button className="save-button" onClick={handleSaveScores}>
          {saving ? "Saving..." : "Save Scores"}
        </button>
      </div>

      {/* TABLE */}
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
            {loading ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : (
        

          displayedStudents.map((student) => {
  const id = student.id;

  return (
    <tr key={id}>
      <td className="student-name">
        {student.firstName} {student.lastName}
      </td>

      <td className="admission-number">
        {student.admissionNumber}
      </td>

      <td>
        <input
          type="number"
            max={40}

          className="score-input"
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

          className="score-input"
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

      {/* PAGINATION */}
      <div className="pagination-section">
        <div className="showing-text">
          Page {currentPage} of {totalPages || 1}
        </div>

        <div className="pagination-controls">
          <button
            className="pagination-nav"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            ‹
          </button>

          {Array.from({ length: totalPages || 1 }, (_, i) => (
            <button
              key={i}
              className={`pagination-number ${
                currentPage === i + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="pagination-nav"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            ›
          </button>
        </div>

        <div className="rows-per-page">
          <label>Rows per page</label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* INFO */}
      <div className="info-box">
        <span className="info-icon">ℹ</span>
        <span className="info-text">
          Enter scores for the selected subject and click Save Scores.
        </span>
      </div>
    </div>
  );
};

export default SubjectTeacherScores;