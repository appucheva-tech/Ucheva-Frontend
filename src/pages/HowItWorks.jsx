import React from "react";
import "./HowItWorks.css";
import { FaUser } from "react-icons/fa";
import Ifeanacho from "../assets/Ifeanacho.jpg";
import { FaUserGear } from "react-icons/fa6";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "1. Create School Account",
      description:
        "Sign up with your school details. Set up your school profile, classes, and academic calendar.",
      imageClass: "GGimage-step-1",
    },
    {
      id: 2,
      title: "2. Add Students & Staff",
      description:
        "Import or manually add students and staff profiles. Assign them to classes, roles, and payment plans.",
      imageClass: "GGimage-step-2",
    },
    {
      id: 3,
      title: "3. Manage Operations Easily",
      description:
        "Track attendance daily, collect fees, send parent toasts, and monitor everything from your dashboard.",
      imageClass: "GGimage-step-3",
    },
  ];

  return (
    <>
      <div className="GGhow-it-works-container">
        <span className="GGsection-tag">How It Works</span>
        <h2 className="GGsection-title">
          Up and Running In Three Simple Steps
        </h2>
        <p className="GGsection-description">
          Get started in minutes with a simple process designed to help schools
          manage operations more efficiently.
        </p>
      </div>
      <div className="GGsteps-container">
        {steps.map((step) => (
          <div key={step.id} className="GGstep-card">
            <div className={`GGstep-image-holder ${step.imageClass}`}>
              {step.id === 1 && (
                <div className="GGmock-ui-1">
                  <div className="GGmock-bubble">
                    <div className="GGline GGshort"></div>
                    <div className="GGline GGlong"></div>
                    <div className="GGline GGshorter"></div>
                    <div className="GGline GGshort"></div>
                  </div>
                  <div className="GGmock-btn">
                    <span className="GGicon-user">
                      <FaUser className="GGicon" />
                    </span>
                    <span>Create Account</span>
                  </div>
                </div>
              )}
              {step.id === 2 && (
                <div className="GGmock-ui-2">
                  <div className="GGmock-bubble-top">
                    <div className="GGline GGmedium"></div>
                    <div className="GGline GGlong"></div>
                    <div className="GGavatar-line">
                      <img src={Ifeanacho} alt="" className="GGavatar" />
                      <div className="GGline GGshort"></div>
                    </div>
                  </div>
                  <div className="GGmock-bubble-bottom">
                    <div className="GGplus-btn">+</div>
                    <div className="GGline GGmedium"></div>
                  </div>
                </div>
              )}
              {step.id === 3 && (
                <div className="GGmock-ui-3">
                  <div className="GGchart-card">
                    <div className="GGbadge">
                      <FaUserGear className="GGbadgeImage" />
                    </div>
                    <div className="GGbar GGbar-1"></div>
                    <div className="GGbar GGbar-2"></div>
                    <div className="GGbar GGbar-3"></div>
                    <div className="GGbar GGbar-4"></div>
                    <div className="GGbar GGbar-5"></div>
                  </div>
                </div>
              )}
            </div>
            <h3 className="GGstep-title">{step.title}</h3>
            <p className="GGstep-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HowItWorks;
