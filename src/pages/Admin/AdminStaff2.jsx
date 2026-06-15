import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStaff2.css";
import Ifeanacho from "../../assets/Ifeanacho.jpg";
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
      <header className="B2AdminDashboard-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search staff by name, role..."
            className="search-input"
          />
          <button className="search-button" aria-label="Search">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <div className="meta-container">
          <div className="date-display">
            <svg
              className="calendar-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
            <svg
              className="chevron-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          <div className="divider"></div>

          <div className="dropdown">
            <span>Third Term</span>
            <svg
              className="chevron-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div className="profile-container">
          <div className="notification-wrapper" ref={popupRef}>
            <button
              className="notification-button"
              aria-label="Notifications"
              onClick={toggleNotifications}
            >
              <svg
                className="bell-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-badge"></span>
            </button>

            {isOpen && (
              <div className="notification-popup">
                <div className="popup-header">
                  <h2>Notifications</h2>
                  <button
                    className="close-btn"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>

                <div className="notification-list">
                  <div className="notification-item unread">
                    <div className="notification-content">
                      <h3>Payment Received</h3>
                      <p>
                        <strong>₦85,000</strong> payment made by Daniels
                        Ogeremu’s parent.
                      </p>
                      <span class="time-stamp">2 min ago</span>
                    </div>
                    <span className="unread-dot"></span>
                  </div>

                  <div className="notification-item unread">
                    <div className="notification-content">
                      <h3>Withdrawal Approved</h3>
                      <p>
                        Withdrawal of <strong>₦500,000</strong> completed
                      </p>
                      <span class="time-stamp">5 min ago</span>
                    </div>
                    <span className="unread-dot"></span>
                  </div>

                  <div className="notification-item">
                    <div className="notification-content">
                      <h3>Withdrawal Rejected</h3>
                      <p>
                        Withdrawal of <strong>₦250,000</strong> rejected
                      </p>
                      <span class="time-stamp">Yesterday</span>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div className="notification-content">
                      <h3>Payment Received</h3>
                      <p>
                        <strong>₦150,000</strong> payment made by Ebube Udoka’s
                        parent
                      </p>
                      <span class="time-stamp">Yesterday</span>
                    </div>
                  </div>
                </div>

                <div className="popup-footer">
                  <button className="mark-all-btn">Mark all as read</button>
                </div>
              </div>
            )}
          </div>

          <div className="user-profile">
            <img src={Ifeanacho} alt="Ifeanacho" className="avatar" />
          </div>
          <div className="Auser-info">
            <span className="user-name">Ifeanacho Francis</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </header>

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

        <form className="staff-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-grid type-3-col">
              <div className="form-group">
                <label>
                  First Name<span className="required">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="form-group">
                <label>
                  Last Name<span className="required">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Last Name"
                />
              </div>
              <div className="form-group">
                <label>Other Name</label>
                <input
                  onChange={handleChange}
                  type="text"
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
                    onChange={handleChange}
                    type="text"
                    placeholder="Select Date of Birth"
                  />
                  <span className="calendar-icon">📅</span>
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
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  Phone Number<span className="required">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="form-group">
                <label>
                  Email Address<span className="required">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="email"
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
                onChange={handleChange}
                type="text"
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
                  <option value="Teaching Staff">Teaching Staff</option>
                  <option value="Non Teaching Staff">Non Teaching Staff</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  Role<span className="required">*</span>
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
                  <option value="Admin">Admin</option>
                  <option value="Bursary">Bursary</option>
                  <option value="Security">Security</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>
              <div className="form-group">
                <label>Qualification</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Qualification"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Teaching Information (For Teaching Staff)</h2>
            <div className="form-grid type-3-col">
              <div className="form-group">
                <label>Teacher Type</label>
                <select
                  name="teachingType"
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
              <div className="form-group">
                <label>Assign Class</label>
                <select
                  value={formData.classesToTeach}
                  name="classesToTeach"
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
                <span className="field-hint">Select one or more subjects</span>
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
                  vvalue={formData.department}
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

          <button onClick={handleSubmit} type="submit" className="submit-btn">
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
