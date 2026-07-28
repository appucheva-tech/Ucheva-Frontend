import React, { useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { apiClient } from "../../../config/AxiosInstance";
import "../styles/CreatePassword.css";
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
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <div className="CreatePassword-page-viewport">
      <div className="CreatePassword-RightHolder">
        <div className="CreatePassword-brand-logo">
          <img src={Ucheva} alt="Ucheva Logo" onClick={() => navigate("/")} />
        </div>
      </div>

      <div className="CreatePassword-LeftHolder">
        <div className="CreatePassword-card-box">
          <div className="CreatePassword-mobile-logo">
            <img src={Ucheva} alt="Ucheva Logo" onClick={() => navigate("/")} />
          </div>
          <h1 className="CreatePassword-title">Create Password</h1>

          <form onSubmit={handleResetSubmit} className="CreatePassword-form">
            <div className="CreatePassword-form-fields">
              <div className="CreatePassword-form-group">
                <label className="CreatePassword-input-label">
                  New Password
                </label>

                <div className="CreatePassword-password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    disabled={loading}
                    className={`CreatePassword-input-field ${error ? "CreatePassword-input-error" : ""}`}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="CreatePassword-toggle-visibility"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="CreatePassword-form-group">
                <label className="CreatePassword-input-label">
                  Confirm Password
                </label>
                <div className="CreatePassword-password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError("");
                    }}
                    disabled={loading}
                    className={`CreatePassword-input-field ${error ? "CreatePassword-input-error" : ""}`}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="CreatePassword-toggle-visibility"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            {error && <p className="CreatePassword-error-toast">{error}</p>}
            {successMessage && (
              <p className="CreatePassword-success-toast">{successMessage}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password || !confirmPassword}
              className="CreatePassword-submit-button"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </form>

          <div className="CreatePassword-Edu-form"></div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;