import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/auth-layout.css";
import Ucheva from "../../../assets/Logo.svg";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Define content based on the path
  const getContent = () => {
    switch (pathname) {
      case "/signup":
        return {
          title: "Let’s get your school started!",
          desc: "A simpler way to manage your school, support your staff, and stay connected with parents.",
        };
      case "/login":
        return {
          title: "Welcome back!",
          desc: "Log in to access your school portal and continue managing your institution.",
        };
      case "/forgot-password":
        return {
          title: "Reset your password",
          desc: "Enter your registered email address to receive instructions on how to reset your password.",
        };
      default:
        return {
          title: "Manage your school with ease",
          desc: "Experience a seamless management system designed for modern institutions.",
        };
    }
  };

  const content = getContent();

  return (
    <div className="auth-container">
      <aside className="auth-sidebar" aria-hidden="true">
        <div className="sidebar-card">
          <div className="brand-logo">
            <img src={Ucheva} alt="Ucheva Logo" onClick={() => navigate("/")} />
          </div>

          <div className="sidebar-content">
            <h1>{content.title}</h1>
            <p>{content.desc}</p>
          </div>

          <div className="sidebar-bg-image"></div>
        </div>
      </aside>

      <main className="auth-content">
        <div className="form-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
