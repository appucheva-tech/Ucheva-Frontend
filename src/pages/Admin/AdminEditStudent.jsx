import React, { useState, useEffect } from 'react';
import './AdminEditStudent.css';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from "../../config/AxiosInstance";

const EditStudent = () => {
  const nav = useNavigate();
  const { id } = useParams(); // Get student ID from URL
  const subdomain = window.location.hostname.split(".")[0];
  
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    otherName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    religion: '',
    address: '',
    class: '',
    department: '',
    session: '',
    parentName: '',
    relationship: '',
    parentPhone: '',
    parentEmail: '',
    parentAddress: ''
  });

  // Determine if it's a senior class (SS1-SS3)
  const isSeniorClass = formData.class && ['SS1', 'SS2', 'SS3'].includes(formData.class);

  // Fetch existing student data when component loads
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setIsLoading(true);
        // You might need to adjust this endpoint based on your actual API
        const response = await apiClient.get(`/student/student/${id}`, {
          headers: { "x-tenant": subdomain }
        });
        
        const student = response.data;
        // Populate form with existing data
        setFormData({
          firstName: student.firstName || '',
          lastName: student.lastName || '',
          otherName: student.otherName || '',
          gender: student.gender || '',
          dateOfBirth: student.dateOfBirth || '',
          nationality: student.nationality || '',
          religion: student.religion || '',
          address: student.address || '',
          class: student.class || '',
          department: student.department || '',
          session: student.session || '',
          parentName: student.parent?.name || '',
          relationship: student.parent?.relationship || '',
          parentPhone: student.parent?.phone || '',
          parentEmail: student.parent?.email || '',
          parentAddress: student.parent?.address || ''
        });
      } catch (error) {
        console.error("Failed to fetch student data:", error);
        // Optionally show error toast/notification
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchStudentData();
    }
  }, [id, subdomain]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission (UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare payload matching your backend schema
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        otherName: formData.otherName || null,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth || null,
        nationality: formData.nationality || null,
        religion: formData.religion || null,
        address: formData.address,
        class: formData.class,
        department: formData.department || null, // SS1-SS3 only
        session: formData.session,
        parent: {
          name: formData.parentName,
          relationship: formData.relationship,
          phone: formData.parentPhone,
          email: formData.parentEmail,
          address: formData.parentAddress || null
        }
      };

      // THE EXACT API ENDPOINT YOU NEED:
      const response = await apiClient.put(`/student/student/${id}`, payload, {
        headers: { "x-tenant": subdomain }
      });

      console.log('Student updated successfully:', response.data);
      
      // Navigate back to student list
      nav(-1); // or nav('/admin/students') if you have a specific route
      
    } catch (error) {
      console.error("Failed to update student:", error);
      // Handle error - show toast notification
      alert("Error updating student. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="Kcontainer">
        <div className="dashboard-loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="Kcontainer">
      <div className="Kheader">
        <h1 className="Ktitle">Edit Student</h1>
        <div className="Kbreadcrumb">
          <span className='KStudentManagement' onClick={() => {nav(-1)}}>Student Management</span>
          <span className="Kseparator">&gt;</span>
          <span className="Kactive">Edit Student</span>
        </div>
      </div>

      <form className="Kform" onSubmit={handleSubmit}>
        <div className="Ksection">
          <h2 className="KsectionTitle">Personal Information</h2>
          <div className="Kgrid3">
            <div className="KformGroup">
              <label className="Klabel">First Name<span className="Krequired">*</span></label>
              <input 
                type="text" 
                className="Kinput" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="KformGroup">
              <label className="Klabel">Last Name<span className="Krequired">*</span></label>
              <input 
                type="text" 
                className="Kinput" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="KformGroup">
              <label className="Klabel">Other Name</label>
              <input 
                type="text" 
                className="Kinput" 
                placeholder="Enter Other Name"
                name="otherName"
                value={formData.otherName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="Kgrid3">
            <div className="KformGroup">
              <label className="Klabel">Gender<span className="Krequired">*</span></label>
              <select 
                className="Kselect" 
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div className="KformGroup">
              <label className="Klabel">Date of Birth</label>
              <div className="KdateInputWrapper">
                <input 
                  type="date" 
                  className="Kinput" 
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="KformGroup">
              <label className="Klabel">Nationality</label>
              <select 
                className="Kselect" 
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              >
                <option value="">Select Nationality</option>
                <option value="Nigerian">Nigerian</option>
                <option value="Non-Nigerian">Non-Nigerian</option>
              </select>
            </div>
          </div>

          <div className="KgridLayout">
            <div className="KformGroup">
              <label className="Klabel">Religion</label>
              <select 
                className="Kselect" 
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
              >
                <option value="">Select Religion</option>
                <option value="Christian">Christian</option>
                <option value="Muslim">Muslim</option>
              </select>
            </div>
            <div className="KformGroup Kspan2">
              <label className="Klabel">Address<span className="Krequired">*</span></label>
              <input 
                type="text" 
                className="Kinput" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="Ksection">
            <h2 className="KsectionTitle">Academic Information</h2>
            <div className="Kgrid3">
              <div className="KformGroup">
                <label className="Klabel">Class<span className="Krequired">*</span></label>
                <select 
                  className="Kselect" 
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="JSS1">JSS1</option>
                  <option value="JSS2">JSS2</option>
                  <option value="JSS3">JSS3</option>
                  <option value="SS1">SS1</option>
                  <option value="SS2">SS2</option>
                  <option value="SS3">SS3</option>
                </select>
              </div>

              {isSeniorClass && (
                <div className="KformGroup">
                  <label className="Klabel">Department<span className="Krequired">*</span></label>
                  <select
                    className="Kselect"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required={isSeniorClass}
                  >
                    <option value="">Select Department</option>
                    <option value="Science">Science</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Arts">Arts</option>
                  </select>
                  <span className="Khint">Applies to SS1-SS3 only</span>
                </div>
              )}

              <div className="KformGroup">
                <label className="Klabel">Session<span className="Krequired">*</span></label>
                <select 
                  className="Kselect" 
                  name="session"
                  value={formData.session}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Session</option>
                  <option value="2025/2026">2025/2026</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="Ksection">
          <h2 className="KsectionTitle">Parent/Guardian Information</h2>
          <div className="Kgrid3">
            <div className="KformGroup">
              <label className="Klabel">Parent/Guardian Name<span className="Krequired">*</span></label>
              <input 
                type="text" 
                className="Kinput" 
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="KformGroup">
              <label className="Klabel">Relationship<span className="Krequired">*</span></label>
              <input 
                type="text" 
                className="Kinput" 
                name="relationship"
                value={formData.relationship}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="KformGroup">
              <label className="Klabel">Phone Number<span className="Krequired">*</span></label>
              <input 
                type="text" 
                className="Kinput" 
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleInputChange}
                required
              />
              <span className="Khint">WhatsApp number preferably</span>
            </div>
          </div>

          <div className="KgridLayout">
            <div className="KformGroup">
              <label className="Klabel">Email Address<span className="Krequired">*</span></label>
              <input 
                type="email" 
                className="Kinput" 
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="KformGroup Kspan2">
              <label className="Klabel">Address</label>
              <input 
                type="text" 
                className="Kinput" 
                name="parentAddress"
                value={formData.parentAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="KsubmitBtn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditStudent;