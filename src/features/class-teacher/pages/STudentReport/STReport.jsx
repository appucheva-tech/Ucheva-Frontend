import React, { useEffect, useState } from "react";
import "./STReport.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import RemarkModal from "./RemarkModal ";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { apiClient } from "../../../../config/AxiosInstance";
const STReport = () => {
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [remark, setRemark] = useState("");
const [reportData, setReportData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  // const { admissionNumber } = useParams();

    console.log("Saved Remark:");


  const handleSaveRemark = (value) => {
    setRemark(value);
  };

const fetchReportCard = async () => {
  try {
    setLoading(true);
    setError("");

    const { data } = await apiClient.post(
      "/staff/report-card/admissionnumber",
      {
        admissionNumber: "STD/2026/000003",
      }
    );

    const report = data?.reportCard;

    if (!report) {
      throw new Error("No report card found");
    }

    setReportData({
      school: {
        name: report.school.schoolName,
        logo: "",
        address: report.school.address,
        email: "",
        phone: report.school.phoneNumber,
      },

      session: report.student.session,
      term: "First Term",

      student: {
        name: report.student.name,
        admissionNumber: report.student.admissionNumber,
        className: report.student.class,
        dob: report.student.dateOfBirth,
        classTeacher: "",
      },

      attendance: {
        totalDays: 0,
        presentDays: 0,
        percentage: "0%",
      },

      subjects: report.subjects.map((subject) => ({
        name: subject.subject,
        ca: subject.continuousAssessment,
        exam: subject.exam,
        total: subject.totalScore,
        grade: subject.grade,
        remark: "",
      })),

      summary: {
        total: report.summary.grandTotal,
        average: report.summary.averageScore,
        grade: report.summary.overallGrade,
        remark: "",
      },

      gradeKey: [
        {
          grade: "A",
          range: "70 - 100",
          remark: "Excellent",
        },
        {
          grade: "B",
          range: "60 - 69",
          remark: "Very Good",
        },
        {
          grade: "C",
          range: "50 - 59",
          remark: "Good",
        },
        {
          grade: "D",
          range: "45 - 49",
          remark: "Pass",
        },
        {
          grade: "F",
          range: "0 - 44",
          remark: "Fail",
        },
      ],

      classTeacherRemark: {
        text: remark,
        signature: "",
        date: new Date().toISOString(),
      },

      principalRemark: {
        text: "",
        signature: "",
        date: "",
      },
    });
  } catch (err) {
    console.log(err);

    const message =
      err.response?.data?.message ||
      "Failed to fetch report card";

    setError(message);
    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    
      fetchReportCard();
    
  }, []);

  return (
    <>
      <main className="STReportContainer">
        <article className="STReportWrapper">
          <div className="STSReportHead">
            Preview
            <nav className="STSReportHeadRight">
              <span className="STR">Report Cards</span>
              <MdOutlineKeyboardArrowRight className="STA" />
              <span className="STP">Preview</span>
            </nav>
          </div>

          <section className="SubToAdmin">
            <button
              className="STAdd"
              onClick={() => setShowRemarkModal(true)}
            >
              + Add Remark
            </button>

            <button className="STSubmit">
              Submit to Admin
            </button>
          </section>

{loading ? (
  <div>Loading report card...</div>
) : error ? (
  <div>{error}</div>
) : reportData ? (
  <div className="STReportCard">
    {/* School Information */}
    <div className="STSchoolInfo">
      <h2>{reportData.school?.name}</h2>
      <p>{reportData.school?.address}</p>
      <p>{reportData.school?.phone}</p>
      <p>{reportData.session}</p>
      <p>{reportData.term}</p>
    </div>

    <hr />

    {/* Student Information */}
    <div className="STStudentInfo">
      <h3>Student Information</h3>

      <p>
        <strong>Name:</strong> {reportData.student?.name}
      </p>

      <p>
        <strong>Admission Number:</strong>{" "}
        {reportData.student?.admissionNumber}
      </p>

      <p>
        <strong>Class:</strong>{" "}
        {reportData.student?.className}
      </p>

      <p>
        <strong>Date of Birth:</strong>{" "}
        {reportData.student?.dob
          ? new Date(
              reportData.student.dob
            ).toLocaleDateString()
          : "-"}
      </p>
    </div>

    <hr />

    {/* Subjects */}
    <div className="STSubjects">
      <h3>Academic Performance</h3>

      <table
        width="100%"
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Subject</th>
            <th>CA</th>
            <th>Exam</th>
            <th>Total</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {reportData.subjects?.map((subject, index) => (
            <tr key={index}>
              <td>{subject.name}</td>
              <td>{subject.ca}</td>
              <td>{subject.exam}</td>
              <td>{subject.total}</td>
              <td>{subject.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <hr />

    {/* Summary */}
    <div className="STSummary">
      <h3>Summary</h3>

      <p>
        <strong>Total Score:</strong>{" "}
        {reportData.summary?.total}
      </p>

      <p>
        <strong>Average:</strong>{" "}
        {reportData.summary?.average}
      </p>

      <p>
        <strong>Overall Grade:</strong>{" "}
        {reportData.summary?.grade}
      </p>

      <p>
        <strong>Remark:</strong>{" "}
        {reportData.summary?.remark}
      </p>
    </div>

    <hr />

    {/* Grade Key */}
    <div className="STGradeKey">
      <h3>Grade Key</h3>

      <table
        width="100%"
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Grade</th>
            <th>Range</th>
            <th>Remark</th>
          </tr>
        </thead>

        <tbody>
          {reportData.gradeKey?.map((grade, index) => (
            <tr key={index}>
              <td>{grade.grade}</td>
              <td>{grade.range}</td>
              <td>{grade.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <hr />

    <div className="STTeacherRemark">
      <h3>Class Teacher's Remark</h3>
      <p>
        {reportData.classTeacherRemark?.text ||
          "No remark yet."}
      </p>
    </div>

    <div className="STPrincipalRemark">
      <h3>Principal's Remark</h3>
      <p>
        {reportData.principalRemark?.text ||
          "No remark yet."}
      </p>
    </div>
  </div>
) : (
  <div>No report card found.</div>
)}        </article>
      </main>

      {showRemarkModal && (
        <RemarkModal
          initialRemark={remark}
          onClose={() => setShowRemarkModal(false)}
          onSave={handleSaveRemark}
        />
      )}
    </>
  );
};

export default STReport;