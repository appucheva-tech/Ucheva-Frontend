import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import "./Step3.css";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddFeeModal from "./Components/Popup";
import deleteIcon from "../../../assets/deleteIcon.svg";
import editIcon from "../../../assets/editIcon.svg";
import UchevaLogo from "../../../assets/UchevaLogo.svg";
import StepsNo3 from "../../../assets/Steps3.svg";
import Backshevron from "../../../assets/Backshevron.svg";

const Step3 = () => {
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigate();
  return (
    <main className="Step3Container geist-content">
      <article className="Step3Wrapper">
        <section className="Step3Head">
          <img className="Step3Logo" src={UchevaLogo} alt="Logo" />
          <span className="Step3Count">
            <Link
              to={"/step2"}
              style={{
                textDecoration: "none",
              }}
            >
              <nav>
                <img src={Backshevron} alt="Back" />
                Back
              </nav>
            </Link>
            Step 3 of 3
          </span>
          <div className="Step3Title">
            Set up your fee structure
            <span>
              Add the main fees your school collects. You can edit or add <br />
              more fees later from Settings.
            </span>
          </div>
          <img className="StepsNo3" src={StepsNo3} alt="Steps" />
        </section>

        <section className="AddFeeContent">
          <nav>Added Fees</nav>
          <div className="HeadingsHolder">
            <ul>Fee Type</ul>
            <ul>Payment Option</ul>
            <ul>Amount</ul>
            <ul>Action</ul>
          </div>
          <article className="AddfeePreview">
            <ul>Tuition Fee</ul>
            <ul>Installments</ul>
            <ul>N40,000</ul>
            <ul className="AddedFeeAction">
              <img src={editIcon} alt="" />
              <img src={deleteIcon} alt="" />
            </ul>
          </article>

          <div className="ButtonContainer">
            <button className="AnotherFee" onClick={() => setShowModal(true)}>
              {" + "} Add Fee
            </button>
          </div>
        </section>
        <nav className="SkipContinueBtns3">
          <button className="SkipBtn3">Skip</button>
          <button
            className="continueBtn3"
            onClick={() => {
              nav("/Success");
            }}
          >
            Continue
          </button>
        </nav>
      </article>
      {showModal && <AddFeeModal closeModal={() => setShowModal(false)} />}
    </main>
  );
};

export default Step3;
