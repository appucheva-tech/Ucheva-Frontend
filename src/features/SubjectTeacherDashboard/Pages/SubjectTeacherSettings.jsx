import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { LuCamera } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../SubjectTeacherDashboardStyles/SubjectTeacherSettings.css";
import { apiClient } from "../../../config/AxiosInstance";

/* ─── Password Strength Helper ────────────────────────────────────────── */
const getPasswordStrength = (password) => {
  if (!password) return { label: "", color: "", width: "0%", score: 0 };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&.#_-]/.test(password)) score++;

  if (score <= 2)
    return { label: "Weak", color: "#e53e3e", width: "33%", score };
  if (score <= 3)
    return { label: "Fair", color: "#f6ad55", width: "66%", score };
  return { label: "Strong", color: "#38a169", width: "100%", score };
};

/* ─── Skeleton ─────────────────────────────────────────────────────────── */
const Skeleton = ({
  width = "100%",
  height = "1rem",
  radius = "6px",
  style = {},
}) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius,
      background:
        "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
      backgroundSize: "200% 100%",
      animation: "STS-shimmer 1.4s infinite",
      ...style,
    }}
  />
);

const LoadingSkeleton = () => (
  <div className="SubjectTeacher-settings-container">
    <style>{`
      @keyframes STS-shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
    <div className="SubjectTeacher-settings-header">
      <Skeleton
        width="120px"
        height="1.8rem"
        style={{ marginBottom: "0.5rem" }}
      />
      <Skeleton width="280px" height="1rem" />
    </div>
    <div className="SubjectTeacher-settings-card">
      <Skeleton
        width="160px"
        height="1.2rem"
        style={{ marginBottom: "1.5rem" }}
      />
      <div className="SubjectTeacher-profile-content">
        <div className="SubjectTeacher-avatar-section">
          <div className="SubjectTeacher-avatar-container">
            <Skeleton width="100px" height="100px" radius="50%" />
            <Skeleton
              width="80px"
              height="0.8rem"
              style={{ marginTop: "0.5rem" }}
            />
          </div>
        </div>
        <div className="SubjectTeacher-form-section">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="SubjectTeacher-form-row">
              <div className="SubjectTeacher-form-group">
                <Skeleton
                  width="80px"
                  height="0.8rem"
                  style={{ marginBottom: "0.4rem" }}
                />
                <Skeleton height="2.5rem" radius="8px" />
              </div>
              <div className="SubjectTeacher-form-group">
                <Skeleton
                  width="80px"
                  height="0.8rem"
                  style={{ marginBottom: "0.4rem" }}
                />
                <Skeleton height="2.5rem" radius="8px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Main Component ──────────────────────────────────────────────────── */
const SubjectTeacherSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });

  const [readOnlyData, setReadOnlyData] = useState({
    otherName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    maritalStatus: "",
    qualification: "",
    staffType: "",
    classAssigned: "",
    subjectAssigned: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const strength = getPasswordStrength(passwordData.newPassword);

  /* ── GET profile ── */
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/subjectteacher/getprofiledetails");
      const data = response?.data?.teacher || response?.data;

      setProfileData({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        address: data?.address || "",
      });

      setReadOnlyData({
        otherName: data?.otherName || "",
        email: data?.email || "",
        phoneNumber: data?.phoneNumber || "",
        gender: data?.gender || "",
        dateOfBirth: data?.dateOfBirth || "",
        nationality: data?.nationality || "",
        maritalStatus: data?.maritalStatus || "",
        qualification: data?.qualification || "",
        staffType: data?.staffType || "",
        classAssigned: data?.classAssigned || "No class assigned",
        subjectAssigned: Array.isArray(data?.subjectAssigned)
          ? data.subjectAssigned.join(", ")
          : data?.subjectAssigned || "No subjects assigned",
      });

      setPreviewUrl(data?.staffProfileUrl || null);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /* ── Editable field change ── */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Avatar change ── */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB.");
      return;
    }
    setAvatar(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  /* ── Password field change ── */
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordError("");
  };

  /* ── PUT: save profile changes ── */
  const handleSaveChanges = async () => {
    try {
      setProfileLoading(true);
      const formData = new FormData();
      formData.append("firstName", profileData.firstName);
      formData.append("lastName", profileData.lastName);
      formData.append("address", profileData.address);
      if (avatar) formData.append("profilePicture", avatar);

      await apiClient.put("/subjectteacher/updateprofile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      await fetchProfile();
      setAvatar(null);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Failed to update profile. Try again.";
      toast.error(msg);
    } finally {
      setProfileLoading(false);
    }
  };

  /* ── PUT: change password ── */
  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill in all fields.");
      return;
    }

    if (strength.score < 3) {
      setPasswordError(
        "Password is too weak. Please choose a stronger password.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (oldPassword === newPassword) {
      setPasswordError(
        "New password must be different from your old password.",
      );
      return;
    }

    try {
      setPasswordLoading(true);
      const formData = new FormData();
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      formData.append("confirmPassword", confirmPassword);

      await apiClient.put("/subjectteacher/updateprofile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Password changed successfully!");
      handleCloseModal();
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Failed to change password. Try again.";
      setPasswordError(msg);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordError("");
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="SubjectTeacher-settings-container">
      <div className="SubjectTeacher-settings-header">
        <h1>Settings</h1>
        <p>Manage your profile and account preferences.</p>
      </div>

      {/* ── Profile Information ── */}
      <div className="SubjectTeacher-settings-card">
        <h2 className="SubjectTeacher-card-title">Profile Information</h2>
        <div className="SubjectTeacher-profile-content">
          <div className="SubjectTeacher-avatar-section">
            <div className="SubjectTeacher-avatar-container">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Avatar"
                  className="SubjectTeacher-avatar-image"
                />
              ) : (
                <div className="SubjectTeacher-avatar-placeholder">
                  <LuCamera />
                </div>
              )}
              <label
                htmlFor="avatar-upload"
                className="SubjectTeacher-avatar-upload-btn"
              >
                <LuCamera />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="SubjectTeacher-avatar-input"
              />
            </div>
            <p className="SubjectTeacher-avatar-info">PNG, JPG, Max 2MB</p>
          </div>

          <div className="SubjectTeacher-form-section">
            <div className="SubjectTeacher-form-row">
              <div className="SubjectTeacher-form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </div>
              <div className="SubjectTeacher-form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="SubjectTeacher-form-row">
              <div className="SubjectTeacher-form-group">
                <label htmlFor="otherName">Other Name</label>
                <input
                  id="otherName"
                  type="text"
                  name="otherName"
                  value={readOnlyData.otherName}
                  readOnly
                  disabled
                  className="SubjectTeacher-readonly-field"
                  placeholder="Other Name"
                />
              </div>
              <div className="SubjectTeacher-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={readOnlyData.email}
                  readOnly
                  disabled
                  className="SubjectTeacher-readonly-field"
                  placeholder="Email Address"
                />
              </div>
            </div>

            <div className="SubjectTeacher-form-row">
              <div className="SubjectTeacher-form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={readOnlyData.phoneNumber}
                  readOnly
                  disabled
                  className="SubjectTeacher-readonly-field"
                  placeholder="Phone Number"
                />
              </div>
              <div className="SubjectTeacher-form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  id="gender"
                  type="text"
                  name="gender"
                  value={readOnlyData.gender}
                  readOnly
                  disabled
                  className="SubjectTeacher-readonly-field"
                  placeholder="Gender"
                />
              </div>
            </div>

            <div className="SubjectTeacher-form-row">
              <div className="SubjectTeacher-form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  type="text"
                  name="dateOfBirth"
                  value={readOnlyData.dateOfBirth}
                  readOnly
                  disabled
                  className="SubjectTeacher-readonly-field"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="SubjectTeacher-form-group">
                <label htmlFor="nationality">Nationality</label>
                <input
                  id="nationality"
                  type="text"
                  name="nationality"
                  value={readOnlyData.nationality}
                  readOnly
                  disabled
                  className="SubjectTeacher-readonly-field"
                  placeholder="Nationality"
                />
              </div>
            </div>

            <div className="SubjectTeacher-form-row">
              <div className="SubjectTeacher-form-group">
                <label htmlFor="maritalStatus">Marital Status</label>
                <input
                  id="maritalStatus"
                  type="text"
                  name="maritalStatus"
                  value={readOnlyData.maritalStatus}
                  readOnly
                  disabled
                  className="SubjectTeacher-readonly-field"
                  placeholder="Marital Status"
                />
              </div>
              <div className="SubjectTeacher-form-group">
                <label htmlFor="qualification">Qualification</label>
                <input
                  id="qualification"
                  type="text"
                  name="qualification"
                  value={readOnlyData.qualification}
                  readOnly
                  disabled
                  className="SubjectTeacher-readonly-field"
                  placeholder="Qualification"
                />
              </div>
            </div>

            <div className="SubjectTeacher-form-row">
              <div className="SubjectTeacher-form-group">
                <label htmlFor="staffType">Staff Type</label>
                <input
                  id="staffType"
                  type="text"
                  name="staffType"
                  value={readOnlyData.staffType}
                  readOnly
                  disabled
                  className="SubjectTeacher-readonly-field"
                  placeholder="Staff Type"
                />
              </div>
              <div className="SubjectTeacher-form-group">
                <label htmlFor="classAssigned">Class Assigned</label>
                <input
                  id="classAssigned"
                  type="text"
                  name="classAssigned"
                  value={readOnlyData.classAssigned}
                  readOnly
                  disabled
                  className="SubjectTeacher-readonly-field"
                  placeholder="Class Assigned"
                />
              </div>
            </div>

            <div className="SubjectTeacher-form-group full-width">
              <label htmlFor="subjectAssigned">Subject Assigned</label>
              <input
                id="subjectAssigned"
                type="text"
                name="subjectAssigned"
                value={readOnlyData.subjectAssigned}
                readOnly
                disabled
                className="SubjectTeacher-readonly-field"
                placeholder="Subject Assigned"
              />
            </div>

            <div className="SubjectTeacher-form-group full-width">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
            </div>

            <div className="SubjectTeacher-button-wrapper">
              <button
                className="SubjectTeacher-save-btn"
                onClick={handleSaveChanges}
                disabled={profileLoading}
              >
                {profileLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Security ── */}
      <div className="SubjectTeacher-settings-card">
        <h2 className="SubjectTeacher-card-title">Security</h2>
        <div className="SubjectTeacher-security-content">
          <div className="SubjectTeacher-security-item">
            <div className="SubjectTeacher-security-text">
              <h3>Change Password</h3>
              <p>Update your password to keep your account secure.</p>
            </div>
            <button
              className="SubjectTeacher-change-password-btn"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* ── Password Modal ── */}
      {showPasswordModal && (
        <div
          className="SubjectTeacher-modal-overlay"
          onClick={handleCloseModal}
        >
          <div
            className="SubjectTeacher-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="SubjectTeacher-modal-header">
              <h2>Change Password</h2>
              <button
                className="SubjectTeacher-modal-close-btn"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>

            <div className="SubjectTeacher-modal-body">
              {passwordError && (
                <p className="SubjectTeacher-modal-error">{passwordError}</p>
              )}

              <div className="SubjectTeacher-modal-form-group">
                <label>Current Password</label>
                <div className="SubjectTeacher-modal-password-wrapper">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordInputChange}
                    placeholder="Enter current password"
                    disabled={passwordLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="SubjectTeacher-modal-eye-btn"
                  >
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="SubjectTeacher-modal-form-group">
                <label>New Password</label>
                <div className="SubjectTeacher-modal-password-wrapper">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordInputChange}
                    placeholder="Enter new password"
                    disabled={passwordLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="SubjectTeacher-modal-eye-btn"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {passwordData.newPassword && (
                  <div className="SubjectTeacher-password-strength-wrapper">
                    <div className="SubjectTeacher-password-strength-bar-track">
                      <div
                        className="SubjectTeacher-password-strength-bar-fill"
                        style={{
                          width: strength.width,
                          backgroundColor: strength.color,
                        }}
                      />
                    </div>
                    <span
                      className="SubjectTeacher-password-strength-label"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </span>
                  </div>
                )}

                {passwordData.newPassword && (
                  <ul className="SubjectTeacher-password-requirements">
                    <li
                      className={
                        passwordData.newPassword.length >= 8
                          ? "SubjectTeacher-met"
                          : ""
                      }
                    >
                      At least 8 characters
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(passwordData.newPassword)
                          ? "SubjectTeacher-met"
                          : ""
                      }
                    >
                      One uppercase letter
                    </li>
                    <li
                      className={
                        /[a-z]/.test(passwordData.newPassword)
                          ? "SubjectTeacher-met"
                          : ""
                      }
                    >
                      One lowercase letter
                    </li>
                    <li
                      className={
                        /\d/.test(passwordData.newPassword)
                          ? "SubjectTeacher-met"
                          : ""
                      }
                    >
                      One number
                    </li>
                    <li
                      className={
                        /[@$!%*?&.#_-]/.test(passwordData.newPassword)
                          ? "SubjectTeacher-met"
                          : ""
                      }
                    >
                      One special character (@$!%*?&.#_-)
                    </li>
                  </ul>
                )}
              </div>

              <div className="SubjectTeacher-modal-form-group">
                <label>Confirm New Password</label>
                <div className="SubjectTeacher-modal-password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordInputChange}
                    placeholder="Confirm new password"
                    disabled={passwordLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="SubjectTeacher-modal-eye-btn"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {passwordData.confirmPassword && (
                  <p
                    className="SubjectTeacher-password-match-indicator"
                    style={{
                      color:
                        passwordData.newPassword ===
                        passwordData.confirmPassword
                          ? "#38a169"
                          : "#e53e3e",
                    }}
                  >
                    {passwordData.newPassword === passwordData.confirmPassword
                      ? "✓ Passwords match"
                      : "✗ Passwords do not match"}
                  </p>
                )}
              </div>
            </div>

            <div className="SubjectTeacher-modal-footer">
              <button
                className="SubjectTeacher-modal-cancel-btn"
                onClick={handleCloseModal}
                disabled={passwordLoading}
              >
                Cancel
              </button>
              <button
                className="SubjectTeacher-modal-submit-btn"
                onClick={handleChangePassword}
                disabled={passwordLoading}
              >
                {passwordLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectTeacherSettings;
