import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forgot-password.css";
import { apiClient } from "../../../config/AxiosInstance";
import Ucheva from "../../../assets/Logo.svg";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const subdomain = window.location.hostname.split(".")[0];

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const payload = { email };

      console.log("[API Call] Requesting password reset for:", payload);

      // 1. Send the reset token request to the server
      await apiClient.post("/admin/forgot-password", payload, {
        headers: {
          "x-tenant": subdomain,
        },
      });

      // 2. Set the success banner state context
      setSuccessMessage(
        "A password reset link has been dispatched to your email address.",
      );
      setEmail(""); // Reset input field on success

      // 3. Pause for 2 seconds so they read the success message, then navigate
      setTimeout(() => {
        navigate("/verify-password", { state: { email: email } });
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to initiate password reset. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-viewport">
      <div className="forgot-password-box">
        <div className="forgot-mobile-logo">
          <img src={Ucheva} alt="Ucheva Logo" onClick={() => navigate("/")} />
        </div>
        <h1 className="forgot-password-title">Forgot Password</h1>
        <p className="forgot-password-subtitle">
          Enter your registered email address below to receive password recovery
          instructions.
        </p>

        {error && <p className="forgot-password-error-toast">{error}</p>}
        {successMessage && (
          <p className="forgot-password-success-toast">{successMessage}</p>
        )}

        <form
          onSubmit={handleForgotPasswordSubmit}
          className="forgot-password-form"
        >
          {/* Email Input */}
          <div className="form-control-group">
            <label className="input-field-label">Email Address</label>
            <input
              type="email"
              placeholder="e.g: example@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              disabled={loading}
              className="forgot-password-input-field"
            />
          </div>

          {/* Action Action Trigger Control Buttons */}
          <button
            type="submit"
            disabled={loading || !email || !!error}
            className="forgot-password-submit-button"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Navigation Fallback Switch Actions Link */}
        <p className="forgot-password-footer-nav">
          Remembered your password?{" "}
          <span
            onClick={() => !loading && navigate("/login")}
            className="back-to-login-link"
          >
            Back to Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
