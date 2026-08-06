import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/reset-password.css";
import { apiClient } from "../../../config/AxiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Ucheva from "../../../assets/Logo.svg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subdomain = window.location.hostname.split(".")[0];

  // Safely grab the passed email context from the router state
  const userEmail = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      setError("Session expired or missing email context. Please start over.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please fill out all input fields.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const payload = {
        email: userEmail,
        newPassword: password,
        confirmPassword: password,
      };

      console.log("[API Call] Submitting new password credentials.");

      await apiClient.post("/admin/reset-password", payload, {
        headers: {
          "x-tenant": subdomain,
        },
      });

      setSuccessMessage(
        "Password updated successfully! Redirecting to log in...",
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Reset-page-wrapper">
      <div className="Reset-mobile-logo">
        <img src={Ucheva} alt="Ucheva Logo" onClick={() => navigate("/")} />
      </div>

      <h1 className="Reset-title-heading">Reset Password</h1>

      {/* <p className="Reset-subtext">
        Create a new password secure credentials for <br />
        <span className="Reset-user-email-highlight">
          {userEmail || "your account"}
        </span>
      </p> */}

      <form className="Reset-form" onSubmit={handleResetSubmit}>
        <div className="Reset-form-control-group">
          <label className="Reset-input-field-label">New Password</label>
          <div className="Reset-password-input-wrapper">
            <input
              className="Reset-input-field Reset-password-field"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              disabled={loading}
            />
            <button
              type="button"
              className="Reset-password-toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="Reset-form-control-group">
          <label className="Reset-input-field-label">Confirm Password</label>
          <div className="Reset-password-input-wrapper">
            <input
              className="Reset-input-field Reset-password-field"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
              disabled={loading}
            />
            <button
              type="button"
              className="Reset-password-toggle-visibility"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {successMessage && (
          <p className="Reset-success-toast">{successMessage}</p>
        )}
        {error && <p className="Reset-error-toast">{error}</p>}

        <button
          type="submit"
          className="Reset-submit-button"
          disabled={loading || !password || !confirmPassword}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      <p className="Reset-footer-nav">
        Remember your password?{" "}
        <span
          className="Reset-login-link-span"
          onClick={() => navigate("/login")}
        >
          Log in
        </span>
      </p>
    </div>
  );
};

export default ResetPassword;