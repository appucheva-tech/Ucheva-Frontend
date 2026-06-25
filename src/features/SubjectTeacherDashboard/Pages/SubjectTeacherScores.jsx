import React, { useEffect, useState } from "react";
import "../SubjectTeacherDashboardStyles/SubjectTeacherScores.css";
import { apiClient } from "../../../config/AxiosInstance";

const SubjectTeacherScores = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([] || null);

  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState({});

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/subjectteacher/get-all-subjects");

      const data = res.data.subjects
      setSubjects(data);

   

      if (data.length > 0) {
  fetchSubject(data[0].classId);
}
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH SINGLE SUBJECT
  // =========================
const fetchSubject = async (subject) => {

  try {
    setLoading(true);

    const res = await apiClient.get(
      `/subjectteacher/get-students/${subject.classId}`
    );

    const data = res.data.getStudents;
console.log("subject: ",data)

    setSelectedSubject(subject); // ✅ store subject correctly

    const list = data.students || [];
    setStudents(data);

    const map = {};
    list.forEach((s) => {
      const id = s.studentId || s.id || s._id;

      map[id] = {
        ca: s.continuousAssessment ?? "",
        exam: s.exam ?? "",
      };
    });

    setScores(map);
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
    setScores((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  // =========================
  // SAVE SCORES
  // =========================
  const handleSaveScores = async () => {
    try {
      setSaving(true);
console.log("api1: ",selectedSubject )
console.log("api2: ",subjects )

   const payload = {
  subject: selectedSubject?.subjectName,
  score: Object.keys(scores).map((id) => ({
    studentId: id,
    continuousAssessment: Number(scores[id]?.ca || 0),
    exam: Number(scores[id]?.exam || 0),
  })),
};

await apiClient.post(
  `/classteacher/mark-score/${selectedSubject.id}`,
  payload
);
console.log("res  :  ",res)
      alert("Scores saved successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to save scores");
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
    startIndex + rowsPerPage
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


onClick={() => fetchSubject(subject)}          >
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

            {console.log("diddds:  ",displayedStudents)}
            {loading ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : (
        

           displayedStudents.map((student) => {


                const id =  student.id 

                return (


                  <tr key={id}>
                    <td className="student-name">
                      {`${student.firstName}`}
                    </td>

                    <td className="admission-number">
                      {student.admissionNumber}
                    </td>

                    <td>
                      <input
                        type="number"
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
            onClick={() =>
              setCurrentPage((p) => Math.max(p - 1, 1))
            }
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
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, totalPages)
              )
            }
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

export default SubjectTeacherScores