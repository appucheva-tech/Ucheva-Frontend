import React, { useState } from "react";
import axios from "axios";
import "./Score.css";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { apiClient } from "../../../../config/AxiosInstance";
import { toast } from "react-toastify";

const Score = () => {
  const [subject, setSubject] = useState("Mathematics");

  const [students, setStudents] = useState([
    {
      studentId: "550e8400-e29b-41d4-a716-446655440000",
      name: "Adeaze Clinton",
      admissionNumber: "UCH/2026/001",
      continuousAssessment: "",
      exam: "",
    },
    {
      studentId: "550e8400-e29b-41d4-a716-446655440001",
      name: "John Doe",
      admissionNumber: "UCH/2026/002",
      continuousAssessment: "",
      exam: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const subjects = [
    "Mathematics",
    "English",
    "Civic Education",
    "Basic Science",
    "Social Studies",
  ];

  const handleScoreChange = (studentId, field, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.studentId === studentId
          ? {
              ...student,
              [field]: value,
            }
          : student,
      ),
    );
  };

  const saveScores = async () => {
    try {
      setLoading(true);

      const payload = {
        subject,
        score: students.map((student) => ({
          studentId: student.studentId,
          continuousAssessment: Number(student.continuousAssessment || 0),
          exam: Number(student.exam || 0),
          subject,
        })),
      };

      const response = await apiClient.post(
        "/classteacher/mark-score",
        payload,
      );

      console.log(response?.data);
      toast.success("Scores saved successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to save scores");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="CTScoreContainer">
      <article className="CTScoreWrapper">
        <div className="CTScoreHead">
          Scores
          <span>Select a subject and class to enter scores</span>
        </div>

        <div className="CTSubjectsHolder">
          {subjects.map((item) => (
            <nav
              key={item}
              className={`CTSubjects ${subject === item ? "active" : ""}`}
              onClick={() => setSubject(item)}
              style={{ cursor: "pointer" }}
            >
              {item}
              <span>Jss1</span>
            </nav>
          ))}
        </div>

        <section className="CTScoreTable">
          <div className="CTSubjectSave">
            {subject} - Jss1
            <button
              className="CTSaveBtn"
              onClick={saveScores}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Score"}
            </button>
          </div>

          <article className="CTActualTable">
            <div className="CTActualTableTop">
              <span className="CTTableContentValue">Student Name</span>

              <span className="CTTableContentValue">Admission Number</span>

              <nav className="CTTableContentScore">
                CA <span>(40 Marks)</span>
              </nav>

              <nav className="CTTableContentScore">
                Exam <span>(60 Marks)</span>
              </nav>
            </div>

            {students.map((student) => (
              <ul className="CTActualTableInfo" key={student.studentId}>
                <span className="CTTableValueName">{student.name}</span>

                <span className="CTTableValueName">
                  {student.admissionNumber}
                </span>

                <div className="CTCA1Holder">
                  <input
                    type="number"
                    min="0"
                    max="40"
                    className="CTCA1"
                    placeholder="0"
                    value={student.continuousAssessment}
                    onChange={(e) =>
                      handleScoreChange(
                        student.studentId,
                        "continuousAssessment",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="CTCA1Holder">
                  <input
                    type="number"
                    min="0"
                    max="60"
                    className="CTCA1"
                    placeholder="0"
                    value={student.exam}
                    onChange={(e) =>
                      handleScoreChange(
                        student.studentId,
                        "exam",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </ul>
            ))}

            <div className="pagination">
              <span>Showing page 1</span>

              <div className="pages">
                <button>{"<"}</button>
                <button className="active">1</button>
                <button>{">"}</button>
              </div>

              <nav className="CTPageTypeHolder">
                Rows per page
                <div className="CTPageTypeWrapper">
                  <select className="CTPageType">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                </div>
              </nav>
            </div>
          </article>

          <div className="CTScoreCaution">
            <IoIosInformationCircleOutline />
            Enter scores for 1st Term. All changes are saved when you click Save
            Score.
          </div>
        </section>
      </article>
    </main>
  );
};

export default Score;
