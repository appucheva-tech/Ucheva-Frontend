import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { LuCamera, LuUpload } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./CTSettings.css";
import { apiClient } from "../../../../config/AxiosInstance";

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
      animation: "CT-shimmer 1.4s infinite",
      ...style,
    }}
  />
);

const LoadingSkeleton = () => (
  <div className="ct-settings-container">
    <style>{`
      @keyframes CT-shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
    <div className="ct-settings-header">
      <Skeleton
        width="120px"
        height="1.8rem"
        style={{ marginBottom: "0.5rem" }}
      />
      <Skeleton width="280px" height="1rem" />
    </div>
    <div className="ct-settings-card">
      <Skeleton
        width="160px"
        height="1.2rem"
        style={{ marginBottom: "1.5rem" }}
      />
      <div className="ct-profile-content">
        <div className="ct-avatar-section">
          <div className="ct-avatar-container">
            <Skeleton width="140px" height="140px" radius="50%" />
            <Skeleton
              width="80px"
              height="0.8rem"
              style={{ marginTop: "0.5rem" }}
            />
          </div>
        </div>
        <div className="ct-form-section">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="ct-form-row">
              <div className="ct-form-group">
                <Skeleton
                  width="80px"
                  height="0.8rem"
                  style={{ marginBottom: "0.4rem" }}
                />
                <Skeleton height="2.5rem" radius="8px" />
              </div>
              <div className="ct-form-group">
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
const CTSettings = () => {
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
  const [signature, setSignature] = useState(null);
  const [signaturePreviewUrl, setSignaturePreviewUrl] = useState(null);
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
      const response = await apiClient.get("/classteacher/getprofiledetails");
      const data = response?.data?.classTeacherData || response?.data;

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
        classAssigned: Array.isArray(data?.classAssigned)
          ? data.classAssigned.join(", ")
          : data?.classAssigned || "No class assigned",
        subjectAssigned: Array.isArray(data?.subjectAssigned)
          ? data.subjectAssigned.join(", ")
          : data?.subjectAssigned || "No subjects assigned",
      });

      setPreviewUrl(data?.staffProfileUrl || null);
      setSignaturePreviewUrl(data?.signatureUrl || null);
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

  /* ── Signature change ── */
  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Signature must be less than 2MB.");
      return;
    }
    setSignature(file);
    const reader = new FileReader();
    reader.onloadend = () => setSignaturePreviewUrl(reader.result);
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
      if (signature) formData.append("signature", signature);

      await apiClient.put("/classteacher/updateprofile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      await fetchProfile();
      setAvatar(null);
      setSignature(null);
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

      await apiClient.put("/classteacher/updateprofile", formData, {
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
    <div className="ct-settings-container">
      <div className="ct-settings-header">
        <h1>Settings</h1>
        <p>Manage your profile and account preferences.</p>
      </div>

      {/* ── Profile Information ── */}
      <div className="ct-settings-card">
        <h2 className="ct-card-title">Profile Information</h2>
        <div className="ct-profile-content">
          <div className="ct-avatar-section">
            <div className="ct-avatar-container">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Avatar"
                  className="ct-avatar-image"
                />
              ) : (
                <div className="ct-avatar-placeholder">
                  <LuCamera />
                </div>
              )}
              <label htmlFor="avatar-upload" className="ct-avatar-upload-btn">
                <LuCamera />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="ct-avatar-input"
              />
            </div>
            <p className="ct-avatar-info">PNG, JPG, Max 2MB</p>
          </div>

          <div className="ct-form-section">
            <div className="ct-form-row">
              <div className="ct-form-group">
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
              <div className="ct-form-group">
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

            <div className="ct-form-row">
              <div className="ct-form-group">
                <label htmlFor="subjectAssigned">Subject Taught</label>
                <input
                  id="subjectAssigned"
                  type="text"
                  name="subjectAssigned"
                  value={readOnlyData.subjectAssigned}
                  readOnly
                  disabled
                  className="ct-readonly-field"
                  placeholder="Subject Taught"
                />
              </div>
              <div className="ct-form-group">
                <label htmlFor="staffType">Role</label>
                <input
                  id="staffType"
                  type="text"
                  name="staffType"
                  value={readOnlyData.staffType}
                  readOnly
                  disabled
                  className="ct-readonly-field"
                  placeholder="Role"
                />
              </div>
            </div>

            <div className="ct-form-row">
              <div className="ct-form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={readOnlyData.phoneNumber}
                  readOnly
                  disabled
                  className="ct-readonly-field"
                  placeholder="Phone Number"
                />
              </div>
              <div className="ct-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={readOnlyData.email}
                  readOnly
                  disabled
                  className="ct-readonly-field"
                  placeholder="Email Address"
                />
              </div>
            </div>

            <div className="ct-form-group full-width">
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

            <div className="ct-button-wrapper">
              <button
                className="ct-save-btn"
                onClick={handleSaveChanges}
                disabled={profileLoading}
              >
                {profileLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Upload Signature ── */}
      <div className="ct-settings-card">
        <h2 className="ct-card-title">Upload Signature</h2>
        <div className="ct-signature-content">
          <div className="ct-signature-section">
            <div className="ct-signature-container">
              <div className="ct-signature-label">
                Class Teacher's Signature
              </div>
              {signaturePreviewUrl ? (
                <div className="ct-signature-preview">
                  <img
                    src={signaturePreviewUrl}
                    alt="Signature"
                    className="ct-signature-image"
                  />
                  <button
                    className="ct-signature-remove-btn"
                    onClick={() => {
                      setSignature(null);
                      setSignaturePreviewUrl(null);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="ct-signature-placeholder">
                  <LuUpload className="ct-signature-upload-icon" />
                  <span>Upload Signature</span>
                </div>
              )}
              <label
                htmlFor="signature-upload"
                className="ct-signature-upload-btn"
              >
                {signaturePreviewUrl ? "Change Signature" : "Upload"}
              </label>
              <input
                id="signature-upload"
                type="file"
                accept="image/*"
                onChange={handleSignatureChange}
                className="ct-signature-input"
              />
              <p className="ct-signature-info">PNG format recommended</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Security ── */}
      <div className="ct-settings-card">
        <h2 className="ct-card-title">Security</h2>
        <div className="ct-security-content">
          <div className="ct-security-item">
            <div className="ct-security-text">
              <h3>Change Password</h3>
              <p>Receive real-time notifications and team alerts.</p>
            </div>
            <button
              className="ct-change-password-btn"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* ── Password Modal ── */}
      {showPasswordModal && (
        <div className="ct-modal-overlay" onClick={handleCloseModal}>
          <div
            className="ct-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ct-modal-header">
              <h2>Change Password</h2>
              <button className="ct-modal-close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>

            <div className="ct-modal-body">
              {passwordError && (
                <p className="ct-modal-error">{passwordError}</p>
              )}

              <div className="ct-modal-form-group">
                <label>Current Password</label>
                <div className="ct-modal-password-wrapper">
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
                    className="ct-modal-eye-btn"
                  >
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="ct-modal-form-group">
                <label>New Password</label>
                <div className="ct-modal-password-wrapper">
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
                    className="ct-modal-eye-btn"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {passwordData.newPassword && (
                  <div className="ct-password-strength-wrapper">
                    <div className="ct-password-strength-bar-track">
                      <div
                        className="ct-password-strength-bar-fill"
                        style={{
                          width: strength.width,
                          backgroundColor: strength.color,
                        }}
                      />
                    </div>
                    <span
                      className="ct-password-strength-label"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </span>
                  </div>
                )}

                {passwordData.newPassword && (
                  <ul className="ct-password-requirements">
                    <li
                      className={
                        passwordData.newPassword.length >= 8 ? "ct-met" : ""
                      }
                    >
                      At least 8 characters
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(passwordData.newPassword) ? "ct-met" : ""
                      }
                    >
                      One uppercase letter
                    </li>
                    <li
                      className={
                        /[a-z]/.test(passwordData.newPassword) ? "ct-met" : ""
                      }
                    >
                      One lowercase letter
                    </li>
                    <li
                      className={
                        /\d/.test(passwordData.newPassword) ? "ct-met" : ""
                      }
                    >
                      One number
                    </li>
                    <li
                      className={
                        /[@$!%*?&.#_-]/.test(passwordData.newPassword)
                          ? "ct-met"
                          : ""
                      }
                    >
                      One special character (@$!%*?&.#_-)
                    </li>
                  </ul>
                )}
              </div>

              <div className="ct-modal-form-group">
                <label>Confirm New Password</label>
                <div className="ct-modal-password-wrapper">
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
                    className="ct-modal-eye-btn"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {passwordData.confirmPassword && (
                  <p
                    className="ct-password-match-indicator"
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

            <div className="ct-modal-footer">
              <button
                className="ct-modal-cancel-btn"
                onClick={handleCloseModal}
                disabled={passwordLoading}
              >
                Cancel
              </button>
              <button
                className="ct-modal-submit-btn"
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

export default CTSettings;
