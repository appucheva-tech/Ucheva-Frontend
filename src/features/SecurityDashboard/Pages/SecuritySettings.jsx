import { useState } from "react";
import "../SecurityStyles/SecuritySettings.css";
import { LuCamera } from "react-icons/lu";

const SettingsPage = () => {
  const [profileData, setProfileData] = useState({
    firstName: "Tolu",
    lastName: "Adesunya",
    phone: "+234 801 234 5678",
    email: "toluadesunya@gmail.com",
    address: "12 Unity Avenue, Jefferson Avenue Road, Ikoyi Lagos",
  });

  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    console.log("Saving profile changes:", profileData);
    toast("Profile changes saved successfully!");
  };

  const handleChangePassword = () => {
    console.log("Opening change password dialog");
    toast(
      "Change password functionality would open a dialog or navigate to password change page",
    );
  };

  return (
    <div className="security-settings-container">
      <div className="security-settings-header">
        <h1>Settings</h1>
        <p>Manage your profile and account preferences.</p>
      </div>

      <div className="security-settings-card">
        <h2 className="security-card-title">Profile Information</h2>

        <div className="security-profile-content">
          <div className="security-avatar-section">
            <div className="security-avatar-container">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Avatar"
                  className="security-avatar-image"
                />
              ) : (
                <div className="security-avatar-placeholder">
                  <LuCamera />
                </div>
              )}
              <label
                htmlFor="avatar-upload"
                className="security-avatar-upload-btn"
              >
                <LuCamera />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="security-avatar-input"
              />
            </div>
            <p className="security-avatar-info">PNG, JPG, Max 2MB</p>
          </div>

          <div className="security-form-section">
            <div className="security-form-row">
              <div className="security-form-group">
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
              <div className="security-form-group">
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

            <div className="security-form-row">
              <div className="security-form-group">
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
              <div className="security-form-group">
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

            <div className="security-form-group full-width">
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

            <div className="security-button-wrapper">
              <button className="security-save-btn" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="security-settings-card">
        <h2 className="security-card-title">Security</h2>

        <div className="security-security-content">
          <div className="security-security-item">
            <div className="security-security-text">
              <h3>Change Password</h3>
              <p>Receive real-time notifications and team toasts.</p>
            </div>
            <button
              className="security-change-password-btn"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
