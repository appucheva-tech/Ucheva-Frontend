import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../../config/AxiosInstance";
import "./AdminStaffDetails.css";
import { useNavigate } from "react-router-dom";

const StaffDetails = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const subdomain = window.location.hostname.split(".")[0];

  const [staff, setStaff] = useState(null);

  // const dummyStaff = {
  //   firstName: "James",
  //   lastName: "Brown",
  //   otherName: "Chinedu",
  //   gender: "Male",
  //   dateOfBirth: "1991-04-15",
  //   nationality: "Nigerian",
  //   address: "15 Adeola Odeku Street, Victoria Island, Lagos",
  //   maritalStatus: "Single",
  //   phoneNumber: "08029837465",
  //   email: "james.brown@example.com",
  //   staffType: "Teaching",
  //   teachingType: "Class Teacher",
  //   classAssigned: "Primary 3",
  //   subjectAssigned: ["Mathematics", "Physics"],
  //   classesToTeach: "Primary 3, Primary 4",
  //   staffUrl: "https://via.placeholder.com/100",
  // };

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await apiClient.get(`/staff/staff/${id}`, {
          headers: {
            "x-tenant": subdomain,
          },
        });

        console.log("Staff Details:", response.data);

        setStaff(response.data?.staff);
      } catch (error) {
        console.error("Failed to fetch staff details:", error);
      }
    };

    fetchStaffDetails();
  }, [id, subdomain]);

  const staffData = staff;

  const fullName = `${staffData?.firstName || ""} ${
    staffData?.lastName || ""
  } ${staffData?.otherName || ""}`.trim();

  return (
    <div className="Fcontainer">
      <header className="Fheader">
        <h1 className="Ftitle">Staff Details</h1>

        <div className="Fbreadcrumb">
          <span
            className="FStaffManagement"
            onClick={() => {
              nav(-1);
            }}
          >
            Staff Management
          </span>
          <span className="Fseparator">&gt;</span>
          <span className="Factive">Staff Details</span>
        </div>
      </header>

      <main className="Fmain-content">
        <section className="Fprofile-card">
          <img
            src={staffData?.staffUrl || "https://via.placeholder.com/100"}
            alt={fullName}
            className="Fprofile-img"
          />

          <div className="Fprofile-info">
            <h2 className="Fprofile-name">{fullName}</h2>

            <div className="Fprofile-meta">
              <div>
                <span className="Flabel">Bio</span>
                <span className="Fvalue">
                  {staffData?.teachingType || "N/A"}
                </span>
              </div>

              <div>
                <span className="Flabel">Phone Number</span>
                <span className="Fvalue">{staffData?.phoneNumber || "N/A"}</span>
              </div>

              <div>
                <span className="Flabel">Email</span>
                <span className="Fvalue Femail-link">
                  {staffData?.email || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="Finfo-section">
          <h3 className="Fsection-title">Personal Information</h3>

          <div className="Fgrid-layout">
            <div className="Finfo-group">
              <span className="Finfo-label">Full Name</span>
              <span className="Finfo-value">{fullName}</span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Email Address</span>
              <span className="Finfo-value Femail-link">
                {staffData?.email || "N/A"}
              </span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Gender</span>
              <span className="Finfo-value">{staffData?.gender || "N/A"}</span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Address</span>
              <span className="Finfo-value">{staffData?.address || "N/A"}</span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Date of Birth</span>
              <span className="Finfo-value">
                {staffData?.dateOfBirth || "N/A"}
              </span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Nationality</span>
              <span className="Finfo-value">
                {staffData?.nationality || "N/A"}
              </span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Phone Number</span>
              <span className="Finfo-value">
                {staffData?.phoneNumber || "N/A"}
              </span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Status</span>
              <span className="Finfo-value">
                {staffData?.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Marital Status</span>
              <span className="Finfo-value">
                {staffData?.maritalStatus || "N/A"}
              </span>
            </div>
          </div>
        </section>

        <section className="Finfo-section">
          <h3 className="Fsection-title">Teaching Information</h3>

          <div className="Fgrid-layout">
            <div className="Finfo-group">
              <span className="Finfo-label">Staff Type</span>
              <span className="Finfo-value">
                {staffData?.staffType || "N/A"}
              </span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Assigned Subjects</span>
              <span className="Finfo-value">
                {Array.isArray(staffData?.subjectAssigned)
                  ? staffData?.subjectAssigned.join(", ")
                  : staffData?.subjectAssigned || "N/A"}
              </span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Class Teacher Of</span>
              <span className="Finfo-value">
                {staffData?.classAssigned || "N/A"}
              </span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Teaching Type</span>
              <span className="Finfo-value">
                {staffData?.teachingType || "N/A"}
              </span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Classes To Teach</span>
              <span className="Finfo-value">
                {staffData?.classesToTeach || "N/A"}
              </span>
            </div>

            <div className="Finfo-group">
              <span className="Finfo-label">Total Students</span>
              <span className="Finfo-value">
                {staffData?.totalStudents || 0}
              </span>
            </div>
          </div>
        </section>

        <div className="Faction-buttons">
          <button className="Fbtn-edit">
            <span className="Ficon-edit">✏️</span> Edit Staff
          </button>

          <button className="Fbtn-delete">
            <span className="Ficon-delete">🗑️</span> Delete Staff
          </button>
        </div>
      </main>
    </div>
  );
};

export default StaffDetails;
