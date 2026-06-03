import React, { useState } from "react";
import "./AuthStyles/ResetPassword.css"
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
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

    nav("/login");
  };

  return (
    <section className="RestPassword_container geist-content">
      <article className="RestPassword_holder">
        <aside className="RestPassword_left">
          <img
            src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png"
            alt="signup img"
          />
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

          <form className="RestPassword_form" onSubmit={handleSubmit}>
            <label>Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`RestPassword_input ${errors.confirmPassword ? "error-input" : ""}`}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
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
          </form>

          <div className="RestPasswordBtn">
            <button className="RestPassword_btn" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </aside>
      </article>
    </section>
  );
};

export default ResetPassword;