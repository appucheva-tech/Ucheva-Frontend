import React from 'react'
import './AdminSettings.css'
import Ifeanacho from '../../assets/Ifeanacho.jpg'

const AdminSettings = () => {
  return (
    <>
    <header className="AdminDashboard-header">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search students, staff, classes, etc..." 
          className="search-input"
        />
        <button className="search-button" aria-label="Search">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      <div className="meta-container">
        <div className="date-display">
          <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Monday, 18 May 2026</span>
        </div>

        <div className="divider"></div>

        <div className="dropdown">
          <span>2025/2026 Session</span>
          <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div className="divider"></div>

        <div className="dropdown">
          <span>Third Term</span>
          <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div className="profile-container">
        <button className="notification-button" aria-label="Notifications">
          <svg className="bell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="notification-badge"></span>
        </button>

        <div className="user-profile">
          <img 
            src={Ifeanacho} 
            alt="Ifeanacho" 
            className="avatar"
          />
        </div>
        <div className="Auser-info">
            <span className="user-name">Ifeanacho Francis</span>
            <span className="user-role">Admin</span>
          </div>
      </div>
    </header>
    <div className="settingsContainer">
      <div className="settingsHeader">
        <h1 className="mainTitle">Settings</h1>
        <p className="mainSubtitle">Manage your school preferences, report card setup, notifications, and security.</p>
      </div>

      {/* Admin Profile Card */}
      <section className="settingsCard">
        <h2 className="cardTitle">Admin Profile</h2>
        <div className="profileLayout">
          <div className="avatarWrapper">
            <div className="imageContainer">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" 
                alt="Admin Profile" 
                className="profileImg"
              />
              <button className="cameraBtn" aria-label="Upload profile image">
                <svg viewBox="0 0 24 24" fill="currentColor" className="cameraIcon">
                  <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                </svg>
              </button>
            </div>
            <span className="uploadHint">PNG, JPG. Max 2MB</span>
          </div>

          <div className="formFieldsRow">
            <div className="inputGroup">
              <label className="inputLabel">First Name</label>
              <input type="text" className="textInput" defaultValue="Eric" />
            </div>
            <div className="inputGroup">
              <label className="inputLabel">Last Name</label>
              <input type="text" className="textInput" defaultValue="Ugochukwu" />
            </div>
          </div>
        </div>
        <div className="cardActionRow">
          <button className="saveChangesBtn">Save Changes</button>
        </div>
      </section>

      {/* School Profile Card */}
      <section className="settingsCard">
        <h2 className="cardTitle">School Profile</h2>
        <div className="schoolLayout">
          <div className="logoWrapper">
            <div className="logoBadgeContainer">
              {/* Fallback structural crest representing the uploaded school emblem */}
              <div className="emblemPlaceholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M12 8v8M8 12h8"/>
                </svg>
              </div>
            </div>
            <span className="uploadHint">PNG, JPG or SVG. Max 2MB</span>
            <div className="logoActionButtons">
              <button className="changeImgBtn">Change Image</button>
              <button className="removeImgBtn">Remove</button>
            </div>
          </div>

          <div className="schoolFormGrid">
            <div className="inputGroup">
              <label className="inputLabel">School Name</label>
              <input type="text" className="textInput" defaultValue="Greenfield Academy" />
            </div>
            <div className="inputGroup">
              <label className="inputLabel">School Email</label>
              <input type="email" className="textInput" defaultValue="info@greenfieldacademy.edu.ng" />
            </div>
            <div className="inputGroup">
              <label className="inputLabel">Phone Number</label>
              <input type="text" className="textInput" defaultValue="+234 801 234 5678" />
            </div>
            <div className="inputGroup">
              <label className="inputLabel">Academic Session</label>
              <div className="selectWrapper">
                <select className="selectInput" defaultValue="2025/2026">
                  <option value="2025/2026">2025/2026</option>
                </select>
              </div>
            </div>
            <div className="inputGroup fullWidthRow">
              <label className="inputLabel">Address</label>
              <input type="text" className="textInput" defaultValue="12 Education Road, Gwari Avenue, Abuja, Nigeria" />
            </div>
          </div>
        </div>
        <div className="cardActionRow">
          <button className="saveChangesBtn">Save Changes</button>
        </div>
      </section>

      {/* Report Card Configuration Card */}
      <section className="settingsCard">
        <h2 className="cardTitle">Report Card Configuration</h2>
        <div className="configurationLayout">
          <div className="scoresColumn">
            <div className="scoresInlineGrid">
              <div className="inputGroup">
                <label className="inputLabel">CA Score (%)</label>
                <input type="text" className="textInput numericalInput" defaultValue="40" />
              </div>
              <div className="inputGroup">
                <label className="inputLabel">Exam Score (%)</label>
                <input type="text" className="textInput numericalInput" defaultValue="60" />
              </div>
              <div className="inputGroup">
                <label className="inputLabel">Total Score (%)</label>
                <input type="text" className="textInput numericalInput disabledInput" defaultValue="100" readOnly />
              </div>
            </div>

            <div className="infoAlertCallout">
              <span className="infoAlertIcon">ℹ️</span>
              <p className="infoAlertText">Uploaded signature and stamp will appear on generated report cards.</p>
            </div>
          </div>

          <div className="uploadsColumn">
            <div className="uploadComponentBox">
              <label className="inputLabel">School Stamp</label>
              <div className="dottedDropzone">
                <div className="stampCircularGraphic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" strokeDasharray="3 3"/>
                    <circle cx="12" cy="12" r="7"/>
                  </svg>
                </div>
                <button className="dropzoneUploadBtn">Upload</button>
                <span className="dropzoneHint">PNG format recommended</span>
              </div>
            </div>

            <div className="uploadComponentBox">
              <label className="inputLabel">Admin Signature</label>
              <div className="dottedDropzone">
                <div className="signatureLineGraphic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M4 16c4-4 8 2 12-3s2-5 4-1" strokeWidth="1.5"/>
                  </svg>
                </div>
                <button className="dropzoneUploadBtn">Upload</button>
                <span className="dropzoneHint">PNG format recommended</span>
              </div>
            </div>
          </div>
        </div>
        <div className="cardActionRow">
          <button className="saveChangesBtn">Save Changes</button>
        </div>
      </section>
    </div>
      <div className="notificationSettingsContainer">
      
      {/* Attendance Notifications */}
      <section className="settingsPanelCard">
        <div className="cardHeaderRow">
          <div className="headerTextGroup">
            <h2 className="panelCardTitle">Attendance Notifications</h2>
            <p className="panelCardDescription">Automatically notify parents when a student is marked absent</p>
          </div>
          <div className="toggleControlWrapper">
            <label className="switchToggle">
              <input type="checkbox" defaultChecked />
              <span className="toggleSlider"></span>
            </label>
          </div>
        </div>
        <div className="cardBodyGroup">
          <div className="inputDropdownFieldGroup">
            <label className="dropdownLabel">Message Template (WhatsApp)</label>
            <div className="customSelectContainer">
              <select className="nativeDropdownSelect" defaultValue="choose">
                <option value="choose">Choose Template</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* School Verification */}
      <section className="settingsPanelCard">
        <h2 className="panelCardTitle">School Verification</h2>
        <div className="verificationUploadersRow">
          
          <div className="uploaderBox">
            <span className="uploaderLabel">CAC Document</span>
            <div className="dropzoneBorderArea">
              <button className="innerUploadBtn">Upload</button>
              <span className="formatHintText">PNG format recommended</span>
            </div>
          </div>

          <div className="uploaderBox">
            <span className="uploaderLabel">NEPA Bill</span>
            <div className="dropzoneBorderArea">
              <button className="innerUploadBtn">Upload</button>
              <span className="formatHintText">PNG format recommended</span>
            </div>
          </div>

        </div>
      </section>

      {/* Security */}
      <section className="settingsPanelCard">
        <h2 className="panelCardTitle">Security</h2>
        <div className="actionFlexRow">
          <div className="infoContextBlock">
            <h3 className="actionItemHeading">Change Password</h3>
            <p className="actionItemSubtext">Receive real-time notifications and team alerts.</p>
          </div>
          <button className="outlineActionButton">Change Password</button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="settingsPanelCard">
        <h2 className="panelCardTitle dangerTitleColor">Danger Zone</h2>
        <div className="actionFlexRow">
          <div className="infoContextBlock">
            <h3 className="actionItemHeading">Delete account</h3>
            <p className="actionItemSubtext">Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          <button className="dangerActionButton">
            <svg className="shieldIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Delete Account
          </button>
        </div>
      </section>

    </div>
    </>
  )
} 

export default AdminSettings
