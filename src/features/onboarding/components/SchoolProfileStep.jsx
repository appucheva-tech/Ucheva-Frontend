import React, { useState, useRef, useEffect } from "react";
import "../styles/schoolprofile.css";
import { apiClient } from "../../../config/AxiosInstance";

const SchoolProfileStep = ({
  formData,
  setFormData,
  logoPreview,
  handleLogoUpload,
  handleRemoveLogo,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null); // Ref to trigger file upload

  const schoolTypeOptions = [
    { id: "nursery", label: "Nursery" },
    { id: "primary", label: "Primary" },
    { id: "secondary", label: "Secondary" },
  ];
  const [adminProfile, setAdminProfile] = useState({});

  useEffect(() => {
    const fetchSchoolProfile = async () => {
      try {
        const { data } = await apiClient.get("/admin/get-admin");

        setAdminProfile((prev) => ({
          ...prev,
          schoolName: data?.data?.schoolName,
          schoolUrl: data?.data?.schoolUrl,
          email: data?.data?.email,
          phoneNumber: data?.data?.phoneNumber,
          address: data?.data?.address,
        }));
        console.log(data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchoolProfile();
  }, [setFormData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSchoolTypeToggle = (typeId) => {
    const currentTypes = formData.selectedSchoolTypes || [];
    const updatedTypes = currentTypes.includes(typeId)
      ? currentTypes.filter((id) => id !== typeId)
      : [...currentTypes, typeId];

    setFormData({
      ...formData,
      selectedSchoolTypes: updatedTypes,
      selectedSections: updatedTypes,
    });
  };

  const getDropdownLabel = () => {
    const currentTypes = formData.selectedSchoolTypes || [];
    if (currentTypes.length === 0) return "Select school types";
    return currentTypes
      .map((id) => schoolTypeOptions.find((opt) => opt.id === id)?.label)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="step-content-wrapper">
      {/* Upload Logo layout row */}
      <div className="logo-upload-card">
        <div className="logo-avatar-circle">
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="School Logo"
              className="logo-preview-img"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <svg
              className="logo-fallback-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleLogoUpload}
          accept="image/png, image/jpeg, image/jpg"
          style={{ display: "none" }}
        />

        <div className="logo-meta-controls">
          <label className="upload-heading">Upload logo</label>
          <span className="upload-hint-text">
            We support PNG, Jpeg, JPG, under 2MB
          </span>
          <div className="upload-action-buttons-group">
            <button
              type="button"
              className="primary-upload-label-btn"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Image
            </button>
            <button
              type="button"
              className="remove-logo-action-btn"
              onClick={handleRemoveLogo}
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Main input layout fields grid matrix */}
      <div className="profile-form-grid-mesh">
        <div className="form-field-group">
          <label className="field-label">School Name</label>
          <input
            type="text"
            className="text-input-field disabled-state"
            value={adminProfile?.schoolName}
            disabled
          />
        </div>

        <div className="form-field-group">
          <label className="field-label">School URL</label>
          <input
            type="text"
            className="text-input-field disabled-state"
            value={adminProfile?.schoolUrl || ""}
            disabled
          />
        </div>

        <div className="form-field-group">
          <label className="field-label">Email</label>
          <input
            type="email"
            className="text-input-field disabled-state"
            value={adminProfile?.email || ""}
            disabled
          />
        </div>

        <div className="form-field-group">
          <label className="field-label">Phone number</label>
          <input
            disabled
            type="text"
            className="text-input-field disabled-state"
            placeholder="+234 1234567890"
            value={adminProfile?.phoneNumber || ""}
            // onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <label className="field-label">Address</label>
          <input
            type="text"
            className="text-input-field disabled-state"
            value={adminProfile?.address || ""}
            disabled
          />
        </div>

        <div className="form-field-group" ref={dropdownRef}>
          <label className="field-label">School Type</label>
          <div className="select-input-container">
            <div
              className={`select-dropdown-field custom-multiselect-header ${isDropdownOpen ? "is-focused" : ""}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="multiselect-display-text">
                {getDropdownLabel()}
              </span>
              <div className="dropdown-chevron-overlay">
                <svg className="chevron-icon-svg" viewBox="0 0 20 20">
                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335l-4.695-4.502c-0.408-0.418-0.436-1.17 0-1.615z" />
                </svg>
              </div>
            </div>
            {isDropdownOpen && (
              <div className="multiselect-options-overlay-box">
                {schoolTypeOptions.map((option) => (
                  <label
                    key={option.id}
                    className="multiselect-option-item-row"
                  >
                    <input
                      type="checkbox"
                      checked={(formData.selectedSchoolTypes || []).includes(
                        option.id,
                      )}
                      onChange={() => handleSchoolTypeToggle(option.id)}
                      className="chip-native-checkbox"
                    />
                    <span className="option-item-label-text">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolProfileStep;
