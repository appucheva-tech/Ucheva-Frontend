import React from "react";
import { FiInbox } from "react-icons/fi";
import "../styles/error-screen.css";

const EmptyState = ({
  icon: Icon = FiInbox,
  title = "No Data Found",
  message = "There is currently no information to display here.",
  actionText,
  onAction,
}) => {
  return (
    <div className="empty-state-wrapper">
      <div className="empty-state-icon-box">
        <Icon size={32} />
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
