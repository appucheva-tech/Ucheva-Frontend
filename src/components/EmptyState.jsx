import React from "react";
import { FiInbox } from "react-icons/fi"; // Make sure to install react-icons
import "../features/ParentDashboard/css/DashboardPages.css";

const EmptyState = ({ title, message, actionText, onAction }) => {
  return (
    <div className="empty-state-wrapper">
      <div className="empty-state-icon">
        <FiInbox size={32} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {onAction && (
        <button onClick={onAction} className="empty-state-btn">
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
