import React from 'react';
import './AdminEditStaff.css'
import { useNavigate } from 'react-router-dom';

const EditStaff = () => {
  const nav = useNavigate();
  return (
    <div className="Icontainer">
      <div className="Iheader">
        <h1 className="Ititle">Edit Staff</h1>
        <div className="Ibreadcrumb">
          <span>Staff Management</span>
          <span className="Iseparator">&gt;</span>
          <span className="Iactive">Edit Staff</span>
        </div>
      </div>

      <form className="Iform">
        <div className="Isection">
          <h2 className="IsectionTitle">Personal Information</h2>
          <div className="Igrid3">
            <div className="IformGroup">
              <label className="Ilabel">First Name<span className="Irequired">*</span></label>
              <input type="text" className="Iinput" defaultValue="Adaeze" />
            </div>
            <div className="IformGroup">
              <label className="Ilabel">Last Name<span className="Irequired">*</span></label>
              <input type="text" className="Iinput" defaultValue="Clinton" />
            </div>
            <div className="IformGroup">
              <label className="Ilabel">Other Name</label>
              <input type="text" className="Iinput" placeholder="Enter Other Name" />
            </div>
          </div>

          <div className="Igrid3">
            <div className="IformGroup">
              <label className="Ilabel">Gender<span className="Irequired">*</span></label>
              <select className="Iselect" defaultValue="Female">
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div className="IformGroup">
              <label className="Ilabel">Date of Birth</label>
              <div className="IdateInputWrapper">
                <input type="text" className="Iinput" defaultValue="12 March 1990" />
                <span className="IcalendarIcon">📅</span>
              </div>
            </div>
            <div className="IformGroup">
              <label className="Ilabel">Nationality</label>
              <select className="Iselect" defaultValue="Nigeria">
                <option value="Nigeria">Nigeria</option>
              </select>
            </div>
          </div>

          <div className="Igrid3">
            <div className="IformGroup">
              <label className="Ilabel">Phone Number<span className="Irequired">*</span></label>
              <input type="text" className="Iinput" defaultValue="0803 245 6789" />
            </div>
            <div className="IformGroup">
              <label className="Ilabel">Email Address<span className="Irequired">*</span></label>
              <input type="email" className="Iinput" defaultValue="adaeze.clinton@gmail.com" />
            </div>
            <div className="IformGroup">
              <label className="Ilabel">Marital Status</label>
              <select className="Iselect" defaultValue="Single">
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
          </div>

          <div className="IformGroup IffullWidth">
            <label className="Ilabel">Address<span className="Irequired">*</span></label>
            <input type="text" className="Iinput" defaultValue="12 Unity Avenue, Jefferson Avenue Road, Ikoyi Lagos" />
          </div>
        </div>

        <div className="Isection">
          <h2 className="IsectionTitle">Employment Information</h2>
          <div className="Igrid3">
            <div className="IformGroup">
              <label className="Ilabel">Staff Type<span className="Irequired">*</span></label>
              <select className="Iselect" defaultValue="Teaching Staff">
                <option value="Teaching Staff">Teaching Staff</option>
              </select>
            </div>
            <div className="IformGroup">
              <label className="Ilabel">Role<span className="Irequired">*</span></label>
              <select className="Iselect" defaultValue="Teacher">
                <option value="Teacher">Teacher</option>
              </select>
            </div>
            <div className="IformGroup">
              <label className="Ilabel">Qualification</label>
              <input type="text" className="Iinput" defaultValue="B.Sc" />
            </div>
          </div>
        </div>

        <div className="Isection">
          <h2 className="IsectionTitle">Teaching Information (For Teaching Staff)</h2>
          <div className="Igrid3">
            <div className="IformGroup">
              <label className="Ilabel">Teacher Type</label>
              <select className="Iselect" defaultValue="Class Teacher">
                <option value="Class Teacher">Class Teacher</option>
              </select>
            </div>
            <div className="IformGroup">
              <label className="Ilabel">Assign Class</label>
              <select className="Iselect" defaultValue="SS 1A">
                <option value="SS 1A">SS 1A</option>
              </select>
            </div>
            <div className="IformGroup">
              <label className="Ilabel">Assign Subject</label>
              <select className="Iselect" defaultValue="Select Subjects">
                <option value="Select Subjects">Select Subjects</option>
              </select>
              <span className="Ihint">Select one or more subjects</span>
            </div>
          </div>

          <div className="Igrid3">
            <div className="IformGroup">
              <label className="Ilabel">Classes to Teach</label>
              <select className="Iselect" defaultValue="SS 1A, SS 2A, SS3A">
                <option value="SS 1A, SS 2A, SS3A">SS 1A, SS 2A, SS3A</option>
              </select>
              <span className="Ihint">Select one or more classes</span>
            </div>
          </div>
        </div>

        <button type="submit" className="IsubmitBtn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditStaff;