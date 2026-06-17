import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/verify-email.css"; // Reusing your layout styling classes
import { apiClient } from "../../../config/AxiosInstance";

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

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const payload = {
        // email: userEmail,
        password: password,
      };

      console.log("[API Call] Submitting new password credentials.");

      // Fire your reset completion route
      await apiClient.post("/admin/reset-password", payload, {
        headers: {
          "x-tenant": subdomain,
        },
      });

      setSuccessMessage(
        "Password updated successfully! Redirecting to log in...",
      );

      // Manual navigation route shift to login after success
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
            {/* New Password Input Field */}
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
              <input
                type="password"
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
                }}
              />
            </div>

            {/* Confirm Password Input Field */}
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
              <input
                type="password"
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
                }}
              />
            </div>
          </div>

          {successMessage && (
            <p className="otp-success-alert">{successMessage}</p>
          )}
          {error && <p className="otp-error-alert">{error}</p>}

          <button
            type="submit"
            className="verify-submit-button"
            disabled={loading || !password || !confirmPassword}
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
