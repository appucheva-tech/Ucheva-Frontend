import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../SecurityStyles/SecurityAnnouncement.css";
import { ApiClient } from "../../../config/AxiosInstance";

export default function SecurityAnnouncement() {
  const [activeTab, setActiveTab] = useState("all");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);

    try {
      const response = await ApiClient.get("/announcement/getAllAnnouncements");
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

  const visibleAnnouncements = announcements;

  return (
    <>
      <ToastContainer />

      <div className="security-announcement">
        <div className="announcement-header">
          <h1>Announcements</h1>
          <p>Stay updated with school notices and updates.</p>
        </div>

        <div className="announcement-tabs">
          <button
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All ({announcements.length})
          </button>

          <button
            className={`tab ${activeTab === "unread" ? "active" : ""}`}
            onClick={() => setActiveTab("unread")}
          >
            Unread (0)
          </button>

          <button
            className={`tab ${activeTab === "read" ? "active" : ""}`}
            onClick={() => setActiveTab("read")}
          >
            Read (0)
          </button>
        </div>

        <div className="announcement-list">
          {loading ? (
            <div className="announcement-loading">Loading announcements...</div>
          ) : visibleAnnouncements.length === 0 ? (
            <div className="empty-state-container">
              <div className="mailbox-illustration">
                <div className="antenna antenna-left"></div>
                <div className="antenna antenna-right"></div>
                <div className="antenna-connector"></div>

                <div className="mailbox-top"></div>

                <div className="mailbox-body">
                  <div className="eye eye-left"></div>
                  <div className="eye eye-right"></div>
                  <div className="mouth"></div>
                </div>

                <div className="mailbox-stand"></div>
              </div>

              <div className="empty-state-content">
                <h1 className="empty-state-title">You're all caught up!</h1>
                <p className="empty-state-description">
                  No new announcements at the moment. Check back later.
                </p>
              </div>
            </div>
          ) : (
            visibleAnnouncements.map((announcement) => (
              <div key={announcement.id} className="announcement-card">
                <div className="announcement-content">
                  <h2>{announcement.announcementTitle}</h2>

                  <p>{announcement.announcementContent}</p>

                  <div className="announcement-meta">
                    <span className="meta-item">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>

                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </span>

                    <span className="meta-item">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>

                      {announcement.sendOption}
                    </span>

                    <span className="meta-item">
                      Audience: {announcement.audience}
                    </span>
                  </div>

                  {announcement.scheduledTime && (
                    <div className="announcement-meta">
                      Scheduled:{" "}
                      {new Date(announcement.scheduledTime).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="announcement-arrow">
                  <svg
                    width="20"
                    height="20"
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
    </>
  );
}