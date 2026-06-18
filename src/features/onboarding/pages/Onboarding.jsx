import React, { useState } from "react";
// import logo from "../../../assets/public/logo.png";
import Ucheva from "../../../assets/Logo.svg";
import SchoolProfileStep from "../components/SchoolProfileStep";
import ClassesStep from "../components/Classes";
import FeeStructureStep from "../components/FeeStructureStep";
import OnboardingSuccess from "../components/OnboardingSuccess";
import "../styles/onboarding.css";
import { apiClient } from "../../../config/AxiosInstance";

const OnboardingStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subdomain = window.location.hostname.split(".")[0];

  const [formData, setFormData] = useState({
    schoolName: "Green Field Academy",
    schoolUrl: "https://greenfieldacademy.ucheva.com",
    email: "greenfieldacademy@gmail.com",
    phone: "",
    address: "12/15 Alao street, Ikeja, Lagos.",
    schoolType: "Secondary School",
    selectedSections: ["primary", "secondary"],
    classConfig: {
      nursery: {
        classFrom: "Creche",
        classTo: "Nursery 3",
        armFrom: "A",
        armTo: "",
      },
      primary: {
        classFrom: "Primary 1",
        classTo: "Primary 5",
        armFrom: "A",
        armTo: "",
      },
      secondary: {
        classFrom: "JSS 1",
        classTo: "SS 3",
        armFrom: "A",
        armTo: "",
      },
    },
    fees: [], // ✅ fixed: start with empty array, FeeStructureStep populates it
  });
  console.log(formData);

  const steps = [
    {
      id: "school-profile",
      label: "School Profile",
      title: "Let's set up your school profile",
      component: SchoolProfileStep,
      showSkip: false,
    },
    {
      id: "classes",
      label: "Classes",
      title: "Configure your classes",
      component: ClassesStep,
      showSkip: true,
    },
    {
      id: "fee-structure",
      label: "Fee Structure",
      title: "Set up your fee structure",
      component: FeeStructureStep,
      showSkip: true,
    },
  ];

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setLogoFile(null);
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSubmitting(true);
      try {
        const payload = new FormData();
        if (logoFile) payload.append("image", logoFile);

        // 1. School Type mapping passed as a stringified array so backend can run .forEach()
        payload.append("schoolType", JSON.stringify(formData.selectedSections));

        // 2. Nursery Configuration Mapping
        if (
          formData.classConfig.nursery &&
          formData.selectedSections.includes("nursery")
        ) {
          payload.append(
            "classFromNur",
            formData.classConfig.nursery.classFrom || "",
          );
          payload.append(
            "classToNur",
            formData.classConfig.nursery.classTo || "",
          );
          payload.append(
            "armFromNur",
            formData.classConfig.nursery.armFrom || "",
          );
          payload.append("armToNur", formData.classConfig.nursery.armTo || "");
        }

        // 3. Primary Configuration Mapping
        if (
          formData.classConfig.primary &&
          formData.selectedSections.includes("primary")
        ) {
          payload.append(
            "classFromPry",
            formData.classConfig.primary.classFrom || "",
          );
          payload.append(
            "classToPry",
            formData.classConfig.primary.classTo || "",
          );
          payload.append(
            "armFromPry",
            formData.classConfig.primary.armFrom || "",
          );
          payload.append("armToPry", formData.classConfig.primary.armTo || "");
        }

        // 4. Secondary Configuration Mapping
        if (
          formData.classConfig.secondary &&
          formData.selectedSections.includes("secondary")
        ) {
          payload.append(
            "classFromSec",
            formData.classConfig.secondary.classFrom || "",
          );
          payload.append(
            "classToSec",
            formData.classConfig.secondary.classTo || "",
          );
          payload.append(
            "armFromSec",
            formData.classConfig.secondary.armFrom || "",
          );
          payload.append(
            "armToSec",
            formData.classConfig.secondary.armTo || "",
          );
        }

        // 5. Fees Structured Matrix Mapping
        if (formData.fees && formData.fees.length > 0) {
          const mainFee = formData.fees[0];
          payload.append("className", (mainFee.className || [])[0] || ""); // ✅ send first class only
          payload.append("feeType", mainFee.feeType || "");
          payload.append("amount", mainFee.amount || "");
          payload.append(
            "paymentOption",
            mainFee.paymentOption || "Full Payment",
          );
          payload.append(
            "numberOfInstallments",
            mainFee.numInstallments || "1",
          );
        }

        console.log("pay: " ,payload)

        await apiClient.post("/admin/profile", formData, {
          headers: {
            "x-tenant": subdomain,
            "Content-Type": null,
          },
        });
        setIsCompleted(true);
      } catch (error) {
        console.error("API Error:", error);
        alert("Failed to save. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SchoolProfileStep
            formData={formData}
            setFormData={setFormData}
            logoPreview={logoPreview}
            handleLogoUpload={handleLogoUpload}
            handleRemoveLogo={handleRemoveLogo}
          />
        );
      case 2:
        return <ClassesStep formData={formData} setFormData={setFormData} />;
      case 3:
        return (
          <FeeStructureStep formData={formData} setFormData={setFormData} />
        );
      default:
        return null;
    }
  };

  if (isCompleted) {
    return (
      <div className="success-screen-wrapper">
        <div
          className="top-navbar"
          style={{ borderBottom: "1px solid #f9fafb", paddingBottom: "1.5rem" }}
        >
          <div className="brand-identity">
            <img src={Ucheva} alt="Ucheva Logo" />
          </div>
        </div>
        <OnboardingSuccess
          onGetStarted={() => (window.location.href = "/admin/dashboard")}
        />
      </div>
    );
  }

  return (
    <div className="onboarding-container">
      <div className="top-navbar">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="back-action-btn"
          >
            ‹ Back
          </button>
        ) : (
          <div className="brand-identity">
            <img src={Ucheva} alt="Ucheva Logo" />
          </div>
        )}
        <span className="step-tracker-count">
          Step {currentStep} of {steps.length}
        </span>
      </div>

      <div className="hero-header-panel">
        <h1 className="hero-main-title">{steps[currentStep - 1]?.title}</h1>
        <p className="hero-sub-description">
          {steps[currentStep - 1]?.description}
        </p>
      </div>

      <div className="stepper-progress-mesh">
        <div className="onboarding-stepper-node-row">
          <div className="progress-track-line-bg" />
          <div
            className="progress-track-line-active"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const stateClass = isCompleted || isActive ? "active" : "inactive";
            return (
              <div key={index} className="step-node-point">
                <div className={`step-node-circle ${stateClass}`}>
                  {isCompleted ? "✓" : stepNumber}
                </div>
                <span className={`step-node-label ${stateClass}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-workspace-card">
        <form onSubmit={handleFormSubmission}>
          {renderStepComponent()}
          <div className="footer-navigation-action-bar">
            {currentStep === 2 || currentStep === 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="skip-step-btn"
              >
                Skip
              </button>
            ) : (
              <div />
            )}
            <button
              type="submit"
              className="primary-navigation-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : currentStep === 3
                  ? "Complete"
                  : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingStepper;