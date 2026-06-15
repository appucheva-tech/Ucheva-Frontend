import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import { apiClient } from "../../../config/AxiosInstance";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Custom Form Value State Architecture
  const [values, setValues] = useState({
    schoolName: "",
    schoolUrl: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    schoolType: [], // Handles multiple selections cleanly
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [urlSuggestions, setUrlSuggestions] = useState([]); // Keeps track of the generated list

  // Configuration tracking options for school type
  const schoolTypeOptions = [
    { label: "Primary", value: "primary" },
    { label: "Secondary", value: "secondary" },
    { label: "Tertiary", value: "tertiary" },
  ];

  // Helper to generate clean URL slugs
  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  // Universal input change event listener
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    let newFormData = {
      ...values,
      [name]: fieldValue,
    };

    // YOUR EXACT SUGGESTION LOGIC INTEGRATED HERE PERFECTLY:
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

      newFormData.schoolUrl = ""; // Resets the input field when typing a new name
      setUrlSuggestions(suggestions);
    }

    setValues(newFormData);
    clearFieldError(name);
  };

  const selectUrl = (url) => {
    setValues((prev) => ({
      ...prev,
      schoolUrl: url,
    }));
    clearFieldError("schoolUrl");
  };

  // Handles multiple school type selections toggling toggles
  const handleToggleSchoolType = (typeValue) => {
    setValues((prev) => {
      const currentTypes = [...prev.schoolType];
      const index = currentTypes.indexOf(typeValue);

      if (index > -1) {
        currentTypes.splice(index, 1);
      } else {
        currentTypes.push(typeValue);
      }
      return { ...prev, schoolType: currentTypes };
    });

    clearFieldError("schoolType");
  };

  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[fieldName];
        return updatedErrors;
      });
    }
  };

  const isAnOptionSelected = urlSuggestions.includes(values.schoolUrl);
  const visibleSuggestions = isAnOptionSelected ? [] : urlSuggestions;

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;

    if (!values.schoolName.trim())
      newErrors.schoolName = "School Name is required.";
    if (!values.schoolUrl.trim())
      newErrors.schoolUrl = "School URL configuration is required.";

    if (!values.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Please provide a valid email format.";
    }

    if (!values.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(values.phone)) {
      newErrors.phone = "Invalid phone number format.";
    }

    if (!values.password) {
      newErrors.password = "Password is required.";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!values.address.trim())
      newErrors.address = "Address configuration is required.";
    if (values.schoolType.length === 0)
      newErrors.schoolType = "Select at least one school classification.";
    if (!values.terms)
      newErrors.terms = "You must accept our service conditions to register.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      schoolName: values.schoolName,
      schoolUrl: values.schoolUrl,
      email: values.email,
      phoneNumber: values.phone,
      password: values.password,
      address: values.address,
      confirmPassword: values.confirmPassword,
    };

    try {
      setLoading(true);
      const response = await apiClient.post("/admin/register", payload);
      // ... inside your handleSubmit
      if (response.data) {
        const { verifyRedirectUrl, verifyRedirectLocalUrl } = response.data;
        const isLocalhost = ["localhost", "127.0.0.1"].includes(
          window.location.hostname,
        );

        let targetUrl =
          // isLocalhost
          // ? verifyRedirectLocalUrl:
          verifyRedirectUrl;

        targetUrl = targetUrl.replace(/www\./g, "");
        try {
          const urlObj = new URL(targetUrl);
          urlObj.searchParams.append("email", values.email);

          console.log("Redirecting to:", urlObj.toString());
          window.location.href = urlObj.toString();
        } catch (e) {
          console.error(
            "Failed to construct URL. Cleaned URL was:",
            targetUrl,
            e,
          );
        }
      }
    } catch (err) {
      const serverMessage =
        err.response?.data?.message || "An error occurred during registration.";
      setServerError(serverMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="form-wrapper">
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <h2>Create An Account</h2>

        {serverError && <div className="error-banner">{serverError}</div>}

        {/* School Name */}
        <div className="form-group">
          <label htmlFor="schoolName">School Name</label>
          <input
            type="text"
            id="schoolName"
            name="schoolName"
            className={errors.schoolName ? "input-error" : ""}
            placeholder="e.g. Preston Academy"
            value={values.schoolName}
            onChange={handleChange}
          />
          {errors.schoolName && (
            <span className="error-text">{errors.schoolName}</span>
          )}

          {/* Dynamic Suggestion Pills List Layout */}
          {visibleSuggestions.length > 0 && (
            <div className="url-suggestions">
              <p>Select your school URL:</p>
              <div className="suggestion-pills">
                {visibleSuggestions.map((url, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`url-box ${values.schoolUrl === url ? "active-url" : ""}`}
                    onClick={() => selectUrl(url)}
                  >
                    {url}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* School URL Input (Featuring Inline Change Selection Button) */}
        <div className="form-group">
          <label htmlFor="schoolUrl">School URL</label>
          <span className="input-hint">
            ⓘ This will be the main URL to the portal.
          </span>
          <div
            className={`url-input-wrapper ${errors.schoolUrl ? "wrapper-error" : ""} ${isAnOptionSelected ? "input-locked" : ""}`}
          >
            <input
              type="text"
              id="schoolUrl"
              name="schoolUrl"
              placeholder="Select a suggestion above"
              value={values.schoolUrl}
              onChange={handleChange}
              readOnly
              style={{ paddingRight: isAnOptionSelected ? "130px" : "16px" }}
            />
            {isAnOptionSelected && (
              <button
                type="button"
                className="inline-change-selection-btn"
                onClick={() => selectUrl("")}
              >
                Change Selection
              </button>
            )}
          </div>
          {errors.schoolUrl && (
            <span className="error-text">{errors.schoolUrl}</span>
          )}
        </div>

        {/* Email & Phone Number Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={errors.email ? "input-error" : ""}
              placeholder="e.g. example@email.com"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={errors.phone ? "input-error" : ""}
              placeholder="+234"
              value={values.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
        </div>

        {/* Password & Confirm Password Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={errors.password ? "input-error" : ""}
              placeholder="Create password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={errors.confirmPassword ? "input-error" : ""}
              placeholder="Re-enter password"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className={errors.address ? "input-error" : ""}
            placeholder="Enter your address"
            value={values.address}
            onChange={handleChange}
          />
          {errors.address && (
            <span className="error-text">{errors.address}</span>
          )}
        </div>

        {/* Custom Multi-Select Dropdown Container */}
        <div className="form-group relative-container">
          <label>School Type</label>
          <p className="select-subtext">
            Select all that applies to your school.
          </p>

          <div
            className={`custom-select-trigger ${errors.schoolType ? "input-error" : ""} ${dropdownOpen ? "active-trigger" : ""}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span
              className={
                values.schoolType.length === 0
                  ? "select-placeholder"
                  : "select-selected-values"
              }
            >
              {values.schoolType.length === 0
                ? "Select school type"
                : values.schoolType
                    .map(
                      (v) =>
                        schoolTypeOptions.find((o) => o.value === v)?.label,
                    )
                    .join(", ")}
            </span>
            <span
              className={`dropdown-chevron-icon ${dropdownOpen ? "open" : ""}`}
            >
              ▼
            </span>
          </div>

          {dropdownOpen && (
            <>
              <div
                className="dropdown-overlay-close-helper"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="custom-select-dropdown-list">
                {schoolTypeOptions.map((option) => {
                  const isChecked = values.schoolType.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      className={`custom-select-option-row ${isChecked ? "row-selected" : ""}`}
                      onClick={() => handleToggleSchoolType(option.value)}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="custom-row-checkbox"
                      />
                      <span>{option.label}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {errors.schoolType && (
            <span className="error-text">{errors.schoolType}</span>
          )}
        </div>

        {/* Terms and Privacy Checkbox */}
        <div className="form-checkbox-wrapper">
          <div className="form-checkbox">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={values.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms">
              I agree to the <a href="#privacy">Privacy Policy</a> and{" "}
              <a href="#terms">Terms of Service</a>
            </label>
          </div>
          {errors.terms && (
            <span className="error-text check-error">{errors.terms}</span>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="form-footer">
          Already have an account? <a href="#login">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
