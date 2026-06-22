import React, { useState, useEffect } from "react";
import "./Score.css";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { apiClient } from "../../../../config/AxiosInstance";
import { toast } from "react-toastify";

const Score = () => {
  const [subject, setSubject] = useState("Mathematics");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const subjects = [
    "Mathematics",
    "English",
    "Civic Education",
    "Basic Science",
    "Social Studies",
  ];

  // Fetch all students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setFetching(true);
        const response = await apiClient.get("/classteacher/all-students");

        // Maps specifically to your backend response payload key: response.data.studentData
        const rawData = response?.data?.studentData || response?.data || [];

        const formattedStudents = rawData.map((student) => ({
          studentId: student.id || student.studentId || student._id,
          name:
            student.fullName ||
            `${student.firstName || ""} ${student.lastName || ""}`.trim() ||
            "Unknown Student",
          admissionNumber: student.admissionNumber || student.regNo || "N/A",
          continuousAssessment:
            student.continuousAssessment !== undefined
              ? student.continuousAssessment
              : "",
          exam: student.exam !== undefined ? student.exam : "",
        }));

        setStudents(formattedStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Failed to load students list");
      } finally {
        setFetching(false);
      }
    };

    fetchStudents();
  }, []);

  const handleScoreChange = (studentId, field, value) => {
    const numericVal = value === "" ? "" : Number(value);
    if (numericVal !== "") {
      if (
        field === "continuousAssessment" &&
        (numericVal < 0 || numericVal > 40)
      )
        return;
      if (field === "exam" && (numericVal < 0 || numericVal > 60)) return;
    }

    setStudents((prev) =>
      prev.map((student) =>
        student.studentId === studentId
          ? { ...student, [field]: value }
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
            >
              {item}
              <span>Jss1</span>
            </nav>
          ))}
        </div>

        <section className="CTScoreTable">
          <div className="CTSubjectSave">
            <span className="CTSelectedTextName">{subject} - Jss1</span>
            <button
              className="CTSaveBtn"
              onClick={saveScores}
              disabled={loading || fetching || students.length === 0}
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

            {fetching ? (
              <div className="CTTableStateFeedback">
                <div className="CTSpinner"></div>
                <p>Loading student rosters...</p>
              </div>
            ) : students.length === 0 ? (
              <div className="CTTableStateFeedback CTEmptyState">
                <IoIosInformationCircleOutline className="CTEmptyIcon" />
                <p>No active students found assigned to this tier.</p>
              </div>
            ) : (
              students.map((student) => (
                <ul className="CTActualTableInfo" key={student.studentId}>
                  <span className="CTTableValueName">{student.name}</span>
                  <span className="CTTableValueName admission-num-text">
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
              ))
            )}

            <div className="pagination">
              <span>Showing page 1</span>
              <div className="pages">
                <button disabled>{"<"}</button>
                <button className="active">1</button>
                <button disabled>{">"}</button>
              </div>

              <nav className="CTPageTypeHolder">
                Rows per page
                <div className="CTPageTypeWrapper">
                  <select className="CTPageType" defaultValue="10">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </nav>
            </div>
          </article>

          <div className="CTScoreCaution">
            <IoIosInformationCircleOutline />
            <span>
              Enter scores for 1st Term. All changes are saved when you click
              Save Score.
            </span>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Score;
