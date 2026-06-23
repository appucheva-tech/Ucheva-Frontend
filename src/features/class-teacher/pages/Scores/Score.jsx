import React, { useState, useEffect } from "react";
import "./Score.css";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { apiClient } from "../../../../config/AxiosInstance";
import { toast } from "react-toastify";
import LoadingScreen from "../../../../components/Loading-Screen";
import ErrorScreen from "../../../../components/Error-Screen";

const Score = () => {
  const [subjects, setSubjects] = useState([]); // Will hold objects: [{ name: "English", className: "JSS 1 A" }]
  const [activeSubject, setActiveSubject] = useState(null); // Active object selector template tracking
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setFetching(true);
      setError(null);
      const response = await apiClient.get("/classteacher/getscores");

      const rawScores = response?.data?.scores || [];

      const cleanStr = (str) => {
        if (!str) return "";
        return str.replace(/^["']|["']$/g, "").trim();
      };

      // 1. Extract unique Subject name + Class name pairs dynamically
      const uniqueMap = [];
      const seenKeys = new Set();

      rawScores.forEach((record) => {
        const subName = cleanStr(record.subject);
        const clsName = cleanStr(record.className) || "N/A";
        const compositeKey = `${subName.toLowerCase()}-${clsName.toLowerCase()}`;

        if (!seenKeys.has(compositeKey) && subName) {
          seenKeys.add(compositeKey);
          uniqueMap.push({
            name: subName,
            className: clsName,
          });
        }
      });

      setSubjects(uniqueMap);

      // 2. Set initial active target using the first object pairing found
      if (uniqueMap.length > 0 && !activeSubject) {
        setActiveSubject(uniqueMap[0]);
      }

      const formattedStudents = rawScores.map((record) => ({
        studentId: record.studentId || record.id || record._id,
        name: record.studentName || "Unknown Student",
        admissionNumber: record.admissionNumber || "N/A",
        subject: cleanStr(record.subject),
        className: cleanStr(record.className) || "N/A",
        continuousAssessment:
          record.continuousAssessment !== undefined &&
          record.continuousAssessment !== null
            ? record.continuousAssessment
            : "",
        exam:
          record.exam !== undefined && record.exam !== null ? record.exam : "",
      }));

      setStudents(formattedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while bringing in the student records.",
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students based on matching BOTH subject name and class tier criteria
  const filteredStudents = students.filter(
    (student) =>
      student.subject.toLowerCase() === activeSubject?.name?.toLowerCase() &&
      student.className.toLowerCase() ===
        activeSubject?.className?.toLowerCase(),
  );

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
        subject: activeSubject?.name || "",
        score: filteredStudents.map((student) => ({
          studentId: student.studentId,
          continuousAssessment: Number(student.continuousAssessment || 0),
          exam: Number(student.exam || 0),
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

  if (fetching) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} onRetry={fetchStudents} />;
  }

  return (
    <main className="CTScoreContainer">
      <article className="CTScoreWrapper">
        <div className="CTScoreHead">
          Scores
          <span>Select a subject and class to enter scores</span>
        </div>

        {/* Dynamic Nav Tabs handling distinct subject/class pairs */}
        <div className="CTSubjectsHolder">
          {subjects.map((item, index) => {
            const isActive =
              activeSubject?.name?.toLowerCase() === item.name.toLowerCase() &&
              activeSubject?.className?.toLowerCase() ===
                item.className.toLowerCase();

            return (
              <nav
                key={index}
                className={`CTSubjects ${isActive ? "active" : ""}`}
                onClick={() => setActiveSubject(item)}
              >
                {item.name}
                <span>{item.className}</span>
              </nav>
            );
          })}
        </div>

        <section className="CTScoreTable">
          <div className="CTSubjectSave">
            <span className="CTSelectedTextName">
              {activeSubject?.name} - {activeSubject?.className}
            </span>
            <button
              className="CTSaveBtn"
              onClick={saveScores}
              disabled={loading || fetching || filteredStudents.length === 0}
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

            {filteredStudents.length === 0 ? (
              <div className="CTTableStateFeedback CTEmptyState">
                <IoIosInformationCircleOutline className="CTEmptyIcon" />
                <p>No active student records found for this selection.</p>
              </div>
            ) : (
              filteredStudents.map((student) => (
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
