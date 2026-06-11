import React from "react";
import "./CTSettings.css";
import Ucheva from "../../../../assets/UchevaLogo.svg";

const CTSettings = () => {
  return (
    <main className="CTSettings">
      <article className="CTSettingsWrapper">
        <section className="CTSettingsProfileCard">
          <nav className="CTSettingsCardTitle">Profile Information</nav>

          <article className="CTSettingsProfileContent">
            <div className="CTSettingsProfileImage">
              <div className="CTSettingsAvatarHolder">
                <img className="CTSettingsAvatar" src={Ucheva} alt="" />
              </div>

              <span>PNG, JPG. Max 2MB</span>
            </div>

            <div className="CTSettingsForm">
              <div className="CTSettingsRow">
                <div className="CTSettingsFieldEdit">
                  <label>First Name</label>
                  <input type="text" placeholder="Grace" />
                </div>

                <div className="CTSettingsFieldEdit">
                  <label>Last Name</label>
                  <input type="text" placeholder="Akpan" />
                </div>
              </div>

              <div className="CTSettingsRow">
                <div className="CTSettingsField">
                  <label>Subject Taught</label>
                  <input type="text" value="Mathematics, Further Maths" />
                </div>

                <div className="CTSettingsField">
                  <label>Role</label>
                  <input type="text" value="Class Teacher" />
                </div>
              </div>

              <div className="CTSettingsRow">
                <div className="CTSettingsField">
                  <label>Phone Number</label>
                  <input type="text" value="+234 801 234 5678" />
                </div>

                <div className="CTSettingsField">
                  <label>Email Address</label>
                  <input type="text" value="graceakpan@gmail.com" />
                </div>
              </div>

              <div className="CTSettingsAddress">
                <label>Address</label>
                <input
                  type="text"
                  value="12 Unity Avenue, Jefferson Avenue Road, Ikoyi Lagos"
                />
              </div>

              <div className="CTSettingsSaveBtnHolder">
                <button className="CTSettingsSaveBtn">Save Changes</button>
              </div>
            </div>
          </article>
        </section>

        <section className="CTSettingsSignatureCard">
          <nav className="CTSettingsCardTitle2">Upload Signature</nav>

          <article className="CTSignatureTextBox">
            <span>Class Teacher's Signature</span>

            <div className="CTSettingsSignatureBox">
              <div className="CTSig"></div>

              <div className="CTsigUploadHolder">
                <button className="CTsigUploadBtn">Upload</button>
                <span>PNG format recommended</span>
              </div>
            </div>
          </article>
        </section>

        <section className="CTSettingsSecurityCard">
          <div className="CTSettingsSecurityText">
            <nav>Security</nav>

            <div className="CTChangePass">
              Change Password
              <span>Receive real-time notifications and team alerts.</span>
            </div>
          </div>

          <button className="CTSettingsPasswordBtn">Change Password</button>
        </section>
      </article>
    </main>
  );
};

export default CTSettings;
