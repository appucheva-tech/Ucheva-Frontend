import React, { useState } from 'react';
import "../SecurityStyles/SecuritySettings.css"

export default function SecuritySettings() {
  const [profileData, setProfileData] = useState({
    firstName: 'Tolu',
    lastName: 'Adesunya',
    role: 'Security',
    phone: '+234 801 234 5678',
    email: 'toluadesunya@gmail.com',
    address: '12 Unity Avenue, Jefferson Avenue Road, Ikoyi Lagos'
  });

  const [profileImage, setProfileImage] = useState(
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-06-08%20at%2001.09.50-whTvji2LFMJ4U8xyleaGXCSGwLxQ9L.png'
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    console.log('Profile data saved:', profileData);
    alert('Changes saved successfully!');
  };

  const handleChangePassword = () => {
    console.log('Change password clicked');
    alert('Redirect to change password page');
  };

  return (
    <div className="security-settings-container">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Manage your profile and account preferences.</p>
      </div>

      <div className="settings-card profile-card">
        <h2 className="card-title">Profile Information</h2>
        
        <div className="profile-content">
          <div className="profile-image-section">
            <div className="profile-image-wrapper">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="profile-image"
              />
              <label htmlFor="profile-upload" className="camera-icon-label">
                <svg className="camera-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleImageUpload}
                  className="file-input"
                />
              </label>
            </div>
            <p className="image-info">PNG, JPG. Max 2MB</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">Role</label>
              <input
                id="role"
                type="text"
                name="role"
                value={profileData.role}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                className="form-input textarea"
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className="card-actions">
          <button onClick={handleSaveChanges} className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>

      <div className="settings-card security-card">
        <h2 className="card-title">Security</h2>
        
        <div className="security-content">
          <div className="security-option">
            <div className="security-info">
              <h3 className="security-option-title">Change Password</h3>
              <p className="security-option-description">Receive real-time notifications and team alerts.</p>
            </div>
            <button onClick={handleChangePassword} className="btn btn-secondary">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}