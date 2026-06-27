import React from "react";
import "../styles/loading-screen.css";
import BrandLogo from "../assets/brand-logo.png";

const LoadingScreen = ({ inline = false }) => {
  return (
    <div className={inline ? "spinner-inline-wrapper" : "modern-loading-overlay"}>
      <div className="inline-spinner-container">
        <div className="inline-spinner-ring"></div>
        <div className="inline-spinner-logo">
          <img src={BrandLogo} alt="Loading..." />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;