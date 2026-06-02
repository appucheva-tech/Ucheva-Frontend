import React from "react";
import "./Step1.css";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const nav = useNavigate();
  return (
    <main className="Step1Container geist-content">
      <article className="Step1Wrapper">
        <section className="Step1Head">
          <img
            className="Step1Logo"
            src="src/assets/Ucheva Logo.png"
            alt="Logo"
          />
          <span className="StepCount">Step 1 of 3</span>
          <div className="Step1Title">
            Let's set up your school profile
            <span>
              Tell us more about your school. You can edit
              <br /> these details later in settings.
            </span>
          </div>
          <img className="Steps" src="src/assets/Steps.png" alt="" />
        </section>
        <form className="step1Content">
          <div className="uploadLogo">
            <article className="dpImage"></article>
            <div className="dpControl">
              <nav className="dpText">
                Upload logo
                <span className="support">
                  We support PNG, Jpegs, JPG, under 2MB
                </span>
              </nav>
              <article className="Step1Btn">
                <input
                  type="button"
                  value="Upload image"
                  className="uploadBtn"
                />
                <button className="removeBtn">Remove</button>
              </article>
            </div>
          </div>
          <article className="inputRoles">
            <label className="schoolName">
              School Name
              <span className="hinttext">
                This was used during sign up and cannot be changed
              </span>
              <input
                type="text"
                className="generalInput"
                value="Green Field Academy"
                readOnly
              />
            </label>
            <label className="schoolName">
              School URL
              <span className="hinttext">
                This was used during sign up and cannot be changed
              </span>
              <input
                type="text"
                className="generalInput"
                value="https://greenfieldacademy.ucheva.com"
                readOnly
              />
            </label>
            <label className="schoolName">
              Email
              <span className="hinttext">
                This was used during sign up and cannot be changed
              </span>
              <input
                type="text"
                className="generalInput"
                value="greenfielddcademy@gmail.com"
                readOnly
              />
            </label>
            <label className="schoolName">
              Phone number
              <span className="hinttext">
                This was used during sign up and cannot be changed
              </span>
              <input
                type="text"
                className="generalInput"
                value="+234 1234567890"
                readOnly
              />
            </label>
            <label className="schoolName">
              Address
              <span className="hinttext">
                This was used during sign up and cannot be changed
              </span>
              <input
                type="text"
                className="generalInput"
                value="12 Dolapo street, ikoyi, Lagos."
                readOnly
              />
            </label>
            <label className="schoolName">
              School Type
              <span className="hinttext">
                Select all that applies to your school
              </span>
              <div className="generalInput">
                <select className="ActualgeneralInput">
                  <option value="" disabled selected>
                    Select School Type
                  </option>
                  <option>Nursery</option>
                  <option>Primary</option>
                  <option>Secondary</option>
                </select>
              </div>
            </label>
            <div className="ContinueBtnHolder">
              <button
                className="continueBtn"
                onClick={() => {
                  nav("/step2");
                }}
              >
                Continue
              </button>
            </div>
          </article>
        </form>
      </article>
    </main>
  );
};

export default Step1;
