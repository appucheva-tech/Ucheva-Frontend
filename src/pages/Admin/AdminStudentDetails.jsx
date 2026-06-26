import React from 'react';
import './AdminStudentDetails.css';
import { useNavigate } from 'react-router-dom';

const StudentDetails = () => {
  const nav = useNavigate();
  return (
    <div className="Jcontainer">
      <div className="Jheader">
        <h1 className="Jtitle">Student Details</h1>
        <div className="Jbreadcrumb">
          <span className='JStudentManager' onClick={() => {nav(-1)}}>Student Management</span>
          <span className="Jseparator">&gt;</span>
          <span className="Jactive">Student Details</span>
        </div>
      </div>

      <div className="JprofileCard">
        <div className="Javatar">AC</div>
        <div className="JprofileMeta">
          <h2 className="JstudentName">Adaeze Clinton</h2>
          <div className="JmetaGrid">
            <div className="JmetaItem">
              <span className="JmetaLabel">Addmission No.</span>
              <span className="JmetaValue">UCH/2026/001</span>
            </div>
            <div className="JmetaItem">
              <span className="JmetaLabel">Class</span>
              <span className="JmetaValue">JSS 1A</span>
            </div>
            <div className="JmetaItem">
              <span className="JmetaLabel">Age</span>
              <span className="JmetaValue">10 years old</span>
            </div>
            <div className="JmetaItem">
              <span className="JmetaLabel">Gender</span>
              <span className="JmetaValue">Female</span>
            </div>
          </div>
        </div>
      </div>

      <div className="JinfoBlock">
        <div className="JblockHeader">Personal Information</div>
        <div className="JblockContent">
          <div className="JinfoGrid">
            <div className="JinfoRow">
              <span className="JinfoLabel">Full Name</span>
              <span className="JinfoValue">Adaeze Clinton</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Addmission No.</span>
              <span className="JinfoValue">UCH/2026/001</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Gender</span>
              <span className="JinfoValue">Female</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Nationality</span>
              <span className="JinfoValue">Nigerian</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Date of Birth</span>
              <span className="JinfoValue">12 March 2016</span>
            </div>
            <div className="JinfoRow JspanFull">
              <span className="JinfoLabel">Address</span>
              <span className="JinfoValue">12 Unity Avenue, Jefferson Avenue Road, Ikoyi Lagos</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Religion</span>
              <span className="JinfoValue">Christian</span>
            </div>
          </div>
        </div>
      </div>

      <div className="JinfoBlock">
        <div className="JblockHeader">Current Class & Department Information</div>
        <div className="JblockContent">
          <div className="JinfoGrid">
            <div className="JinfoRow">
              <span className="JinfoLabel">Class</span>
              <span className="JinfoValue">JSS 1A</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Class Teacher</span>
              <span className="JinfoValue">Mrs Olaoluwa Johnson</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Section</span>
              <span className="JinfoValue">Junior Secondary</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Date Enrolled</span>
              <span className="JinfoValue">Maths, Further Maths, Physics</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Department</span>
              <span className="JinfoValue">--</span>
            </div>
          </div>
        </div>
      </div>

      <div className="JinfoBlock">
        <div className="JblockHeader">Parent/Guardian Information</div>
        <div className="JblockContent">
          <div className="JinfoGrid">
            <div className="JinfoRow">
              <span className="JinfoLabel">Full Name</span>
              <span className="JinfoValue">Mrs. Nnma Clinton</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Phone Number</span>
              <span className="JinfoValue">0803 245 6789</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Relationship</span>
              <span className="JinfoValue">Mother</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Email Address</span>
              <span className="JinfoValue">nnmaclinton12@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="Jactions">
        <button className="JbtnEdit">
          <span className="JbtnIcon">✏️</span> Edit Student
        </button>
        <button className="JbtnDelete">
          <span className="JbtnIcon">🗑️</span> Delete Student
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;