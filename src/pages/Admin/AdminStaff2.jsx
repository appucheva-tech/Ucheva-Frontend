import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStaff2.css";
import { apiClient } from "../../config/AxiosInstance";
import { toast } from "react-toastify";
import { IoIosAlert } from "react-icons/io";

const AdminStaff2 = () => {
  const subdomain = window.location.hostname.split(".")[0];
  const nav = useNavigate();
  const popupRef = useRef(null);

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
    qualification: "",
    staffType: "",
    classId: "",
    classId: "",
  });

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showNoClassModal, setShowNoClassModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // If user switches to Class Teacher and unassigned list is completely empty, trigger the modal alert
      if (
        name === "staffType" &&
        value === "Class Teacher" &&
        classes.length === 0
      ) {
        setShowNoClassModal(true);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating staff...");

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
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim().toLowerCase(),
        qualification: formData.qualification.trim().toLowerCase(),
        staffType: formData.staffType?.trim().toLowerCase(),
        staffType: formData.staffType?.trim().toLowerCase(),

        ...(formData.staffType === "Class Teacher" && {
          classId: formData.classId,
        }),
        ...(formData.staffType === "Class Teacher" && {
          classId: formData.classId,
        }),
      };

      const response = await apiClient.post("/staff/staff", payload, {
        headers: { "x-tenant": subdomain },
      });

      toast.update(toastId, {
        render: response?.data?.message || "Staff created successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

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
        qualification: "",
        staffType: "",
        classId: "",
        classId: "",
      });
      nav("/admin/AdminStaff");
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: error.response?.data?.message || "Failed to create staff",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await apiClient.get("/class/unassigned-classes", {
          headers: { "x-tenant": subdomain },
        });

        setClasses(response.data?.classData || []);
      } catch (error) {
        console.error("Failed to fetch classes", error);
      }
    };
    fetchClasses();
  }, [subdomain]);

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
                  required
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
                  required
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
                  required
                >
                  <option value="">Select Gender</option>
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
                    required
                  />
                </div>
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
                  <option value="non-nigerian">Non-Nigerian</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Phone Number<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  required
                  inputMode="numeric"
                  maxLength={11}
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
                  required
                />
              </div>

              <div className="form-group">
                <label>Marital Status</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Marital status</option>
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
                required
              />
            </div>
          </div>

          {/* Employment Information */}
          <div className="form-section">
            <h2>Employment Information</h2>
            <div className="form-grid type-3-col">
              <div className="form-group">
                <label>Staff Type</label>
                <select
                  name="staffType"
                  value={formData.staffType}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select Staff Type
                  </option>
                  <option value="Class Teacher">Class Teacher</option>
                  <option value="Subject Teacher">Subject Teacher</option>
                </select>
              </div>

              {formData.staffType === "Class Teacher" && (
                <div className="form-group animate-fade-in">
                  <label>
                    Assign Class<span className="required">*</span>
                  </label>
                  {classes.length > 0 ? (
                    <select
                      name="classId"
                      value={formData.classId}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled selected>
                        Select Class
                      </option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.className}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div
                      className="form-inline-error-banner"
                      onClick={() => setShowNoClassModal(true)}
                    >
                      <IoIosAlert /> No unassigned classes available. Click to
                      configure.
                    </div>
                  )}
                </div>
              )}

              <div className="form-group">
                <label>Qualification</label>
                <select
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="Enter Qualification"
                >
                  <option value="">Select Qualification Type</option>
                  <option value="SSCE">SSCE</option>
                  <option value="OND">OND</option>
                  <option value="HND">HND</option>
                  <option value="BSC">BSC</option>
                  <option value="MSC">MSC</option>
                  <option value="PHD">PHD</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={
              loading ||
              (formData.staffType === "Class Teacher" && classes.length === 0)
            }
          >
            {loading ? "Creating..." : "Create Staff"}
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

      {/* Dynamic Action Modal Fallback View */}
      {showNoClassModal && (
        <div
          className="AdminModalOverlay"
          onClick={() => setShowNoClassModal(false)}
        >
          <div className="AdminModalCard" onClick={(e) => e.stopPropagation()}>
            <div className="AdminModalHeader">
              <div className="AlertIconWrapper">
                <IoIosAlert />
              </div>
              <h3>No Available Classes</h3>
              <p>
                You selected <strong>Class Teacher</strong>, but all existing
                classes currently have a teacher assigned, or none have been
                created yet.
              </p>
            </div>
            <div className="AdminModalActions">
              <button
                className="CancelModalBtn"
                onClick={() => setShowNoClassModal(false)}
              >
                Cancel
              </button>
              <button
                className="RedirectModalBtn"
                onClick={() => nav("/admin/AdminClass")}
              >
                Create & Add Class
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminStaff2;
