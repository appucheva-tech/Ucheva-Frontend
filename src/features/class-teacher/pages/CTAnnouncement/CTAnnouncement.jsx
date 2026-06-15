// import React, { useState } from "react";
// import "./CTAnnouncement.css";
// import calendar from "../../../../assets/AnnounceCalendar.svg";
// import time from "../../../../assets/AnnounceTime.svg";

// const CTAnnouncement = () => {
//   const [activeFilter, setActiveFilter] = useState("all");

//   const announcements = [
//     {
//       id: 1,
//       title: "Staff Meeting Reminder",
//       description:
//         "All staff members are required to attend the meeting scheduled for Monday, 19th May 2026 by 2:00 PM in the school hall. Thank you.",
//       date: "May 18, 2026",
//       time: "8:30 AM",
//       read: true,
//     },
//     {
//       id: 2,
//       title: "Resumption of Normal Activities",
//       description:
//         "This is to inform all staff that the school will resume normal activities on Monday, 19th May 2026. Please be punctual.",
//       date: "May 15, 2026",
//       time: "4:45 PM",
//       read: true,
//     },
//     {
//       id: 3,
//       title: "Environmental Sanitation Exercise",
//       description:
//         "Weekly environmental sanitation exercise will hold on Saturday, 24th May 2026. All staff are expected to participate.",
//       date: "May 13, 2026",
//       time: "9:00 AM",
//       read: false,
//     },
//     {
//       id: 4,
//       title: "Emergency Closure Update",
//       description:
//         "Due to the forecasted heavy rainfall, the school will be closed on Tuesday, 20th May 2026 for safety purposes.",
//       date: "May 12, 2026",
//       time: "6:20 PM",
//       read: true,
//     },
//   ];

//   const filters = [
//     { key: "all", label: "All", count: 12 },
//     { key: "unread", label: "Unread", count: 2 },
//     { key: "read", label: "Read", count: 1 },
//   ];

//   const getFilteredAnnouncements = () => {
//     if (activeFilter === "unread") {
//       return announcements.filter((a) => !a.read);
//     }
//     if (activeFilter === "read") {
//       return announcements.filter((a) => a.read);
//     }
//     return announcements;
//   };

//   const filteredAnnouncements = getFilteredAnnouncements();

//   return (
//     <div className="CT-announcement-container">
//       <div className="CT-announcement-header">
//         <h1 className="CT-announcement-title">Announcements</h1>
//         <p className="CT-announcement-subtitle">
//           Stay updated with school notices and updates.
//         </p>
//       </div>

//       <div className="CT-announcement-filters">
//         {filters.map((filter) => (
//           <button
//             key={filter.key}
//             className={`CT-filter-tab ${
//               activeFilter === filter.key ? "CT-active" : ""
//             }`}
//             onClick={() => setActiveFilter(filter.key)}
//           >
//             {filter.label} ({filter.count})
//           </button>
//         ))}
//       </div>

//       <div className="CT-announcements-list">
//         {filteredAnnouncements.map((announcement) => (
//           <div key={announcement.id} className="CT-announcement-card">
//             <div className="CT-announcement-content">
//               <h3 className="CT-announcement-card-title">
//                 {announcement.title}
//               </h3>

//               <p className="CT-announcement-card-description">
//                 {announcement.description}
//               </p>

//               <div className="CT-announcement-meta">
//                 <span className="CT-announcement-date">
//                   <img src={calendar} alt="" /> {announcement.date}
//                 </span>

//                 <span className="CT-announcement-time">
//                   <img src={time} alt="" /> {announcement.time}
//                 </span>
//               </div>
//             </div>

//             <div className="CT-announcement-arrow">
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <polyline points="9 18 15 12 9 6"></polyline>
//               </svg>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CTAnnouncement;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CTAnnouncement.css";
import calendar from "../../../../assets/AnnounceCalendar.svg";
import time from "../../../../assets/AnnounceTime.svg";

const CTAnnouncement = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_Base_Url;

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${baseUrl}/announcement/getAllAnnouncements`,
        );
        const data = res?.data;

        const formatted = (data.announcements || []).map((item) => ({
          id: item.id,
          title: item.announcementTitle,
          content: item.announcementContent,
          date: new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          time: new Date(item.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setAnnouncements(formatted);
        console.log(res);
      } catch (err) {
        setError("Failed to load announcements");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements;

  const filters = [
    { key: "all", label: "All", count: announcements.length },
    { key: "unread", label: "Unread", count: 0 },
    { key: "read", label: "Read", count: 0 },
  ];

  if (loading) return <div className="CT-loading">Loading...</div>;
  if (error) return <div className="CT-error">{error}</div>;

  return (
    <div className="CT-announcement-container">
      <h2>Announcements</h2>
      <p>Stay updated with school notices and updates.</p>

      {/* LIST */}
      <div className="CT-announcements-list">
        {filteredAnnouncements.map((item) => (
          <div
            key={item.id}
            className="CT-announcement-card"
            onClick={() => setSelectedAnnouncement(item)}
          >
            <div className="CT-announcement-content">
              <h3>{item.title}</h3>

              <p className="CT-preview">
                {item.content.length > 120
                  ? item.content.slice(0, 120) + "..."
                  : item.content}
              </p>

              <div className="CT-announcement-meta">
                <span>
                  <img src={calendar} alt="" /> {item.date}
                </span>

                <span>
                  <img src={time} alt="" /> {item.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedAnnouncement && (
        <div
          className="CT-modal-overlay"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div className="CT-modal" onClick={(e) => e.stopPropagation()}>
            {/* HEADER */}
            <div className="CT-modal-header">
              <div className="CT-modal-user">
                <div className="CT-avatar" />

                <div>
                  <h4>School Admin</h4>
                  <span>Admin</span>
                </div>
              </div>

              <div className="CT-modal-meta">
                <div>{selectedAnnouncement.date}</div>
                <div>{selectedAnnouncement.time}</div>
              </div>

              <button
                className="CT-modal-close"
                onClick={() => setSelectedAnnouncement(null)}
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="CT-modal-body">
              <h2 className="CT-modal-title">{selectedAnnouncement.title}</h2>

              <p className="CT-modal-content">{selectedAnnouncement.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CTAnnouncement;
