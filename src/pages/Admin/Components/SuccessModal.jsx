// src/components/Modals/SuccessModal.jsx
import React, { useEffect } from "react";
import "./Modals.css";

const SuccessModal = ({ isOpen, onClose, amount }) => {
  useEffect(() => {
    if (isOpen) {
      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content success-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="success-icon">✓</div>

        <h2 className="success-title">Withdrawal Successful</h2>

        <p className="success-message">
          {formatCurrency(amount)} is on its way to your account.
        </p>

        <button onClick={onClose} className="success-close-btn">
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
