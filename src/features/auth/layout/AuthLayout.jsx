import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/auth-layout.css";
import Ucheva from "../../../assets/Logo.svg";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Define content based on the path - ONLY login and signup have content
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
          desc: "Log in to access your school workspace and continue where you left off.",
        };
      default:
        return {
          title: "",
          desc: "",
        };
    }
  };

  const content = getContent();

  // Check if content should be shown (only for login and signup)
  const showContent = pathname === "/login" || pathname === "/signup";

  return (
    <div className="auth-container">
      <aside className="auth-sidebar" aria-hidden="true">
        <div className="sidebar-card">
          <div className="brand-logo">
            <img src={Ucheva} alt="Ucheva Logo" onClick={() => navigate("/")} />
          </div>

          <div className="sidebar-content">
            {showContent && (
              <>
                <h1>{content.title}</h1>
                <p>{content.desc}</p>
              </>
            )}
          </div>

          <div className="sidebar-bg-image"></div>
        </div>
      </aside>

      <main className="auth-content">
        <div className="form-wrapper">
          <Outlet />
          <div className="Edu-form"></div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;