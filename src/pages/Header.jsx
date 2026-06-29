import React, { useState } from "react";
import "./Header.css";
import Logo from "../assets/Logo.svg";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";

const getDashboardByRole = (user) => {
  if (!user) return "/login";
  if (user.role === "admin") return "/admin/dashboard";
  if (user.role === "parent") return "/parentdashboard";
  if (user.role === "staff") {
    switch (user.staffType?.trim().toLowerCase()) {
      case "class teacher": return "/CTdashboard";
      case "subject teacher": return "/subjectteacherdashboard";
      case "non-teaching staff": return "/bursary";
      case "security": return "/securitydashboard";
      default: return "/";
    }
  }
  return "/";
};

const Header = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.user.user || state.staff.staffUser);
  const token = useSelector((state) => state.user.token || state.staff.staffToken);

  const handleLogin = () => console.log("Log In clicked");
  const handleStart = () => console.log("Get Started clicked");

  const handleNavigation = (path) => {
    nav(path);
    setOpen(false);
  };

  const handleDashboardClick = () => {
    const dashboardPath = getDashboardByRole(user);
    nav(dashboardPath);
  };

  return (
    <header className="BBHeader BBgeist-content">
      <div className="BBHeaderCont1">
        <img src={Logo} alt="Ucheva Logo" className="BBHeaderCont1Logo" />
      </div>

      <ul className={`BBHeaderCont2 ${open ? "BBactive" : ""}`}>
        <li
          className={`BBHeaderCont2Li ${location.pathname === "/" ? "BBactive-link" : ""}`}
          onClick={() => handleNavigation("/")}
        >
          Home
        </li>
        <li
          className={`BBHeaderCont2Li ${location.pathname === "/Pricing" ? "BBactive-link" : ""}`}
          onClick={() => handleNavigation("/Pricing")}
        >
          Pricing
        </li>
        <li
          className={`BBHeaderCont2Li ${location.pathname === "/AboutUs" ? "BBactive-link" : ""}`}
          onClick={() => handleNavigation("/AboutUs")}
        >
          About Us
        </li>
        <li
          className={`BBHeaderCont2Li ${location.pathname === "/ContactUs" ? "BBactive-link" : ""}`}
          onClick={() => handleNavigation("/ContactUs")}
        >
          Contact Us
        </li>

        <div className="BBMobileNavButtons">
          {token && user ? (
            <Button
              text="Back to Dashboard"
              onClick={() => {
                handleDashboardClick();
                setOpen(false);
              }}
              type="get-started"
            />
          ) : (
            <>
              <Button
                text="Log In"
                onClick={() => {
                  nav("/login");
                  setOpen(false);
                }}
                type="login"
              />
              <Button
                text="Get Started"
                onClick={() => {
                  nav("/signup");
                  setOpen(false);
                }}
                type="get-started"
              />
            </>
          )}
        </div>
      </ul>

      <div className="BBHeaderCont3">
        {token && user ? (
          <Button
            text="Back to Dashboard"
            onClick={handleDashboardClick}
            type="get-started"
          />
        ) : (
          <>
            <Button
              text="Log In"
              onClick={(handleLogin) => {
                nav("/login");
              }}
              type="login"
            />
            <Button
              text="Get Started"
              onClick={(handleStart) => {
                nav("/signup");
              }}
              type="get-started"
            />
          </>
        )}

        <div className="BBMobileMenuIconDiv">
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
