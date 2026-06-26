import React from "react";
import "../styles/loading-screen.css";
import BrandLogo from "../assets/brand-logo.png"; // Adjust this relative path if necessary to point to your asset folder

const LoadingScreen = () => {
  return (
    <div className="modern-loading-overlay">
      <div className="modern-spinner-wrapper">
        {/* Modern double-ring progressive tracking */}
        <div className="spinner-track-outer"></div>
        <div className="spinner-track-inner"></div>

        {/* Center core brand logo via clean image source */}
        <div className="spinner-brand-logo">
          <img
            src={BrandLogo}
            alt="Brand Logo"
            className="spinner-logo-image"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
