import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/verify-email.css"; // Reusing your layout styling classes
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
    <div className="verify-page-viewport">
      <div className="verify-card-box">
        <div className="mobile-logo">
          <img src={Ucheva} alt="Ucheva Logo" onClick={() => navigate("/")}/>
        </div>
        <h1 className="verify-title">Reset Password</h1>

        <p className="verify-subtext">
          Create a new password secure credentials for <br />
          <span className="user-email-highlight">
            {userEmail || "your account"}
          </span>
        </p>

        <form onSubmit={handleResetSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <label
                style={{ fontSize: "14px", marginBottom: "6px", color: "#666" }}
              >
                New Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={loading}
                  style={{
                    padding: "12px",
                    borderRadius: "6px",
                    border: error ? "1px solid #ff4d4f" : "1px solid #d9d9d9",
                    outline: "none",
                    fontSize: "15px",
                    width: "100%",
                    paddingRight: "40px",
                  }}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#666",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <label
                style={{ fontSize: "14px", marginBottom: "6px", color: "#666" }}
              >
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={loading}
                  style={{
                    padding: "12px",
                    borderRadius: "6px",
                    border: error ? "1px solid #ff4d4f" : "1px solid #d9d9d9",
                    outline: "none",
                    fontSize: "15px",
                    width: "100%",
                    paddingRight: "40px",
                  }}
                />

                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#666",
                  }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>

          {successMessage && (
            <p className="otp-success-toast">{successMessage}</p>
          )}
          {error && <p className="otp-error-toast">{error}</p>}

          <button
            type="submit"
            className="verify-submit-button"
            disabled={loading || !password || !confirmPassword }
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <p className="verify-footer-nav">
          Remember your password?{" "}
          <span className="login-link-span" onClick={() => navigate("/login")}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
