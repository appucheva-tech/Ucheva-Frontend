import React, { useState } from "react";
import "./AuthStyles/SignUp.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiClient } from "../../config/AxiosInstance";

const SignUp = () => {
  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [urlSuggestions, setUrlSuggestions] = useState([]);
  const BaseUrl = import.meta.env.VITE_Base_Url;

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

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    let newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "schoolName") {
      const slug = generateSlug(value);
      const baseDomain = "ucheva.vercel.app";
      const suggestions = slug
        ? [
            `${slug}.${baseDomain}`,
            `school-${slug}.${baseDomain}`,
            `app-${slug}.${baseDomain}`,
          ]
        : [];

      newFormData.schoolUrl = "";
      setUrlSuggestions(suggestions);
    }

    setFormData(newFormData);

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const selectUrl = (url) => {
    setFormData((prev) => ({
      ...prev,
      schoolUrl: url,
    }));
  };

  const handleSubmit = async () => {
    let newErrors = {};

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "School name is required";
    }

    // if (formData.schoolUrl.trim()) {
    //   const url = formData.schoolUrl.trim();
    //   if (!url.startsWith("http://") && !url.startsWith("https://")) {
    //     newErrors.schoolUrl = "URL must start with http:// or https://";
    //   }
    // }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
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

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    const payload = {
      schoolName: formData.schoolName,
      address: formData.address,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phoneNumber,
      schoolUrl: formData.schoolUrl,
    };

    try {
      const response = await ApiClient.post("/admin/register", payload);
      console.log(response?.data);
      toast.success(response?.data?.message || "Registration successful!");
      localStorage.setItem("userInfo", JSON.stringify(formData));
      localStorage.setItem("userEmail", formData.email);
      console.log(response?.data?.verifyRedirectLocalUrl);
      // window.location.href = response?.data?.verifyRedirectLocalUrl;
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(
          error.response.data.message ||
            "Registration failed. Please try again.",
        );
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signUp_container geist-content">
      <ToastContainer position="top-right" autoClose={5000} />

      <article className="signUp_holder">
        <aside className="signUp_left">
          <img
            src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png"
            alt="signup img"
          />
          <div className="logoholder">
            <img
              src="https://i.postimg.cc/PJgRQh50/logo.png"
              alt="logo"
              onClick={() => nav("/")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="signuptext">
            <h1>Let's get your school started!</h1>
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

          {urlSuggestions.length > 0 && (
            <div className="url-suggestions">
              <p>Select your school URL:</p>
              {urlSuggestions.map((url, index) => (
                <div
                  key={index}
                  onClick={() => selectUrl(url)}
                  className={`url-box ${
                    formData.schoolUrl === url ? "active-url" : ""
                  }`}
                >
                  {url}
                </div>
              ))}
            </div>
          )}

          <div className="signUp_form">
            <label>School Url (Optional)</label>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.57533 7.49935C7.77125 6.94241 8.15795 6.47277 8.66695 6.17363C9.17596 5.87448 9.7744 5.76513 10.3563 5.86494C10.9382 5.96475 11.466 6.26729 11.8462 6.71896C12.2264 7.17063 12.4345 7.74228 12.4337 8.33268C12.4337 9.99935 9.93366 10.8327 9.93366 10.8327M10.0003 14.166H10.0087M18.3337 9.99935C18.3337 14.6017 14.6027 18.3327 10.0003 18.3327C5.39795 18.3327 1.66699 14.6017 1.66699 9.99935C1.66699 5.39698 5.39795 1.66602 10.0003 1.66602C14.6027 1.66602 18.3337 5.39698 18.3337 9.99935Z"
                  stroke="#9DA4AE"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              This will be the main URL to the portal.
            </p>
            <input
              type="text"
              name="schoolUrl"
              className={`signUp_input ${errors.schoolUrl ? "error-input" : ""}`}
              placeholder="Select a suggestion above"
              value={formData.schoolUrl}
              onChange={handleChange}
              readOnly
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
            <button
              className="signup_btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
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
