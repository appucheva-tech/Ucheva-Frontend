import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStudent2.css";
import { apiClient } from "../../config/AxiosInstance";
import { toast } from "react-toastify";

const AdminStudent2 = () => {
  const subdomain = window.location.hostname.split(".")[0];

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
    parentGuardiansFirstName: "",   // ✅ FIX 3
    parentGuardiansLastName: "",    // ✅ FIX 3
    relationship: "",
    phoneNumber: "",
    parentGuardiansEmail: "",
    religion: "",
    parentGuardiansAddress: "",
  };

  const nav = useNavigate(); // ✅ FIX 4: Moved to top

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ FIX 5: Full validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.gender ||
      !formData.address ||
      !formData.classId ||
      !formData.session ||
      !formData.parentGuardiansFirstName ||
      !formData.parentGuardiansLastName ||
      !formData.relationship ||
      !formData.phoneNumber ||
      !formData.parentGuardiansEmail
    ) {
      toast.error("Please fill all required fields");
      return;
    }

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
        parentGuardiansFirstName: formData.parentGuardiansFirstName.trim(), // ✅ FIX 3
        parentGuardiansLastName: formData.parentGuardiansLastName.trim(),   // ✅ FIX 3
        relationship: formData.relationship.toLowerCase(),
        phoneNumber: formData.phoneNumber.trim(),
        parentGuardiansEmail: formData.parentGuardiansEmail.trim().toLowerCase(),
        religion: formData.religion,
        parentGuardiansAddress: formData.parentGuardiansAddress,
        ...(isSeniorClass && formData.department
          ? { department: formData.department }
          : {}),
      };

      await apiClient.post("/student/student", payload, {
        headers: { "x-tenant": subdomain },
      });

      toast.success("Student created successfully!");
      nav("/admin/AdminStudents");
      setFormData(initialState);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    fetchClasses();
  }, [subdomain]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="form-container">
        <div className="form-header">
          <div className="header-top">
            <h1>Add New Student</h1> {/* ✅ FIX 1: Removed nested h1 */}
            <div className="breadcrumb">
              <span className="Sactive" onClick={() => nav(-1)}>
                Student Management
              </span>
              <span className="separator">&gt;</span>
              <span className="active">Add Student</span>
            </div>
          </div>
          <p className="subtitle">
            Enter the student's information below to register them in the system.
          </p>
        </div>

        <form className="staff-form" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-grid type-3-col">
              <div className="form-group">
                <label>First Name<span className="required">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                />
              </div>

              <div className="form-group">
                <label>Last Name<span className="required">*</span></label>
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
                <label>Gender<span className="required">*</span></label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
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
                <select name="nationality" value={formData.nationality} onChange={handleChange}>
                  <option value="">Select Country</option>
                  <option value="nigerian">Nigerian</option>
                  <option value="non Nigeria">Non Nigerian</option>
                </select>
              </div>

              <div className="form-group">
                <label>Religion</label>
                <select name="religion" value={formData.religion} onChange={handleChange}>
                  <option value="">Select Religion</option>
                  <option value="Christianity">Christianity</option>
                  <option value="Islam">Islam</option>
                  <option value="Traditional">Traditional</option>
                </select>
              </div>

              <div className="form-group full-width-field">
                <label>Address<span className="required">*</span></label>
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
                <label>Class<span className="required">*</span></label>
                <select name="classId" value={formData.classId} onChange={handleChange}>
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
                  <label>Department<span className="required">*</span></label>
                  <select name="department" value={formData.department} onChange={handleChange}>
                    <option value="">Select Department</option>
                    <option value="Science">Science</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Arts">Arts</option>
                  </select>
                  <span className="field-hint">Applies to SS1-SS3 only</span>
                </div>
              )}

              <div className="form-group">
                <label>Session<span className="required">*</span></label>
                {/* ✅ FIX 6: Corrected session values to match labels */}
                <select name="session" value={formData.session} onChange={handleChange}>
                  <option value="">Select Session</option>
                  <option value="2025">2025/2026</option>
                  <option value="2026">2026/2027</option>
                  <option value="2027">2027/2028</option>
                  <option value="2028">2028/2029</option>
                </select>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="form-section">
            <h2>Parent/Guardian Information</h2>
            <div className="form-grid type-3-col">
              <div className="form-group">
                <label>First Name<span className="required">*</span></label>
                {/* ✅ FIX 2: Correct name attribute */}
                <input
                  type="text"
                  name="parentGuardiansFirstName"
                  value={formData.parentGuardiansFirstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                />
              </div>

              <div className="form-group">
                <label>Last Name<span className="required">*</span></label>
                {/* ✅ FIX 2: Correct name attribute */}
                <input
                  type="text"
                  name="parentGuardiansLastName"
                  value={formData.parentGuardiansLastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                />
              </div>

              <div className="form-group">
                <label>Relationship<span className="required">*</span></label>
                {/* ✅ FIX 7: Removed invalid `select` attribute */}
                <select name="relationship" value={formData.relationship} onChange={handleChange}>
                  <option value="" disabled>Select Relationship</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>

              <div className="form-group">
                <label>Phone Number<span className="required">*</span></label>
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
                <label>Email Address<span className="required">*</span></label>
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
            {loading ? "Creating Student..." : "Create Student"}
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