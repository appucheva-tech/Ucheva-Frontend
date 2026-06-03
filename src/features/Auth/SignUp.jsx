import React, { useState } from "react";
import "./AuthStyles/SignUp.css"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolUrl: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "School name is required";
    }

    if (formData.schoolUrl.trim()) {
      const url = formData.schoolUrl.trim();
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        newErrors.schoolUrl = "URL must start with http:// or https://";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.agree) {
      newErrors.agree = "Please accept the terms and conditions";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      nav("/verifyEmail");
    }
  };

  return (
    <section className="signUp_container geist-content">
      <article className="signUp_holder">
        <aside className="signUp_left">
          <img
            src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png"
            alt="signup img"
          />
          <div className="logoholder">
            <img src="https://i.postimg.cc/PJgRQh50/logo.png" alt="" />
          </div>
          <div className="signuptext">
            <h1>Let’s get your school started!</h1>
            <p>
              A simpler way to manage your school, support <br />
              your staff, and stay connected with parents.
            </p>
          </div>
        </aside>

        <aside className="signUp_right">
          <h2>Create An Account</h2>

          <div className="signUp_form">
            <label>School Name</label>
            <input
              type="text"
              name="schoolName"
              className={`signUp_input ${errors.schoolName ? "error-input" : ""}`}
              placeholder="e.g: Preston Academy"
              value={formData.schoolName}
              onChange={handleChange}
            />
            {errors.schoolName && (
              <small className="error">{errors.schoolName}</small>
            )}
          </div>

          <div className="signUp_form">
            <label>School Url (Optional)</label>
            <input
              type="text"
              name="schoolUrl"
              className={`signUp_input ${errors.schoolUrl ? "error-input" : ""}`}
              placeholder="https://ucheva.com"
              value={formData.schoolUrl}
              onChange={handleChange}
            />
            {errors.schoolUrl && (
              <small className="error">{errors.schoolUrl}</small>
            )}
          </div>

          <div className="signup_Form">
            <div className="signup_Input">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className={`signUp_input ${errors.email ? "error-input" : ""}`}
                placeholder="e.g: example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>

            <div className="signup_Input">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                className={`signUp_input ${errors.phoneNumber ? "error-input" : ""}`}
                placeholder="+234"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <small className="error">{errors.phoneNumber}</small>
              )}
            </div>
          </div>

          <div className="signup_Form">
            <div className="signup_Input">
              <label>Password</label>

              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`signUp_input password-input ${errors.password ? "error-input" : ""}`}
                  placeholder="Create password"
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

            <div className="signup_Input">
              <label>Confirm Password</label>

              <div className="password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={`signUp_input password-input ${errors.confirmPassword ? "error-input" : ""}`}
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="eye-icon-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>

              {errors.confirmPassword && (
                <small className="error">{errors.confirmPassword}</small>
              )}
            </div>
          </div>

          <div className="signUp_form">
            <label>Address</label>
            <input
              type="text"
              name="address"
              className={`signUp_input ${errors.address ? "error-input" : ""}`}
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <small className="error">{errors.address}</small>
            )}
          </div>

          <div className="signup_checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />

            <label>
              I agree to the <span>Privacy Policy</span> and
              <span>Terms of Service</span>
            </label>
          </div>

          {errors.agree && <small className="error">{errors.agree}</small>}

          <div className="btn">
            <button className="signup_btn" onClick={handleSubmit}>
              Create Account
            </button>

            <label className="Already">
              Already have an account?
              <span onClick={() => nav("/login")}> Log in </span>
            </label>
          </div>
        </aside>
      </article>
    </section>
  );
};

export default SignUp;