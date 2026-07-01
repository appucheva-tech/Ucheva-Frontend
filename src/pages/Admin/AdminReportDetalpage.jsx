import React, { useEffect, useState } from "react";
import "./AdminReportDetalpage.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import RemarkModal from "../../features/class-teacher/pages/STudentReport/RemarkModal ";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../config/AxiosInstance";
const AdminREportDetailPage = () => {
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [remark, setRemark] = useState("");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { admissionnumber } = useParams();
  const subdomain = window.location.hostname.split(".")[0];
  const nav = useNavigate();
  const handleSaveRemark = (value) => setRemark(value);

  const fetchReportCard = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await apiClient.get(
        `/staff/report-card/${admissionnumber}`,
      );
      const report = data?.reportCard;
      // if (!report) throw new Error("No report card found");

      setReportData({
        school: {
          name: report.school.schoolName,
          logo: report.school.logoUrl || "",
          address: report.school.address,
          email: report.school.email || "",
          phone: report.school.phoneNumber,
        },
        session: report.student.session,
        term: report.student.term || "First Term",
        student: {
          name: report.student.name,
          admissionNumber: report.student.admissionNumber,
          className: report.student.class,
          dob: report.student.dateOfBirth,
          classTeacher: report.student.classTeacher || "",
        },
        attendance: {
          totalDays: report.attendance?.totalDays || 0,
          presentDays: report.attendance?.presentDays || 0,
          percentage: report.attendance?.percentage || "0%",
        },
        subjects: report.subjects.map((s) => ({
          name: s.subject,
          ca: s.continuousAssessment,
          exam: s.exam,
          total: s.totalScore,
          grade: s.grade,
          remark: s.remark || getGradeRemark(s.grade),
        })),
        summary: {
          totalCA: report.summary.totalCA || 0,
          totalExam: report.summary.totalExam || 0,
          total: report.summary.grandTotal,
          average: report.summary.averageScore,
          grade: report.summary.overallGrade,
          remark:
            report.summary.overallRemark ||
            getGradeRemark(report.summary.overallGrade),
        },
        gradeKey: [
          { grade: "A", range: "70-100", remark: "Excellent" },
          { grade: "B", range: "60-69", remark: "Very Good" },
          { grade: "C", range: "50-59", remark: "Good" },
          { grade: "D", range: "45-49", remark: "Fair" },
          { grade: "E", range: "0-44", remark: "Needs Improvement" },
        ],
        classTeacherRemark: {
          text: remark,
          signature: report.classTeacher?.signatureUrl || "",
          date: report.classTeacher?.remarkDate || new Date().toISOString(),
        },
        principalRemark: {
          text: report.principal?.remark || "",
          signature: report.principal?.signature || "",
          date: report.principal?.date || "",
        },
      });
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch report card";
      setError(message);
      // toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getGradeRemark = (grade) => {
    const map = {
      A: "Excellent",
      B: "Very Good",
      C: "Good",
      D: "Fair",
      E: "Needs Improvement",
      F: "Needs Improvement",
    };
    return map[grade] || "";
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatSignatureDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (admissionnumber) fetchReportCard();
    else setError("No admission number provided");
  }, [admissionnumber]);

  // Re-sync remark into reportData when remark state changes
  useEffect(() => {
    if (reportData) {
      setReportData((prev) => ({
        ...prev,
        classTeacherRemark: { ...prev.classTeacherRemark, text: remark },
      }));
    }
  }, [remark]);

  return (
    <>
      <main className="STReportContainer">
        <article className="STReportWrapper">
          {/* ── Page Header ───────────────────────────────────── */}
          <div className="STSReportHead">
            <span className="STSReportHeadTitle">Preview</span>
            <nav className="STSReportHeadRight">
              <span
                style={{ cursor: "pointer" }}
                className="STR"
                onClick={() => {
                  nav("/admin/AdminReportCards");
                }}
              >
                Report Cards
              </span>
              <MdOutlineKeyboardArrowRight className="STA" />
              <span className="STP">Preview</span>
            </nav>
          </div>

          {/* ── Action Bar ────────────────────────────────────── */}
          <section className="STActionBar">
            <button className="STAdd" onClick={() => setShowRemarkModal(true)}>
              + Add Remark
            </button>
            <button className="STSubmit">
              <span className="STSubmitIcon">✉</span> Send to parent
            </button>
          </section>

          {/* ── States ────────────────────────────────────────── */}
          {loading && <div className="STStateMsg">Loading report card...</div>}
          {error && <div className="STStateMsg STError">{error}</div>}
          {!loading && !error && !reportData && (
            <div className="STStateMsg">No report card found.</div>
          )}

          {/* ── Report Card ───────────────────────────────────── */}
          {reportData && (
            <div className="STReportCard">
              {/* School Header */}
              <div className="STSchoolHeader">
                {reportData.school.logo && (
                  <img
                    src={reportData.school.logo}
                    alt="School Logo"
                    className="STSchoolLogo"
                  />
                )}
                <div className="STSchoolInfo">
                  <h1 className="STSchoolName">{reportData.school.name}</h1>
                  <p>{reportData.school.address}</p>
                  {reportData.school.email && (
                    <p>Email: {reportData.school.email}</p>
                  )}
                  <p>Tel: {reportData.school.phone}</p>
                </div>
              </div>

              <hr className="STDivider" />

              {/* Report Card Title */}
              <div className="STReportTitle">
                <h2>ACADEMIC REPORT CARD</h2>
                <p className="STSession">
                  {reportData.session} ACADEMIC SESSION
                </p>
                <div className="STTermBadge">
                  {reportData.term?.toUpperCase()}
                </div>
              </div>

              {/* Student Info Grid */}
              <div className="STStudentInfoGrid">
                <div className="STInfoCol">
                  <div className="STInfoRow">
                    <span className="STInfoLabel">STUDENT NAME:</span>
                    <span className="STInfoValue">
                      {reportData.student.name}
                    </span>
                  </div>
                  <div className="STInfoRow">
                    <span className="STInfoLabel">ADMISSION NUMBER:</span>
                    <span className="STInfoValue">
                      {reportData.student.admissionNumber}
                    </span>
                  </div>
                  <div className="STInfoColDivider" />
                  <div className="STInfoRow">
                    <span className="STInfoLabel">CLASS:</span>
                    <span className="STInfoValue">
                      {reportData.student.className}
                    </span>
                  </div>
                </div>

                <div className="STInfoCol">
                  <div className="STInfoRow">
                    <span className="STInfoLabel">DATE OF BIRTH:</span>
                    <span className="STInfoValue">
                      {formatDate(reportData.student.dob)}
                    </span>
                  </div>
                  <div className="STInfoRow">
                    <span className="STInfoLabel">TERM:</span>
                    <span className="STInfoValue">{reportData.term}</span>
                  </div>
                  <div className="STInfoColDivider" />
                  <div className="STInfoRow">
                    <span className="STInfoLabel">CLASS TEACHER:</span>
                    <span className="STInfoValue">
                      {reportData.student.classTeacher}
                    </span>
                  </div>
                </div>

                <div className="STInfoCol">
                  <div className="STInfoRow">
                    <span className="STInfoLabel">TOTAL SCHOOL DAYS:</span>
                    <span className="STInfoValue">
                      {reportData.attendance.totalDays}
                    </span>
                  </div>
                  <div className="STInfoRow">
                    <span className="STInfoLabel">DAYS PRESENT:</span>
                    <span className="STInfoValue">
                      {reportData.attendance.presentDays}
                    </span>
                  </div>
                  <div className="STInfoColDivider" />
                  <div className="STInfoRow">
                    <span className="STInfoLabel">ATTENDANCE:</span>
                    <span className="STInfoValue">
                      {reportData.attendance.percentage}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subjects Table Container */}
              <div className="STTableContainer">
                <table className="STSubjectsTable">
                  <thead>
                    <tr>
                      <th className="STThSubject">SUBJECT</th>
                      <th data-label="CA">
                        CA
                        <br />
                        <span className="STThSub">
                          ({reportData.summary?.totalCA || 40} M)
                        </span>
                      </th>
                      <th data-label="EXAM">
                        EXAM
                        <br />
                        <span className="STThSub">
                          ({reportData.summary?.totalExam || 60} M)
                        </span>
                      </th>
                      <th data-label="TOTAL">
                        TOTAL
                        <br />
                        <span className="STThSub">(100 M)</span>
                      </th>
                      <th data-label="GRADE">GRADE</th>
                      <th data-label="REMARK">REMARK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.subjects.map((subject, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "STRowEven" : "STRowOdd"}
                      >
                        <td className="STTdSubject">{subject.name}</td>
                        <td className="STTdCenter" data-label="CA: ">
                          {subject.ca}
                        </td>
                        <td className="STTdCenter" data-label="Exam: ">
                          {subject.exam}
                        </td>
                        <td className="STTdCenter" data-label="Total: ">
                          {subject.total}
                        </td>
                        <td className="STTdCenter" data-label="Grade: ">
                          <span className="STGradeBadge">{subject.grade}</span>
                        </td>
                        <td className="STTdCenter" data-label="Remark: ">
                          {subject.remark}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="STSummaryRow">
                      <td className="STTdLabel">TOTAL SCORE</td>
                      <td className="STTdCenter" data-label="Total CA: ">
                        {reportData.summary.totalCA}
                      </td>
                      <td className="STTdCenter" data-label="Total Exam: ">
                        {reportData.summary.totalExam}
                      </td>
                      <td className="STTdCenter" data-label="Grand Total: ">
                        {reportData.summary.total}
                      </td>
                      <td className="STHideMobile"></td>
                      <td className="STHideMobile"></td>
                    </tr>
                    <tr className="STSummaryRow">
                      <td className="STTdLabel">AVERAGE SCORE</td>
                      <td className="STHideMobile"></td>
                      <td className="STHideMobile"></td>
                      <td className="STTdCenter" data-label="Average: ">
                        {reportData.summary.average}
                      </td>
                      <td className="STHideMobile"></td>
                      <td className="STHideMobile"></td>
                    </tr>
                    <tr className="STSummaryRow">
                      <td className="STTdLabel">OVERALL GRADE</td>
                      <td className="STHideMobile"></td>
                      <td className="STHideMobile"></td>
                      <td className="STTdCenter" data-label="Overall Grade: ">
                        <span className="STGradeBadge overall">
                          {reportData.summary.grade}
                        </span>
                      </td>
                      <td className="STHideMobile"></td>
                      <td className="STHideMobile"></td>
                    </tr>
                    <tr className="STSummaryRow STSummaryRowRemark">
                      <td className="STTdLabel">OVERALL REMARK</td>
                      <td
                        className="STTdCenter"
                        colSpan={5}
                        data-label="Overall Remark: "
                      >
                        {reportData.summary.remark}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Bottom Section — Grade Key + Teacher Remark */}
              <div className="STBottomSection">
                <div className="STGradeKeyBox">
                  <h4 className="STBoxTitle">KEY TO GRADES</h4>
                  <table className="STGradeTable">
                    <thead>
                      <tr>
                        <th>GRADE</th>
                        <th>RANGE</th>
                        <th>REMARK</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.gradeKey.map((g, i) => (
                        <tr key={i}>
                          <td>
                            <strong>{g.grade}</strong>
                          </td>
                          <td>{g.range}</td>
                          <td>{g.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="STTeacherRemarkBox">
                  <h4 className="STBoxTitle">CLASS TEACHER'S REMARK</h4>
                  <div className="STRemarkContent">
                    {reportData.classTeacherRemark.text && (
                      <p className="STRemarkText">
                        "{reportData.classTeacherRemark.text}"
                      </p>
                    )}
                    <div className="STSignatureLine">
                      <div className="STSigBlock">
                        <span className="STSigLabel">Signature:</span>
                        {reportData.classTeacherRemark.signature ? (
                          <img
                            src={reportData.classTeacherRemark.signature}
                            alt="Teacher Signature"
                            className="STSigImg"
                          />
                        ) : (
                          <span className="STSigEmpty" />
                        )}
                      </div>
                      <div className="STSigBlock">
                        <span className="STSigLabel">Date:</span>
                        <span className="STSigValue">
                          {formatSignatureDate(
                            reportData.classTeacherRemark.date,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Principal Remark */}
              <div className="STPrincipalRemarkBox">
                <h4 className="STBoxTitle">PRINCIPAL'S REMARK</h4>
                <div className="STPrincipalContent">
                  <p className="STRemarkText">
                    {reportData.principalRemark.text || "No remark entry yet."}
                  </p>
                  <div className="STSignatureLine">
                    <div className="STSigBlock">
                      <span className="STSigLabel">Signature:</span>
                      {reportData.principalRemark.signature ? (
                        <img
                          src={reportData.principalRemark.signature}
                          alt="Principal Signature"
                          className="STSigImg"
                        />
                      ) : (
                        <span className="STSigEmpty" />
                      )}
                    </div>
                    <div className="STSigBlock">
                      <span className="STSigLabel">Date:</span>
                      <span className="STSigValue">
                        {formatSignatureDate(reportData.principalRemark.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
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

export default AdminREportDetailPage;
