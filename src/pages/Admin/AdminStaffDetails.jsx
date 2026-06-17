import React from 'react';
import './AdminStaffDetails.css'

const StaffDetails = () => {
  return (
    <div className="Fcontainer">
      <header className="Fheader">
        <h1 className="Ftitle">Staff Details</h1>
        <div className="Fbreadcrumb">
          <span>Staff Management</span>
          <span className="Fseparator">&gt;</span>
          <span className="Factive">Staff Details</span>
        </div>
      </header>

      <main className="Fmain-content">
        <section className="Fprofile-card">
          <img src="https://via.placeholder.com/100" alt="Adaeze Clinton" className="Fprofile-img" />
          <div className="Fprofile-info">
            <h2 className="Fprofile-name">Adaeze Clinton</h2>
            <div className="Fprofile-meta">
              <div>
                <span className="Flabel">Bio</span>
                <span className="Fvalue">Class Teacher</span>
              </div>
              <div>
                <span className="Flabel">Phone Number</span>
                <span className="Fvalue">08032456789</span>
              </div>
              <div>
                <span className="Flabel">Email</span>
                <span className="Fvalue Femail-link">adaeze.clinton@gmail.com</span>
              </div>
            </div>
          </div>
        </section>

        <section className="Finfo-section">
          <h3 className="Fsection-title">Personal Information</h3>
          <div className="Fgrid-layout">
            <div className="Finfo-group">
              <span className="Finfo-label">Full Name</span>
              <span className="Finfo-value">Adaeze Clinton</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Email Address</span>
              <span className="Finfo-value Femail-link">adaeze.clinton@gmail.com</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Gender</span>
              <span className="Finfo-value">Female</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Address</span>
              <span className="Finfo-value">12 Unity Avenue, Jefferson Avenue Road, Ikoyi Lagos</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Date of Birth</span>
              <span className="Finfo-value">12 March 1990</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Nationality</span>
              <span className="Finfo-value">Nigerian</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Phone Number</span>
              <span className="Finfo-value">0803 245 6789</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Joined Date</span>
              <span className="Finfo-value">3 Jan 2024</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Marital Status</span>
              <span className="Finfo-value">Single</span>
            </div>
          </div>
        </section>

        <section className="Finfo-section">
          <h3 className="Fsection-title">Teaching Information</h3>
          <div className="Fgrid-layout">
            <div className="Finfo-group">
              <span className="Finfo-label">Staff Type</span>
              <span className="Finfo-value">Teaching Staff</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Assigned Subjects</span>
              <span className="Finfo-value">Maths, Further Maths, Physics</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Class Teacher Of</span>
              <span className="Finfo-value">SS 1A</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Department</span>
              <span className="Finfo-value">Science Department</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Class to Teach</span>
              <span className="Finfo-value">SS 1A - SS3A</span>
            </div>
            <div className="Finfo-group">
              <span className="Finfo-label">Qualification</span>
              <span className="Finfo-value">B.Sc</span>
            </div>
          </div>
        </section>

        <div className="Faction-buttons">
          <button className="Fbtn-edit">
            <span className="Ficon-edit">✏️</span> Edit Staff
          </button>
          <button className="Fbtn-delete">
            <span className="Ficon-delete">🗑️</span> Delete Staff
          </button>
        </div>
      </main>
    </div>
  );
};

export default StaffDetails;