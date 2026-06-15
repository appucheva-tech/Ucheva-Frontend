import React, { useState } from "react";
import "./Header.css";
import Logo from "../assets/Logo.svg";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleLogin = () => console.log("Log In clicked");
  const handleStart = () => console.log("Get Started clicked");

  const handleNavigation = (path) => {
    nav(path);
    setOpen(false);
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
              nav("/Auth");
              setOpen(false);
            }}
            type="get-started"
          />
        </div>
      </ul>

      <div className="BBHeaderCont3">
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
