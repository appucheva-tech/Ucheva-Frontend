import { useState } from "react";
import AttendanceModal from "./Popup";
import "./MyClass.css";
import { FaArrowsRotate } from "react-icons/fa6";
const initialStudents = [
  {
    name: "Adaeze Clinton",
    admission: "JSS 1A",
    gender: "Female",
    attendance: "Present",
    fee: "Full Payment",
  },
  {
    name: "Emeka Ugonna",
    admission: "JSS 2C",
    gender: "Male",
    attendance: "Present",
    fee: "Full Payment",
  },
  {
    name: "Tolu Adesanya",
    admission: "PRY 1",
    gender: "Male",
    attendance: "Present",
    fee: "Part Payment",
  },
  {
    name: "Chidi Okoronkwo",
    admission: "NRY 2",
    gender: "Male",
    attendance: "Absent",
    fee: "Full Payment",
  },
  {
    name: "Grace Obidi",
    admission: "SS 3B",
    gender: "Female",
    attendance: "Absent",
    fee: "Part Payment",
  },
  {
    name: "Ifeanyi Okafor",
    admission: "SS 2A",
    gender: "Male",
    attendance: "Present",
    fee: "Unpaid",
  },
];

const MyClass = () => {
  const [open, setOpen] = useState(false);
  const [feeFilter, setFeeFilter] = useState("All Fee Status");

  const resetFilter = () => setFeeFilter("All Fee Status");

  const filteredStudents =
    feeFilter === "All Fee Status"
      ? initialStudents
      : initialStudents.filter((s) => s.fee === feeFilter);

  return (
    <div className="myClassPage">
      <div className="topHeader">
        <nav className="topHeaderText">
          My Class — SS2A
          <span>23 students assigned to your class</span>
        </nav>
        <button className="markBtn" onClick={() => setOpen(true)}>
          Mark Attendance
        </button>
      </div>

      <article className="CTClassCards">
        <div className="TotalStudents">
          <nav className="CTClasstext">
            Total Students
            <div className="CTtextnum">23</div>
          </nav>
          <div className="CTImageHolder1">
            <img
              className="CTImg"
              src="https://i.postimg.cc/KzdG8q6g/uim-calender.png"
              alt=""
            />
          </div>
        </div>
        <div className="TotalFemale">
          <nav className="CTClasstext">
            Total Female
            <div className="CTtextnum">20</div>
          </nav>
          <div className="CTImageHolder1">
            <img
              className="CTImg"
              src="https://i.postimg.cc/BnMJKnWj/streamline-plump-class-lesson-remix.png"
              alt=""
            />
          </div>
        </div>
        <div className="Totalmale">
          <nav className="CTClasstext">
            Total Male
            <div className="CTtextnum">20</div>
          </nav>
          <div className="CTImageHolder1">
            <img
              className="CTImg"
              src="https://i.postimg.cc/YqxH5CCY/ph-student-fill.png"
              alt=""
            />
          </div>
        </div>
        <div className="Totalpresent">
          <nav className="CTClasstext">
            Total Present
            <div className="CTtextnum">20</div>
          </nav>
          <div className="CTImageHolder1">
            <img
              className="CTImg"
              src="https://i.postimg.cc/tJtKGBp1/material-symbols-light-menu-book-rounded.png"
              alt=""
            />
          </div>
        </div>
      </article>

      <div className="filterBar">
        <nav className="filterBarLabel">
          Fee status
          <article className="CTSelectHolder">
            <select
              className="CTClassSelect"
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
            >
              <option>All Fee Status</option>
              <option>Full Payment</option>
              <option>Part Payment</option>
              <option>Unpaid</option>
            </select>
          </article>
        </nav>
        <button onClick={resetFilter} className="resetBtn">
          <FaArrowsRotate />
          Reset
        </button>
      </div>

      {/* TABLE */}
      <div className="tableCard">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Admission Number</th>
              <th>Gender</th>
              <th>Attendance Status</th>
              <th>Fee Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s, i) => (
              <tr key={i}>
                <td>{s.name}</td>
                <td>{s.admission}</td>
                <td>{s.gender}</td>
                <td>
                  <span className={`badge ${s.attendance.toLowerCase()}`}>
                    {s.attendance}
                  </span>
                </td>
                <td>
                  <span
                    className={`fee ${s.fee.replace(" ", "").toLowerCase()}`}
                  >
                    {s.fee}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination">
          <span>Showing pages 1 of 7</span>

          <div className="pages">
            <button>{`<`}</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>6</button>
            <button>7</button>
            <button>{`>`}</button>
          </div>
          <nav className="CTPageTypeHolder">
            Rows per page
            <div className="CTPageTypeWrapper">
              <select className="CTPageType">
                <option>10</option>
                <option>20</option>
              </select>
            </div>
          </nav>
        </div>
      </div>

      {/* ATTENDANCE MODAL */}
      {open && <AttendanceModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default MyClass;
