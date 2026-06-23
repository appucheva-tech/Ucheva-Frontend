import { useState } from "react";
import "./Pop.css";
import Attendancecheck from "../../../../assets/Check.svg";
import Attendanclose from "../../../../assets/mingcute_close-line.svg";
import { apiClient } from "../../../../config/AxiosInstance";
import { toast } from "react-toastify";

const AttendanceModal = ({ students = [], onClose, onSuccess, subdomain }) => {
  const [index, setIndex] = useState(0);
  const [records, setRecords] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!students || students.length === 0) {
    return (
      <div className="Attendanceoverlay" onClick={onClose}>
        <div className="Attendancecard" onClick={(e) => e.stopPropagation()}>
          <div className="Attendancecompletion">
            <p className="AttendanceattendanceSuccessText">
              No Active Students Available
            </p>
            <button className="AttendanceSubmitBtn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const student = students[index];
  const currentStudentName =
    `${student?.firstName || ""} ${student?.lastName || ""}`.trim() ||
    student?.name ||
    "Unknown Student";
  const currentStudentGender = student?.gender || "N/A";

  const mark = (status) => {
    const newRecord = {
      studentId: student._id || student.id,
      status: status.toLowerCase(),
    };

    const updated = [...records, newRecord];
    setRecords(updated);

    if (index < students.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const saveBulkAttendance = async () => {
    try {
      setLoading(true);

      const payload = {
        attendance: records,
      };

      await apiClient.post("/classteacher/attendance", payload, {
        headers: {
          "x-tenant": subdomain,
        },
      });
      toast.success("Attendance batch saved successfully!");

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Bulk Attendance Post Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to process bulk attendance.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Attendanceoverlay" onClick={onClose}>
      <div className="Attendancecard" onClick={(e) => e.stopPropagation()}>
        {!completed ? (
          <>
            <div className="Attendanceavatar" />

            <nav>
              {currentStudentName}
              <span>{currentStudentGender}</span>
            </nav>

            <div className="Attendanceactions">
              <button
                className="Attendanceabsent"
                onClick={() => mark("Absent")}
              >
                <img src={Attendanclose} alt="" />
                <span> Absent </span>
              </button>

              <button
                className="Attendancepresent"
                onClick={() => mark("Present")}
              >
                <img src={Attendancecheck} alt="" />
                <span> Present </span>
              </button>
            </div>
          </>
        ) : (
          <div className="Attendancecompletion">
            <div className="AttendancecompletionIcon">
              <img
                className="AttendanceattendanceSuccess"
                src="/src/assets/Success.png"
                alt=""
              />
            </div>
            <p className="AttendanceattendanceSuccessText">
              Attendance Marked <br />
              Completely
            </p>

            <button
              className="AttendanceSubmitBtn"
              onClick={saveBulkAttendance}
              disabled={loading}
              style={{
                marginTop: "20px",
                padding: "12px 24px",
                background: "#0062f6",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontFamily: "Nunito, sans-serif",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                width: "100%",
                transition: "opacity 0.2s",
              }}
            >
              {loading ? "Saving Batch..." : "Submit to Database"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceModal;
