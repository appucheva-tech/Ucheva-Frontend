import React, { useState, useEffect, useRef } from "react";
import "./CTSettings.css";
import Ucheva from "../../../../assets/UchevaLogo.svg";
import { apiClient } from "../../../../config/AxiosInstance";

const CTSettings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    profilePicture: null,
  });

  // ── Non-editable fields from API ─────────────────────────────────────────
  const [userData, setUserData] = useState({
    subjectAssigned: [], // Array(0) from API
    staffType: "", // "class teacher"
    phoneNumber: "", // "07085218444"
    email: "", // "danny@mailinator.com"
    classAssigned: [], // ['SS 3 A']
    gender: "",
    dateOfBirth: "",
    nationality: "",
    qualification: "",
    maritalStatus: "",
    attendanceStatus: "",
    signatureUrl: null,
    staffProfileUrl: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [profilePreview, setProfilePreview] = useState(Ucheva);
  const [signatureFile, setSignatureFile] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  // ── Password modal ───────────────────────────────────────────────────────
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordStep, setPasswordStep] = useState(1); // 1 = verify old | 2 = set new
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const profileInputRef = useRef(null);
  const modalRef = useRef(null);

  // ── fetchUserData ────────────────────────────────────────────────────────
  // Maps response.data.classTeacherData to state
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/classteacher/getprofiledetails");
      const d = response?.data?.classTeacherData; // ← correct path from your API response

      // Non-editable fields
      setUserData({
        subjectAssigned: d.subjectAssigned || [],
        staffType: d.staffType || "",
        phoneNumber: d.phoneNumber || "",
        email: d.email || "",
        classAssigned: d.classAssigned || [],
        gender: d.gender || "",
        dateOfBirth: d.dateOfBirth || "",
        nationality: d.nationality || "",
        qualification: d.qualification || "",
        maritalStatus: d.maritalStatus || "",
        attendanceStatus: d.attendanceStatus || "",
        signatureUrl: d.signatureUrl || null,
        staffProfileUrl: d.staffProfileUrl || null,
      });

      // Editable fields
      setFormData((prev) => ({
        ...prev,
        firstName: d.firstName || "",
        lastName: d.lastName || "",
        address: d.address || "",
      }));

      // Profile picture — use staffProfileUrl from API if available
      if (d.staffProfileUrl) setProfilePreview(d.staffProfileUrl);

      // Signature — preload if already saved
      if (d.signatureUrl) setSignaturePreview(d.signatureUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Close modal on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target))
        closeModal();
    };
    if (showPasswordModal)
      document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [showPasswordModal]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const closeModal = () => {
    setShowPasswordModal(false);
    setPasswordStep(1);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordError(null);
    setShowOld(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordDataChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordError(null);
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (err) => reject(err);
    });

  // ── Avatar upload ────────────────────────────────────────────────────────
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("File size exceeds 2MB limit");
      return;
    }
    const validTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload PNG, JPG, or JPEG format");
      return;
    }
    setFormData((prev) => ({ ...prev, profilePicture: file }));
    const reader = new FileReader();
    reader.onloadend = () => setProfilePreview(reader.result);
    reader.readAsDataURL(file);
    setError(null);
  };

  // ── Signature upload ─────────────────────────────────────────────────────
  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "image/png") {
      setError("Please upload PNG format for signature");
      return;
    }
    setSignatureFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setSignaturePreview(reader.result);
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleSignatureSubmit = async () => {
    if (!signatureFile) {
      setError("Please select a signature file first");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const base64Signature = await fileToBase64(signatureFile);
      await apiClient.put("/classteacher/uploadsignature", {
        signature: base64Signature,
      });
      setSuccess("Signature uploaded successfully!");
      setSignatureFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload signature");
    } finally {
      setLoading(false);
    }
  };

  // ── Profile submit ───────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const requestBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
      };

      if (formData.profilePicture instanceof File) {
        requestBody.profilePicture = await fileToBase64(
          formData.profilePicture,
        );
      }

      await apiClient.put("/classteacher/updateprofile", requestBody);
      setSuccess("Profile updated successfully!");
      await fetchUserData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // ── Password modal: Step 1 — verify old password ─────────────────────────
  const handleVerifyOldPassword = async () => {
    if (!passwordData.oldPassword) {
      setPasswordError("Please enter your current password");
      return;
    }
    try {
      setPasswordLoading(true);
      setPasswordError(null);
      await apiClient.post("/classteacher/verifypassword", {
        oldPassword: passwordData.oldPassword,
      });
      setPasswordStep(2); // ✅ Only move forward if verify succeeds
    } catch (err) {
      setPasswordError(
        err.response?.data?.message || "Incorrect password. Please try again.",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  // ── Password modal: Step 2 — set new password ────────────────────────────
  const handleSetNewPassword = async () => {
    if (!passwordData.newPassword) {
      setPasswordError("Please enter a new password");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    if (passwordData.newPassword === passwordData.oldPassword) {
      setPasswordError("New password must differ from your current password");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      setPasswordLoading(true);
      setPasswordError(null);
      await apiClient.put("/classteacher/updateprofile", {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });
      closeModal();
      setSuccess("Password changed successfully!");
    } catch (err) {
      setPasswordError(
        err.response?.data?.message || "Failed to change password",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  // ── Password strength ────────────────────────────────────────────────────
  const getPasswordStrength = (pwd) => {
    if (!pwd) return null;
    if (pwd.length < 6)
      return { label: "Too short", level: 1, color: "#ef4444" };
    if (pwd.length < 8) return { label: "Weak", level: 2, color: "#f97316" };
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    const score = [hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    if (score === 0) return { label: "Fair", level: 2, color: "#f97316" };
    if (score === 1) return { label: "Good", level: 3, color: "#eab308" };
    if (score === 2) return { label: "Strong", level: 4, color: "#22c55e" };
    return { label: "Very strong", level: 5, color: "#16a34a" };
  };

  const strength = getPasswordStrength(passwordData.newPassword);

  // ── Display helpers ──────────────────────────────────────────────────────
  // subjectAssigned is an array — join for display
  const subjectDisplay = Array.isArray(userData.subjectAssigned)
    ? userData.subjectAssigned.join(", ") || "Not assigned"
    : userData.subjectAssigned || "Not assigned";

  const classDisplay = Array.isArray(userData.classAssigned)
    ? userData.classAssigned.join(", ") || "Not assigned"
    : userData.classAssigned || "Not assigned";

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <main className="CTSettings">
      <article className="CTSettingsWrapper">
        {error && <div className="CTSettingsError">{error}</div>}
        {success && <div className="CTSettingsSuccess">{success}</div>}
        {loading && <div className="CTSettingsLoading">Processing...</div>}

        {/* ── Profile form ──────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit}>
          <section className="CTSettingsProfileCard">
            <nav className="CTSettingsCardTitle">Profile Information</nav>

            <article className="CTSettingsProfileContent">
              {/* Avatar */}
              <div className="CTSettingsProfileImage">
                <div
                  className="CTSettingsAvatarHolder"
                  onClick={() => profileInputRef.current?.click()}
                  title="Click to change photo"
                >
                  <img
                    className="CTSettingsAvatar"
                    src={profilePreview}
                    alt="Profile"
                  />
                  <div className="CTSettingsAvatarOverlay">
                    <span>Change</span>
                  </div>
                </div>
                <input
                  ref={profileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={handleProfilePictureUpload}
                  style={{ display: "none" }}
                />
                <span>PNG, JPG. Max 2MB</span>
              </div>

              <div className="CTSettingsForm">
                {/* Row 1 — editable */}
                <div className="CTSettingsRow">
                  <div className="CTSettingsFieldEdit">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div className="CTSettingsFieldEdit">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>

                {/* Row 2 — read-only */}
                <div className="CTSettingsRow">
                  <div className="CTSettingsField">
                    <label>Subject(s) Assigned</label>
                    <input
                      type="text"
                      value={subjectDisplay}
                      disabled
                      className="CTSettingsDisabled"
                    />
                  </div>
                  <div className="CTSettingsField">
                    <label>Role</label>
                    <input
                      type="text"
                      value={userData.staffType}
                      disabled
                      className="CTSettingsDisabled"
                    />
                  </div>
                </div>

                {/* Row 3 — read-only */}
                <div className="CTSettingsRow">
                  <div className="CTSettingsField">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={userData.phoneNumber}
                      disabled
                      className="CTSettingsDisabled"
                    />
                  </div>
                  <div className="CTSettingsField">
                    <label>Email Address</label>
                    <input
                      type="text"
                      value={userData.email}
                      disabled
                      className="CTSettingsDisabled"
                    />
                  </div>
                </div>

                {/* Row 4 — read-only */}
                <div className="CTSettingsRow">
                  <div className="CTSettingsField">
                    <label>Class Assigned</label>
                    <input
                      type="text"
                      value={classDisplay}
                      disabled
                      className="CTSettingsDisabled"
                    />
                  </div>
                  <div className="CTSettingsField">
                    <label>Qualification</label>
                    <input
                      type="text"
                      value={userData.qualification}
                      disabled
                      className="CTSettingsDisabled"
                    />
                  </div>
                </div>

                {/* Address — editable */}
                <div className="CTSettingsAddress">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>

                <div className="CTSettingsSaveBtnHolder">
                  <button
                    type="submit"
                    className="CTSettingsSaveBtn"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </article>
          </section>
        </form>

        {/* ── Signature ─────────────────────────────────────────────────── */}
        <section className="CTSettingsSignatureCard">
          <nav className="CTSettingsCardTitle2">Upload Signature</nav>
          <article className="CTSignatureTextBox">
            <span>Class Teacher's Signature</span>
            <div className="CTSettingsSignatureBox">
              <div className="CTSig">
                {signaturePreview ? (
                  <img src={signaturePreview} alt="Signature" />
                ) : (
                  <span className="CTSigPlaceholder">No signature</span>
                )}
              </div>
              <div className="CTsigUploadHolder">
                <input
                  type="file"
                  accept=".png"
                  onChange={handleSignatureUpload}
                  style={{ display: "none" }}
                  id="signatureUpload"
                />
                <label htmlFor="signatureUpload" className="CTsigUploadBtn">
                  Upload
                </label>
                <span>PNG format recommended</span>
                {signatureFile && (
                  <button
                    onClick={handleSignatureSubmit}
                    className="CTsigSubmitBtn"
                    disabled={loading}
                  >
                    Submit Signature
                  </button>
                )}
              </div>
            </div>
          </article>
        </section>

        {/* ── Security card ─────────────────────────────────────────────── */}
        <section className="CTSettingsSecurityCard">
          <div className="CTSettingsSecurityText">
            <nav>Security</nav>
            <div className="CTChangePassInfo">
              <p className="CTChangePassTitle">Change Password</p>
              <p className="CTChangePassSub">
                Update your password to keep your account secure
              </p>
            </div>
          </div>
          <button
            className="CTSettingsPasswordBtn"
            onClick={() => setShowPasswordModal(true)}
            type="button"
          >
            Change Password
          </button>
        </section>
      </article>

      {/* ── Password Modal ─────────────────────────────────────────────────── */}
      {showPasswordModal && (
        <div className="CTModalBackdrop">
          <div className="CTModalCard" ref={modalRef}>
            {/* Header */}
            <div className="CTModalHeader">
              <div className="CTModalHeaderText">
                <h2>
                  {passwordStep === 1
                    ? "Verify Identity"
                    : "Create New Password"}
                </h2>
                <p>
                  {passwordStep === 1
                    ? "Enter your current password to continue"
                    : "Choose a strong password you haven't used before"}
                </p>
              </div>
              <button
                className="CTModalClose"
                onClick={closeModal}
                type="button"
              >
                ✕
              </button>
            </div>

            {/* Step pills */}
            <div className="CTModalSteps">
              <div
                className={`CTModalStep ${passwordStep >= 1 ? "CTModalStepActive" : ""}`}
              >
                <span>1</span> Verify
              </div>
              <div className="CTModalStepLine" />
              <div
                className={`CTModalStep ${passwordStep >= 2 ? "CTModalStepActive" : ""}`}
              >
                <span>2</span> New Password
              </div>
            </div>

            {/* Inline error */}
            {passwordError && (
              <div className="CTModalError">{passwordError}</div>
            )}

            {/* ── Step 1 ── */}
            {passwordStep === 1 && (
              <div className="CTModalBody">
                <div className="CTModalField">
                  <label>Current Password</label>
                  <div className="CTModalInputWrap">
                    <input
                      type={showOld ? "text" : "password"}
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordDataChange}
                      placeholder="Enter your current password"
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleVerifyOldPassword()
                      }
                      autoFocus
                    />
                    <button
                      type="button"
                      className="CTModalEye"
                      onClick={() => setShowOld((v) => !v)}
                    >
                      {showOld ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <div className="CTModalActions">
                  <button
                    className="CTModalBtnSecondary"
                    onClick={closeModal}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="CTModalBtnPrimary"
                    onClick={handleVerifyOldPassword}
                    disabled={passwordLoading}
                    type="button"
                  >
                    {passwordLoading ? "Verifying..." : "Continue →"}
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2 ── */}
            {passwordStep === 2 && (
              <div className="CTModalBody">
                <div className="CTModalField">
                  <label>New Password</label>
                  <div className="CTModalInputWrap">
                    <input
                      type={showNew ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordDataChange}
                      placeholder="Min 8 characters"
                      autoFocus
                    />
                    <button
                      type="button"
                      className="CTModalEye"
                      onClick={() => setShowNew((v) => !v)}
                    >
                      {showNew ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {strength && (
                    <div className="CTPasswordStrength">
                      <div className="CTStrengthBars">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div
                            key={n}
                            className="CTStrengthBar"
                            style={{
                              background:
                                n <= strength.level
                                  ? strength.color
                                  : "#e5e7eb",
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ color: strength.color }}>
                        {strength.label}
                      </span>
                    </div>
                  )}
                </div>

                <div className="CTModalField">
                  <label>Confirm New Password</label>
                  <div className="CTModalInputWrap">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordDataChange}
                      placeholder="Re-enter new password"
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSetNewPassword()
                      }
                    />
                    <button
                      type="button"
                      className="CTModalEye"
                      onClick={() => setShowConfirm((v) => !v)}
                    >
                      {showConfirm ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {passwordData.confirmPassword && (
                    <p
                      className="CTMatchHint"
                      style={{
                        color:
                          passwordData.newPassword ===
                          passwordData.confirmPassword
                            ? "#16a34a"
                            : "#ef4444",
                      }}
                    >
                      {passwordData.newPassword === passwordData.confirmPassword
                        ? "✓ Passwords match"
                        : "✗ Passwords do not match"}
                    </p>
                  )}
                </div>

                <div className="CTModalActions">
                  <button
                    className="CTModalBtnSecondary"
                    onClick={() => {
                      setPasswordStep(1);
                      setPasswordError(null);
                    }}
                    type="button"
                  >
                    ← Back
                  </button>
                  <button
                    className="CTModalBtnPrimary"
                    onClick={handleSetNewPassword}
                    disabled={passwordLoading}
                    type="button"
                  >
                    {passwordLoading ? "Saving..." : "Save Password"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default CTSettings;
