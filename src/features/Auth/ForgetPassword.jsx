import React, { useState } from "react";
import "./AuthStyles/ForgetPassword.css"
import { useNavigate } from "react-router-dom";

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
  };

  return (
    <section className="forgetPassword_container geist-content">
      <article className="forgetPassword_holder">
        <aside className="forgetPassword_left">
          <img
            src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png"
            alt="signup img"
          />
          <div className="Login-forgetPassword">
            <img src="https://i.postimg.cc/PJgRQh50/logo.png" alt="" />
          </div>
        </aside>
        <aside className="forgetPassword_right">
          <h2>Forget Password?</h2>
          <label>
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
          </div>
        </aside>
      </article>
    </section>
  );
};

export default ForgetPassword;