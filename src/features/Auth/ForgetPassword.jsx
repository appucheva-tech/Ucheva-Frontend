import React, { useState } from "react";
import "./AuthStyles/ForgetPassword.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiClient } from "../../config/AxiosInstance";

const ForgetPassword = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email address is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address (e.g., example@gmail.com)");
      return;
    }

    try {
      setIsLoading(true);
      const response = await ApiClient.post("/admin/forgot-password", email,{
        
      });

      toast.success(
        response?.data?.message || "Verification code sent to your email",
      );

      localStorage.setItem("forgotuserEmail", email);

      setTimeout(() => {
        nav("/inputCode");
      }, 1500);
    } catch (error) {
      console.error("Forget password error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="forgetPassword_container geist-content">
      <ToastContainer position="top-right" autoClose={5000} />

      <article className="forgetPassword_holder">
        <aside className="forgetPassword_left">
          <img
            src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png"
            alt="signup img"
          />
          <div className="Login-forgetPassword">
            <img
              src="https://i.postimg.cc/PJgRQh50/logo.png"
              alt="logo"
              onClick={() => nav("/")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="forgetPassword_text">
            <h1>Forgot Password?</h1>
            <p>
              Don't worry! Enter your email address and we'll send you a code to
              reset your password.
            </p>
          </div>
        </aside>

        <aside className="forgetPassword_right">
          <h2>Forgot Password?</h2>
          <label className="forgetPassword_description">
            Enter your registered email address and we'll send you a 6 digit
            code to reset your password.
          </label>

          <form className="forgetPassword_form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              className={`forgetPassword_input ${error ? "error-input" : ""}`}
              placeholder="e.g: example@gmail.com"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              autoComplete="email"
            />
            {error && <div className="error-message">{error}</div>}
          </form>

          <div className="ForgetPasswordBtn">
            <button
              className="forgetPassword_btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Code"}
            </button>

            {/* <label className="backToLogin" onClick={() => nav("/login")}>
              ← Back to Login
            </label> */}
          </div>
        </aside>
      </article>
    </section>
  );
};

export default ForgetPassword;
