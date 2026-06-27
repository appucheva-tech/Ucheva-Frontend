import React, { useState, useEffect, useRef } from "react";
import "./AdminAnnouncement.css";
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { apiClient } from "../../config/AxiosInstance";

// ── Your three state components ───────────────────────────────────────────────
import LoadingScreen from "../../components/Loading-Screen";     // adjust path
import ErrorScreen from "../../components/Error-Screen";         // adjust path
import EmptyState from "../../components/EmptyState";           // adjust path

const AdminAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [stats, setStats] = useState({
    drafts: 0,
    scheduled: 0,
    templates: 0,
    sent: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    audience: "all",
    status: "draft",
    scheduledAt: "",
    saveAsTemplate: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const panelRef = useRef(null);

  const categories = ["all", "drafts", "scheduled", "template", "sent"];

  useEffect(() => {
    fetchAnnouncements();
  }, [activeTab, searchTerm, pagination.page]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        if (event.target.closest(".slide-panel-overlay")) closePanel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchAnnouncements = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const params = {
        tab: activeTab,
        page: pagination.page,
        limit: pagination.limit,
      };
      if (searchTerm.trim()) params.search = searchTerm.trim();

      const response = await apiClient.get("/announcement/dashboard", { params });

      if (response.data?.announcementDashboard) {
        const dashboard = response.data.announcementDashboard;
        setAnnouncements(dashboard.announcements || []);

        if (dashboard.cards) {
          setStats({
            drafts:    dashboard.cards.draft?.value     || 0,
            scheduled: dashboard.cards.scheduled?.value || 0,
            templates: dashboard.cards.templates?.value || 0,
            sent:      dashboard.cards.sent?.value      || 0,
          });
        }

        if (dashboard.pagination) {
          setPagination((prev) => ({
            ...prev,
            total: dashboard.pagination.total || 0,
            page:  dashboard.pagination.page  || 1,
            limit: dashboard.pagination.limit || 10,
          }));
        }
      }
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", hour12: true,
    });
  };

  const getStatusType  = (s) => ["draft","scheduled","template","sent"].includes(s) ? s : "draft";
  const getStatusLabel = (s) => ({ draft: "Draft", scheduled: "Scheduled", template: "Template", sent: "Sent" }[s] || s);

  // ── Form handlers ─────────────────────────────────────────────────────────
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAudienceChange = (audience) => setFormData((prev) => ({ ...prev, audience }));
  const handleStatusChange   = (status)   => setFormData((prev) => ({ ...prev, status }));

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim())   errors.title   = "Title is required";
    if (!formData.content.trim()) errors.content = "Message content is required";
    if (formData.status === "scheduled" && !formData.scheduledAt)
      errors.scheduledAt = "Scheduled date and time is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        title:    formData.title.trim(),
        content:  formData.content.trim(),
        audience: formData.audience,
        status:   formData.status,
      };
      if (formData.status === "scheduled" && formData.scheduledAt)
        payload.scheduledAt = new Date(formData.scheduledAt).toISOString();

      if (editingAnnouncement) {
        await apiClient.put(`/announcement/${editingAnnouncement.id}`, payload);
      } else {
        await apiClient.post("/announcement", payload);
      }
      await fetchAnnouncements();
      closePanel();
    } catch (err) {
      console.error("Error saving announcement:", err);
      setFormErrors({
        submit: err.response?.data?.message || "Failed to save announcement. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openPanel = () => {
    setEditingAnnouncement(null);
    resetForm();
    setIsCreatePanelOpen(true);
    document.body.style.overflow = "hidden";
  };

  const openEditPanel = (announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title:          announcement.title      || "",
      content:        announcement.content    || "",
      audience:       announcement.audience   || "all",
      status:         announcement.status     || "draft",
      scheduledAt:    announcement.scheduledAt ? announcement.scheduledAt.slice(0, 16) : "",
      saveAsTemplate: announcement.status === "template",
    });
    setIsCreatePanelOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePanel = () => {
    setIsCreatePanelOpen(false);
    document.body.style.overflow = "auto";
    setEditingAnnouncement(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", audience: "all", status: "draft", scheduledAt: "", saveAsTemplate: false });
    setFormErrors({});
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) =>
    setPagination((prev) => ({ ...prev, page: newPage }));

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await apiClient.delete(`/announcement/${id}`);
      await fetchAnnouncements();
    } catch (err) {
      console.error("Error deleting announcement:", err);
      alert("Failed to delete announcement. Please try again.");
    }
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  // ── Empty state message varies by tab and search ──────────────────────────
  const emptyTitle = searchTerm
    ? "No Results Found"
    : activeTab === "all"
    ? "No Announcements Yet"
    : `No ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Announcements`;

  const emptyMessage = searchTerm
    ? `No announcements match "${searchTerm}". Try a different search term.`
    : activeTab === "all"
    ? "You haven't created any announcements yet. Use the button above to get started."
    : `You have no ${activeTab} announcements. Create one to see it here.`;

  return (
    <>
      {/* ── Header + metrics ── */}
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="welcome-text">
            <h1 className="Announce">Announcements</h1>
            <button className="AnnouncementsBtn" onClick={openPanel}>
              + Create Announcement
            </button>
          </div>
          <p className="subtitle-text">
            Create and manage messages for staff and parents.
          </p>
        </header>

        <div className="metrics-grid">
          <div className="metric-card card-drafts">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Drafts</span>
                <span className="card-value">{stats.drafts}</span>
              </div>
              <div className="icon-wrapper icon-drafts">
                <PiStudentFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer">Not yet sent</div>
          </div>

          <div className="metric-card card-scheduled">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Scheduled</span>
                <span className="card-value">{stats.scheduled}</span>
              </div>
              <div className="icon-wrapper icon-scheduled">
                <HiMiniUserGroup className="DashIcon" />
              </div>
            </div>
            <div className="card-footer">Upcoming Messages</div>
          </div>

          <div className="metric-card card-templates">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Templates</span>
                <span className="card-value">{stats.templates}</span>
              </div>
              <div className="icon-wrapper icon-templates">
                <PiCalendarBlankFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer">Reusable Messages</div>
          </div>

          <div className="metric-card card-sent">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Sent</span>
                <span className="card-value">{stats.sent}</span>
              </div>
              <div className="icon-wrapper icon-sent">
                <FaSackDollar className="DashIcon" />
              </div>
            </div>
            <div className="card-footer">Sent Successfully</div>
          </div>
        </div>
      </div>

      {/* ── Announcements list ── */}
      <div className="announcementsContainer">
        {/* Tabs + search always visible so user can switch tabs or clear search */}
        <div className="topNavbar">
          <div className="tabGroup">
            {categories.map((category) => (
              <button
                key={category}
                className={`tabButton ${activeTab === category ? "activeTab" : ""}`}
                onClick={() => handleTabChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {category !== "all" && (
                  <span className="tabCount">
                    {category === "drafts"    ? stats.drafts
                    : category === "scheduled" ? stats.scheduled
                    : category === "template"  ? stats.templates
                    : category === "sent"      ? stats.sent
                    : 0}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="searchBoxWrapper">
            <input
              type="text"
              placeholder="Search announcements..."
              className="searchInput"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg className="searchIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {/* ── States ── */}
        {isLoading ? (
          <LoadingScreen />
        ) : hasError ? (
          <ErrorScreen
            title="Announcements Unavailable"
            message="We couldn't load your announcements. Check your connection and try again."
            onRetry={fetchAnnouncements}
          />
        ) : announcements.length === 0 ? (
          <EmptyState
            title={emptyTitle}
            message={emptyMessage}
            actionText="Create Announcement"
            onAction={openPanel}
          />
        ) : (
          <>
            <div className="resultCount">
              Showing {announcements.length} announcement
              {announcements.length !== 1 ? "s" : ""}
              {pagination.total > 0 && ` of ${pagination.total}`}
            </div>

            <div className="cardsList">
              {announcements.map((item) => (
                <div
                  key={item.id}
                  className={`announcementCard border-${getStatusType(item.status)}`}
                >
                  <div className="cardHeader">
                    <h3 className="cardTitle">{item.title}</h3>
                    <div className="cardActions">
                      <button className="editButton" onClick={() => openEditPanel(item)} aria-label="Edit">
                        <FaEdit />
                      </button>
                      <button className="deleteButton" onClick={() => handleDelete(item.id)} aria-label="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="cardContent">{item.content}</p>
                  <div className="cardFooter">
                    <span className="metaItem">
                      <svg className="metaIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8"  y1="2" x2="8"  y2="6" />
                        <line x1="3"  y1="10" x2="21" y2="10" />
                      </svg>
                      {item.displayDate ? formatDate(item.displayDate) : formatDate(item.createdAt)}
                    </span>
                    <span className="metaItem">
                      <svg className="metaIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {item.displayTime || formatTime(item.createdAt)}
                    </span>
                    <span className={`statusBadge ${getStatusType(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="paginationBtn"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  Previous
                </button>
                <span className="paginationInfo">
                  Page {pagination.page} of {totalPages}
                </span>
                <button
                  className="paginationBtn"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <div className="legendBox">
          <div className="legendItem"><span className="indicatorDot dot-draft"></span><span className="legendLabel">Draft</span></div>
          <div className="legendItem"><span className="indicatorDot dot-scheduled"></span><span className="legendLabel">Scheduled</span></div>
          <div className="legendItem"><span className="indicatorDot dot-template"></span><span className="legendLabel">Template</span></div>
          <div className="legendItem"><span className="indicatorDot dot-sent"></span><span className="legendLabel">Sent</span></div>
        </div>

        <footer className="footerView">
          <span className="copyright">
            © {new Date().getFullYear()} Ucheva school operating management system. All rights reserved.
          </span>
          <span className="support">
            Need help?{" "}
            <a href="#support" className="supportLink">Contact support</a>
          </span>
        </footer>
      </div>

      {/* ── Slide panel ── */}
      <div
        className={`slide-panel-overlay ${isCreatePanelOpen ? "active" : ""}`}
        onClick={closePanel}
      >
        <div
          className={`slide-panel ${isCreatePanelOpen ? "active" : ""}`}
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="panel-header">
            <div className="panel-title-section">
              <h2>{editingAnnouncement ? "Edit Announcement" : "Create Announcement"}</h2>
              <p className="panel-subtitle">
                {editingAnnouncement
                  ? "Update your announcement details below."
                  : "Send updates and notices to parents, staff, or students."}
              </p>
            </div>
            <button className="panel-close-btn" onClick={closePanel}>
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="panel-form">
            <div className="form-group">
              <label className="form-label">Announcement Title</label>
              <input
                type="text"
                name="title"
                className={`form-input ${formErrors.title ? "error" : ""}`}
                placeholder="Enter announcement title"
                value={formData.title}
                onChange={handleFormChange}
              />
              {formErrors.title && <span className="form-error">{formErrors.title}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                name="content"
                className={`form-textarea ${formErrors.content ? "error" : ""}`}
                placeholder="Type your message here..."
                value={formData.content}
                onChange={handleFormChange}
                rows="4"
              />
              {formErrors.content && <span className="form-error">{formErrors.content}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Audience Selection</label>
              <p className="form-hint">Choose who will receive this announcement.</p>
              <div className="audience-options">
                {["parents", "staff", "students", "all"].map((audience) => (
                  <label key={audience} className="audience-option">
                    <input
                      type="radio"
                      name="audience"
                      value={audience}
                      checked={formData.audience === audience}
                      onChange={() => handleAudienceChange(audience)}
                    />
                    <span>{audience.charAt(0).toUpperCase() + audience.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Send Options</label>
              <p className="form-hint">Choose when to send this announcement.</p>
              <div className="send-options">
                {[
                  { value: "draft",     title: "Save as Draft",      desc: "Save this announcement as a draft." },
                  { value: "sent",      title: "Send Immediately",   desc: "Send this announcement right away." },
                  { value: "scheduled", title: "Schedule for Later", desc: "Choose a date and time to send." },
                ].map(({ value, title, desc }) => (
                  <label key={value} className="send-option">
                    <input
                      type="radio"
                      name="status"
                      value={value}
                      checked={formData.status === value}
                      onChange={() => handleStatusChange(value)}
                    />
                    <div className="send-option-content">
                      <span className="send-option-title">{title}</span>
                      <span className="send-option-desc">{desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              {formData.status === "scheduled" && (
                <div className="schedule-picker">
                  <input
                    type="datetime-local"
                    name="scheduledAt"
                    className={`form-input ${formErrors.scheduledAt ? "error" : ""}`}
                    value={formData.scheduledAt}
                    onChange={handleFormChange}
                  />
                  {formErrors.scheduledAt && <span className="form-error">{formErrors.scheduledAt}</span>}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Template Options</label>
              <label className="template-option">
                <input
                  type="checkbox"
                  name="saveAsTemplate"
                  checked={formData.saveAsTemplate}
                  onChange={handleFormChange}
                />
                <span>Save as Template</span>
              </label>
            </div>

            {formErrors.submit && (
              <div className="form-error-submit">{formErrors.submit}</div>
            )}

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={closePanel}>Cancel</button>
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : editingAnnouncement
                  ? "Update Announcement"
                  : "Create Announcement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAnnouncement;