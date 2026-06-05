import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import "./Step3.css";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddFeeModal from "./Components/Popup";

const Step3 = () => {
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigate();
  return (
    <main className="Step3Container geist-content">
      <article className="Step3Wrapper">
        <section className="Step3Head">
          <img
            className="Step3Logo"
            src="https://i.postimg.cc/Y9zb4hsp/Ucheva-Logo.png"
            alt="Logo"
          />
          <span className="Step3Count">
            <Link
              to={"/step2"}
              style={{
                textDecoration: "none",
              }}
            >
              <nav>
                <MdOutlineKeyboardArrowLeft />
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
          <img
            className="StepsNo3"
            src="https://i.postimg.cc/rstsnrXC/Steps3.png"
            alt=""
          />
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
            <ul>Payment Option</ul>
            <ul>&#8358; 40,000</ul>
            <ul>Action</ul>
          </article>
          <article className="AddfeePreview">
            <ul>Tuition Fee</ul>
            <ul>Payment Option</ul>
            <ul>&#8358; 40,000</ul>
            <ul>Action</ul>
          </article>
          <div className="ButtonContainer">
            <button className="AnotherFee" onClick={() => setShowModal(true)}>
              <GoPlus />
              Add Another Fee
            </button>
          </div>
        </section>
        <nav className="SkipContinueBtns3">
          <button className="SkipBtn3">Skip</button>
          <button
            className="continueBtn3"
            onClick={() => {
              nav("/success");
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
