import React from "react";
import "../styles/auth-layout.css";
// import logo from "../../../assets/public/logo.png";
import Ucheva from "../../../assets/Logo.svg";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <aside className="auth-sidebar" aria-hidden="true">
        <div className="sidebar-card">
          <div className="brand-logo">
            <img src={Ucheva} alt="Ucheva Logo" />
          </div>

          <div className="sidebar-content">
            <h1>Let’s get your school started!</h1>
            <p>
              A simpler way to manage your school, support your staff, and stay
              connected with parents.
            </p>
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
