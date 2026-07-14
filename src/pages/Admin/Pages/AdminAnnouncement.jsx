import React, { useState, useEffect, useRef } from "react";
import "./AdminAnnouncement.css";
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import {
  FaTimes,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";
import { apiClient } from "../../../config/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Your three state components ───────────────────────────────────────────────
import LoadingScreen from "../../../components/Loading-Screen";
import ErrorScreen from "../../../components/Error-Screen";
import EmptyState from "../../../components/EmptyState";

const AdminAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    announcementId: null,
    announcementTitle: "",
    isDeleting: false,
  });
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
        if (event.target.closest(".Navy-slide-panel-overlay")) closePanel();
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

      const response = await apiClient.get("/announcement/dashboard", {
        params,
      });

      if (response.data?.announcementDashboard) {
        const dashboard = response.data.announcementDashboard;
        setAnnouncements(dashboard.announcements || []);

        if (dashboard.cards) {
          setStats({
            drafts: dashboard.cards.draft?.value || 0,
            scheduled: dashboard.cards.scheduled?.value || 0,
            templates: dashboard.cards.templates?.value || 0,
            sent: dashboard.cards.sent?.value || 0,
          });
        }

        if (dashboard.pagination) {
          setPagination((prev) => ({
            ...prev,
            total: dashboard.pagination.total || 0,
            page: dashboard.pagination.page || 1,
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
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusType = (s) =>
    ["draft", "scheduled", "template", "sent"].includes(s) ? s : "draft";
  const getStatusLabel = (s) =>
    ({
      draft: "Draft",
      scheduled: "Scheduled",
      template: "Template",
      sent: "Sent",
    })[s] || s;

  // ── Form handlers ─────────────────────────────────────────────────────────
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAudienceChange = (audience) =>
    setFormData((prev) => ({ ...prev, audience }));
  const handleStatusChange = (status) =>
    setFormData((prev) => ({ ...prev, status }));

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.content.trim())
      errors.content = "Message content is required";
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
        title: formData.title.trim(),
        content: formData.content.trim(),
        audience: formData.audience,
        status: formData.status,
      };
      if (formData.status === "scheduled" && formData.scheduledAt)
        payload.scheduledAt = new Date(formData.scheduledAt).toISOString();

      if (editingAnnouncement) {
        await apiClient.put(`/announcement/${editingAnnouncement.id}`, payload);
        toast.success("Announcement updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        await apiClient.post("/announcement", payload);
        toast.success("Announcement created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      await fetchAnnouncements();
      closePanel();
    } catch (err) {
      console.error("Error saving announcement:", err);
      toast.error(
        err.response?.data?.message || "Failed to save announcement.",
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setFormErrors({
        submit:
          err.response?.data?.message ||
          "Failed to save announcement. Please try again.",
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
      title: announcement.title || "",
      content: announcement.content || "",
      audience: announcement.audience || "all",
      status: announcement.status || "draft",
      scheduledAt: announcement.scheduledAt
        ? announcement.scheduledAt.slice(0, 16)
        : "",
      saveAsTemplate: announcement.status === "template",
    });
    setIsCreatePanelOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      announcementId: null,
      announcementTitle: "",
      isDeleting: false,
    });
  };
  const closePanel = () => {
    setIsCreatePanelOpen(false);
    document.body.style.overflow = "auto";
    setEditingAnnouncement(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      audience: "all",
      status: "draft",
      scheduledAt: "",
      saveAsTemplate: false,
    });
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
  const confirmDelete = async () => {
    const { announcementId } = deleteModal;
    if (!announcementId) return;

    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

    try {
      await apiClient.delete(`/announcement/${announcementId}`);
      await fetchAnnouncements();
      toast.success("Announcement deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting announcement:", err);
      toast.error(
        err.response?.data?.message || "Failed to delete announcement.",
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const handlePageChange = (newPage) =>
    setPagination((prev) => ({ ...prev, page: newPage }));

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;
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
      <div className="Navy-dashboard-container">
        <header className="Navy-dashboard-header">
          <div className="Navy-welcome-text">
            <h1 className="Navy-Announce">Announcements</h1>
            <button className="Navy-AnnouncementsBtn" onClick={openPanel}>
              + Create Announcement
            </button>
          </div>
          <p className="Navy-subtitle-text">
            Create and manage messages for staff and parents.
          </p>
        </header>

        <div className="Navy-metrics-grid">
          <div className="Navy-metric-card Navy-card-drafts">
            <div className="Navy-card-content">
              <div className="Navy-text-section">
                <span className="Navy-card-label">Drafts</span>
                <span className="Navy-card-value">{stats.drafts}</span>
              </div>
              <div className="Navy-icon-wrapper Navy-icon-drafts">
                <PiStudentFill className="Navy-DashIcon" />
              </div>
            </div>
            <div className="Navy-card-footer">Not yet sent</div>
          </div>

          <div className="Navy-metric-card Navy-card-scheduled">
            <div className="Navy-card-content">
              <div className="Navy-text-section">
                <span className="Navy-card-label">Scheduled</span>
                <span className="Navy-card-value">{stats.scheduled}</span>
              </div>
              <div className="Navy-icon-wrapper Navy-icon-scheduled">
                <HiMiniUserGroup className="Navy-DashIcon" />
              </div>
            </div>
            <div className="Navy-card-footer">Upcoming Messages</div>
          </div>

          <div className="Navy-metric-card Navy-card-templates">
            <div className="Navy-card-content">
              <div className="Navy-text-section">
                <span className="Navy-card-label">Templates</span>
                <span className="Navy-card-value">{stats.templates}</span>
              </div>
              <div className="Navy-icon-wrapper Navy-icon-templates">
                <PiCalendarBlankFill className="Navy-DashIcon" />
              </div>
            </div>
            <div className="Navy-card-footer">Reusable Messages</div>
          </div>

          <div className="Navy-metric-card Navy-card-sent">
            <div className="Navy-card-content">
              <div className="Navy-text-section">
                <span className="Navy-card-label">Sent</span>
                <span className="Navy-card-value">{stats.sent}</span>
              </div>
              <div className="Navy-icon-wrapper Navy-icon-sent">
                <FaSackDollar className="Navy-DashIcon" />
              </div>
            </div>
            <div className="Navy-card-footer">Sent Successfully</div>
          </div>
        </div>
      </div>

      {/* ── Announcements list ── */}
      <div className="Navy-announcementsContainer">
        {/* Tabs + search always visible so user can switch tabs or clear search */}
        <div className="Navy-topNavbar">
          <div className="Navy-tabGroup">
            {categories.map((category) => (
              <button
                key={category}
                className={`Navy-tabButton ${activeTab === category ? "Navy-activeTab" : ""}`}
                onClick={() => handleTabChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {category !== "all" && (
                  <span className="Navy-tabCount">
                    {category === "drafts"
                      ? stats.drafts
                      : category === "scheduled"
                        ? stats.scheduled
                        : category === "template"
                          ? stats.templates
                          : category === "sent"
                            ? stats.sent
                            : 0}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="Navy-searchBoxWrapper">
            <input
              type="text"
              placeholder="Search announcements..."
              className="Navy-searchInput"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg
              className="Navy-searchIcon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
            <div className="Navy-resultCount">
              Showing {announcements.length} announcement
              {announcements.length !== 1 ? "s" : ""}
              {pagination.total > 0 && ` of ${pagination.total}`}
            </div>

            <div className="Navy-cardsList">
              {announcements.map((item) => (
                <div
                  key={item.id}
                  className={`Navy-announcementCard Navy-border-${getStatusType(item.status)}`}
                >
                  <div className="Navy-cardHeader">
                    <h3 className="Navy-cardTitle">{item.title}</h3>
                    <div className="Navy-cardActions">
                      <button
                        className="Navy-editButton"
                        onClick={() => openEditPanel(item)}
                        aria-label="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="Navy-deleteButton"
                        onClick={() => handleDelete(item.id)}
                        aria-label="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="Navy-cardContent">{item.content}</p>
                  <div className="Navy-cardFooter">
                    <span className="Navy-metaItem">
                      <svg
                        className="Navy-metaIcon"
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
                      {item.displayDate
                        ? formatDate(item.displayDate)
                        : formatDate(item.createdAt)}
                    </span>
                    <span className="Navy-metaItem">
                      <svg
                        className="Navy-metaIcon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {item.displayTime || formatTime(item.createdAt)}
                    </span>
                    <span
                      className={`Navy-statusBadge ${getStatusType(item.status)}`}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="Navy-pagination">
                <button
                  className="Navy-paginationBtn"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  Previous
                </button>
                <span className="Navy-paginationInfo">
                  Page {pagination.page} of {totalPages}
                </span>
                <button
                  className="Navy-paginationBtn"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <div className="Navy-legendBox">
          <div className="Navy-legendItem">
            <span className="Navy-indicatorDot Navy-dot-draft"></span>
            <span className="Navy-legendLabel">Draft</span>
          </div>
          <div className="Navy-legendItem">
            <span className="Navy-indicatorDot Navy-dot-scheduled"></span>
            <span className="Navy-legendLabel">Scheduled</span>
          </div>
          <div className="Navy-legendItem">
            <span className="Navy-indicatorDot Navy-dot-template"></span>
            <span className="Navy-legendLabel">Template</span>
          </div>
          <div className="Navy-legendItem">
            <span className="Navy-indicatorDot Navy-dot-sent"></span>
            <span className="Navy-legendLabel">Sent</span>
          </div>
        </div>
      </div>

      {/* ── Slide panel ── */}
      <div
        className={`Navy-slide-panel-overlay ${isCreatePanelOpen ? "Navy-active" : ""}`}
        onClick={closePanel}
      >
        <div
          className={`Navy-slide-panel ${isCreatePanelOpen ? "Navy-active" : ""}`}
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="Navy-panel-header">
            <div className="Navy-panel-title-section">
              <h2>
                {editingAnnouncement
                  ? "Edit Announcement"
                  : "Create Announcement"}
              </h2>
              <p className="Navy-panel-subtitle">
                {editingAnnouncement
                  ? "Update your announcement details below."
                  : "Send updates and notices to parents, staff, or students."}
              </p>
            </div>
            <button className="Navy-panel-close-btn" onClick={closePanel}>
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="Navy-panel-form">
            <div className="Navy-form-group">
              <label className="Navy-form-label">Announcement Title</label>
              <input
                type="text"
                name="title"
                className={`Navy-form-input ${formErrors.title ? "Navy-error" : ""}`}
                placeholder="Enter announcement title"
                value={formData.title}
                onChange={handleFormChange}
              />
              {formErrors.title && (
                <span className="Navy-form-error">{formErrors.title}</span>
              )}
            </div>

            <div className="Navy-form-group">
              <label className="Navy-form-label">Message</label>
              <textarea
                name="content"
                className={`Navy-form-textarea ${formErrors.content ? "Navy-error" : ""}`}
                placeholder="Type your message here..."
                value={formData.content}
                onChange={handleFormChange}
                rows="4"
              />
              {formErrors.content && (
                <span className="Navy-form-error">{formErrors.content}</span>
              )}
            </div>

            <div className="Navy-form-group">
              <label className="Navy-form-label">Audience Selection</label>
              <p className="Navy-form-hint">
                Choose who will receive this announcement.
              </p>
              <div className="Navy-audience-options">
                {["parents", "staff", "students", "all"].map((audience) => (
                  <label key={audience} className="Navy-audience-option">
                    <input
                      type="radio"
                      name="audience"
                      value={audience}
                      checked={formData.audience === audience}
                      onChange={() => handleAudienceChange(audience)}
                    />
                    <span>
                      {audience.charAt(0).toUpperCase() + audience.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="Navy-form-group">
              <label className="Navy-form-label">Send Options</label>
              <p className="Navy-form-hint">
                Choose when to send this announcement.
              </p>
              <div className="Navy-send-options">
                {[
                  {
                    value: "draft",
                    title: "Save as Draft",
                    desc: "Save this announcement as a draft.",
                  },
                  {
                    value: "sent",
                    title: "Send Immediately",
                    desc: "Send this announcement right away.",
                  },
                  {
                    value: "scheduled",
                    title: "Schedule for Later",
                    desc: "Choose a date and time to send.",
                  },
                ].map(({ value, title, desc }) => (
                  <label key={value} className="Navy-send-option">
                    <input
                      type="radio"
                      name="status"
                      value={value}
                      checked={formData.status === value}
                      onChange={() => handleStatusChange(value)}
                    />
                    <div className="Navy-send-option-content">
                      <span className="Navy-send-option-title">{title}</span>
                      <span className="Navy-send-option-desc">{desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              {formData.status === "scheduled" && (
                <div className="Navy-schedule-picker">
                  <input
                    type="datetime-local"
                    name="scheduledAt"
                    className={`Navy-form-input ${formErrors.scheduledAt ? "Navy-error" : ""}`}
                    value={formData.scheduledAt}
                    onChange={handleFormChange}
                  />
                  {formErrors.scheduledAt && (
                    <span className="Navy-form-error">
                      {formErrors.scheduledAt}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="Navy-form-group">
              <label className="Navy-form-label">Template Options</label>
              <label className="Navy-template-option">
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
              <div className="Navy-form-error-submit">{formErrors.submit}</div>
            )}

            <div className="Navy-form-actions">
              <button
                type="button"
                className="Navy-btn-cancel"
                onClick={closePanel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="Navy-btn-submit"
                disabled={isSubmitting}
              >
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

      {/* Delete Confirmation Modal */}
      <div
        className={`Navy-delete-modal-overlay ${deleteModal.isOpen ? "Navy-active" : ""}`}
        onClick={() => !deleteModal.isDeleting && closeDeleteModal()}
      >
        <div className="Navy-delete-modal" onClick={(e) => e.stopPropagation()}>
          <div className="Navy-delete-modal-icon">
            <FaExclamationTriangle />
          </div>
          <h2 className="Navy-delete-modal-title">Delete Announcement</h2>
          <p className="Navy-delete-modal-message">
            Are you sure you want to delete "{deleteModal.announcementTitle}"?
            This action cannot be undone.
          </p>
          <div className="Navy-delete-modal-actions">
            <button
              className="Navy-delete-modal-cancel"
              onClick={closeDeleteModal}
              disabled={deleteModal.isDeleting}
            >
              Cancel
            </button>
            <button
              className="Navy-delete-modal-confirm"
              onClick={confirmDelete}
              disabled={deleteModal.isDeleting}
            >
              {deleteModal.isDeleting ? (
                <>
                  <span className="Navy-delete-spinner"></span> Deleting...
                </>
              ) : (
                "Yes, Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAnnouncement;