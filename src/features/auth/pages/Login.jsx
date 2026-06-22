import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/login.css";
import { apiClient } from "../../../config/AxiosInstance";
import {
  setToken,
  setUser,
  setStaffUser,
  setStaffToken,
} from "../../../global/userSlice";
import { toast } from "react-toastify";

const Login = () => {
    const subdomain = window.location.hostname.split(".")[0];

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        headers: {
          "x-tenant": subdomain,
        },
      });

      const { data: user, token } = response.data;

      // Save user and token in Redux
      dispatch(setUser(user));
      dispatch(setToken(token));

      // Save staff-specific data
      if (user.role === "staff" || user.staffType) {
        dispatch(setStaffUser(user));
        dispatch(setStaffToken(token));
      }

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "parent") {
        navigate("/parentdashboard");
      } else if (user.role === "staff") {
        switch (user.staffType?.trim().toLowerCase()) {
          case "class teacher":
            navigate("/CTdashboard");
            break;

          case "subject teacher":
            navigate("/subjectteacherdashboard");
            break;

          case "non-teaching staff":
            navigate("/bursary");
            break;

          default:
            navigate("/");
        }
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
    <div className="login-page-wrapper">
      <h2 className="login-title-heading">Log In</h2>

      {error && <p className="login-error-toast">{error}</p>}

      <form onSubmit={handleLoginSubmit} className="login-form">
        {/* Email */}
        <div className="form-control-group">
          <label className="input-field-label">Email</label>
          <input
            type="email"
            placeholder="e.g example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="login-input-field"
          />
        </div>

        {/* Password */}
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
              className="password-toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Role Selection */}
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
            className="forgot-password-trigger"
            onClick={() => !loading && navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="login-submit-button"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="login-footer-nav">
        Don't have an account?{" "}
        <span
          className="signup-link-span"
          onClick={() => !loading && navigate("/signup")}
        >
          Create Account
        </span>
      </p>
    </div>
  );
};

export default Login;
