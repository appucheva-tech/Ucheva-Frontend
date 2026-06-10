import React, { useState } from "react";
import "./AuthStyles/ResetPassword.css";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const BaseUrl = import.meta.env.VITE_Base_Url;
  const userEmail = localStorage.getItem("userEmail");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
      return "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character (@$!%*?&)";
    }
    return null;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!userEmail) {
      toast.error("No email found. Please start over.");
      nav("/forgetpassword");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/admin/reset-password`, {
        email: userEmail,
        newPassword: password,
        newPasswordConfirm: confirmPassword,
      });

      toast.success(response?.data?.message || "Password reset successfully");

      setTimeout(() => {
        nav("/login");
      }, 2000);
    } catch (error) {
      console.error("Reset password error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);

      if (error.response?.data?.message) {
        setErrors({ form: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="RestPassword_container geist-content">
      <ToastContainer position="top-right" autoClose={5000} />

      <article className="RestPassword_holder">
        <aside className="RestPassword_left">
          <img
            src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png"
            alt="signup img"
          />
          <div className="RestPassword_logo">
            <img
              src="https://i.postimg.cc/PJgRQh50/logo.png"
              alt="logo"
              onClick={() => nav("/")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="RestPassword_text">
            <h1>Create New Password</h1>
            <p>
              Your new password must be different from your previous password
              and meet the security requirements.
            </p>
          </div>
        </aside>

        <aside className="RestPassword_right">
          <h2>Reset Password</h2>

          <form className="RestPassword_form" onSubmit={handleSubmit}>
            <label>Enter new password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className={`RestPassword_input ${errors.password ? "error-input" : ""}`}
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </form>

          <div className="RestPassword_form">
            <label>Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`RestPassword_input ${errors.confirmPassword ? "error-input" : ""}`}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          {errors.form && (
            <div className="error-message form-error">{errors.form}</div>
          )}

          <div className="RestPasswordBtn">
            <button
              className="RestPassword_btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
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

export default ResetPassword;
