import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStudent2.css";
import Ifeanacho from "../../assets/Ifeanacho.jpg";
import axios from "axios";
import { apiClient } from "../../config/AxiosInstance";

const AdminStudent2 = () => {
  const subdomain = window.location.hostname.split(".")[0];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    otherName: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    studentClass: "",
    department: "",
    session: "",
    parentGuardiansName: "",
    relationship: "",
    phoneNumber: "",
    email: "",
  });
  console.log(formData);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const toggleNotifications = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        otherName: formData.otherName.trim(),
        gender: formData.gender.toLowerCase(),
        dateOfBirth: formData.dateOfBirth,
        nationality: formData.nationality.toLowerCase(),
        address: formData.address.trim(),
        studentClass: formData.studentClass,
        department: formData.department,
        session: Number(formData.session),
        parentGuardiansName: formData.parentGuardiansName.trim(),
        relationship: formData.relationship.toLowerCase(),
        phoneNumber: Number(formData.phoneNumber),
        email: formData.email.trim().toLowerCase(),
      };

      console.log(payload);

      const response = await apiClient.post("/student/student", payload, {
        headers: {
          "x-tenant": subdomain,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const nav = useNavigate();

  return (
    <>
      <div className="form-container">
        <div className="form-header">
          <div className="header-top">
            <h1>
              <h1>Add New Student</h1>
            </h1>
            <div className="breadcrumb">
              <span className="Sactive" onClick={() => nav(-1)}>
                Student Management
              </span>
              <span className="separator">&gt;</span>
              <span className="active">Add Student</span>
            </div>
          </div>
          <p className="subtitle">
            Enter the student's information below to register them in the
            system.
          </p>
        </div>

        <form className="staff-form" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="form-section">
            <h2>Personal Information</h2>

            <div className="form-grid type-3-col">
              <div className="form-group">
                <label>
                  First Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                />
              </div>

              <div className="form-group">
                <label>
                  Last Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                />
              </div>

              <div className="form-group">
                <label>Other Name</label>
                <input
                  type="text"
                  name="otherName"
                  value={formData.otherName}
                  onChange={handleChange}
                  placeholder="Enter Other Name"
                />
              </div>

              <div className="form-group">
                <label>
                  Gender<span className="required">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Nationality</label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  <option value="Nigerian">Nigerian</option>
                  <option value="Ghanaian">Ghanaian</option>
                </select>
              </div>

              <div className="form-group">
                <label>Religion</label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                >
                  <option value="">Select Religion</option>
                  <option value="Christianity">Christianity</option>
                  <option value="Islam">Islam</option>
                  <option value="Traditional">Traditional</option>
                </select>
              </div>

              <div className="form-group full-width-field">
                <label>
                  Address<span className="required">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Residential Address"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="form-section">
            <h2>Academic Information</h2>

            <div className="form-grid type-3-col">
              <div className="form-group">
                <label>
                  Class<span className="required">*</span>
                </label>
                <select
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleChange}
                >
                  <option value="">Select Class</option>
                  <option value="JSS1">JSS1</option>
                  <option value="JSS2">JSS2</option>
                  <option value="SS1">SS1</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Department<span className="required">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="Science">Science</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Arts">Arts</option>
                </select>

                <span className="field-hint">Applies to SS1-SS3 only</span>
              </div>

              <div className="form-group">
                <label>
                  Session<span className="required">*</span>
                </label>
                <select
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                >
                  <option value="">Select Session</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="form-section">
            <h2>Parent/Guardian Information</h2>

            <div className="form-grid type-3-col">
              <div className="form-group">
                <label>
                  Parent/Guardian Name
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="parentGuardiansName"
                  value={formData.parentGuardiansName}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                />
              </div>

              <div className="form-group">
                <label>
                  Relationship
                  <span className="required">*</span>
                </label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                >
                  <option value="">Select Relationship</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Phone Number
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />

                <span className="field-hint">WhatsApp number preferably</span>
              </div>

              <div className="form-group">
                <label>
                  Email Address
                  <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                />
              </div>

              <div className="form-group full-width-field">
                <label>Address</label>
                <textarea
                  name="parentAddress"
                  value={formData.parentAddress}
                  onChange={handleChange}
                  placeholder="Enter Residential Address"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create Student
          </button>
        </form>

        <div className="form-footer">
          <span className="copyright">
            © 2026 Uchee school operating management system. All right reserved.
          </span>
          <span className="support">
            Need help? <a href="#">Contact support</a>
          </span>
        </div>
      </div>
    </>
  );
};

export default AdminStudent2;
