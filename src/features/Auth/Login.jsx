import React, { useState } from "react";
import "./AuthStyles/Login.css"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
// const [loading, setLoading] = useState(false);

const Login = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // nav("/dashboard");
    }
  };

  return (
    <section className="login_container geist-content">
      <article className="login_holder">
        <aside className="login_left">
          <img
            src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png"
            alt="signup img"
          />

          <div className="Login-logoholder">
            <img
              src="https://i.postimg.cc/PJgRQh50/logo.png"
              alt=""
            />
          </div>
          <div className="login_text">
            <h1>Welcome Back!</h1>
            <p>
              Log in to access your school workspace and continue where you left
              off.
            </p>
          </div>
        </aside>
        <aside className="login_right">
          <h2>Log In</h2>

          <form onSubmit={handleSubmit}>
            <div className="login_form">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className={`login_input ${errors.email ? "error-input" : ""}`}
                placeholder="e.g: example@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>

            <div className="login_form">
              <label>Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`login_input password-input ${errors.password ? "error-input" : ""}`}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="eye-icon-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {errors.password && (
                <small className="error">{errors.password}</small>
              )}
            </div>

            <label className="forget" onClick={() => nav("/forgetPassword")}>
              Forget Password?
            </label>

            <div className="loginBtn">
              <button type="submit" className="login_btn" >
                Log In
              </button>
              <label className="Account">
                Don't have an account?{" "}
                <span onClick={() => nav("/signup")}>Create Account</span>
              </label>
            </div>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default Login;