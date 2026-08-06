import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../SecurityStyles/SecurityAnnouncement.css";
import { apiClient } from "../../../config/AxiosInstance";

const SecurityAnnouncement = () => {
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

      <div className="security-announcement">
        <div className="security-announcement-header">
          <h1 className="security-announcement-title">Announcements</h1>
          <p className="security-announcement-subtitle">
            Stay updated with school notices and updates.
          </p>
        </div>

        <div className="security-announcement-filters">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`security-filter-tab ${activeFilter === filter.key ? "security-active" : ""}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        <div className="security-announcements-list">
          {loading ? (
            <div className="security-announcement-loading">
              Loading announcements...
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="empty-state-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="235"
                height="247"
                viewBox="0 0 235 247"
                fill="none"
              >
                <path
                  d="M117.237 246.379C181.974 246.379 234.474 194.274 234.474 129.932C234.474 65.5896 181.974 13.4844 117.237 13.4844C52.5 13.4844 0 65.5896 0 129.932C0 194.274 52.5 246.379 117.237 246.379Z"
                  fill="#F1F3FA"
                />
                <path
                  d="M207.043 114.742V185.992C207.043 200.795 195.003 212.834 180.003 212.834H54.8715C40.0689 212.834 28.0294 200.992 27.832 186.19C27.832 185.992 27.832 185.992 27.832 185.795V114.742C27.832 114.545 27.832 114.545 27.832 114.347C27.832 113.953 27.832 113.558 28.0294 113.163C28.2268 112.571 28.4241 112.176 28.6215 111.584L62.1741 47.4396C63.3583 44.8738 65.9241 43.4922 68.6873 43.4922H165.99C168.753 43.4922 171.121 44.8738 172.503 47.4396L206.056 111.584C206.253 111.979 206.45 112.571 206.648 113.163C207.043 113.558 207.043 114.15 207.043 114.742Z"
                  fill="#D5DAE5"
                />
                <g filter="url(#filter0_d_1434_12424)">
                  <path
                    d="M207.043 114.731V193.284C207.043 204.139 198.358 212.823 187.306 212.823H47.5689C36.7136 212.823 27.832 204.139 27.832 193.284V114.337C27.832 113.942 27.832 113.547 28.0294 113.152H73.0294C79.7399 113.152 85.2662 118.481 85.2662 125.389C85.2662 128.744 86.6478 131.902 88.8189 134.073C91.1873 136.442 93.9504 137.626 97.5031 137.626H137.569C144.279 137.626 149.806 132.297 149.806 125.389C149.806 122.034 151.187 118.876 153.358 116.705C155.727 114.337 158.49 113.152 161.845 113.152H206.648C207.043 113.547 207.043 114.139 207.043 114.731Z"
                    fill="url(#paint0_linear_1434_12424)"
                  />
                </g>
                <path
                  d="M166.819 19.7461C169.395 47.8655 170.682 54.305 164.851 79.771C162.954 85.4326 161.058 91.6334 156.993 95.947C151.304 102.687 141.008 105.653 132.609 103.496C123.939 101.339 116.895 93.7902 115.27 84.6238C113.915 78.9622 115.811 72.2222 120.688 68.7174C125.836 65.4822 133.151 66.291 137.486 70.335C142.363 74.379 144.26 80.5798 143.989 86.511C143.718 92.4422 141.55 98.3734 138.57 103.496C131.833 116.091 129.059 116.045 115.27 136.731"
                  stroke="#AAB2C5"
                  stroke-width="0.75"
                  stroke-miterlimit="10"
                  stroke-dasharray="1.5 1.5"
                />
                <path
                  d="M181.933 9.27C180.903 13.0275 176.784 14.3939 172.664 12.0027C168.202 9.95318 165.112 8.24523 165.799 4.82932C166.828 1.41341 170.948 1.07182 175.754 0.730231C181.59 0.0470499 182.619 5.5125 181.933 9.27Z"
                  fill="#D5DAE5"
                />
                <path
                  d="M148.627 12.6827C150.344 15.757 155.15 17.8065 158.582 14.7322C162.359 11.3163 165.448 8.92518 163.732 5.50927C162.015 2.43496 159.269 3.45973 153.433 4.14291C148.627 5.16768 146.568 9.26677 148.627 12.6827Z"
                  fill="#D5DAE5"
                />
                <path
                  d="M163.729 0.0523125C166.132 -0.289278 168.535 1.07708 169.221 3.12663C169.565 3.80981 169.908 4.83458 169.908 5.51776C170.594 10.3 168.878 14.3991 166.132 14.7407C163.042 15.4239 159.953 12.008 159.609 7.56731C159.609 6.20094 159.609 5.51776 159.609 4.49299C159.953 2.10186 161.326 0.393903 163.729 0.0523125C164.072 0.0523125 163.729 0.0523125 163.729 0.0523125Z"
                  fill="#AAB2C5"
                />
                <path
                  d="M94.9169 165.978C97.4178 165.978 99.4451 163.951 99.4451 161.45C99.4451 158.949 97.4178 156.922 94.9169 156.922C92.416 156.922 90.3887 158.949 90.3887 161.45C90.3887 163.951 92.416 165.978 94.9169 165.978Z"
                  fill="#AAB2C5"
                />
                <path
                  d="M139.954 165.978C142.455 165.978 144.482 163.951 144.482 161.45C144.482 158.949 142.455 156.922 139.954 156.922C137.453 156.922 135.426 158.949 135.426 161.45C135.426 163.951 137.453 165.978 139.954 165.978Z"
                  fill="#AAB2C5"
                />
                <path
                  d="M124.786 195.722H110.589C108.387 195.722 106.551 193.886 106.551 191.683C106.551 189.48 108.387 187.645 110.589 187.645H124.664C126.867 187.645 128.702 189.48 128.702 191.683C128.825 193.886 126.989 195.722 124.786 195.722Z"
                  fill="#AAB2C5"
                />
                <defs>
                  <filter
                    id="filter0_d_1434_12424"
                    x="19.582"
                    y="109.027"
                    width="195.711"
                    height="116.172"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4.125" />
                    <feGaussianBlur stdDeviation="4.125" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1434_12424"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1434_12424"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_1434_12424"
                    x1="117.379"
                    y1="110.847"
                    x2="117.379"
                    y2="213.898"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FDFEFF" />
                    <stop offset="0.9964" stop-color="#ECF0F5" />
                  </linearGradient>
                </defs>
              </svg>
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
                key={announcement.id || announcement._id}
                className="security-announcement-card"
                onClick={() => handleAnnouncementClick(announcement)}
              >
                <div className="security-announcement-content">
                  <h3 className="security-announcement-card-title">
                    {announcement.announcementTitle || announcement.title}
                  </h3>
                  <p className="security-announcement-card-description">
                    {announcement.announcementContent ||
                      announcement.content ||
                      announcement.description}
                  </p>
                  <div className="security-announcement-meta">
                    <span className="security-announcement-date">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M11.0827 2.33268H9.91602V1.74935C9.91602 1.59464 9.85456 1.44627 9.74516 1.33687C9.63577 1.22747 9.48739 1.16602 9.33268 1.16602C9.17797 1.16602 9.0296 1.22747 8.9202 1.33687C8.81081 1.44627 8.74935 1.59464 8.74935 1.74935V2.33268H5.24935V1.74935C5.24935 1.59464 5.18789 1.44627 5.07849 1.33687C4.9691 1.22747 4.82073 1.16602 4.66602 1.16602C4.51131 1.16602 4.36293 1.22747 4.25354 1.33687C4.14414 1.44627 4.08268 1.59464 4.08268 1.74935V2.33268H2.91602C2.45189 2.33268 2.00677 2.51706 1.67858 2.84525C1.35039 3.17343 1.16602 3.61855 1.16602 4.08268V11.0827C1.16602 11.5468 1.35039 11.9919 1.67858 12.3201C2.00677 12.6483 2.45189 12.8327 2.91602 12.8327H11.0827C11.5468 12.8327 11.9919 12.6483 12.3201 12.3201C12.6483 11.9919 12.8327 11.5468 12.8327 11.0827V4.08268C12.8327 3.61855 12.6483 3.17343 12.3201 2.84525C11.9919 2.51706 11.5468 2.33268 11.0827 2.33268ZM11.666 11.0827C11.666 11.2374 11.6046 11.3858 11.4952 11.4952C11.3858 11.6046 11.2374 11.666 11.0827 11.666H2.91602C2.76131 11.666 2.61293 11.6046 2.50354 11.4952C2.39414 11.3858 2.33268 11.2374 2.33268 11.0827V6.99935H11.666V11.0827ZM11.666 5.83268H2.33268V4.08268C2.33268 3.92797 2.39414 3.7796 2.50354 3.6702C2.61293 3.56081 2.76131 3.49935 2.91602 3.49935H4.08268V4.08268C4.08268 4.23739 4.14414 4.38577 4.25354 4.49516C4.36293 4.60456 4.51131 4.66602 4.66602 4.66602C4.82073 4.66602 4.9691 4.60456 5.07849 4.49516C5.18789 4.38577 5.24935 4.23739 5.24935 4.08268V3.49935H8.74935V4.08268C8.74935 4.23739 8.81081 4.38577 8.9202 4.49516C9.0296 4.60456 9.17797 4.66602 9.33268 4.66602C9.48739 4.66602 9.63577 4.60456 9.74516 4.49516C9.85456 4.38577 9.91602 4.23739 9.91602 4.08268V3.49935H11.0827C11.2374 3.49935 11.3858 3.56081 11.4952 3.6702C11.6046 3.7796 11.666 3.92797 11.666 4.08268V5.83268Z"
                          fill="#9DA4AE"
                        />
                      </svg>{" "}
                      {new Date(
                        announcement.createdAt || announcement.date,
                      ).toLocaleDateString()}
                    </span>
                    <span className="security-announcement-time">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1243_10117)">
                          <path
                            d="M6.99935 12.8327C10.2211 12.8327 12.8327 10.2211 12.8327 6.99935C12.8327 3.7776 10.2211 1.16602 6.99935 1.16602C3.7776 1.16602 1.16602 3.7776 1.16602 6.99935C1.16602 10.2211 3.7776 12.8327 6.99935 12.8327Z"
                            stroke="#9DA4AE"
                            stroke-width="1.2"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.00195 3.5V7.00292L9.47499 9.47625"
                            stroke="#9DA4AE"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1243_10117">
                            <rect width="14" height="14" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>{" "}
                      {new Date(
                        announcement.createdAt || announcement.date,
                      ).toLocaleTimeString()}
                    </span>
                    <span className="security-announcement-audience">
                      👥 Audience: {announcement.audience || "All"}
                    </span>
                  </div>
                </div>
                <div className="security-announcement-arrow">
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
          className="security-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div className="security-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="security-modal-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <div className="security-modal-header">
              <div className="security-modal-avatar">
                {(
                  selectedAnnouncement.announcementTitle ||
                  selectedAnnouncement.title ||
                  "A"
                ).charAt(0)}
              </div>

              <div className="security-modal-info">
                <h3>School Administration</h3>

                <span>
                  {new Date(
                    selectedAnnouncement.createdAt || selectedAnnouncement.date,
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="security-modal-body">
              <h2>
                {selectedAnnouncement.announcementTitle ||
                  selectedAnnouncement.title}
              </h2>

              <p>
                {selectedAnnouncement.announcementContent ||
                  selectedAnnouncement.content ||
                  selectedAnnouncement.description}
              </p>

              <div className="security-modal-footer">
                Audience: {selectedAnnouncement.audience || "All"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecurityAnnouncement;
