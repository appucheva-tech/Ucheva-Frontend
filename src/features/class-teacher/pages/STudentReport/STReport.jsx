import React, { useState } from "react";
import "./STReport.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import RemarkModal from "./RemarkModal ";
import ReportCard from "../../components/ReportCardPreview";

const STReport = () => {
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [remark, setRemark] = useState("");

  const handleSaveRemark = (value) => {
    setRemark(value);

    // Backend integration later
    console.log("Saved Remark:", value);
  };
  const reportData = {
    school: {
      name: "Bright Future International School",
      logo: "https://via.placeholder.com/120",
      address: "12 Education Avenue, Lagos, Nigeria",
      email: "info@brightfuture.edu.ng",
      phone: "+234 801 234 5678",
    },

    session: "2025 / 2026 Academic Session",
    term: "First Term",

    student: {
      name: "Adebayo Michael",
      admissionNumber: "BFS/2025/014",
      className: "JSS 2 Blue",
      dob: "12 March 2012",
      classTeacher: "Mrs. Johnson",
    },

    attendance: {
      totalDays: 120,
      presentDays: 112,
      percentage: "93.3%",
    },

    subjects: [
      {
        name: "Mathematics",
        ca: 28,
        exam: 62,
        total: 90,
        grade: "A1",
        remark: "Excellent performance",
      },
      {
        name: "English Language",
        ca: 25,
        exam: 55,
        total: 80,
        grade: "B2",
        remark: "Very good effort",
      },
      {
        name: "Basic Science",
        ca: 27,
        exam: 58,
        total: 85,
        grade: "A1",
        remark: "Outstanding",
      },
      {
        name: "Social Studies",
        ca: 24,
        exam: 50,
        total: 74,
        grade: "B3",
        remark: "Good work",
      },
      {
        name: "Computer Studies",
        ca: 30,
        exam: 65,
        total: 95,
        grade: "A1",
        remark: "Exceptional",
      },
    ],

    summary: {
      total: 424,
      average: 84.8,
      grade: "A",
      remark: "Excellent overall performance",
    },

    gradeKey: [
      { grade: "A1", range: "75 - 100", remark: "Excellent" },
      { grade: "B2", range: "70 - 74", remark: "Very Good" },
      { grade: "B3", range: "65 - 69", remark: "Good" },
      { grade: "C4", range: "60 - 64", remark: "Credit" },
      { grade: "C5", range: "55 - 59", remark: "Credit" },
      { grade: "C6", range: "50 - 54", remark: "Credit" },
      { grade: "D7", range: "45 - 49", remark: "Pass" },
      { grade: "E8", range: "40 - 44", remark: "Pass" },
      { grade: "F9", range: "0 - 39", remark: "Fail" },
    ],

    classTeacherRemark: {
      text: "Michael has shown excellent academic improvement this term. He should continue practicing Mathematics for even better results.",
      signature: "Mrs. Johnson",
      date: "2026-06-07",
    },

    principalRemark: {
      text: "A very brilliant student. Keep up the excellent performance and maintain discipline.",
      signature: "Dr. Williams",
      date: "2026-06-07",
    },
  };

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
            <button className="STAdd" onClick={() => setShowRemarkModal(true)}>
              + Add Remark
            </button>

            <button className="STSubmit">Submit to Admin</button>
          </section>
          <ReportCard data={reportData} />
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

export default STReport;
