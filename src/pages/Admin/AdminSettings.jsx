import React, { useState, useEffect, useRef } from "react";
import "./AdminSettings.css";
import { apiClient } from "../../config/AxiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../../global/userSlice";

const AdminSettings = () => {
  const dispatch = useDispatch();

  // ─── Admin Profile ─────────────────────────────────────────────
  const [adminProfile, setAdminProfile] = useState({
    adminFirstName: "",
    adminLastName: "",
    schoolType: [],
  });
  const [adminPhoto, setAdminPhoto] = useState(null);
  const [adminPhotoPreview, setAdminPhotoPreview] = useState(null);
  const adminPhotoRef = useRef();

  // ─── Password Fields ───────────────────────────────────────────
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ─── Report Card Config ────────────────────────────────────────
  const [reportConfig, setReportConfig] = useState({
    continuousAssessmentConfig: 40,
    examConfig: 60,
    total: 100,
  });

  // ─── School Profile ────────────────────────────────────────────
  // phoneNumber lives here so we can send it — backend reads it from req.body
  const [schoolProfile, setSchoolProfile] = useState({
    schoolName: "",
    email: "",
    phoneNumber: "", // ✅ sent to backend as req.body.phoneNumber
    academicSession: "",
    term: "",
    address: "",
  });
  const [schoolLoading, setSchoolLoading] = useState(true);

  // ─── File states ───────────────────────────────────────────────
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const logoRef = useRef();

  const [stampFile, setStampFile] = useState(null);
  const [stampPreview, setStampPreview] = useState(null);
  const stampRef = useRef();

  const [signatureFile, setSignatureFile] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const signatureRef = useRef();

  const [cacFile, setCacFile] = useState(null);
  const [nepaFile, setNepaFile] = useState(null);
  const [cacPreview, setCacPreview] = useState(null);
  const [nepaPreview, setNepaPreview] = useState(null);
  const cacRef = useRef();
  const nepaRef = useRef();

  // ─── UI State ──────────────────────────────────────────────────
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const generateAcademicSession = () => {
    const year = new Date().getFullYear();
    return `${year}/${year + 1}`;
  };

  // ─── GET: Fetch Settings ───────────────────────────────────────
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiClient.get("/admin/profile");
        const adminData = response.data.admin;
        const profileData = response.data.adminProfile;

        if (adminData) {
          setAdminProfile({
            adminFirstName: profileData?.adminFirstName || "",
            adminLastName: profileData?.adminLastName || "",
            schoolType: profileData?.schoolType || [],
          });

          setSchoolProfile({
            schoolName: adminData.schoolName || "",
            email: adminData.email || "",
            phoneNumber: adminData.phoneNumber || "", // ✅ pre-fill
            address: adminData.address || "",
            // ✅ always fall back to generated so it's never empty
            academicSession:
              profileData?.academicSession || generateAcademicSession(),
            term: profileData?.term || "",
          });
        }

        if (profileData) {
          setReportConfig({
            continuousAssessmentConfig:
              profileData.continuousAssessmentConfig ?? 40,
            examConfig: profileData.examConfig ?? 60,
            total: profileData.total ?? 100,
          });

          // ✅ backend saves as adminProfileUrl (from controller: adminUpdates.adminProfileUrl)
          if (profileData.adminProfileUrl)
            setAdminPhotoPreview(profileData.adminProfileUrl);
          // also check adminUrl as fallback (GET response shows adminUrl)
          else if (profileData.adminUrl)
            setAdminPhotoPreview(profileData.adminUrl);

          if (profileData.schoolLogoUrl)
            setLogoPreview(profileData.schoolLogoUrl);
          if (profileData.schoolStampUrl)
            setStampPreview(profileData.schoolStampUrl);
          if (profileData.schoolSignatureUrl)
            setSignaturePreview(profileData.schoolSignatureUrl);
          if (profileData.cacUrl) setCacPreview(profileData.cacUrl);
          if (profileData.nepaUrl) setNepaPreview(profileData.nepaUrl);
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

  // ─── File change handlers ──────────────────────────────────────
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

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast("Image must be under 2MB", "error");
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleStampChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast("Image must be under 2MB", "error");
      return;
    }
    setStampFile(file);
    setStampPreview(URL.createObjectURL(file));
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast("Image must be under 2MB", "error");
      return;
    }
    setSignatureFile(file);
    setSignaturePreview(URL.createObjectURL(file));
  };

  const handleCacChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast("File must be under 2MB", "error");
      return;
    }
    setCacFile(file);
    setCacPreview(URL.createObjectURL(file));
  };

  const handleNepaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast("File must be under 2MB", "error");
      return;
    }
    setNepaFile(file);
    setNepaPreview(URL.createObjectURL(file));
  };

  // ─── CA score keeps total at 100 ──────────────────────────────
  const handleCaScoreChange = (val) => {
    const ca = Math.min(100, Math.max(0, Number(val)));
    setReportConfig({
      continuousAssessmentConfig: ca,
      examConfig: 100 - ca,
      total: 100,
    });
  };

  // ─── Password strength ─────────────────────────────────────────
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

  // ─── PUT: Single FormData → /admin/profile-settings ───────────
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
      const fd = new FormData();

      // ── req.body text fields (exactly as backend destructures) ──

      // adminFirstName, adminLastName → profileUpdates
      fd.append("adminFirstName", adminProfile.adminFirstName);
      fd.append("adminLastName", adminProfile.adminLastName);

      // phoneNumber → adminUpdates
      fd.append("phoneNumber", schoolProfile.phoneNumber);

      // academicSession — never send empty; fall back to generated
      fd.append(
        "academicSession",
        schoolProfile.academicSession || generateAcademicSession(),
      );

      // term — only send if user actually picked one
      if (schoolProfile.term) {
        fd.append("term", schoolProfile.term);
      }

      // Report card config
      fd.append(
        "continuousAssessmentConfig",
        String(reportConfig.continuousAssessmentConfig),
      );
      fd.append("examConfig", String(reportConfig.examConfig));
      fd.append("total", String(reportConfig.total));

      // Password — only if changing
      if (passwordFields.oldPassword) {
        fd.append("oldPassword", passwordFields.oldPassword);
        fd.append("newPassword", passwordFields.newPassword);
        fd.append("confirmPassword", passwordFields.confirmPassword);
      }

      // ── req.files — field names MUST match upload.fields() exactly ──
      // profilePic    → adminUpdates.adminProfileUrl
      if (adminPhoto) fd.append("profilePic", adminPhoto);
      // schoolLogo    → profileUpdates.schoolLogoUrl
      if (logoFile) fd.append("schoolLogo", logoFile);
      // schoolStamp   → profileUpdates.schoolStampUrl
      if (stampFile) fd.append("schoolStamp", stampFile);
      // schoolSignature → profileUpdates.schoolSignatureUrl
      if (signatureFile) fd.append("schoolSignature", signatureFile);
      // cac           → profileUpdates.cacUrl  ✅ was "cacDoc" before — now correct
      if (cacFile) fd.append("cac", cacFile);
      // nepa          → profileUpdates.nepaUrl  ✅ was "nepaBill" before — now correct
      if (nepaFile) fd.append("nepa", nepaFile);

      // ── DO NOT set Content-Type manually — axios sets boundary automatically ──
      const res = await apiClient.put("/admin/profile-settings", fd);

      const updatedUser = res.data?.admin || res.data?.user || null;
      if (updatedUser) dispatch(setUser(updatedUser));

      showToast(res.data?.message || "Settings saved successfully.");
      setShowUpdateProfile(false);
      setPasswordFields({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Clear file states after successful upload
      setAdminPhoto(null);
      setLogoFile(null);
      setStampFile(null);
      setSignatureFile(null);
      setCacFile(null);
      setNepaFile(null);

      // Refresh to get latest Cloudinary URLs from backend
      const refresh = await apiClient.get("/admin/profile");
      const p = refresh.data.adminProfile;

      // ✅ backend saves profile pic as adminProfileUrl
      if (p?.adminProfileUrl) setAdminPhotoPreview(p.adminProfileUrl);
      else if (p?.adminUrl) setAdminPhotoPreview(p.adminUrl);
      if (p?.schoolLogoUrl) setLogoPreview(p.schoolLogoUrl);
      if (p?.schoolStampUrl) setStampPreview(p.schoolStampUrl);
      if (p?.schoolSignatureUrl) setSignaturePreview(p.schoolSignatureUrl);
      if (p?.cacUrl) setCacPreview(p.cacUrl);
      if (p?.nepaUrl) setNepaPreview(p.nepaUrl);
    } catch (error) {
      console.error("Save error:", error.response?.data);
      showToast(
        error?.response?.data?.message || "Failed to save settings.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  // ─── DELETE Account ────────────────────────────────────────────
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

      {/* ─── Change Password Modal ──────────────────────────────── */}
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
                {/* Password strength bar */}
                {strength && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 6,
                    }}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        style={{
                          flex: 1,
                          height: 4,
                          borderRadius: 2,
                          background:
                            n <= strength.score ? strength.color : "#e5e7eb",
                          transition: "background 0.3s",
                        }}
                      />
                    ))}
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: strength.color,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {strength.label}
                    </span>
                  </div>
                )}
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

        {/* ─── Admin Profile ────────────────────────────────────── */}
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

        {/* ─── School Profile ───────────────────────────────────── */}
        <section className="settingsCard">
          <h2 className="cardTitle">School Profile</h2>
          <div className="schoolLayout">
            <div className="logoWrapper">
              <div
                className="logoBadgeContainer"
                style={{ position: "relative" }}
              >
                {logoPreview ? (
                  <img
                    src={logoPreview}
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
                <button
                  className="cameraBtn"
                  aria-label="Upload school logo"
                  onClick={() => logoRef.current.click()}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="cameraIcon"
                    style={{ width: 14, height: 14, color: "#64748b" }}
                  >
                    <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                  </svg>
                </button>
                <input
                  ref={logoRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  style={{ display: "none" }}
                  onChange={handleLogoChange}
                />
              </div>
              <span className="uploadHint">PNG, JPG, Max 2MB</span>
            </div>

            <div className="schoolFormGrid">
              <div className="inputGroup">
                <label className="inputLabel">School Name</label>
                <input
                  type="text"
                  readOnly
                  className="textInput disabledInput"
                  value={
                    schoolLoading ? "Loading..." : schoolProfile.schoolName
                  }
                />
              </div>
              <div className="inputGroup">
                <label className="inputLabel">Email</label>
                <input
                  type="email"
                  readOnly
                  className="textInput disabledInput"
                  value={schoolLoading ? "Loading..." : schoolProfile.email}
                />
              </div>
              {/* ✅ phoneNumber is editable and sent to backend */}
              <div className="inputGroup">
                <label className="inputLabel">Phone Number</label>
                <input
                  type="text"
                  className="textInput"
                  value={
                    schoolLoading ? "Loading..." : schoolProfile.phoneNumber
                  }
                  onChange={(e) =>
                    setSchoolProfile((p) => ({
                      ...p,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="inputGroup">
                <label className="inputLabel">Academic Session</label>
                <div className="selectWrapper">
                  <select
                    className="selectInput"
                    value={schoolProfile.academicSession}
                    onChange={(e) =>
                      setSchoolProfile((p) => ({
                        ...p,
                        academicSession: e.target.value,
                      }))
                    }
                  >
                    <option value={generateAcademicSession()}>
                      {generateAcademicSession()}
                    </option>
                  </select>
                </div>
              </div>
              <div className="inputGroup">
                <label className="inputLabel">Term</label>
                <div className="selectWrapper">
                  <select
                    className="selectInput"
                    value={schoolProfile.term || ""}
                    onChange={(e) =>
                      setSchoolProfile((p) => ({ ...p, term: e.target.value }))
                    }
                  >
                    <option value="">Select Term</option>
                    <option value="First Term">First Term</option>
                    <option value="Second Term">Second Term</option>
                    <option value="Third Term">Third Term</option>
                  </select>
                </div>
              </div>
              <div className="inputGroup fullWidthRow">
                <label className="inputLabel">Address</label>
                <input
                  type="text"
                  readOnly
                  className="textInput disabledInput"
                  value={schoolLoading ? "Loading..." : schoolProfile.address}
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

        {/* ─── School Stamps & Signature ────────────────────────── */}
        <section className="settingsCard">
          <h2 className="cardTitle">School Stamps</h2>
          <div className="stampsLayout">
            {/* Stamp */}
            <div className="stampUploadGroup">
              <div className="uploadComponentBox">
                <label className="inputLabel">Upload Stamp</label>
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
                    {stampFile ? "Change" : "Upload"}
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

            {/* Signature */}
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
                    {signatureFile ? "Change" : "Upload"}
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

        {/* ─── Attendance Notifications ─────────────────────────── */}
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
            {/* CAC */}
            <div className="uploaderBox">
              <span className="uploaderLabel">CAC Document</span>
              <div
                className="dropzoneBorderArea"
                onClick={() => cacRef.current.click()}
                style={{ cursor: "pointer" }}
              >
                {cacPreview ? (
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
                ) : (
                  <div
                    style={{
                      height: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#94a3b8",
                      fontSize: 12,
                    }}
                  >
                    No file uploaded
                  </div>
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
                {/* ✅ field name is "cac" — matches req.files.cac */}
                <input
                  ref={cacRef}
                  type="file"
                  accept="image/png"
                  style={{ display: "none" }}
                  onChange={handleCacChange}
                />
              </div>
            </div>

            {/* NEPA */}
            <div className="uploaderBox">
              <span className="uploaderLabel">NEPA Bill</span>
              <div
                className="dropzoneBorderArea"
                onClick={() => nepaRef.current.click()}
                style={{ cursor: "pointer" }}
              >
                {nepaPreview ? (
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
                ) : (
                  <div
                    style={{
                      height: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#94a3b8",
                      fontSize: 12,
                    }}
                  >
                    No file uploaded
                  </div>
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
                {/* ✅ field name is "nepa" — matches req.files.nepa */}
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
                Keep your account secure with a strong password.
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
