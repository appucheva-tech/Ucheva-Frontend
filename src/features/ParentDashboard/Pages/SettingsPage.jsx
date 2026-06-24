import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "../css/SettingsPage.css";
import { LuCamera } from "react-icons/lu";
import { apiClient } from "../../../config/AxiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setUser } from "../../../global/userSlice";

const getPasswordStrength = (password) => {
  if (!password) return { label: "", color: "", width: "0%", score: 0 };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&.#_-]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", color: "#e53e3e", width: "33%", score };
  if (score <= 3) return { label: "Fair", color: "#f6ad55", width: "66%", score };
  return { label: "Strong", color: "#38a169", width: "100%", score };
};

const SettingsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

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

  useEffect(() => {
    if (!user) return;

    const cleanName = (user?.name || "")
      .split(" ")
      .filter((part) => part.toLowerCase() !== "null")
      .join(" ");

    const nameParts = cleanName.trim().split(" ");

    setProfileData({
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      phone: user?.phoneNumber || "",
      email: user?.email || "",
      address: user?.address || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setProfileLoading(true);
      const formData = new FormData();
      formData.append("firstName", profileData.firstName);
      formData.append("lastName", profileData.lastName);
      formData.append("address", profileData.address);
      if (avatar) formData.append("profilePicture", avatar);

      const res = await apiClient.put("/parent/settings", formData);
      console.log("object", res)
      const { firstName, lastName, address, parentProfileUrl } = res.data.parentData;
      dispatch(setUser({ ...user, name: `${firstName} ${lastName}`, address, profilePicture: parentProfileUrl }));
      toast.success("Profile changes saved successfully!");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save changes. Try again.";
      toast.error(msg);
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordError("");
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill in all fields.");
      return;
    }

    if (strength.score < 3) {
      setPasswordError("Password is too weak. Please choose a stronger password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (oldPassword === newPassword) {
      setPasswordError("New password must be different from your old password.");
      return;
    }

    try {
      setPasswordLoading(true);
      const formData = new FormData();
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      formData.append("confirmPassword", confirmPassword);
      
      await apiClient.put("/parent/settings", formData);
      toast.success("Password changed successfully!");
      handleCloseModal();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to change password. Try again.";
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

  return (
    <div className="parent-settings-container">
      <div className="parent-settings-header">
        <h1>Settings</h1>
        <p>Manage your profile and account preferences.</p>
      </div>

      <div className="parent-settings-card">
        <h2 className="parent-card-title">Profile Information</h2>
        <div className="parent-profile-content">
          <div className="parent-avatar-section">
            <div className="parent-avatar-container">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile Avatar" className="parent-avatar-image" />
              ) : user?.profilePicture ? (
                <img src={user.profilePicture} alt="Profile Avatar" className="parent-avatar-image" />
              ) : (
                <div className="parent-avatar-placeholder">
                  <LuCamera />
                </div>
              )}
              <label htmlFor="avatar-upload" className="parent-avatar-upload-btn">
                <LuCamera />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="parent-avatar-input"
              />
            </div>
            <p className="parent-avatar-info">PNG, JPG, Max 2MB</p>
          </div>

          <div className="parent-form-section">
            <div className="parent-form-row">
              <div className="parent-form-group">
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
              <div className="parent-form-group">
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

            <div className="parent-form-row">
              <div className="parent-form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  readOnly
                  disabled
                  className="readonly-field"
                  placeholder="Phone Number"
                />
              </div>
              <div className="parent-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={profileData.email}
                  readOnly
                  disabled
                  className="readonly-field"
                  placeholder="Email Address"
                />
              </div>
            </div>

            <div className="parent-form-group full-width">
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

            <div className="parent-button-wrapper">
              <button className="parent-save-btn" onClick={handleSaveChanges} disabled={profileLoading}>
                {profileLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="parent-settings-card">
        <h2 className="parent-card-title">Security</h2>
        <div className="parent-security-content">
          <div className="parent-security-item">
            <div className="parent-security-text">
              <h3>Change Password</h3>
              <p>Update your password to keep your account secure.</p>
            </div>
            <button
              className="parent-change-password-btn"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Change Password</h2>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              {passwordError && (
                <p className="modal-error">{passwordError}</p>
              )}

              <div className="modal-form-group">
                <label>Current Password</label>
                <div className="modal-password-wrapper">
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
                    className="modal-eye-btn"
                  >
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="modal-form-group">
                <label>New Password</label>
                <div className="modal-password-wrapper">
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
                    className="modal-eye-btn"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {passwordData.newPassword && (
                  <div className="password-strength-wrapper">
                    <div className="password-strength-bar-track">
                      <div
                        className="password-strength-bar-fill"
                        style={{
                          width: strength.width,
                          backgroundColor: strength.color,
                        }}
                      />
                    </div>
                    <span
                      className="password-strength-label"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </span>
                  </div>
                )}

                {passwordData.newPassword && (
                  <ul className="password-requirements">
                    <li className={passwordData.newPassword.length >= 8 ? "met" : ""}>
                      At least 8 characters
                    </li>
                    <li className={/[A-Z]/.test(passwordData.newPassword) ? "met" : ""}>
                      One uppercase letter
                    </li>
                    <li className={/[a-z]/.test(passwordData.newPassword) ? "met" : ""}>
                      One lowercase letter
                    </li>
                    <li className={/\d/.test(passwordData.newPassword) ? "met" : ""}>
                      One number
                    </li>
                    <li className={/[@$!%*?&.#_-]/.test(passwordData.newPassword) ? "met" : ""}>
                      One special character (@$!%*?&.#_-)
                    </li>
                  </ul>
                )}
              </div>

              <div className="modal-form-group">
                <label>Confirm New Password</label>
                <div className="modal-password-wrapper">
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
                    className="modal-eye-btn"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {passwordData.confirmPassword && (
                  <p
                    className="password-match-indicator"
                    style={{
                      color:
                        passwordData.newPassword === passwordData.confirmPassword
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

            <div className="modal-footer">
              <button
                className="modal-cancel-btn"
                onClick={handleCloseModal}
                disabled={passwordLoading}
              >
                Cancel
              </button>
              <button
                className="modal-submit-btn"
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

export default SettingsPage;