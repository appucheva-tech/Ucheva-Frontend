import { useState } from "react";
import "./Pop.css";

const students = [
  { name: "Adaeze Clinton", gender: "Female" },
  { name: "Emeka Ugonna", gender: "Male" },
  { name: "Tolu Adesanya", gender: "Male" },
];

const AttendanceModal = ({ onClose }) => {
  const [index, setIndex] = useState(0);
  const [records, setRecords] = useState([]);
  const [completed, setCompleted] = useState(false);

  const student = students[index];

  const mark = (status) => {
    const updated = [...records, { ...student, status }];

    setRecords(updated);

    if (index < students.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setRecords(updated);
      setCompleted(true); // show completion screen instead of closing
      console.log("Attendance Complete:", updated);
    }
  };

  return (
    <div className="Attendanceoverlay" onClick={onClose}>
      <div className="Attendancecard" onClick={(e) => e.stopPropagation()}>
        {!completed ? (
          <>
            <div className="Attendanceavatar" />

            <nav>
              {student.name}
              <span>{student.gender}</span>
            </nav>

            <div className="Attendanceactions">
              <button
                className="Attendanceabsent"
                onClick={() => mark("Absent")}
              >
                <img src="/src/assets/mingcute_close-line.png" alt="" />
                <span> Absent </span>
              </button>

              <button
                className="Attendancepresent"
                onClick={() => mark("Present")}
              >
                <img src="/src/assets/Check.png" alt="" />
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceModal;
