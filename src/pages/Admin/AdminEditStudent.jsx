import React from 'react';
import './AdminEditStudent.css'

const EditStudent = () => {
  return (
    <div className="Kcontainer">
      <div className="Kheader">
        <h1 className="Ktitle">Edit Student</h1>
        <div className="Kbreadcrumb">
          <span>Student Management</span>
          <span className="Kseparator">&gt;</span>
          <span className="Kactive">Edit Student</span>
        </div>
      </div>

      <form className="Kform">
        <div className="Ksection">
          <h2 className="KsectionTitle">Personal Information</h2>
          <div className="Kgrid3">
            <div className="KformGroup">
              <label className="Klabel">First Name<span className="Krequired">*</span></label>
              <input type="text" className="Kinput" defaultValue="Adaeze" />
            </div>
            <div className="KformGroup">
              <label className="Klabel">Last Name<span className="Krequired">*</span></label>
              <input type="text" className="Kinput" defaultValue="Clinton" />
            </div>
            <div className="KformGroup">
              <label className="Klabel">Other Name</label>
              <input type="text" className="Kinput" placeholder="Enter Other Name" />
            </div>
          </div>

          <div className="Kgrid3">
            <div className="KformGroup">
              <label className="Klabel">Gender<span className="Krequired">*</span></label>
              <select className="Kselect" defaultValue="Female">
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div className="KformGroup">
              <label className="Klabel">Date of Birth</label>
              <div className="KdateInputWrapper">
                <input type="text" className="Kinput" placeholder="Select Date of Birth" />
                <span className="KcalendarIcon">📅</span>
              </div>
            </div>
            <div className="KformGroup">
              <label className="Klabel">Nationality</label>
              <select className="Kselect" defaultValue="Nigeria">
                <option value="Nigeria">Nigeria</option>
              </select>
            </div>
          </div>

          <div className="KgridLayout">
            <div className="KformGroup">
              <label className="Klabel">Religion</label>
              <select className="Kselect" defaultValue="Christian">
                <option value="Christian">Christian</option>
                <option value="Muslim">Muslim</option>
              </select>
            </div>
            <div className="KformGroup Kspan2">
              <label className="Klabel">Address<span className="Krequired">*</span></label>
              <input type="text" className="Kinput" defaultValue="12 Unity Avenue, Jefferson Avenue Road, Ikoyi Lagos" />
            </div>
          </div>
        </div>

        <div className="Ksection">
          <h2 className="KsectionTitle">Academic Information</h2>
          <div className="Kgrid3">
            <div className="KformGroup">
              <label className="Klabel">Class<span className="Krequired">*</span></label>
              <select className="Kselect" defaultValue="JSS 1A">
                <option value="JSS 1A">JSS 1A</option>
              </select>
            </div>
            <div className="KformGroup">
              <label className="Klabel">Department<span className="Krequired">*</span></label>
              <select className="Kselect" defaultValue="">
                <option value="" disabled>Select department</option>
              </select>
              <span className="Khint">Applies to SS1-SS3 only</span>
            </div>
            <div className="KformGroup">
              <label className="Klabel">Session<span className="Krequired">*</span></label>
              <select className="Kselect" defaultValue="2025/2026">
                <option value="2025/2026">2025/2026</option>
              </select>
            </div>
          </div>
        </div>

        <div className="Ksection">
          <h2 className="KsectionTitle">Parent/Guardian Information</h2>
          <div className="Kgrid3">
            <div className="KformGroup">
              <label className="Klabel">Parent/Guardian Name<span className="Krequired">*</span></label>
              <input type="text" className="Kinput" defaultValue="Nnma Clinton" />
            </div>
            <div className="KformGroup">
              <label className="Klabel">Relationship<span className="Krequired">*</span></label>
              <input type="text" className="Kinput" defaultValue="Mother" />
            </div>
            <div className="KformGroup">
              <label className="Klabel">Phone Number<span className="Krequired">*</span></label>
              <input type="text" className="Kinput" defaultValue="0803 245 6789" />
              <span className="Khint">WhatsApp number preferably</span>
            </div>
          </div>

          <div className="KgridLayout">
            <div className="KformGroup">
              <label className="Klabel">Email Address<span className="Krequired">*</span></label>
              <input type="email" className="Kinput" defaultValue="nnma12@gmail.com" />
            </div>
            <div className="KformGroup Kspan2">
              <label className="Klabel">Address</label>
              <input type="text" className="Kinput" defaultValue="12 Unity Avenue, Jefferson Avenue Road, Ikoyi Lagos" />
            </div>
          </div>
        </div>

        <button type="submit" className="KsubmitBtn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditStudent;