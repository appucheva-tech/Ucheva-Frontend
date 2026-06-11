import React from "react";
import "./BursarySettings.css";
import Ucheva from "../../../assets/UchevaLogo.svg";

const BursarySettings = () => {
  return (
    <main className="BRSettings">
      <article className="BRSettingsWrapper">
        <section className="BRSettingsProfileCard">
          <nav className="BRSettingsCardTitle">Profile Information</nav>

          <article className="BRSettingsProfileContent">
            <div className="BRSettingsProfileImage">
              <div className="BRSettingsAvatarHolder">
                <img className="BRSettingsAvatar" src={Ucheva} alt="" />
              </div>

              <span>PNG, JPG. Max 2MB</span>
            </div>

            <div className="BRSettingsForm">
              <div className="BRSettingsRow">
                <div className="BRSettingsFieldEdit">
                  <label>First Name</label>
                  <input type="text" placeholder="Grace" />
                </div>

                <div className="BRSettingsFieldEdit">
                  <label>Last Name</label>
                  <input type="text" placeholder="Akpan" />
                </div>
              </div>

              <div className="BRSettingsRow">
                <div className="BRSettingsField">
                  <label>Subject Taught</label>
                  <input type="text" value="Mathematics, Further Maths" />
                </div>

                <div className="BRSettingsField">
                  <label>Role</label>
                  <input type="text" value="Class Teacher" />
                </div>
              </div>

              <div className="BRSettingsRow">
                <div className="BRSettingsField">
                  <label>Phone Number</label>
                  <input type="text" value="+234 801 234 5678" />
                </div>

                <div className="BRSettingsField">
                  <label>Email Address</label>
                  <input type="text" value="graceakpan@gmail.com" />
                </div>
              </div>

              <div className="BRSettingsAddress">
                <label>Address</label>
                <input
                  type="text"
                  value="12 Unity Avenue, Jefferson Avenue Road, Ikoyi Lagos"
                />
              </div>

              <div className="BRSettingsSaveBtnHolder">
                <button className="BRSettingsSaveBtn">Save Changes</button>
              </div>
            </div>
          </article>
        </section>

        <section className="BRSettingsSecurityCard">
          <div className="BRSettingsSecurityText">
            <nav>Security</nav>

            <div className="BRChangePass">
              Change Password
              <span>Receive real-time notifications and team alerts.</span>
            </div>
          </div>

          <button className="BRSettingsPasswordBtn">Change Password</button>
        </section>
      </article>
    </main>
  );
};

export default BursarySettings;
