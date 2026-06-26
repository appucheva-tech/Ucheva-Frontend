import React, { useState, useEffect, useRef } from "react";
import "./AdminSettings.css";
import { apiClient } from "../../config/AxiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../../global/userSlice";

const AdminSettings = () => {
  const dispatch = useDispatch();

  // ─── Admin Profile ────────────────────────────────────────────
  const [adminProfile, setAdminProfile] = useState({
    adminFirstName: "",
    adminLastName: "",
    schoolType: "",
    phoneNumber: "",
  });
  const [adminPhoto, setAdminPhoto] = useState(null);
  const [adminPhotoPreview, setAdminPhotoPreview] = useState(null);
  const adminPhotoRef = useRef();

  // ─── Password Fields ──────────────────────────────────────────
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ─── Report Card Config ───────────────────────────────────────
  const [reportConfig, setReportConfig] = useState({
    continuousAssessmentConfig: 40,
    examConfig: 60,
    total: 100,
  });

  // ─── School Profile ─────────────────────────────────────────
  const [schoolProfile, setSchoolProfile] = useState({
    schoolName: "",
    email: "",
    phoneNumber: "",
    academicSession: "",
    address: "",
    logoUrl: null,
  });
  const [schoolLoading, setSchoolLoading] = useState(true);

  // ─── Stamp & Signature ──────────────────────────────────────
  const [stampFile, setStampFile] = useState(null);
  const [stampPreview, setStampPreview] = useState(null);
  const stampRef = useRef();

  const [signatureFile, setSignatureFile] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const signatureRef = useRef();

  // ─── School Verification ──────────────────────────────────────
  const [cacFile, setCacFile] = useState(null);
  const [nepaFile, setNepaFile] = useState(null);
  const [cacPreview, setCacPreview] = useState(null);
  const [nepaPreview, setNepaPreview] = useState(null);
  const cacRef = useRef();
  const nepaRef = useRef();

  // ─── Update Profile Modal ─────────────────────────────────────
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  // ─── Single saving state for all sections ────────────────────
  const [saving, setSaving] = useState(false);

  // ─── Toast ────────────────────────────────────────────────────
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ─── GET Method - Fetch Settings ─────────────────────────────
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiClient.get("/admin/profile-settings");
        const data = response.data.admin;

        // Map Admin Profile
        if (data.adminFirstName) {
          setAdminProfile({
            adminFirstName: data.adminFirstName || "",
            adminLastName: data.adminLastName || "",
            schoolType: data.schoolType || "",
            phoneNumber: data.phoneNumber || "",
          });
        }

        // Map School Profile
        if (data.school) {
          setSchoolProfile({
            schoolName: data.school.schoolName || data.schoolName || "",
            email: data.school.email || data.email || "",
            phoneNumber: data.school.phoneNumber || data.phoneNumber || "",
            academicSession:
              data.school.academicSession || data.academicSession || "",
            address: data.school.address || data.address || "",
            logoUrl: data.school.logoUrl || data.logoUrl || null,
          });
        } else {
          // Fallback mapping
          setSchoolProfile({
            schoolName: data.schoolName || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            academicSession: data.academicSession || "",
            address: data.address || "",
            logoUrl: data.logoUrl || null,
          });
        }

        // Map Report Card Config
        if (data.continuousAssessmentConfig !== undefined) {
          setReportConfig({
            continuousAssessmentConfig: data.continuousAssessmentConfig || 40,
            examConfig: data.examConfig || 60,
            total: data.total || 100,
          });
        }

        // Map Stamp Preview
        if (data.schoolStamp) {
          setStampPreview(data.schoolStamp);
        }

        // Map Signature Preview
        if (data.adminSignature) {
          setSignaturePreview(data.adminSignature);
        }

        // Map CAC Document
        if (data.cacDocument) {
          setCacPreview(data.cacDocument);
        }

        // Map NEPA Bill
        if (data.nepaBill) {
          setNepaPreview(data.nepaBill);
        }

        setSchoolLoading(false);
      } catch (error) {
        console.error("Error fetching settings:", error);
        showToast("Failed to load settings", "error");
        setSchoolLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // ─── Admin Photo Upload ───────────────────────────────────────
  const handleAdminPhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast("Image must be under 2MB", "error");
      return;
    }
    setAdminPhoto(file);
    setAdminPhotoPreview(URL.createObjectURL(file));
  };

  // ─── Signature Upload ────────────────────────────────────────
  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSignatureFile(file);
    setSignaturePreview(URL.createObjectURL(file));
  };

  // ─── CA Score change keeps total at 100 ──────────────────────
  const handleCaScoreChange = (val) => {
    const ca = Math.min(100, Math.max(0, Number(val)));
    setReportConfig({
      continuousAssessmentConfig: ca,
      examConfig: 100 - ca,
      total: 100,
    });
  };

  // ─── Stamp Upload ─────────────────────────────────────────────
  const handleStampChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStampFile(file);
    setStampPreview(URL.createObjectURL(file));
  };

  // ─── Verification File Uploads ────────────────────────────────
  const handleCacChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCacFile(file);
    setCacPreview(URL.createObjectURL(file));
  };

  const handleNepaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNepaFile(file);
    setNepaPreview(URL.createObjectURL(file));
  };

  // ─── Password Strength Calculator ────────────────────────────
  const getPasswordStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ["Weak", "Fair", "Good", "Strong"];
    const colors = ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];
    return { score, label: labels[score - 1], color: colors[score - 1] };
  };

  // ─── SINGLE PUT — every Save Changes button calls this ────────
  const handleSaveAll = async () => {
    if (
      passwordFields.newPassword &&
      passwordFields.newPassword !== passwordFields.confirmPassword
    ) {
      showToast("New password and confirm password do not match.", "error");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();

      // Admin Profile
      if (adminProfile.adminFirstName)
        formData.append("adminFirstName", adminProfile.adminFirstName);
      if (adminProfile.adminLastName)
        formData.append("adminLastName", adminProfile.adminLastName);
      if (adminProfile.schoolType)
        formData.append("schoolType", adminProfile.schoolType);
      if (adminProfile.phoneNumber)
        formData.append("phoneNumber", adminProfile.phoneNumber);

      // Report Card Config
      formData.append(
        "continuousAssessmentConfig",
        reportConfig.continuousAssessmentConfig,
      );
      formData.append("examConfig", reportConfig.examConfig);
      formData.append("total", reportConfig.total);

      // Files
      if (adminPhoto) formData.append("profilePic", adminPhoto);
      if (stampFile) formData.append("schoolStamp", stampFile);
      if (signatureFile) formData.append("adminSignature", signatureFile);
      if (cacFile) formData.append("cac", cacFile);
      if (nepaFile) formData.append("nepa", nepaFile);

      // Password
      if (passwordFields.oldPassword) {
        formData.append("oldPassword", passwordFields.oldPassword);
        formData.append("newPassword", passwordFields.newPassword);
        formData.append("confirmPassword", passwordFields.confirmPassword);
      }

      const res = await apiClient.put("/admin/profile-settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = res.data?.admin || res.data?.user || null;

      if (updatedUser) {
        dispatch(setUser(updatedUser));
      } else {
        dispatch(
          setUser({
            adminFirstName: adminProfile.adminFirstName,
            adminLastName: adminProfile.adminLastName,
          }),
        );
      }

      showToast("Settings saved successfully.");
      setShowUpdateProfile(false);
      setPasswordFields({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Failed to save settings.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  // ─── DELETE Account ───────────────────────────────────────────
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone.",
    );
    if (!confirmed) return;
    try {
      await apiClient.delete("/admin/profile-settings");
      showToast("Account deleted.");
    } catch {
      showToast("Failed to delete account.", "error");
    }
  };

  const strength = passwordFields.newPassword
    ? getPasswordStrength(passwordFields.newPassword)
    : null;

  return (
    <>
      {toast && (
        <div
          className={`toastNotification ${toast.type === "error" ? "toastError" : "toastSuccess"}`}
        >
          {toast.message}
        </div>
      )}

      {/* ─── Change Password Modal ────────────────────────────── */}
      {showUpdateProfile && (
        <div className="modalOverlay">
          <div className="modalCard">
            <div className="modalHeader">
              <div className="modalHeaderLeft">
                <div className="modalIconBadge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <h2 className="modalTitle">Change Password</h2>
                  <p className="modalSubtitle">Update your account password</p>
                </div>
              </div>
              <button
                className="modalCloseBtn"
                onClick={() => {
                  setShowUpdateProfile(false);
                  setPasswordFields({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
              >
                ✕
              </button>
            </div>

            <div className="modalBody">
              <div className="inputGroup">
                <label className="inputLabel">Old Password</label>
                <div className="passwordInputWrapper">
                  <svg
                    className="passwordIcon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type="password"
                    className="textInput passwordInput"
                    placeholder="Enter your current password"
                    value={passwordFields.oldPassword}
                    onChange={(e) =>
                      setPasswordFields((p) => ({
                        ...p,
                        oldPassword: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="inputGroup">
                <label className="inputLabel">New Password</label>
                <div className="passwordInputWrapper">
                  <svg
                    className="passwordIcon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <input
                    type="password"
                    className="textInput passwordInput"
                    placeholder="Create a strong password"
                    value={passwordFields.newPassword}
                    onChange={(e) =>
                      setPasswordFields((p) => ({
                        ...p,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="inputGroup">
                <label className="inputLabel">Confirm Password</label>
                <div className="passwordInputWrapper">
                  <svg
                    className="passwordIcon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <input
                    type="password"
                    className="textInput passwordInput"
                    placeholder="Re-enter your new password"
                    value={passwordFields.confirmPassword}
                    onChange={(e) =>
                      setPasswordFields((p) => ({
                        ...p,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />
                </div>
                {passwordFields.confirmPassword &&
                  passwordFields.newPassword !==
                    passwordFields.confirmPassword && (
                    <span className="passwordMismatchHint">
                      ⚠ Passwords do not match
                    </span>
                  )}
                {passwordFields.confirmPassword &&
                  passwordFields.newPassword ===
                    passwordFields.confirmPassword && (
                    <span className="passwordMatchHint">✓ Passwords match</span>
                  )}
              </div>
            </div>

            <div className="modalFooter">
              <button
                className="modalCancelBtn"
                onClick={() => {
                  setShowUpdateProfile(false);
                  setPasswordFields({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="modalSaveBtn"
                onClick={handleSaveAll}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="modalSpinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    Change Password
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="settingsContainer">
        <div className="settingsHeader">
          <h1 className="mainTitle">Settings</h1>
          <p className="mainSubtitle">
            Manage your school preferences, report card setup, notifications,
            and security.
          </p>
        </div>

        {/* ─── Admin Profile ───────────────────────────────────── */}
        <section className="settingsCard">
          <h2 className="cardTitle">Admin Profile</h2>
          <div className="profileLayout">
            <div className="avatarWrapper">
              <div className="imageContainer">
                {adminPhotoPreview ? (
                  <img
                    src={adminPhotoPreview}
                    alt="Admin Profile"
                    className="profileImg"
                  />
                ) : (
                  <div className="profileImgPlaceholder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                )}
                <button
                  className="cameraBtn"
                  aria-label="Upload profile image"
                  onClick={() => adminPhotoRef.current.click()}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="cameraIcon"
                  >
                    <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                  </svg>
                </button>
                <input
                  ref={adminPhotoRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  style={{ display: "none" }}
                  onChange={handleAdminPhotoChange}
                />
              </div>
              <span className="uploadHint">PNG, JPG, Max 2MB</span>
            </div>

            <div className="formFieldsCol">
              <div className="formFieldsRow">
                <div className="inputGroup">
                  <label className="inputLabel">First Name</label>
                  <input
                    type="text"
                    className="textInput"
                    placeholder="First Name"
                    value={adminProfile.adminFirstName}
                    onChange={(e) =>
                      setAdminProfile((p) => ({
                        ...p,
                        adminFirstName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputGroup">
                  <label className="inputLabel">Last Name</label>
                  <input
                    type="text"
                    className="textInput"
                    placeholder="Last Name"
                    value={adminProfile.adminLastName}
                    onChange={(e) =>
                      setAdminProfile((p) => ({
                        ...p,
                        adminLastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="formFieldsRow">
                <div className="inputGroup">
                  <label className="inputLabel">Phone Number</label>
                  <input
                    type="text"
                    className="textInput"
                    placeholder="Phone Number"
                    value={adminProfile.phoneNumber}
                    onChange={(e) =>
                      setAdminProfile((p) => ({
                        ...p,
                        phoneNumber: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="cardActionRow">
            <button
              className="saveChangesBtn"
              onClick={handleSaveAll}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        {/* ─── School Profile ──────────────────────────────────── */}
        <section className="settingsCard">
          <h2 className="cardTitle">School Profile</h2>
          <div className="schoolLayout">
            <div className="logoWrapper">
              <div className="logoBadgeContainer">
                {schoolProfile.logoUrl ? (
                  <img
                    src={schoolProfile.logoUrl}
                    alt="School Logo"
                    className="schoolLogoImg"
                  />
                ) : (
                  <div className="emblemPlaceholder">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M12 8v8M8 12h8" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="schoolFormGrid">
              <div className="inputGroup">
                <label className="inputLabel">School Name</label>
                <input
                  type="text"
                  className="textInput"
                  value={
                    schoolLoading ? "Loading..." : schoolProfile.schoolName
                  }
                  readOnly
                />
              </div>
              <div className="inputGroup">
                <label className="inputLabel">Phone Number</label>
                <input
                  type="text"
                  className="textInput"
                  value={
                    schoolLoading ? "Loading..." : schoolProfile.phoneNumber
                  }
                  readOnly
                />
              </div>
              <div className="inputGroup fullWidthRow">
                <label className="inputLabel">Academic Session</label>
                <div className="selectWrapper">
                  <select
                    className="selectInput"
                    value={schoolProfile.academicSession}
                    disabled
                  >
                    <option value={schoolProfile.academicSession}>
                      {schoolProfile.academicSession || "2025/2026"}
                    </option>
                  </select>
                </div>
              </div>
              <div className="inputGroup fullWidthRow">
                <label className="inputLabel">Address</label>
                <input
                  type="text"
                  className="textInput"
                  value={schoolLoading ? "Loading..." : schoolProfile.address}
                  readOnly
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Report Card Configuration ────────────────────────── */}
        <section className="settingsCard">
          <h2 className="cardTitle">Report Card Configuration</h2>
          <div className="configurationLayout">
            <div className="scoresColumn">
              <div className="scoresInlineGrid">
                <div className="inputGroup">
                  <label className="inputLabel">CA Score (%)</label>
                  <input
                    type="number"
                    className="textInput numericalInput"
                    value={reportConfig.continuousAssessmentConfig}
                    min={0}
                    max={100}
                    onChange={(e) => handleCaScoreChange(e.target.value)}
                  />
                </div>
                <div className="inputGroup">
                  <label className="inputLabel">Exam Score (%)</label>
                  <input
                    type="number"
                    className="textInput numericalInput disabledInput"
                    value={reportConfig.examConfig}
                    readOnly
                  />
                </div>
                <div className="inputGroup">
                  <label className="inputLabel">Total Score (%)</label>
                  <input
                    type="text"
                    className="textInput numericalInput disabledInput"
                    value={reportConfig.total}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="cardActionRow">
            <button
              className="saveChangesBtn"
              onClick={handleSaveAll}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        {/* ─── School Stamps ───────────────────────────────────── */}
        <section className="settingsCard">
          <h2 className="cardTitle">School Stamps</h2>
          <div className="stampsLayout">
            <div className="stampUploadGroup">
              <div className="uploadComponentBox">
                <label className="inputLabel">Upload</label>
                <div
                  className="dottedDropzone"
                  onClick={() => stampRef.current.click()}
                  style={{ cursor: "pointer" }}
                >
                  {stampPreview ? (
                    <img
                      src={stampPreview}
                      alt="Stamp preview"
                      style={{
                        width: 48,
                        height: 48,
                        objectFit: "contain",
                        marginBottom: 8,
                      }}
                    />
                  ) : (
                    <div className="stampCircularGraphic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
                        <circle cx="12" cy="12" r="7" />
                      </svg>
                    </div>
                  )}
                  <button
                    className="dropzoneUploadBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      stampRef.current.click();
                    }}
                  >
                    Upload
                  </button>
                  <span className="dropzoneHint">PNG format recommended</span>
                  <input
                    ref={stampRef}
                    type="file"
                    accept="image/png"
                    style={{ display: "none" }}
                    onChange={handleStampChange}
                  />
                </div>
              </div>
            </div>

            <div className="signatureUploadGroup">
              <div className="uploadComponentBox">
                <label className="inputLabel">Admin Signature</label>
                <div
                  className="dottedDropzone"
                  onClick={() => signatureRef.current.click()}
                  style={{ cursor: "pointer" }}
                >
                  {signaturePreview ? (
                    <img
                      src={signaturePreview}
                      alt="Signature preview"
                      style={{
                        width: 48,
                        height: 48,
                        objectFit: "contain",
                        marginBottom: 8,
                      }}
                    />
                  ) : (
                    <div className="stampCircularGraphic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path d="M3 16l5 5 13-13" />
                        <path d="M8 21l-5-5" />
                      </svg>
                    </div>
                  )}
                  <button
                    className="dropzoneUploadBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      signatureRef.current.click();
                    }}
                  >
                    Upload
                  </button>
                  <span className="dropzoneHint">PNG format recommended</span>
                  <input
                    ref={signatureRef}
                    type="file"
                    accept="image/png"
                    style={{ display: "none" }}
                    onChange={handleSignatureChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="cardActionRow">
            <button
              className="saveChangesBtn"
              onClick={handleSaveAll}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        {/* ─── Attendance Notifications ────────────────────────── */}
        <section className="settingsCard">
          <h2 className="cardTitle">Attendance Notifications</h2>
          <div className="notificationLayout">
            <p className="notificationText">
              Automatically notify parents when a student is marked absent
            </p>
            <div className="inputGroup notificationSelectGroup">
              <label className="inputLabel">Message Template (WhatsApp)</label>
              <div className="selectWrapper">
                <select className="selectInput">
                  <option>Choose Template</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* ─── School Verification ──────────────────────────────── */}
        <section className="settingsCard">
          <h2 className="cardTitle">School Verification</h2>
          <div className="verificationUploadersRow">
            <div className="uploaderBox">
              <span className="uploaderLabel">CAC Document</span>
              <div
                className="dropzoneBorderArea"
                onClick={() => cacRef.current.click()}
                style={{ cursor: "pointer" }}
              >
                {cacPreview && (
                  <img
                    src={cacPreview}
                    alt="CAC preview"
                    style={{
                      width: "100%",
                      height: 80,
                      objectFit: "contain",
                      marginBottom: 8,
                    }}
                  />
                )}
                <button
                  className="innerUploadBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    cacRef.current.click();
                  }}
                >
                  {cacFile ? "Change File" : "Upload"}
                </button>
                <span className="formatHintText">
                  {cacFile ? cacFile.name : "PNG format recommended"}
                </span>
                <input
                  ref={cacRef}
                  type="file"
                  accept="image/png"
                  style={{ display: "none" }}
                  onChange={handleCacChange}
                />
              </div>
            </div>

            <div className="uploaderBox">
              <span className="uploaderLabel">NEPA Bill</span>
              <div
                className="dropzoneBorderArea"
                onClick={() => nepaRef.current.click()}
                style={{ cursor: "pointer" }}
              >
                {nepaPreview && (
                  <img
                    src={nepaPreview}
                    alt="NEPA Bill preview"
                    style={{
                      width: "100%",
                      height: 80,
                      objectFit: "contain",
                      marginBottom: 8,
                    }}
                  />
                )}
                <button
                  className="innerUploadBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    nepaRef.current.click();
                  }}
                >
                  {nepaFile ? "Change File" : "Upload"}
                </button>
                <span className="formatHintText">
                  {nepaFile ? nepaFile.name : "PNG format recommended"}
                </span>
                <input
                  ref={nepaRef}
                  type="file"
                  accept="image/png"
                  style={{ display: "none" }}
                  onChange={handleNepaChange}
                />
              </div>
            </div>
          </div>
          <div className="cardActionRow">
            <button
              className="saveChangesBtn"
              onClick={handleSaveAll}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        {/* ─── Security ─────────────────────────────────────────── */}
        <section className="settingsCard">
          <h2 className="cardTitle">Security</h2>
          <div className="actionFlexRow">
            <div className="infoContextBlock">
              <h3 className="actionItemHeading">Change Password</h3>
              <p className="actionItemSubtext">
                Receive real-time notifications and team alerts.
              </p>
            </div>
            <button
              className="outlineActionButton"
              onClick={() => setShowUpdateProfile(true)}
            >
              Change Password
            </button>
          </div>
        </section>

        {/* ─── Danger Zone ──────────────────────────────────────── */}
        <section className="settingsCard dangerZoneCard">
          <h2 className="cardTitle dangerTitleColor">Danger Zone</h2>
          <div className="actionFlexRow">
            <div className="infoContextBlock">
              <h3 className="actionItemHeading">Delete account</h3>
              <p className="actionItemSubtext">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
            <button
              className="dangerActionButton"
              onClick={handleDeleteAccount}
            >
              <svg
                className="shieldIcon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminSettings;
