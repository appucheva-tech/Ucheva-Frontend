import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { LuCamera, LuUpload } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./CTSettings.css";
import { apiClient } from "../../../../config/AxiosInstance";

/* ─── Password Strength Helper ─────────────────────────────── */
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

/* ─── Skeleton ──────────────────────────────────────────────── */
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
      background: "linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%)",
      backgroundSize: "200% 100%",
      animation: "CT-shimmer 1.4s infinite",
      ...style,
    }}
  />
);

const LoadingSkeleton = () => (
  <div className="ct-container">
    <style>{`@keyframes CT-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    <div className="ct-page-header">
      <Skeleton
        width="120px"
        height="2rem"
        style={{ marginBottom: "0.5rem" }}
      />
      <Skeleton width="260px" height="1rem" />
    </div>
    <div className="ct-card">
      <Skeleton
        width="180px"
        height="1.2rem"
        style={{ marginBottom: "1.5rem" }}
      />
      <div className="ct-profile-layout">
        <Skeleton width="140px" height="140px" radius="50%" />
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}
        >
          {[1, 2, 3].map((i) => (
            <div key={i} className="ct-grid-2">
              <Skeleton height="2.8rem" radius="8px" />
              <Skeleton height="2.8rem" radius="8px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Main Component ────────────────────────────────────────── */
const CTSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });
  const [readOnly, setReadOnly] = useState({
    email: "",
    phoneNumber: "",
    staffType: "",
    subjectAssigned: "",
    classAssigned: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [signature, setSignature] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const strength = getPasswordStrength(passwordData.newPassword);

  /* ── GET profile ── */
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/classteacher/getprofiledetails");
      const data = res?.data?.classTeacherData || res?.data;

      setProfileData({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        address: data?.address || "",
      });

      setReadOnly({
        email: data?.email || "",
        phoneNumber: data?.phoneNumber || "",
        staffType: data?.staffType || "",
        subjectAssigned: Array.isArray(data?.subjectAssigned)
          ? data.subjectAssigned.join(", ")
          : data?.subjectAssigned || "",
        classAssigned: Array.isArray(data?.classAssigned)
          ? data.classAssigned.join(", ")
          : data?.classAssigned || "",
      });

      if (data?.staffProfileUrl) setPreviewUrl(data.staffProfileUrl);
      if (data?.signatureUrl) setSignaturePreview(data.signatureUrl);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((p) => ({ ...p, [name]: value }));
  };

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

<<<<<<< HEAD
  /* ── Password field change ── */
  const handlePasswordInputChange = (e) => {
=======
  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Signature must be less than 2MB.");
      return;
    }
    setSignature(file);
    const reader = new FileReader();
    reader.onloadend = () => setSignaturePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePasswordChange = (e) => {
>>>>>>> 28d1d2ea5503715693ab641a1f390bf271fd7dbb
    const { name, value } = e.target;
    setPasswordData((p) => ({ ...p, [name]: value }));
    setPasswordError("");
  };

  /* ── PUT: save profile ── */
  const handleSaveChanges = async () => {
    try {
      setProfileLoading(true);
      const fd = new FormData();
      fd.append("firstName", profileData.firstName);
      fd.append("lastName", profileData.lastName);
      fd.append("address", profileData.address);
      if (avatar) fd.append("profilePicture", avatar);
      if (signature) fd.append("schoolSignature", signature);

      await apiClient.put("/classteacher/updateprofile", fd);
      toast.success("Profile updated successfully!");
      await fetchProfile();
      setAvatar(null);
      setSignature(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile.");
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
      setPasswordError("Password is too weak.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (oldPassword === newPassword) {
      setPasswordError("New password must differ from old password.");
      return;
    }
    try {
      setPasswordLoading(true);
      const fd = new FormData();
      fd.append("oldPassword", oldPassword);
      fd.append("newPassword", newPassword);
      fd.append("confirmPassword", confirmPassword);
      await apiClient.put("/classteacher/updateprofile", fd);
      toast.success("Password changed successfully!");
      closeModal();
    } catch (err) {
      setPasswordError(
        err?.response?.data?.message || "Failed to change password.",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordError("");
    setShowOld(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="ct-container">
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="ct-page-header">
        <h1>Settings</h1>
        <p>Manage your profile and account preferences.</p>
      </div>

      {/* ══════════════════════════════════════════════════════
          PROFILE INFORMATION CARD
      ══════════════════════════════════════════════════════ */}
      <div className="ct-card">
        <h2 className="ct-card-title">Profile Information</h2>

        <div className="ct-profile-layout">
          {/* Avatar */}
          <div className="ct-avatar-col">
            <div className="ct-avatar-wrap">
              {previewUrl ? (
                <img src={previewUrl} alt="Avatar" className="ct-avatar-img" />
              ) : (
                <div className="ct-avatar-placeholder">
                  <LuCamera size={48} />
                </div>
              )}
              <label
                htmlFor="avatar-upload"
                className="ct-avatar-btn"
                title="Change photo"
              >
                <LuCamera size={16} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="ct-file-hidden"
              />
            </div>
            <p className="ct-avatar-hint">PNG, JPG. Max 2MB</p>
          </div>

          {/* Form fields */}
          <div className="ct-form-col">
            {/* Row 1: First Name | Last Name */}
            <div className="ct-grid-2">
              <div className="ct-field">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </div>
              <div className="ct-field">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Row 2: Subject Taught | Role */}
            <div className="ct-grid-2">
              <div className="ct-field">
                <label>Subject Taught</label>
                <input
                  type="text"
                  value={readOnly.subjectAssigned}
                  readOnly
                  disabled
                  className="ct-readonly"
                  placeholder="—"
                />
              </div>
              <div className="ct-field">
                <label>Role</label>
                <input
                  type="text"
                  value={readOnly.staffType}
                  readOnly
                  disabled
                  className="ct-readonly"
                  placeholder="—"
                />
              </div>
            </div>

            {/* Row 3: Phone | Email */}
            <div className="ct-grid-2">
              <div className="ct-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={readOnly.phoneNumber}
                  readOnly
                  disabled
                  className="ct-readonly"
                  placeholder="—"
                />
              </div>
              <div className="ct-field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={readOnly.email}
                  readOnly
                  disabled
                  className="ct-readonly"
                  placeholder="—"
                />
              </div>
            </div>

            {/* Row 4: Address — full width */}
            <div className="ct-field">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </div>

            {/* Save button */}
            <div className="ct-btn-row">
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

<<<<<<< HEAD
      {/* ── Security ── */}
      <div className="ct-settings-card">
=======
      {/* ══════════════════════════════════════════════════════
          UPLOAD SIGNATURE CARD
      ══════════════════════════════════════════════════════ */}
      <div className="ct-card">
        <h2 className="ct-card-title">Upload Signature</h2>

        <p className="ct-sig-heading">Class Teacher's Signature</p>

        <div className="ct-sig-box">
          {/* Preview area */}
          <div className="ct-sig-preview">
            {signaturePreview ? (
              <img
                src={signaturePreview}
                alt="Signature"
                className="ct-sig-img"
              />
            ) : (
              <div className="ct-sig-empty">
                <LuUpload size={28} />
              </div>
            )}
          </div>

          {/* Upload button + hint below the box */}
          <label htmlFor="sig-upload" className="ct-sig-upload-btn">
            Upload
          </label>
          <input
            id="sig-upload"
            type="file"
            accept="image/*"
            onChange={handleSignatureChange}
            className="ct-file-hidden"
          />
          <p className="ct-sig-hint">PNG format recommended</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECURITY CARD
      ══════════════════════════════════════════════════════ */}
      <div className="ct-card">
>>>>>>> 28d1d2ea5503715693ab641a1f390bf271fd7dbb
        <h2 className="ct-card-title">Security</h2>
        <div className="ct-security-row">
          <div>
            <h3 className="ct-security-title">Change Password</h3>
            <p className="ct-security-sub">
              Receive real-time notifications and team alerts.
            </p>
          </div>
          <button
            className="ct-change-pwd-btn"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PASSWORD MODAL
      ══════════════════════════════════════════════════════ */}
      {showPasswordModal && (
        <div className="ct-overlay" onClick={closeModal}>
          <div className="ct-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ct-modal-head">
              <h2>Change Password</h2>
              <button className="ct-modal-x" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="ct-modal-body">
              {passwordError && <p className="ct-modal-err">{passwordError}</p>}

              {/* Current password */}
              <div className="ct-modal-field">
                <label>Current Password</label>
                <div className="ct-pwd-wrap">
                  <input
                    type={showOld ? "text" : "password"}
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    disabled={passwordLoading}
                  />
                  <button
                    type="button"
                    className="ct-eye"
                    onClick={() => setShowOld((v) => !v)}
                  >
                    {showOld ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div className="ct-modal-field">
                <label>New Password</label>
                <div className="ct-pwd-wrap">
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    disabled={passwordLoading}
                  />
                  <button
                    type="button"
                    className="ct-eye"
                    onClick={() => setShowNew((v) => !v)}
                  >
                    {showNew ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {passwordData.newPassword && (
                  <>
                    <div className="ct-strength-row">
                      <div className="ct-strength-track">
                        <div
                          className="ct-strength-fill"
                          style={{
                            width: strength.width,
                            background: strength.color,
                          }}
                        />
                      </div>
                      <span
                        className="ct-strength-label"
                        style={{ color: strength.color }}
                      >
                        {strength.label}
                      </span>
                    </div>
                    <ul className="ct-req-list">
                      {[
                        [
                          passwordData.newPassword.length >= 8,
                          "At least 8 characters",
                        ],
                        [
                          /[A-Z]/.test(passwordData.newPassword),
                          "One uppercase letter",
                        ],
                        [
                          /[a-z]/.test(passwordData.newPassword),
                          "One lowercase letter",
                        ],
                        [/\d/.test(passwordData.newPassword), "One number"],
                        [
                          /[@$!%*?&.#_-]/.test(passwordData.newPassword),
                          "One special character",
                        ],
                      ].map(([met, label]) => (
                        <li key={label} className={met ? "ct-met" : ""}>
                          {met ? "✓" : "✗"} {label}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Confirm password */}
              <div className="ct-modal-field">
                <label>Confirm New Password</label>
                <div className="ct-pwd-wrap">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    disabled={passwordLoading}
                  />
                  <button
                    type="button"
                    className="ct-eye"
                    onClick={() => setShowConfirm((v) => !v)}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {passwordData.confirmPassword && (
                  <p
                    className="ct-match"
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

            <div className="ct-modal-foot">
              <button
                className="ct-modal-cancel"
                onClick={closeModal}
                disabled={passwordLoading}
              >
                Cancel
              </button>
              <button
                className="ct-modal-submit"
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
