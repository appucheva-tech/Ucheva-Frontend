import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { LuUpload } from "react-icons/lu";
import "./CTSettings.css";
import { apiClient } from "../../../../config/AxiosInstance";

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
      <div className="ct-form-section">
        {[1, 2, 3].map((i) => (
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
);

/* ─── Main Component ──────────────────────────────────────────────────── */
const CTSettings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    subjectTaught: "",
    role: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const [signature, setSignature] = useState(null);
  const [signaturePreviewUrl, setSignaturePreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* ── GET teacher data ── */
  const fetchTeacherData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/classteacher/getprofiledetails");
      const data = response?.data?.classTeacherData || response?.data;
      setFormData({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        subjectTaught: data?.subjectAssigned || "",
        role: data?.staffType || "Class Teacher",
        phoneNumber: data?.phoneNumber || "",
        email: data?.email || "",
        address: data?.address || "",
      });

      setSignaturePreviewUrl(data?.signatureUrl || null);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Failed to load teacher data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeacherData();
  }, [fetchTeacherData]);

  /* ── Form field change ── */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleRemoveSignature = () => {
    setSignature(null);
    setSignaturePreviewUrl(null);
  };

  /* ── PUT: save teacher changes ── */
  const handleSaveChanges = async () => {
    try {
      setSubmitting(true);
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("subjectTaught", formData.subjectTaught);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("address", formData.address);
      if (signature) formDataToSend.append("signature", signature);

      await apiClient.put("/subjectteacher/updateprofile", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Teacher profile updated successfully!");
      await fetchTeacherData();
      setSignature(null);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to update. Try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
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

        <div className="ct-form-section">
          {/* Row 1: First Name | Last Name */}
          <div className="ct-form-row">
            <div className="ct-form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
              />
            </div>
            <div className="ct-form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Row 2: Subject Taught | Role */}
          <div className="ct-form-row">
            <div className="ct-form-group">
              <label htmlFor="subjectTaught">Subject Taught</label>
              <input
                id="subjectTaught"
                type="text"
                name="subjectTaught"
                readOnly
                value={formData.subjectTaught}
                onChange={handleInputChange}
                placeholder="e.g., Mathematics, Physics"
              />
            </div>
            <div className="ct-form-group">
              <label htmlFor="role">Role</label>
              <input
                id="role"
                type="text"
                name="role"
                readOnly
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g., Class Teacher, Head of Department"
              />
            </div>
          </div>

          {/* Row 3: Phone Number | Email Address */}
          <div className="ct-form-row">
            <div className="ct-form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                readOnly
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="ct-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                readOnly
                value={formData.email}
                onChange={handleInputChange}
                placeholder="teacher@school.edu"
              />
            </div>
          </div>

          {/* Row 4: Address (full width) */}
          <div className="ct-form-row">
            <div className="ct-form-group full-width">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="ct-button-wrapper">
            <button
              className="ct-save-btn"
              onClick={handleSaveChanges}
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
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
                    onClick={handleRemoveSignature}
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
              onClick={() => {
                /* Open password modal */
              }}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTSettings;
