import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStaff2.css";
import axios from "axios";
import { ApiClient } from "../../config/AxiosInstance";

const AdminStaff2 = () => {
  const baseURL = import.meta.env.VITE_Base_Url;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    otherName: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    maritalStatus: "",
    phoneNumber: "",
    email: "",
    staffType: "",
    role: "",
    teachingType: "",
    subjectAssigned: [],
    classesToTeach: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
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
        ...formData,
        phoneNumber: Number(formData.phoneNumber),

        // Converts:
        // Mathematics,Physics
        // into:
        // ["Mathematics", "Physics"]

        subjectAssigned: formData.subjectAssigned
          .split(",")
          .map((subject) => subject.trim()),
      };

      const response = await ApiClient.post("staff/staff", payload);

      console.log(response.data);

      toast.success(response?.data?.message || "Staff created successfully");

      setFormData({
        firstName: "",
        lastName: "",
        otherName: "",
        gender: "",
        dateOfBirth: "",
        nationality: "",
        address: "",
        maritalStatus: "",
        phoneNumber: "",
        email: "",
        staffType: "",
        role: "",
        teachingType: "",
        subjectAssigned: [],
        classesToTeach: "",
        department: "",
      });
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to create staff");
    } finally {
      setLoading(false);
    }
  };

  const nav = useNavigate();

  return (
    <>
      <div className="Eform-container">
        <div className="Eform-header">
          <div className="Eheader-top">
            <h1>Add New Staff</h1>
            <div className="Ebreadcrumb">
              <span className="ESactive" onClick={() => nav(-1)}>
                Staff Management
              </span>
              <span className="Eseparator">&gt;</span>
              <span className="Eactive">Add Staff</span>
            </div>
          </div>
          <p className="Esubtitle">
            Enter the staff member's information below to add them to the
            system.
          </p>
        </div>

        <form className="Estaff-form">
          <div className="Eform-section">
            <h2>Personal Information</h2>
            <div className="Eform-grid Etype-3-col">
              <div className="Eform-group">
                <label>
                  First Name<span className="Erequired">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="Eform-group">
                <label>
                  Last Name<span className="Erequired">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Last Name"
                />
              </div>
              <div className="Eform-group">
                <label>Other Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Other Name"
                />
              </div>
              <div className="Eform-group">
                <label>
                  Gender<span className="Erequired">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="Eform-group">
                <label>
                  Date of Birth<span className="Erequired">*</span>
                </label>
                <div className="Edate-input-wrapper">
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Select Date of Birth"
                  />
                  <span className="Ecalendar-icon">📅</span>
                </div>
              </div>
              <div className="Eform-group">
                <label>Nationality</label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                </select>
              </div>
              <div className="Eform-group">
                <label>
                  Phone Number<span className="Erequired">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="Eform-group">
                <label>
                  Email Address<span className="Erequired">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="Eform-group">
                <label>Marital Status</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Marital status
                  </option>
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                </select>
              </div>
            </div>
            <div className="Eform-group Efull-width-field">
              <label>
                Address<span className="Erequired">*</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Enter Residencial Address"
              />
            </div>
          </div>

          <div className="Eform-section">
            <h2>Employment Information</h2>
            <div className="Eform-grid Etype-3-col">
              <div className="Eform-group">
                <label>
                  Staff Type<span className="Erequired">*</span>
                </label>
                <select
                  name="staffType"
                  value={formData.staffType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Staff Type
                  </option>
                  <option value="Subject Teacher">Subject Teacher</option>
                  <option value="Security">Security</option>
                  <option value="Bursary">Bursary</option>
                </select>
              </div>
              <div className="Eform-group">
                <label>
                  Role<span className="Erequired">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="Eform-group">
                <label>Qualification</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Qualification"
                />
              </div>
            </div>
          </div>

          <div className="Eform-section">
            <h2>Teaching Information (For Teaching Staff)</h2>
            <div className="Eform-grid Etype-3-col">
              <div className="Eform-group">
                <label>Teacher Type</label>
                <select
                  name="techingType"
                  value={formData.teachingType}
                  onChange={handleChange}
                  defaultChecked=""
                >
                  <option value="" disabled>
                    Select Teacher Type
                  </option>
                  <option value="Class Teacher">Class Teacher</option>
                  <option value="Subject Teacher">Subject Teacher</option>
                </select>
              </div>
              <div className="Eform-group">
                <label>Assign Class</label>
                <select
                  value={formData.classesToTeach}
                  name="selectClass"
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Class
                  </option>
                  <option value="Primary 1">Primary 1</option>
                  <option value="Primary 2">Primary 2</option>
                </select>
              </div>
              <div className="Eform-group">
                <label>Assign Subject</label>
                <select
                  value={formData.subjectAssigned}
                  onChange={handleChange}
                  name="selectSubject"
                >
                  <option value="" disabled>
                    Select Subjects
                  </option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                </select>
                <span className="Efield-hint">Select one or more subjects</span>
              </div>
              <div className="Eform-group">
                <label>Classes to Teach</label>
                <select
                  value={formData.classesToTeach}
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Class
                  </option>
                </select>
                <span className="Efield-hint">Select one or more classes</span>
              </div>
              <div className="Eform-group">
                <label>Department</label>
                <select
                  vvalue={formData.department}
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option disabled>Select Department</option>
                </select>
                <span className="Efield-hint">Select one or more classes</span>
              </div>
            </div>
          </div>

          <button onClick={handleSubmit} type="submit" className="Esubmit-btn">
            Create Staff
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminStaff2;