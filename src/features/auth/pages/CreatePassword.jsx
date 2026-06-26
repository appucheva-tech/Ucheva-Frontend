import React, { useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { apiClient } from "../../../config/AxiosInstance";
import "../styles/verify-email.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Ucheva from "../../../assets/Logo.svg";

const CreatePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { token } = useParams();
  console.log(token);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

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

      const response = await apiClient.post(`/staff/create-password/${token}`, {
        token,
        password,
        confirmPassword,
      });

      const data = response.data;

      setSuccessMessage(
        data?.message || "Password created successfully! Redirecting...",
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
        <div className="login-mobile-logo">
          <img src={Ucheva} alt="Ucheva Logo" onClick={() => navigate("/")} />
        </div>
        <h1 className="verify-title">Create Password</h1>

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

          {error && <p className="otp-error-toast">{error}</p>}
          {successMessage && (
            <p className="otp-success-toast">{successMessage}</p>
          )}

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
