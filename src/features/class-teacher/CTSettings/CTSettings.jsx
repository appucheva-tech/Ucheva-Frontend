import React from "react";
import "./CTSettings.css";
import Ucheva from "../../../assets/UchevaLogo.svg";

const CTSettings = () => {
  return (
    <main className="Settings">
      <article className="SettingsWrapper">
        <nav className="SettingsHead">
          Settings
          <span>Manage your profile and account preferences.</span>
        </nav>

        <section className="SettingsProfileCard">
          <nav className="SettingsCardTitle">Profile Information</nav>

          <article className="SettingsProfileContent">
            <div className="SettingsProfileImage">
              <div className="SettingsAvatarHolder">
                <img className="SettingsAvatar" src={Ucheva} alt="" />
              </div>

              <span>PNG, JPG. Max 2MB</span>
            </div>

            <div className="SettingsForm">
              <div className="SettingsRow">
                <div className="SettingsFieldEdit">
                  <label>First Name</label>
                  <input type="text" placeholder="Grace" />
                </div>

                <div className="SettingsFieldEdit">
                  <label>Last Name</label>
                  <input type="text" placeholder="Akpan" />
                </div>
              </div>

              <div className="SettingsRow">
                <div className="SettingsField">
                  <label>Subject Taught</label>
                  <input type="text" value="Mathematics, Further Maths" />
                </div>

                <div className="SettingsField">
                  <label>Role</label>
                  <input type="text" value="Class Teacher" />
                </div>
              </div>

              <div className="SettingsRow">
                <div className="SettingsField">
                  <label>Phone Number</label>
                  <input type="text" value="+234 801 234 5678" />
                </div>

                <div className="SettingsField">
                  <label>Email Address</label>
                  <input type="text" value="graceakpan@gmail.com" />
                </div>
              </div>

              <div className="SettingsAddress">
                <label>Address</label>
                <input
                  type="text"
                  value="12 Unity Avenue, Jefferson Avenue Road, Ikoyi Lagos"
                />
              </div>
              <div className="SettingsSaveBtnHolder">
                <button className="SettingsSaveBtn">Save Changes</button>
              </div>
            </div>
          </article>
        </section>

        <section className="SettingsSignatureCard">
          <nav className="SettingsCardTitle2">Upload Signature</nav>
          <article className="SignatureTextBox">
            <span>Class Teacher's Signature</span>
            <div className="SettingsSignatureBox">
              <div className="CTSig"></div>
              <div className="CTsigUploadHolder">
                <button className="CTsigUploadBtn">Upload</button>
                <span>PNG format recommended</span>
              </div>
            </div>
          </article>
        </section>

        <section className="SettingsSecurityCard">
          <div className="SettingsSecurityText">
            <nav>Security</nav>

            <div className="CTChangePass">
              Change Password
              <span>Receive real-time notifications and team alerts.</span>
            </div>
          </div>

          <button className="SettingsPasswordBtn">Change Password</button>
        </section>
      </article>
    </main>
  );
};

export default CTSettings;
