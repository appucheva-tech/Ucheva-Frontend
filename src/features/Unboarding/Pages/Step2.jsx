import React, { useState, useEffect } from "react";
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
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [classConfig, setClassConfig] = useState({});

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("schoolProfile");
    const savedClassConfig = localStorage.getItem("classConfig");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSchoolTypes(parsedData.schoolTypes || []);

      // Initialize classConfig for selected types
      const config = {};
      (parsedData.schoolTypes || []).forEach((type) => {
        config[type] = {
          classFrom: "",
          classTo: "",
          armFrom: "",
          armTo: "",
        };
      });
      setClassConfig(config);
    }

    if (savedClassConfig) {
      setClassConfig(JSON.parse(savedClassConfig));
    }
  }, []);

  // Get class options based on school type
  const getClassOptions = (type) => {
    const classMap = {
      Nursery: ["Nursery 1", "Nursery 2", "Nursery 3"],
      Primary: [
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Primary 4",
        "Primary 5",
        "Primary 6",
      ],
      Secondary: ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"],
    };
    return classMap[type] || [];
  };

  // Get arm options
  const getArmOptions = () => {
    return ["A", "B", "C", "D", "E"];
  };

  const handleClassChange = (type, field, value) => {
    setClassConfig((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleContinue = () => {
    localStorage.setItem("classConfig", JSON.stringify(classConfig));
    nav("/step3");
  };

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
              {schoolTypes.length > 0 ? (
                schoolTypes.map((type) => (
                  <div key={type} className="checkBox">
                    <IoCheckbox
                      style={{
                        color: "#0062F6",
                      }}
                    />
                    {type}
                  </div>
                ))
              ) : (
                <div className="checkBox1">
                  <MdCheckBoxOutlineBlank
                    style={{
                      color: "#D2D6DB",
                    }}
                  />
                  No sections selected
                </div>
              )}
            </article>
          </div>
          <article className="primarySectionHolder">
            {schoolTypes.map((type) => (
              <section key={type} className="primarySection">
                <div className="PrimaryHeading">{type} Section</div>
                <article className="classesArms">
                  <div className="classes">
                    Classes
                    <article className="ClassesOption">
                      <div className="fromholder">
                        <select
                          className="from"
                          value={classConfig[type]?.classFrom || ""}
                          onChange={(e) =>
                            handleClassChange(type, "classFrom", e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select Option
                          </option>
                          {getClassOptions(type).map((cls) => (
                            <option key={cls} value={cls}>
                              {cls}
                            </option>
                          ))}
                        </select>
                      </div>
                      to
                      <div className="fromholder">
                        <select
                          className="To"
                          value={classConfig[type]?.classTo || ""}
                          onChange={(e) =>
                            handleClassChange(type, "classTo", e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select Option
                          </option>
                          {getClassOptions(type)
                            .slice(
                              getClassOptions(type).indexOf(
                                classConfig[type]?.classFrom || "",
                              ) + 1,
                            )
                            .map((cls) => (
                              <option key={cls} value={cls}>
                                {cls}
                              </option>
                            ))}
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
                        <select
                          className="from"
                          value={classConfig[type]?.armFrom || ""}
                          onChange={(e) =>
                            handleClassChange(type, "armFrom", e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select Option
                          </option>
                          {getArmOptions().map((arm) => (
                            <option key={arm} value={arm}>
                              {arm}
                            </option>
                          ))}
                        </select>
                      </div>
                      to
                      <div className="fromholder">
                        <select
                          className="ArmsTo"
                          value={classConfig[type]?.armTo || ""}
                          onChange={(e) =>
                            handleClassChange(type, "armTo", e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select Option
                          </option>
                          {getArmOptions()
                            .slice(
                              getArmOptions().indexOf(
                                classConfig[type]?.armFrom || "",
                              ) + 1,
                            )
                            .map((arm) => (
                              <option key={arm} value={arm}>
                                {arm}
                              </option>
                            ))}
                        </select>
                      </div>
                    </article>
                  </div>
                </article>
              </section>
            ))}

            <div className="Note">
              <img src={Caution} alt="Caution" />
              Don't worry, you can add, edit or remove classes anytime later in
              settings.
            </div>
          </article>
          <nav className="SkipContinueBtns">
            <button type="button" className="SkipBtn2">
              Skip
            </button>
            <button
              type="button"
              className="continueBtn"
              onClick={handleContinue}
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
