import React from "react";
import { useNavigate } from "react-router-dom";
import "./Ready.css";
import AdminMobile from "../assets/AdminMobile.png";

const Ready = () => {
  const nav = useNavigate();
  return (
    <div className="KKbbanner-container">
      <div className="KKbanner-content">
        <h1 className="KKbanner-titles">
          Ready to Transform The Way Your School Operates?
        </h1>
        <p className="KKbanner-subtitle">
          Simplify attendance, fees, and report cards with one easy platform.
        </p>
        <button className="KKbanner-btn" onClick={() => nav ('./signup')}>Start Free</button>
      </div>

      <img src={AdminMobile} alt="" className="KKAdminMobilePh" />
    </div>
  );
};

export default Ready;