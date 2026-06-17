import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { apiClient } from "../../../config/AxiosInstance";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../global/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subdomain = window.location.hostname.split(".")[0];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        email,
        password,
        role: role.toLowerCase(),
      };

      const response = await apiClient.post("/admin/login", payload, {
        headers: { "x-tenant": subdomain },
      });

      const { data: user, token } = response.data;
      localStorage.setItem("authToken", token);

      // 1. Save to Redux
      dispatch(setUser(user));
      dispatch(setToken(token));

      // 2. Determine redirect path
      if (user.role === "admin") {
        // Check if completedOnboarding is true (handling null/false/undefined)
        if (user.completedOnboarding === true) {
          navigate("/admin/dashboard");
        } else {
          navigate("/onboarding");
        }
      } else if (user.role === "parent") {
        navigate("/parent/dashboard");
      } else if (user.role === "staff") {
        // ... keep your existing switch case for staff
        navigate("/staff/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid credentials or login configurations.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-viewport">
      <div className="login-card-box">
        {/* Title */}
        <h1 className="login-title">Log In</h1>

        {error && <p className="login-error-alert">{error}</p>}

        <form onSubmit={handleLoginSubmit} className="login-form">
          {/* Email Input */}
          <div className="form-control-group">
            <label className="input-field-label">Email</label>
            <input
              type="email"
              placeholder="e.g: example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="login-input-field"
            />
          </div>

          {/* Password Input */}
          <div className="form-control-group">
            <label className="input-field-label">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="login-input-field password-field"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-visibility"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="visibility-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="visibility-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Role Selection Row & Forgot Password */}
          <div className="login-options-row">
            <div className="radio-options-container">
              {["Admin", "Staff", "Parent"].map((item) => (
                <label key={item} className="radio-label-option">
                  <input
                    type="radio"
                    name="loginRole"
                    checked={role === item}
                    onChange={() => setRole(item)}
                    disabled={loading}
                    className="role-radio-input"
                  />
                  {item}
                </label>
              ))}
            </div>

            <span
              onClick={() => !loading && navigate("/forgot-password")}
              className="forgot-password-trigger"
            >
              Forgot Password?
            </span>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="login-submit-button"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Footer Link Container */}
        <p className="login-footer-nav">
          Don't have an account?{" "}
          <span
            onClick={() => !loading && navigate("/signup")}
            className="signup-link-span"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
