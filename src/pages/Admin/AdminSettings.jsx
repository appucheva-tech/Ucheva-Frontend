import React, { useState, useEffect, useRef } from "react";
import "./AdminSettings.css";
import { apiClient } from "../../config/AxiosInstance";

const AdminSettings = () => {
  // ─── Admin Profile ────────────────────────────────────────────
  const [adminProfile, setAdminProfile] = useState({
    firstName: "",
    lastName: "",
    adminFirstName: "",
    adminLastName: "",
    address: "",
    schoolType: "",
  });
  const [adminPhoto, setAdminPhoto] = useState(null);
  const [adminPhotoPreview, setAdminPhotoPreview] = useState(null);
  const [adminSaving, setAdminSaving] = useState(false);
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

  // ─── School Profile (GET, read-only) ─────────────────────────
  const [schoolProfile, setSchoolProfile] = useState({
    schoolName: "",
    schoolEmail: "",
    phoneNumber: "",
    academicSession: "",
    address: "",
    logoUrl: null,
  });
  const [schoolLoading, setSchoolLoading] = useState(true);

  // ─── Stamp / Signature ────────────────────────────────────────
  const [stampFile, setStampFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [stampPreview, setStampPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [reportSaving, setReportSaving] = useState(false);
  const stampRef = useRef();
  const signatureRef = useRef();

  // ─── Attendance Notifications ─────────────────────────────────
  const [notifyEnabled, setNotifyEnabled] = useState(true);
  const [messageTemplate, setMessageTemplate] = useState("choose");
  const [notifySaving, setNotifySaving] = useState(false);

  // ─── School Verification ──────────────────────────────────────
  const [cacFile, setCacFile] = useState(null);
  const [nepaFile, setNepaFile] = useState(null);
  const [cacPreview, setCacPreview] = useState(null);
  const [nepaPreview, setNepaPreview] = useState(null);
  const [verifySaving, setVerifySaving] = useState(false);
  const cacRef = useRef();
  const nepaRef = useRef();

  // ─── Update Profile Modal ─────────────────────────────────────
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);

  // ─── Toast ────────────────────────────────────────────────────
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ─── GET School Profile on mount ──────────────────────────────
  useEffect(() => {
    const fetchSchoolProfile = async () => {
      try {
        const res = await apiClient.get("/admin/profile");
        console.log(res.data.admin);
        setSchoolProfile(res.data.admin);
        console.log(res);
      } catch (error) {
        showToast("Could not load school profile.", "error");
      } finally {
        setSchoolLoading(false);
      }
    };
    fetchSchoolProfile();
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

  // ─── PUT Admin Profile (photo + name) ────────────────────────
  const handleSaveAdminProfile = async () => {
    setAdminSaving(true);
    try {
      const formData = new FormData();
      formData.append("firstName", adminProfile.firstName);
      formData.append("lastName", adminProfile.lastName);
      if (adminPhoto) formData.append("photo", adminPhoto);

      await apiClient.put("/admin/profile-settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Admin profile updated successfully.");
    } catch {
      showToast("Failed to update admin profile.", "error");
    } finally {
      setAdminSaving(false);
    }
  };

  // ─── PUT Update Profile (all fields) ─────────────────────────
  const handleUpdateProfile = async () => {
    // Basic validation
    if (
      passwordFields.newPassword &&
      passwordFields.newPassword !== passwordFields.confirmPassword
    ) {
      showToast("New password and confirm password do not match.", "error");
      return;
    }

    setProfileSaving(true);
    try {
      const payload = {
        firstName: adminProfile.firstName,
        lastName: adminProfile.lastName,
        address: adminProfile.address,
        adminFirstName: adminProfile.adminFirstName,
        adminLastName: adminProfile.adminLastName,
        schoolType: adminProfile.schoolType,
        continuousAssessmentConfig: reportConfig.continuousAssessmentConfig,
        examConfig: reportConfig.examConfig,
        total: reportConfig.total,
        ...(passwordFields.oldPassword && {
          oldPassword: passwordFields.oldPassword,
          newPassword: passwordFields.newPassword,
          confirmPassword: passwordFields.confirmPassword,
        }),
      };

      await apiClient.put("/admin/profile-settings", payload);

      showToast("Profile updated successfully.");
      setShowUpdateProfile(false);
      // Clear password fields after success
      setPasswordFields({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Failed to update profile.",
        "error",
      );
    } finally {
      setProfileSaving(false);
    }
  };

  // ─── Stamp / Signature Upload ─────────────────────────────────
  const handleStampChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStampFile(file);
    setStampPreview(URL.createObjectURL(file));
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSignatureFile(file);
    setSignaturePreview(URL.createObjectURL(file));
  };

  const handleCaScoreChange = (val) => {
    const ca = Math.min(100, Math.max(0, Number(val)));
    setReportConfig({
      continuousAssessmentConfig: ca,
      examConfig: 100 - ca,
      total: 100,
    });
  };

  // ─── POST Report Card Config ──────────────────────────────────
  const handleSaveReportConfig = async () => {
    setReportSaving(true);
    try {
      const formData = new FormData();
      formData.append(
        "continuousAssessmentConfig",
        reportConfig.continuousAssessmentConfig,
      );
      formData.append("examConfig", reportConfig.examConfig);
      formData.append("total", reportConfig.total);
      if (stampFile) formData.append("stamp", stampFile);
      if (signatureFile) formData.append("signature", signatureFile);

      await apiClient.post("/admin/profile-settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Report card configuration saved.");
    } catch {
      showToast("Failed to save report configuration.", "error");
    } finally {
      setReportSaving(false);
    }
  };

  // ─── POST Attendance Notifications ───────────────────────────
  const handleSaveNotifications = async () => {
    setNotifySaving(true);
    try {
      await apiClient.post("/school/notifications", {
        enabled: notifyEnabled,
        messageTemplate,
      });
      showToast("Notification settings saved.");
    } catch {
      showToast("Failed to save notification settings.", "error");
    } finally {
      setNotifySaving(false);
    }
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

  // ─── POST School Verification ─────────────────────────────────
  const handleSaveVerification = async () => {
    if (!cacFile && !nepaFile) {
      showToast("Please upload at least one document.", "error");
      return;
    }
    setVerifySaving(true);
    try {
      const formData = new FormData();
      if (cacFile) formData.append("cacDocument", cacFile);
      if (nepaFile) formData.append("nepaBill", nepaFile);

      await apiClient.post("/admin/profile-settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Verification documents uploaded.");
    } catch {
      showToast("Failed to upload verification documents.", "error");
    } finally {
      setVerifySaving(false);
    }
  };

  // ─── DELETE Account ───────────────────────────────────────────
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone.",
    );
    if (!confirmed) return;
    try {
      await apiClient.delete("/admin/account");
      showToast("Account deleted.");
    } catch {
      showToast("Failed to delete account.", "error");
    }
  };

  return (
    <>
      {/* ─── Toast ───────────────────────────────────────────── */}
      {toast && (
        <div
          className={`toastNotification ${
            toast.type === "error" ? "toastError" : "toastSuccess"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* ─── Update Profile Modal ─────────────────────────────── */}
      {showUpdateProfile && (
        <div className="modalOverlay">
          <div className="modalCard">
            <div className="modalHeader">
              <h2 className="modalTitle">Update Profile</h2>
              <button
                className="modalCloseBtn"
                onClick={() => setShowUpdateProfile(false)}
              >
                ✕
              </button>
            </div>

            <div className="modalBody">
              {/* Admin Names */}
              <div className="formFieldsRow">
                <div className="inputGroup">
                  <label className="inputLabel">Admin First Name</label>
                  <input
                    type="text"
                    className="textInput"
                    placeholder="Admin First Name"
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
                  <label className="inputLabel">Admin Last Name</label>
                  <input
                    type="text"
                    className="textInput"
                    placeholder="Admin Last Name"
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

              {/* Address & School Type */}
              <div className="formFieldsRow">
                <div className="inputGroup">
                  <label className="inputLabel">Address</label>
                  <input
                    type="text"
                    className="textInput"
                    placeholder="Address"
                    value={adminProfile.address}
                    onChange={(e) =>
                      setAdminProfile((p) => ({
                        ...p,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputGroup">
                  <label className="inputLabel">School Type</label>
                  <input
                    type="text"
                    className="textInput"
                    placeholder="e.g. Primary, Secondary"
                    value={adminProfile.schoolType}
                    onChange={(e) =>
                      setAdminProfile((p) => ({
                        ...p,
                        schoolType: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Score Config */}
              <div className="formFieldsRow">
                <div className="inputGroup">
                  <label className="inputLabel">CA Config (%)</label>
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
                  <label className="inputLabel">Exam Config (%)</label>
                  <input
                    type="number"
                    className="textInput numericalInput disabledInput"
                    value={reportConfig.examConfig}
                    readOnly
                  />
                </div>
                <div className="inputGroup">
                  <label className="inputLabel">Total (%)</label>
                  <input
                    type="text"
                    className="textInput numericalInput disabledInput"
                    value={reportConfig.total}
                    readOnly
                  />
                </div>
              </div>

              {/* Password Section */}
              <hr className="modalDivider" />
              <p className="modalSectionLabel">Change Password (optional)</p>

              <div className="inputGroup">
                <label className="inputLabel">Old Password</label>
                <input
                  type="password"
                  className="textInput"
                  placeholder="Enter old password"
                  value={passwordFields.oldPassword}
                  onChange={(e) =>
                    setPasswordFields((p) => ({
                      ...p,
                      oldPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="formFieldsRow">
                <div className="inputGroup">
                  <label className="inputLabel">New Password</label>
                  <input
                    type="password"
                    className="textInput"
                    placeholder="New password"
                    value={passwordFields.newPassword}
                    onChange={(e) =>
                      setPasswordFields((p) => ({
                        ...p,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputGroup">
                  <label className="inputLabel">Confirm Password</label>
                  <input
                    type="password"
                    className="textInput"
                    placeholder="Confirm new password"
                    value={passwordFields.confirmPassword}
                    onChange={(e) =>
                      setPasswordFields((p) => ({
                        ...p,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="modalFooter">
              <button
                className="outlineActionButton"
                onClick={() => setShowUpdateProfile(false)}
              >
                Cancel
              </button>
              <button
                className="saveChangesBtn"
                onClick={handleUpdateProfile}
                disabled={profileSaving}
              >
                {profileSaving ? "Saving..." : "Update Profile"}
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
              <span className="uploadHint">PNG, JPG. Max 2MB</span>
            </div>

            <div className="formFieldsRow">
              <div className="inputGroup">
                <label className="inputLabel">First Name</label>
                <input
                  type="text"
                  className="textInput"
                  value={adminProfile.firstName}
                  placeholder="First Name"
                  onChange={(e) =>
                    setAdminProfile((p) => ({
                      ...p,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="inputGroup">
                <label className="inputLabel">Last Name</label>
                <input
                  type="text"
                  className="textInput"
                  value={adminProfile.lastName}
                  placeholder="Last Name"
                  onChange={(e) =>
                    setAdminProfile((p) => ({ ...p, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="cardActionRow">
            <button
              className="saveChangesBtn"
              onClick={handleSaveAdminProfile}
              disabled={adminSaving}
            >
              {adminSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        {/* ─── School Profile (read-only) ───────────────────────── */}
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
              <span className="uploadHint">PNG, JPG or SVG. Max 2MB</span>
              <div className="logoActionButtons">
                <button className="changeImgBtn" disabled>
                  Change Image
                </button>
                <button className="removeImgBtn" disabled>
                  Remove
                </button>
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
                <label className="inputLabel">School Email</label>
                <input
                  type="email"
                  className="textInput"
                  value={schoolLoading ? "Loading..." : schoolProfile.email}
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
              <div className="inputGroup">
                <label className="inputLabel">Academic Session</label>
                <div className="selectWrapper">
                  <select
                    className="selectInput"
                    value={schoolProfile.academicSession}
                    disabled
                  >
                    <option value={schoolProfile.academicSession}>
                      {schoolProfile.academicSession || "—"}
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

              <div className="infotoastCallout">
                <span className="infotoastIcon">ℹ️</span>
                <p className="infotoastText">
                  Uploaded signature and stamp will appear on generated report
                  cards.
                </p>
              </div>
            </div>

            <div className="uploadsColumn">
              {/* Stamp */}
              <div className="uploadComponentBox">
                <label className="inputLabel">School Stamp</label>
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

              {/* Signature */}
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
                        height: 36,
                        objectFit: "contain",
                        marginBottom: 8,
                      }}
                    />
                  ) : (
                    <div className="signatureLineGraphic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          d="M4 16c4-4 8 2 12-3s2-5 4-1"
                          strokeWidth="1.5"
                        />
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
              onClick={handleSaveReportConfig}
              disabled={reportSaving}
            >
              {reportSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>
      </div>

      <div className="notificationSettingsContainer">
        {/* ─── Attendance Notifications ─────────────────────────── */}
        <section className="settingsPanelCard">
          <div className="cardHeaderRow">
            <div className="headerTextGroup">
              <h2 className="panelCardTitle">Attendance Notifications</h2>
              <p className="panelCardDescription">
                Automatically notify parents when a student is marked absent
              </p>
            </div>
            <div className="toggleControlWrapper">
              <label className="switchToggle">
                <input
                  type="checkbox"
                  checked={notifyEnabled}
                  onChange={(e) => setNotifyEnabled(e.target.checked)}
                />
                <span className="toggleSlider"></span>
              </label>
            </div>
          </div>
          <div className="cardBodyGroup">
            <div className="inputDropdownFieldGroup">
              <label className="dropdownLabel">
                Message Template (WhatsApp)
              </label>
              <div className="customSelectContainer">
                <select
                  className="nativeDropdownSelect"
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                >
                  <option value="choose">Choose Template</option>
                  <option value="template1">Absence Alert – Basic</option>
                  <option value="template2">Absence Alert – Detailed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="cardActionRow">
            <button
              className="saveChangesBtn"
              onClick={handleSaveNotifications}
              disabled={notifySaving}
            >
              {notifySaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        {/* ─── School Verification ──────────────────────────────── */}
        <section className="settingsPanelCard">
          <h2 className="panelCardTitle">School Verification</h2>
          <div className="verificationUploadersRow">
            {/* CAC */}
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

            {/* NEPA */}
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
              onClick={handleSaveVerification}
              disabled={verifySaving}
            >
              {verifySaving ? "Uploading..." : "Save Changes"}
            </button>
          </div>
        </section>

        {/* ─── Security ─────────────────────────────────────────── */}
        <section className="settingsPanelCard">
          <h2 className="panelCardTitle">Security</h2>
          <div className="actionFlexRow">
            <div className="infoContextBlock">
              <h3 className="actionItemHeading">Update Profile</h3>
              <p className="actionItemSubtext">
                Update your profile details, school configuration, and password.
              </p>
            </div>
            <button
              className="outlineActionButton"
              onClick={() => setShowUpdateProfile(true)}
            >
              Update Profile
            </button>
          </div>
        </section>

        {/* ─── Danger Zone ──────────────────────────────────────── */}
        <section className="settingsPanelCard">
          <h2 className="panelCardTitle dangerTitleColor">Danger Zone</h2>
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
