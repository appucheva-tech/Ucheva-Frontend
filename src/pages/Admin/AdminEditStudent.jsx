import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminEditStudent.css";
import { apiClient } from "../../config/AxiosInstance";
import { toast } from "react-toastify";

const AdminEditStudent = () => {
  const subdomain = window.location.hostname.split(".")[0];
  const { id } = useParams(); // Get student ID from URL

  const initialState = {
    firstName: "",
    lastName: "",
    otherName: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    classId: "",
    department: "",
    session: "",
    parentGuardiansFirstName: "",
    parentGuardiansLastName: "",
    relationship: "",
    phoneNumber: "",
    parentGuardiansEmail: "",
    religion: "",
    parentGuardiansAddress: "",
  };

  const nav = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const selectedClass = classes.find(
    (c) => String(c.id) === String(formData.classId),
  );
  const selectedClassName = selectedClass?.className?.toUpperCase() || "";
  const isSeniorClass = /^SS\s*[123]/i.test(selectedClassName);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "classId") {
        const chosen = classes.find((c) => String(c.id) === String(value));
        const chosenName = chosen?.className?.toUpperCase() || "";
        const isSenior = /^SS\s*[123]/i.test(chosenName);
        if (!isSenior) {
          updated.department = "";
        }
      }

      return updated;
    });
  };

  // ── Fetch Student Data ──────────────────────────────────────────
  const fetchStudentData = async () => {
    try {
      setFetchLoading(true);
      const response = await apiClient.get(`/student/student/${id}`, {
        headers: { "x-tenant": subdomain },
      });

      const student = response?.data?.getStudent || response?.data;

      if (student) {
        setFormData({
          firstName: student.firstName || "",
          lastName: student.lastName || "",
          otherName: student.otherName || "",
          gender: student.gender || "",
          dateOfBirth: student.dateOfBirth || "",
          nationality: student.nationality || "",
          address: student.address || "",
          classId: student.classId || "",
          department: student.department || "",
          session: student.session || "",
          parentGuardiansFirstName: student.parentGuardiansFirstName || "",
          parentGuardiansLastName: student.parentGuardiansLastName || "",
          relationship: student.relationship || "",
          phoneNumber: student.phoneNumber || "",
          parentGuardiansEmail: student.parentGuardiansEmail || "",
          religion: student.religion || "",
          parentGuardiansAddress: student.parentGuardiansAddress || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch student data:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load student data",
      );
    } finally {
      setFetchLoading(false);
    }
  };

  // ── Fetch Classes ──────────────────────────────────────────────
  const fetchClasses = async () => {
    try {
      const response = await apiClient.get("/class/classes", {
        headers: { "x-tenant": subdomain },
      });
      setClasses(response.data.classes || []);
    } catch (error) {
      console.error("Failed to fetch classes", error.message);
      toast.error(error.message);
    }
  };

  // ── Load data on mount ─────────────────────────────────────────
  useEffect(() => {
    const loadData = async () => {
      await fetchClasses();
      await fetchStudentData();
    };
    loadData();
  }, [id]);

  // ── Handle Submit ──────────────────────────────────────────────
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
        classId: formData.classId.trim(),
        session: formData.session.trim(),
        parentGuardiansFirstName: formData.parentGuardiansFirstName.trim(),
        parentGuardiansLastName: formData.parentGuardiansLastName.trim(),
        relationship: formData.relationship.toLowerCase(),
        phoneNumber: formData.phoneNumber.trim(),
        parentGuardiansEmail: formData.parentGuardiansEmail
          .trim()
          .toLowerCase(),
        religion: formData.religion,
        parentGuardiansAddress: formData.parentGuardiansAddress,
        ...(isSeniorClass && formData.department
          ? { department: formData.department }
          : {}),
      };

      await apiClient.put(`/student/student/${id}`, payload, {
        headers: { "x-tenant": subdomain },
      });

      toast.success("Student updated successfully!");
      nav("/admin/AdminStudents");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  // ── Click outside handler ──────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ── Loading skeleton ────────────────────────────────────────────
  if (fetchLoading) {
    return (
      <div className="form-container">
        <div className="form-header">
          <div className="header-top">
            <h1>Edit Student</h1>
            <div className="breadcrumb">
              <span className="Sactive" onClick={() => nav(-1)}>
                Student Management
              </span>
              <span className="separator">&gt;</span>
              <span className="active">Edit Student</span>
            </div>
          </div>
          <p className="subtitle">Loading student data...</p>
        </div>
        <div className="loading-skeleton">
          <div className="skeleton-card">
            <div className="skeleton-title"></div>
            <div className="skeleton-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton-field">
                  <div className="skeleton-label"></div>
                  <div className="skeleton-input"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="header-top">
          <h1>Edit Student</h1>
          <div className="breadcrumb">
            <span className="Sactive" onClick={() => nav(-1)}>
              Student Management
            </span>
            <span className="separator">&gt;</span>
            <span className="active">Edit Student</span>
          </div>
        </div>
        <p className="subtitle">Update the student's information below.</p>
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
                <option value="nigerian">Nigerian</option>
                <option value="non Nigeria">Non Nigerian</option>
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
                name="classId"
                value={formData.classId}
                onChange={handleChange}
              >
                <option value="">Select Class</option>
                {classes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.className}
                  </option>
                ))}
              </select>
            </div>

            {isSeniorClass && (
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
            )}

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
                <option value="2025/2026">2025/2026</option>
                <option value="2026/2027">2026/2027</option>
                <option value="2027/2028">2027/2028</option>
                <option value="2028/2029">2028/2029</option>
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
                First Name<span className="required">*</span>
              </label>
              <input
                type="text"
                name="parentGuardiansFirstName"
                value={formData.parentGuardiansFirstName}
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
                name="parentGuardiansLastName"
                value={formData.parentGuardiansLastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </div>

            <div className="form-group">
              <label>
                Relationship<span className="required">*</span>
              </label>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Relationship
                </option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Phone Number<span className="required">*</span>
              </label>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                inputMode="numeric"
                maxLength={11}
              />
              <span className="field-hint">WhatsApp number preferably</span>
            </div>

            <div className="form-group">
              <label>
                Email Address<span className="required">*</span>
              </label>
              <input
                type="email"
                name="parentGuardiansEmail"
                value={formData.parentGuardiansEmail}
                onChange={handleChange}
                placeholder="Enter Email Address"
              />
            </div>

            <div className="form-group full-width-field">
              <label>Address</label>
              <textarea
                name="parentGuardiansAddress"
                value={formData.parentGuardiansAddress}
                onChange={handleChange}
                placeholder="Enter Residential Address"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Updating Student..." : "Update Student"}
        </button>
      </form>
    </div>
  );
};

export default AdminEditStudent;
