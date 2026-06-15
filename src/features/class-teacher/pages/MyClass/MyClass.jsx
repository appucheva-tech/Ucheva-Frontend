import { useEffect, useState } from "react";
import AttendanceModal from "./Popup";
import "./MyClass.css";
import { FaArrowsRotate } from "react-icons/fa6";
import PH from "../../../../assets/ph.svg";
import UIM from "../../../../assets/uim.svg";
import Streamline from "../../../../assets/streamline.svg";
import Material from "../../../../assets/material.svg";
import axios from "axios";

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
  const [myClass, setMyClass] = useState(null);
  const [open, setOpen] = useState(false);
  const [feeFilter, setFeeFilter] = useState("All Fee Status");
  const baseUrl = import.meta.env.VITE_Base_Url;
  const resetFilter = () => setFeeFilter("All Fee Status");

  const filteredStudents =
    feeFilter === "All Fee Status"
      ? initialStudents
      : initialStudents.filter((s) => s.fee === feeFilter);

  useEffect(() => {
    const myClass = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/classteacher/class-teacher-dashboard`,
        );
        console.log(res);
      } catch (error) {
        console.log(error?.message || "there is an error");
      }
    };
    myClass();
  }, []);

  return (
    <div className="myClassPage">
      <div className="myClasstopHeader">
        <nav className="myClasstopHeaderText">
          My Class — SS2A
          <span>23 students assigned to your class</span>
        </nav>
        <button className="myClassmarkBtn" onClick={() => setOpen(true)}>
          Mark Attendance
        </button>
      </div>

      <article className="myClassCTClassCards">
        <div className="myClassTotalStudents">
          <nav className="myClassCTClasstext">
            Total Students
            <div className="myClassCTtextnum">23</div>
          </nav>
          <div className="myClassCTImageHolder1">
            <img className="myClassCTImg" src={UIM} alt="" />
          </div>
        </div>
        <div className="myClassTotalFemale">
          <nav className="myClassCTClasstext">
            Total Female
            <div className="myClassCTtextnum">20</div>
          </nav>
          <div className="myClassCTImageHolder1">
            <img className="myClassCTImg" src={Streamline} alt="" />
          </div>
        </div>
        <div className="myClassTotalMale">
          <nav className="myClassCTClasstext">
            Total Male
            <div className="myClassCTtextnum">20</div>
          </nav>
          <div className="myClassCTImageHolder1">
            <img className="myClassCTImg" src={PH} alt="" />
          </div>
        </div>
        <div className="myClassTotalPresent">
          <nav className="myClassCTClasstext">
            Total Present
            <div className="myClassCTtextnum">20</div>
          </nav>
          <div className="myClassCTImageHolder1">
            <img className="myClassCTImg" src={Material} alt="" />
          </div>
        </div>
      </article>

      <div className="myClassfilterBar">
        <nav className="myClassfilterBarLabel">
          Fee status
          <article className="myClassCTSelectHolder">
            <select
              className="myClassCTClassSelect"
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
        <button onClick={resetFilter} className="myClassresetBtn">
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
