import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiClient } from "../../../config/AxiosInstance";
import "../styles/verify-email.css";

const CreatePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!token) {
      setError("Invalid or expired invitation link.");
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

      const response = await apiClient.post(
        `/staff/create-password/${token}`,
        {
          token,
          password,
          confirmPassword,
        }
      );

      const data = response.data;

      setSuccessMessage(
        data?.message || "Password created successfully! Redirecting..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page-viewport">
      <div className="verify-card-box">
        <h1 className="verify-title">Create Password</h1>

        <form onSubmit={handleResetSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
            
            <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
              <label style={{ fontSize: "14px", marginBottom: "6px", color: "#666" }}>
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                disabled={loading}
                placeholder="Enter new password"
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #d9d9d9",
                  fontSize: "15px",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
              <label style={{ fontSize: "14px", marginBottom: "6px", color: "#666" }}>
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
                disabled={loading}
                placeholder="Confirm new password"
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #d9d9d9",
                  fontSize: "15px",
                }}
              />
            </div>
          </div>

          {error && <p className="otp-error-alert">{error}</p>}
          {successMessage && <p className="otp-success-alert">{successMessage}</p>}

          <button
            type="submit"
            disabled={loading || !password || !confirmPassword}
            className="verify-submit-button"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;