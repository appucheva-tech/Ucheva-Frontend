import React, { useState } from "react";
import "../SubjectTeacherDashboardStyles/SubjectTeacherSettings.css";

const SubjectTeacherSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: "Tolu",
    lastName: "Adesunya",
    subjectTaught: "Mathematics, Further Maths",
    role: "Teacher",
    phoneNumber: "+234 801 234 5678",
    email: "toluadesunya@gmail.com",
    address: "12 Unity Avenue, Jefferson Avenue Road, Ikoyi Lagos",
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    console.log("Changes saved:", profileData);
    alert("Profile changes saved successfully!");
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
    alert("Password change dialog would open here");
  };

  return (
    <div className="SubjectTeacher-settings-container">
      <div className="SubjectTeacher-settings-header">
        <h1 className="SubjectTeacher-settings-title">Settings</h1>
        <p className="SubjectTeacher-settings-subtitle">
          Manage your profile and account preferences.
        </p>
      </div>

      {/* Profile Information Section */}
      <div className="SubjectTeacher-settings-section">
        <h2 className="SubjectTeacher-section-title">Profile Information</h2>

        <div className="SubjectTeacher-profile-content">
          {/* Profile Image */}
          <div className="SubjectTeacher-profile-image-container">
            <div className="SubjectTeacher-profile-image">
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='80' r='40' fill='%234A90E2'/%3E%3Cpath d='M 40 160 Q 40 120 100 120 Q 160 120 160 160' fill='%234A90E2'/%3E%3C/svg%3E"
                  alt="Default Profile"
                />
              )}
            </div>
            <label htmlFor="image-upload" className="SubjectTeacher-image-upload-btn">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <p className="SubjectTeacher-image-info">PNG, JPG. Max 2MB</p>
          </div>

          {/* Form Fields */}
          <div className="SubjectTeacher-form-fields">
            <div className="SubjectTeacher-form-row">
              <div className="SubjectTeacher-form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
              </div>
              <div className="SubjectTeacher-form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="SubjectTeacher-form-row">
              <div className="SubjectTeacher-form-group">
                <label htmlFor="subjectTaught">Subject Taught</label>
                <input
                  id="subjectTaught"
                  type="text"
                  name="subjectTaught"
                  value={profileData.subjectTaught}
                  onChange={handleInputChange}
                  placeholder="Enter subject"
                />
              </div>
              <div className="SubjectTeacher-form-group">
                <label htmlFor="role">Role</label>
                <input
                  id="role"
                  type="text"
                  name="role"
                  value={profileData.role}
                  onChange={handleInputChange}
                  placeholder="Enter role"
                />
              </div>
            </div>

            <div className="SubjectTeacher-form-row">
              <div className="SubjectTeacher-form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="SubjectTeacher-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="SubjectTeacher-form-row SubjectTeacher-full-width">
              <div className="SubjectTeacher-form-group">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="SubjectTeacher-save-button-container">
          <button className="SubjectTeacher-save-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="SubjectTeacher-settings-section">
        <h2 className="SubjectTeacher-section-title">Security</h2>

        <div className="SubjectTeacher-security-content">
          <div className="SubjectTeacher-security-item">
            <div className="SubjectTeacher-security-text">
              <h3 className="SubjectTeacher-security-title">Change Password</h3>
              <p className="SubjectTeacher-security-description">
                Receive real-time notifications and team alerts.
              </p>
            </div>
            <button
              className="SubjectTeacher-change-password-button"
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

export default SubjectTeacherSettings;