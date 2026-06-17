import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStaff2.css";
import Ifeanacho from "../../assets/Ifeanacho.jpg";
import axios from "axios";
import { apiClient } from "../../config/AxiosInstance";
import { toast } from "react-toastify";

const AdminStaff2 = () => {
  const subdomain = window.location.hostname.split(".")[0];
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
    staffRole: "",
    teacherType: "",
    classAssigned: "",
    subjectAssigned: "",
    classesToTeach: "",
    department: "",
    qualification: "",
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
        firstName: formData.firstName.trim().toLowerCase(),
        lastName: formData.lastName.trim().toLowerCase(),
        otherName: formData.otherName.trim(),
        gender: formData.gender.toLowerCase(),
        dateOfBirth: new Date(formData.dateOfBirth).toISOString().split("T")[0],
        nationality: formData.nationality.toLowerCase(),
        address: formData.address.trim().toLowerCase(),
        maritalStatus: formData.maritalStatus.toLowerCase(),
        phoneNumber: formData.phoneNumber.trim().toLowerCase(),
        email: formData.email.trim().toLowerCase(),
        qualification: formData.qualification.trim().toLowerCase(),

        staffType: formData.staffType.toLowerCase(),
        staffRole: formData.staffRole.toLowerCase(),
        ...(formData.teacherType && {
          teacherType: formData.teacherType.toLowerCase(),
        }),
        ...(formData.classAssigned && {
          teacherType: formData.classAssigned.toLowerCase(),
        }),

        subjectAssigned: formData.subjectAssigned
          ? [formData.subjectAssigned.toLowerCase()]
          : [],

        classesToTeach: formData.classesToTeach
          ? [formData.classesToTeach.toLowerCase()]
          : [],

        department: formData.department.toLowerCase(),
      };

      const response = await apiClient.post("/staff/staff", payload, {
        headers: {
          "x-tenant": subdomain,
        },
      });

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
        staffRole: "",
        teacherType: "",
        classAssigned: "",
        subjectAssigned: "",
        classesToTeach: "",
        department: "",
        qualification: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create staff");
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
            <h1>Add New Staff</h1>
            <div className="breadcrumb">
              <span className="Sactive" onClick={() => nav(-1)}>
                Staff Management
              </span>
              <span className="separator">&gt;</span>
              <span className="active">Add Staff</span>
            </div>
          </div>
          <p className="subtitle">
            Enter the staff member's information below to add them to the
            system.
          </p>
        </div>

        <form className="staff-form" onSubmit={handleSubmit}>
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
                  <option value="" disabled selected>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  Date of Birth<span className="required">*</span>
                </label>
                <div className="date-input-wrapper">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Select Date of Birth"
                  />
                  {/* <span className="calendar-icon">📅</span> */}
                </div>
              </div>
              <div className="form-group">
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
                  <option value="Nigerian">Nigerian</option>
                  <option value="non-nigerian">Non-Nigerian</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  Phone Number<span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Email Address<span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
              </div>
              <div className="form-group">
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
            <div className="form-group full-width-field">
              <label>
                Address<span className="required">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Residencial Address"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Employment Information</h2>
            <div className="form-grid type-3-col">
              <div className="form-group">
                <label>
                  Staff Type<span className="required">*</span>
                </label>
                <select
                  name="staffType"
                  value={formData.staffType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Staff Type
                  </option>
                  <option value="Teaching staff">Teaching Staff</option>
                  <option value="Non-Teaching staff">Non Teaching Staff</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  Role<span className="required">*</span>
                </label>
                <select
                  name="staffRole"
                  value={formData.staffRole}
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="Bursary">Bursary</option>
                  <option value="Security">Security</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>
              <div className="form-group">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="Enter Qualification"
                />
              </div>
            </div>
          </div>

          {formData.staffType === "Teaching staff" && (
            <div className="form-section">
              <h2>Teaching Information (For Teaching Staff)</h2>
              <div className="form-grid type-3-col">
                <div className="form-group">
                  <label>Teacher Type</label>
                  <select
                    name="teacherType"
                    value={formData.teacherType}
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
                <div className="form-group">
                  <label>Assign Class</label>
                  <select
                    name="classAssigned"
                    value={formData.classAssigned}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Class
                    </option>
                    <option value="Primary 1">Primary 1</option>
                    <option value="Primary 2">Primary 2</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Assign Subject</label>
                  <select
                    value={formData.subjectAssigned}
                    onChange={handleChange}
                    name="subjectAssigned"
                  >
                    <option value="" disabled>
                      Select Subjects
                    </option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                  </select>
                  <span className="field-hint">
                    Select one or more subjects
                  </span>
                </div>
                <div className="form-group">
                  <label>Classes to Teach</label>
                  <select
                    name="classesToTeach"
                    value={formData.classesToTeach}
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Class
                    </option>
                    <option value="Jss1">Jss1</option>
                    <option value="Jss2">Jss2</option>
                  </select>
                  <span className="field-hint">Select one or more classes</span>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    <option value="Art">Art</option>
                    <option value="Commercial">Commercial</option>
                    <option value="">Science</option>
                  </select>
                  <span className="field-hint">Select one or more classes</span>
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn">
            Create Staff
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

export default AdminStaff2;
