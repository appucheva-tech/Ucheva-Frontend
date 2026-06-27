import React, { useEffect, useState } from "react";
import "./AdminStudentDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../config/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Your three state components ───────────────────────────────────────────────
import LoadingScreen from "../../components/Loading-Screen"; // adjust path
import ErrorScreen from "../../components/Error-Screen"; // adjust path
import EmptyState from "../../components/EmptyState";

const StudentDetails = () => {
  const nav = useNavigate();
  const { id } = useParams(); // expects route: /admin/student-details/:id
  const subdomain = window.location.hostname.split(".")[0];

  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Fetch single student ──────────────────────────────────────────────────
  const fetchStudent = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await apiClient.get(`/student/student/${id}`);
      setStudent(res.data?.student || res.data || null);
    } catch (error) {
      console.error("Failed to fetch student:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  // ── Delete student ────────────────────────────────────────────────────────
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await apiClient.delete(`/student/deletestudent/${id}`, {
        headers: { "x-tenant": subdomain },
      });
      toast.success("Student deleted successfully!");
      nav(-1);
    } catch (error) {
      console.error("Failed to delete student:", error);
      toast.error(error.response?.data?.message || "Failed to delete student.");
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  // ── Format date ───────────────────────────────────────────────────────────
  const formatDate = (dateString) => {
    if (!dateString) return "--";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ── Get initials for avatar ───────────────────────────────────────────────
  const getInitials = (name) => {
    if (!name) return "--";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isLoading) return <LoadingScreen />;

  // ── Error state ───────────────────────────────────────────────────────────
  if (hasError) {
    return (
      <ErrorScreen
        title="Student Record Unavailable"
        message="We couldn't load this student's details. Check your connection and try again."
        onRetry={fetchStudent}
      />
    );
  }

  // ── No data returned ──────────────────────────────────────────────────────
  if (!student) {
    return (
      <ErrorScreen
        title="Student Not Found"
        message="This student record doesn't exist or may have been deleted."
        onRetry={() => nav(-1)}
      />
    );
  }

  const fullName =
    student.fullName ||
    `${student.firstName || ""} ${student.lastName || ""}`.trim();

  const parentInfo = student.parent || student.guardian || {};

  return (
    <div className="Jcontainer">
      {/* ── Header ── */}
      <div className="Jheader">
        <h1 className="Jtitle">Student Details</h1>
        <div className="Jbreadcrumb">
          <span className="JStudentManager" onClick={() => nav(-1)}>
            Student Management
          </span>
          <span className="Jseparator">&gt;</span>
          <span className="Jactive">Student Details</span>
        </div>
      </div>

      {/* ── Profile card ── */}
      <div className="JprofileCard">
        <div className="Javatar">
          {student.studentUrl || student.avatar || student.photo ? (
            <img
              src={student.studentUrl || student.avatar || student.photo}
              alt={fullName}
              style={{ width: "72px", height: "72px", borderRadius: "50%" }}
            />
          ) : (
            getInitials(fullName)
          )}
        </div>
        <div className="JprofileMeta">
          <h2 className="JstudentName">{fullName}</h2>
          <div className="JmetaGrid">
            <div className="JmetaItem">
              <span className="JmetaLabel">Admission No.</span>
              <span className="JmetaValue">
                {student.admissionNumber || student.admissionNo || "--"}
              </span>
            </div>
            <div className="JmetaItem">
              <span className="JmetaLabel">Class</span>
              <span className="JmetaValue">
                {student.className || student.class || "--"}
              </span>
            </div>
            <div className="JmetaItem">
              <span className="JmetaLabel">Age</span>
              <span className="JmetaValue">
                {student.age ? `${student.age} years old` : "--"}
              </span>
            </div>
            <div className="JmetaItem">
              <span className="JmetaLabel">Gender</span>
              <span className="JmetaValue">{student.gender || "--"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Personal information ── */}
      <div className="JinfoBlock">
        <div className="JblockHeader">Personal Information</div>
        <div className="JblockContent">
          <div className="JinfoGrid">
            <div className="JinfoRow">
              <span className="JinfoLabel">Full Name</span>
              <span className="JinfoValue">{fullName}</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Admission No.</span>
              <span className="JinfoValue">
                {student.admissionNumber || student.admissionNo || "--"}
              </span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Gender</span>
              <span className="JinfoValue">{student.gender || "--"}</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Nationality</span>
              <span className="JinfoValue">{student.nationality || "--"}</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Date of Birth</span>
              <span className="JinfoValue">
                {formatDate(student.dateOfBirth || student.dob)}
              </span>
            </div>
            <div className="JinfoRow JspanFull">
              <span className="JinfoLabel">Address</span>
              <span className="JinfoValue">{student.address || "--"}</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Religion</span>
              <span className="JinfoValue">{student.religion || "--"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Class & department ── */}
      <div className="JinfoBlock">
        <div className="JblockHeader">
          Current Class & Department Information
        </div>
        <div className="JblockContent">
          <div className="JinfoGrid">
            <div className="JinfoRow">
              <span className="JinfoLabel">Class</span>
              <span className="JinfoValue">
                {student.className || student.class || "--"}
              </span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Class Teacher</span>
              <span className="JinfoValue">
                {student.classTeacher || student.teacherName || "--"}
              </span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Section</span>
              <span className="JinfoValue">{student.section || "--"}</span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Date Enrolled</span>
              <span className="JinfoValue">
                {formatDate(student.dateEnrolled || student.createdAt)}
              </span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Department</span>
              <span className="JinfoValue">{student.department || "--"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Parent / guardian ── */}
      <div className="JinfoBlock">
        <div className="JblockHeader">Parent/Guardian Information</div>
        <div className="JblockContent">
          <div className="JinfoGrid">
            <div className="JinfoRow">
              <span className="JinfoLabel">Full Name</span>
              <span className="JinfoValue">
                {parentInfo.fullName || parentInfo.name || "--"}
              </span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Phone Number</span>
              <span className="JinfoValue">
                {parentInfo.phoneNumber || parentInfo.phone || "--"}
              </span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Relationship</span>
              <span className="JinfoValue">
                {parentInfo.relationship || student.parentRelationship || "--"}
              </span>
            </div>
            <div className="JinfoRow">
              <span className="JinfoLabel">Email Address</span>
              <span className="JinfoValue">
                {parentInfo.email || parentInfo.emailAddress || "--"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="Jactions">
        <button
          className="JbtnEdit"
          onClick={() => nav(`/admin/edit-student/${id}`)}
        >
          <span className="JbtnIcon">✏️</span> Edit Student
        </button>
        <button className="JbtnDelete" onClick={() => setIsDeleteOpen(true)}>
          <span className="JbtnIcon">🗑️</span> Delete Student
        </button>
      </div>

      {/* ── Delete confirmation modal ── */}
      {isDeleteOpen && (
        <div className="modalOverlay" onClick={() => setIsDeleteOpen(false)}>
          <div
            className="modalContent deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHeader">
              <h2>Delete Student</h2>
              <button
                className="closeBtn"
                onClick={() => setIsDeleteOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ width: "18px", height: "18px" }}
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="modalBody">
              <p className="deleteWarningText">
                Are you sure you want to delete <strong>{fullName}</strong>?
                This action cannot be undone.
              </p>
            </div>
            <div className="modalFooter">
              <button
                className="cancelBtn"
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </button>
              <button
                className="confirmDeleteBtn"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
