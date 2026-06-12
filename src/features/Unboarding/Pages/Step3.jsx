import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import "./Step3.css";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddFeeModal from "./Components/Popup";
import deleteIcon from "../../../assets/deleteIcon.svg";
import editIcon from "../../../assets/editIcon.svg";
import UchevaLogo from "../../../assets/UchevaLogo.svg";
import StepsNo3 from "../../../assets/Steps3.svg";
import Backshevron from "../../../assets/Backshevron.svg";
import axios from "axios";

const Step3 = () => {
  const [showModal, setShowModal] = useState(false);
  const [fees, setFees] = useState([]);
  const [schoolProfile, setSchoolProfile] = useState({});
  const [classConfig, setClassConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // Load data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("schoolProfile");
    const savedClassConfig = localStorage.getItem("classConfig");
    const savedFees = localStorage.getItem("fees");

    if (savedProfile) {
      setSchoolProfile(JSON.parse(savedProfile));
    }
    if (savedClassConfig) {
      setClassConfig(JSON.parse(savedClassConfig));
    }
    if (savedFees) {
      setFees(JSON.parse(savedFees));
    }
  }, []);

  const handleAddFee = (feeData) => {
    const newFee = {
      id: Date.now(),
      ...feeData,
    };
    const updatedFees = [...fees, newFee];
    setFees(updatedFees);
    localStorage.setItem("fees", JSON.stringify(updatedFees));
  };

  const handleDeleteFee = (id) => {
    const updatedFees = fees.filter((fee) => fee.id !== id);
    setFees(updatedFees);
    localStorage.setItem("fees", JSON.stringify(updatedFees));
  };

  const formatDataForAPI = () => {
    const formData = new FormData();

    // Add school logo if exists
    if (schoolProfile.logo) {
      if (schoolProfile.logo.startsWith("data:")) {
        // Convert base64 to blob
        const arr = schoolProfile.logo.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
          u8arr[i] = bstr.charCodeAt(i);
        }
        const blob = new Blob([u8arr], { type: mime });
        formData.append("image", blob, "school-logo.png");
      }
    }

    // Add school types
    formData.append(
      "schoolType",
      JSON.stringify(schoolProfile.schoolTypes || []),
    );

    // Add class configurations
    const classConfigData = classConfig || {};

    // Nursery classes
    if (classConfigData.Nursery) {
      formData.append("classFromNur", classConfigData.Nursery.classFrom || "");
      formData.append("classToNur", classConfigData.Nursery.classTo || "");
      formData.append("armFromNur", classConfigData.Nursery.armFrom || "");
      formData.append("armToNur", classConfigData.Nursery.armTo || "");
    }

    // Primary classes
    if (classConfigData.Primary) {
      formData.append("classFromPry", classConfigData.Primary.classFrom || "");
      formData.append("classToPry", classConfigData.Primary.classTo || "");
      formData.append("armFromPry", classConfigData.Primary.armFrom || "");
      formData.append("armToPry", classConfigData.Primary.armTo || "");
    }

    // Secondary classes
    if (classConfigData.Secondary) {
      formData.append(
        "classFromSec",
        classConfigData.Secondary.classFrom || "",
      );
      formData.append("classToSec", classConfigData.Secondary.classTo || "");
      formData.append("armFromSec", classConfigData.Secondary.armFrom || "");
      formData.append("armToSec", classConfigData.Secondary.armTo || "");
    }

    // Add fees as JSON string
    formData.append("fees", JSON.stringify(fees));

    return formData;
  };

  const handleContinue = async () => {
    try {
      setLoading(true);

      const formData = formatDataForAPI();

      // Send to API
      const response = await axios.post(
        "https://ucheva.onrender.com/api/v1/admin/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Clear localStorage on success
      localStorage.removeItem("schoolProfile");
      localStorage.removeItem("classConfig");
      localStorage.removeItem("fees");

      // Navigate to success page
      nav("/Success");
    } catch (error) {
      console.error("Error submitting onboarding data:", error);
      alert(
        `Error: ${error.response?.data?.message || error.message || "Failed to complete onboarding"}`,
      );
      setLoading(false);
    }
  };

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
            {fees.length > 0 ? (
              fees.map((fee) => (
                <ul key={fee.id}>
                  <ul>{fee.feeType}</ul>
                  <ul>{fee.paymentOption}</ul>
                  <ul>{fee.amount}</ul>
                  <ul className="AddedFeeAction">
                    <img
                      src={editIcon}
                      alt="edit"
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={deleteIcon}
                      alt="delete"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteFee(fee.id)}
                    />
                  </ul>
                </ul>
              ))
            ) : (
              <div
                style={{ padding: "20px", textAlign: "center", color: "#999" }}
              >
                No fees added yet
              </div>
            )}
          </article>

          <div className="ButtonContainer">
            <button
              type="button"
              className="AnotherFee"
              onClick={() => setShowModal(true)}
            >
              {" + "} Add Fee
            </button>
          </div>
        </section>
        <nav className="SkipContinueBtns3">
          <button type="button" className="SkipBtn3">
            Skip
          </button>
          <button
            type="button"
            className="continueBtn3"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Continue"}
          </button>
        </nav>
      </article>
      {showModal && (
        <AddFeeModal
          closeModal={() => setShowModal(false)}
          onAddFee={handleAddFee}
        />
      )}
    </main>
  );
};

export default Step3;
