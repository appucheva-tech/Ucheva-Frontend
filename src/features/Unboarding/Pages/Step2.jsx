import React from "react";
import "./Step2.css";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox, IoIosInformationCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoCheckbox } from "react-icons/io5";
import Backshevron from "../../../assets/Backshevron.svg";
import UchevaLogo from "../../../assets/UchevaLogo.svg";
import StepNo2 from "../../../assets/Steps2.svg";
import Caution from "../../../assets/Caution.svg";

const Step2 = () => {
  const nav = useNavigate();
  return (
    <main className="Step2Container geist-content">
      <article className="Step2Wrapper">
        <section className="Step2Head">
          <img className="Step2Logo" src={UchevaLogo} alt="Logo" />
          <span className="Step2Count">
            <Link
              to={"/step1"}
              style={{
                textDecoration: "none",
              }}
            >
              <nav>
                <img src={Backshevron} alt="Back" />
                Back
              </nav>
            </Link>
            Step 2 of 3
          </span>
          <div className="Step2Title">
            Configure Your Classes
            <span>
              Set up the sections and classes that exist in your school. <br />
              We'll use this to organize your students.
            </span>
          </div>
          <img className="StepsNo2" src={StepNo2} alt="" />
        </section>
        <form className="Content">
          <div className="SchoolType">
            <nav className="selectedSections">
              School Type
              <span>
                This is the selected sections available in your school
              </span>
            </nav>
            <article className="checkBoxContainer">
              <div className="checkBox1">
                <MdCheckBoxOutlineBlank
                  style={{
                    color: "#D2D6DB",
                  }}
                />
                Nursery
              </div>
              <div className="checkBox">
                <IoCheckbox
                  style={{
                    color: "#0062F6",
                  }}
                />
                Primary
              </div>
              <div className="checkBox">
                <IoCheckbox
                  style={{
                    color: "#0062F6",
                  }}
                />
                Secondary
              </div>
            </article>
          </div>
          <article className="primarySectionHolder">
            <section className="primarySection">
              <div className="PrimaryHeading"> Primary Section</div>
              <article className="classesArms">
                <div className="classes">
                  Classes
                  <article className="ClassesOption">
                    <div className="fromholder">
                      <select className="from">
                        <option value="" disabled selected>
                          Select Option
                        </option>
                        <option value="Primary 1">Primary 1</option>
                      </select>
                    </div>
                    to
                    <div className="fromholder">
                      <select className="To">
                        <option value="" disabled selected>
                          Select Option
                        </option>
                        <option value="">Primary 2</option>
                        <option value="">Primary 3</option>
                        <option value="">Primary 4</option>
                        <option value="">Primary 5</option>
                        <option value="">Peimary 6</option>
                      </select>
                    </div>
                  </article>
                </div>
                <div className="Arms">
                  <nav>
                    Arms <span>(Optional)</span>
                  </nav>
                  <article className="ArmsOption">
                    <div className="fromholder">
                      <select className="from">
                        <option value="" disabled selected>
                          Select Option
                        </option>
                        <option value="">A</option>
                      </select>
                    </div>
                    to
                    <div className="fromholder">
                      <select className="ArmsTo">
                        <option value="" disabled selected>
                          Select Option
                        </option>
                        <option value="">B</option>
                        <option value="">C</option>
                        <option value="">D</option>
                      </select>
                    </div>
                  </article>
                </div>
              </article>
            </section>
            <section className="primarySection">
              <div className="PrimaryHeading">Primary Section</div>
              <article className="classesArms">
                <div className="classes">
                  Classes
                  <article className="ClassesOption">
                    <div className="fromholder">
                      <select className="from">
                        <option value="" disabled selected>
                          Select Option
                        </option>
                        <option value="Primary 1">Primary 1</option>
                      </select>
                    </div>
                    to
                    <div className="fromholder">
                      <select className="To">
                        <option value="" disabled selected>
                          Select Option
                        </option>
                        <option value="">Primary 2</option>
                        <option value="">Primary 3</option>
                        <option value="">Primary 4</option>
                        <option value="">Primary 5</option>
                        <option value="">Peimary 6</option>
                      </select>
                    </div>
                  </article>
                </div>
                <div className="Arms">
                  <nav>
                    Arms <span>(Optional)</span>
                  </nav>
                  <article className="ArmsOption">
                    <div className="fromholder">
                      <select className="from">
                        <option value="" disabled selected>
                          Select Option
                        </option>
                        <option value="">A</option>
                      </select>
                    </div>
                    to
                    <div className="fromholder">
                      <select className="ArmsTo">
                        <option value="" disabled selected>
                          Select Option
                        </option>
                        <option value="">B</option>
                        <option value="">C</option>
                        <option value="">D</option>
                      </select>
                    </div>
                  </article>
                  {/* Leave empty if there are no arms */}
                </div>
              </article>
            </section>

            <div className="Note">
              <img src={Caution} alt="Caution" />
              Don't worry, you can add, edit or remove classes anytime later in
              settings.
            </div>
          </article>
          <nav className="SkipContinueBtns">
            <button className="SkipBtn2">Skip</button>
            <button
              className="continueBtn"
              onClick={() => {
                nav("/step3");
              }}
            >
              Continue
            </button>
          </nav>
        </form>
      </article>
    </main>
  );
};

export default Step2;
