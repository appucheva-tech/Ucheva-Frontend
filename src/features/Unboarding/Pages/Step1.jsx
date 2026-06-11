import React, { useEffect, useState } from "react";
import "./Step1.css";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaChevronDown } from "react-icons/fa6";
import Upload from "../../../assets/Vector.svg";
import UchevaLogo from "../../../assets/UchevaLogo.svg";
import Steps from "../../../assets/Steps.svg";
import Camera from "../../../assets/CameraIcon.svg";
import axios from "axios";

const Step1 = () => {
  const [schoolProfile, setSchoolProfile] = useState({});
  const [showTypes, setShowTypes] = useState(false);
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const nav = useNavigate();

  const baseURL = import.meta.env.VITE_Base_Url;

  useEffect(() => {
    const savedData = localStorage.getItem("schoolProfile");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      setSchoolTypes(parsedData.schoolTypes || []);
      setSelectedImage(parsedData.logo || null);
    }
  }, []);

  // Save data automatically
  useEffect(() => {
    localStorage.setItem(
      "schoolProfile",
      JSON.stringify({
        schoolTypes,
        logo: selectedImage,
      }),
    );
  }, [schoolTypes, selectedImage]);

  const handleTypeChange = (type) => {
    if (schoolTypes.includes(type)) {
      setSchoolTypes(schoolTypes.filter((item) => item !== type));
    } else {
      setSchoolTypes([...schoolTypes, type]);
    }
  };

  // Save image as Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/admin/get-admin`);

        console.log(response);
        setSchoolProfile(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getProfile();
  }, []);

  return (
    <main className="Step1Container geist-content">
      <article className="Step1Wrapper">
        <section className="Step1Head">
          <img className="Step1Logo" src={UchevaLogo} alt="Logo" />
          <span className="StepCount">Step 1 of 3</span>

          <nav className="Step1Title">
            Let's set up your school profile
            <span>
              Tell us more about your school. You can edit
              <br />
              these details later in settings.
            </span>
          </nav>

          <img className="Steps" src={Steps} alt="" />
        </section>

        <form className="step1Content">
          <div className="uploadLogo">
            <div className="dpImage">
              {selectedImage ? (
                <img
                  className="SchoolUpload"
                  src={selectedImage}
                  alt="profile"
                />
              ) : (
                <img className="cameragram" src={Camera} alt="upload" />
              )}

              <label htmlFor="imageUpload" className="cameraIcon">
                <FaCamera />
              </label>

              <input
                id="imageUpload"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="uploadInput"
                onChange={handleImageChange}
              />
            </div>

            <div className="dpControl">
              <div className="dpText">
                Upload logo
                <span className="support">
                  We support PNG, JPEG, JPG under 2MB
                </span>
              </div>

              <div className="Step1Btn">
                <label htmlFor="imageUpload" className="uploadBtn">
                  <img src={Upload} alt="Upload" />
                  Upload Image
                </label>

                <button
                  type="button"
                  className="removeBtn"
                  onClick={() => {
                    setSelectedImage(null);
                  }}
                >
                  Remove
                </button>
              </div>
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
                value={schoolProfile?.schoolName}
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
                value={schoolProfile?.schoolUrl}
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
                value={schoolProfile?.email}
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
                value={schoolProfile?.phoneNumber}
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
                value={schoolProfile?.address}
                readOnly
              />
            </label>

            <label className="schoolName">
              School Type
              <span className="hinttext">
                Select all that applies to your school
              </span>
              <div className="schoolTypeWrapper">
                <div
                  className="schoolTypeInput"
                  onClick={() => setShowTypes(!showTypes)}
                >
                  {schoolTypes.length
                    ? schoolTypes.join(", ")
                    : "Select School Type"}

                  <FaChevronDown />
                </div>

                {showTypes && (
                  <div className="schoolTypeDropdown">
                    <label>
                      <input
                        type="checkbox"
                        checked={schoolTypes.includes("Nursery")}
                        onChange={() => handleTypeChange("Nursery")}
                      />
                      Nursery
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={schoolTypes.includes("Primary")}
                        onChange={() => handleTypeChange("Primary")}
                      />
                      Primary
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={schoolTypes.includes("Secondary")}
                        onChange={() => handleTypeChange("Secondary")}
                      />
                      Secondary
                    </label>
                  </div>
                )}
              </div>
            </label>

            <div className="ContinueBtnHolder">
              <button
                type="button"
                className="continueBtn"
                onClick={() => {
                  localStorage.setItem(
                    "schoolProfile",
                    JSON.stringify({
                      schoolTypes,
                      logo: selectedImage,
                    }),
                  );

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
