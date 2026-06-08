import React, { useState } from "react";
import "./RemarkModal.css";

const RemarkModal = ({ initialRemark = "", onClose, onSave }) => {
  const [remark, setRemark] = useState(initialRemark);

  const handleSave = () => {
    onSave(remark);
    onClose();
  };

  return (
    <div className="remarkOverlay">
      <div className="remarkModal">
        <div className="remarkHeader">
          <h2>Add Remark</h2>

          <button className="remarkCloseBtn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="remarkContent">
          <h3>Class Teacher's Remark</h3>

          <p>This remark will appear on the student's final report card.</p>

          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter remark..."
          />

          <div className="remarkButtons">
            <button className="remarkCancelBtn" onClick={onClose}>
              Cancel
            </button>

            <button className="remarkSaveBtn" onClick={handleSave}>
              Save Remark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemarkModal;
