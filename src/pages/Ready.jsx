import React from "react";
import { useNavigate } from "react-router-dom";
import "./Ready.css";
import AdminMobile from "../assets/AdminMobile.png";

const Ready = () => {
  const nav = useNavigate();
  return (
    <div className="bbanner-container">
      <div className="banner-content">
        <h1 className="banner-titles">
          Ready to Transform The Way Your School Operates?
        </h1>
        <p className="banner-subtitle">
          Simplify attendance, fees, and report cards with one easy platform.
        </p>
        <button className="banner-btn" onClick={() => nav ('./signup')}>Start Free</button>
      </div>

      <img src={AdminMobile} alt="" className="AdminMobilePh" />
    </div>
  );
};

export default Ready;
