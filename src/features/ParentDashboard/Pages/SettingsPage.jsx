import { useState } from "react";
import "../css/SettingsPage.css";
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
    alert("Profile changes saved successfully!");
  };

  const handleChangePassword = () => {
    console.log("Opening change password dialog");
    alert(
      "Change password functionality would open a dialog or navigate to password change page",
    );
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
                <img
                  src={previewUrl}
                  alt="Profile Avatar"
                  className="parent-avatar-image"
                />
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
              <button className="parent-save-btn" onClick={handleSaveChanges}>
                Save Changes
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
              <p>Receive real-time notifications and team alerts.</p>
            </div>
            <button
              className="parent-change-password-btn"
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
