import React from "react";
import "./Ready.css";
import AdminMobile from "../assets/AdminMobile.png";

const Ready = () => {
  return (
    <div className="bbanner-container">
      <div className="banner-content">
        <h1 className="banner-titles">
          Ready to Transform The Way Your School Operates?
        </h1>
        <p className="banner-subtitle">
          Simplify attendance, fees, and report cards with one easy platform.
        </p>
        <button className="banner-btn">Start Free</button>
      </div>

      <img src={AdminMobile} alt="" className="AdminMobilePh" />
    </div>
  );
};

export default Ready;
