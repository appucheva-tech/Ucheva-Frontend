import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./BursaryAnnouncement.css";
import { apiClient } from "../../../config/AxiosInstance";

const SubjectTeacherAnnouncement = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);

    try {
      const response = await apiClient.get("/announcement/getAllAnnouncements");
      setAnnouncements(response.data?.announcements || []);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Unable to load announcements.";
      toast.error(errorMessage);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  const filters = [
    { key: "all", label: "All", count: announcements.length },
    {
      key: "unread",
      label: "Unread",
      count: announcements.filter((a) => !a.read).length,
    },
    {
      key: "read",
      label: "Read",
      count: announcements.filter((a) => a.read).length,
    },
  ];

  const getFilteredAnnouncements = () => {
    if (activeFilter === "unread") {
      return announcements.filter((a) => !a.read);
    }
    if (activeFilter === "read") {
      return announcements.filter((a) => a.read);
    }
    return announcements;
  };

  const filteredAnnouncements = getFilteredAnnouncements();

  return (
    <>
      <ToastContainer />

      <div className="SubjectTeacher-announcement-container">
        <div className="SubjectTeacher-announcement-header">
          <h1 className="SubjectTeacher-announcement-title">Announcements</h1>
          <p className="SubjectTeacher-announcement-subtitle">
            Stay updated with school notices and updates.
          </p>
        </div>

        <div className="SubjectTeacher-announcement-filters">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`SubjectTeacher-filter-tab ${activeFilter === filter.key ? "SubjectTeacher-active" : ""}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        <div className="SubjectTeacher-announcements-list">
          {loading ? (
            <div className="SubjectTeacher-announcement-loading">
              Loading announcements...
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="empty-state-container">
              <div className="mailbox-illustration">
                {/* Antenna circles */}
                <div className="antenna antenna-left"></div>
                <div className="antenna antenna-right"></div>
                <div className="antenna-connector"></div>

                {/* Mailbox top (lid) */}
                <div className="mailbox-top"></div>

                {/* Mailbox body */}
                <div className="mailbox-body">
                  {/* Left eye */}
                  <div className="eye eye-left"></div>
                  {/* Right eye */}
                  <div className="eye eye-right"></div>
                  {/* Mouth */}
                  <div className="mouth"></div>
                </div>

                {/* Mailbox post/stand */}
                <div className="mailbox-stand"></div>
              </div>

              <div className="empty-state-content">
                <h1 className="empty-state-title">You're all caught up!</h1>
                <p className="empty-state-description">
                  {activeFilter === "all"
                    ? "No announcements available at the moment. Check back later."
                    : activeFilter === "unread"
                      ? "No unread announcements. You're all caught up!"
                      : "No read announcements yet. Start reading some announcements!"}
                </p>
              </div>
            </div>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="SubjectTeacher-announcement-card"
                onClick={() => handleAnnouncementClick(announcement)}
              >
                <div className="SubjectTeacher-announcement-content">
                  <h3 className="SubjectTeacher-announcement-card-title">
                    {announcement.announcementTitle}
                  </h3>
                  <p className="SubjectTeacher-announcement-card-description">
                    {announcement.announcementContent}
                  </p>
                  <div className="SubjectTeacher-announcement-meta">
                    <span className="SubjectTeacher-announcement-date">
                      📅 {new Date(announcement.createdAt).toLocaleDateString()}
                    </span>
                    <span className="SubjectTeacher-announcement-time">
                      🕐 {new Date(announcement.createdAt).toLocaleTimeString()}
                    </span>
                    <span className="SubjectTeacher-announcement-audience">
                      👥 Audience: {announcement.audience}
                    </span>
                  </div>
                </div>
                <div className="SubjectTeacher-announcement-arrow">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showModal && selectedAnnouncement && (
        <div
          className="SubjectTeacher-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="SubjectTeacher-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="SubjectTeacher-modal-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <div className="SubjectTeacher-modal-header">
              <div className="SubjectTeacher-modal-avatar">
                {selectedAnnouncement.announcementTitle?.charAt(0)}
              </div>

              <div className="SubjectTeacher-modal-info">
                <h3>School Administration</h3>

                <span>
                  {new Date(selectedAnnouncement.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="SubjectTeacher-modal-body">
              <h2>{selectedAnnouncement.announcementTitle}</h2>

              <p>{selectedAnnouncement.announcementContent}</p>

              <div className="SubjectTeacher-modal-footer">
                Audience: {selectedAnnouncement.audience}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectTeacherAnnouncement;
