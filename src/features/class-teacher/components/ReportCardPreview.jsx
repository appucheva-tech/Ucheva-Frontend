import React from "react";
import "./ReportCardPreview.css";

const ReportCard = ({ data }) => {
  if (!data) return null;

  const {
    school,
    session,
    term,
    student,
    attendance,
    subjects,
    summary,
    gradeKey,
    classTeacherRemark,
    principalRemark,
  } = data;

  return (
    <section className="reportCardWrapper">
      {/* SCHOOL HEADER */}
      <header className="reportHeader">
        <div className="schoolLogo">
          <img src={school?.logo} alt="logo" />
        </div>

        <div className="schoolInfo">
          <h1>{school?.name}</h1>
          <p>{school?.address}</p>
          <p>{school?.email}</p>
          <p>{school?.phone}</p>
        </div>
      </header>

      <div className="divider" />

      {/* TITLE */}
      <div className="reportTitle">
        <h2>ACADEMIC REPORT CARD</h2>
        <p>{session}</p>
        <span className="termBadge">{term}</span>
      </div>

      {/* STUDENT INFO */}
      <section className="studentBox">
        <div>
          <p>
            <strong>Student Name:</strong> {student?.name}
          </p>
          <p>
            <strong>Admission No:</strong> {student?.admissionNumber}
          </p>
          <p>
            <strong>Class:</strong> {student?.className}
          </p>
        </div>

        <div>
          <p>
            <strong>Date of Birth:</strong> {student?.dob}
          </p>
          <p>
            <strong>Term:</strong> {term}
          </p>
          <p>
            <strong>Class Teacher:</strong> {student?.classTeacher}
          </p>
        </div>

        <div>
          <p>
            <strong>Total School Days:</strong> {attendance?.totalDays}
          </p>
          <p>
            <strong>Days Present:</strong> {attendance?.presentDays}
          </p>
          <p>
            <strong>Attendance:</strong> {attendance?.percentage}
          </p>
        </div>
      </section>

      {/* SUBJECT TABLE */}
      <section className="tableWrapper">
        <table className="reportTable">
          <thead>
            <tr>
              <th>Subject</th>
              <th>CA (40)</th>
              <th>Exam (60)</th>
              <th>Total (100)</th>
              <th>Grade</th>
              <th>Remark</th>
            </tr>
          </thead>

          <tbody>
            {subjects?.map((sub, i) => (
              <tr key={i}>
                <td>{sub.name}</td>
                <td>{sub.ca}</td>
                <td>{sub.exam}</td>
                <td>{sub.total}</td>
                <td>{sub.grade}</td>
                <td>{sub.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* SUMMARY */}
      <section className="summaryBox">
        <div>
          <p>
            <strong>Total Score:</strong> {summary?.total}
          </p>
          <p>
            <strong>Average Score:</strong> {summary?.average}
          </p>
          <p>
            <strong>Overall Grade:</strong> {summary?.grade}
          </p>
          <p>
            <strong>Overall Remark:</strong> {summary?.remark}
          </p>
        </div>
      </section>

      {/* GRADE + TEACHER REMARK */}
      <section className="bottomGrid">
        <div className="gradeBox">
          <h3>KEY TO GRADES</h3>

          <table>
            <tbody>
              {gradeKey?.map((g, i) => (
                <tr key={i}>
                  <td>{g.grade}</td>
                  <td>{g.range}</td>
                  <td>{g.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="remarkBox">
          <h3>CLASS TEACHER'S REMARK</h3>
          <p>{classTeacherRemark?.text}</p>

          <div className="signRow">
            <span>Signature: {classTeacherRemark?.signature}</span>
            <span>Date: {classTeacherRemark?.date}</span>
          </div>
        </div>
      </section>

      {/* PRINCIPAL */}
      <section className="principalBox">
        <h3>PRINCIPAL'S REMARK</h3>
        <p>{principalRemark?.text}</p>

        <div className="signRow">
          <span>Signature: {principalRemark?.signature}</span>
          <span>Date: {principalRemark?.date}</span>
        </div>
      </section>
    </section>
  );
};

export default ReportCard;
