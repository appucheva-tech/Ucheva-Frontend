import React, { useState, useEffect, useRef } from "react";
import "../styles/fee-structure-step.css";

const FeeStructureStep = ({ formData, setFormData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [feeType, setFeeType] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentOption, setPaymentOption] = useState("Full Payment");
  const [numInstallments, setNumInstallments] = useState("2");
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const classDropdownRef = useRef(null);

  const getDynamicClassOptions = () => {
    const options = [];
    const config = formData?.classConfig || {};
    const activeSections = formData?.selectedSections || [];

    if (activeSections.includes("nursery") && config.nursery) {
      const { classFrom, classTo } = config.nursery;
      const nurseryTiers = ["Creche", "Nursery 1", "Nursery 2", "Nursery 3"];
      const startIdx = nurseryTiers.indexOf(classFrom || "Creche");
      const endIdx = nurseryTiers.indexOf(classTo || "Nursery 3");

      if (startIdx !== -1 && endIdx !== -1) {
        nurseryTiers.slice(startIdx, endIdx + 1).forEach((cls) => {
          options.push({ id: cls.toLowerCase().replace(" ", "-"), label: cls });
        });
      }
    }

    if (activeSections.includes("primary") && config.primary) {
      const { classFrom, classTo } = config.primary;
      const primaryTiers = [
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Primary 4",
        "Primary 5",
        "Primary 6",
      ];
      const startIdx = primaryTiers.indexOf(classFrom || "Primary 1");
      const endIdx = primaryTiers.indexOf(classTo || "Primary 6");

      if (startIdx !== -1 && endIdx !== -1) {
        primaryTiers.slice(startIdx, endIdx + 1).forEach((cls) => {
          const shortLabel = cls.replace("Primary", "PRY");
          options.push({
            id: cls.toLowerCase().replace(" ", "-"),
            label: shortLabel,
          });
        });
      }
    }

    if (activeSections.includes("secondary") && config.secondary) {
      const { classFrom, classTo } = config.secondary;
      const secondaryTiers = [
        "JSS 1",
        "JSS 2",
        "JSS 3",
        "SS 1",
        "SS 2",
        "SS 3",
      ];
      const startIdx = secondaryTiers.indexOf(classFrom || "JSS 1");
      const endIdx = secondaryTiers.indexOf(classTo || "SS 3");

      if (startIdx !== -1 && endIdx !== -1) {
        secondaryTiers.slice(startIdx, endIdx + 1).forEach((cls) => {
          options.push({ id: cls.toLowerCase(), label: cls });
        });
      }
    }

    return options.length > 0
      ? options
      : [{ id: "all", label: "General (All Classes)" }];
  };

  const dynamicAvailableClasses = getDynamicClassOptions();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        classDropdownRef.current &&
        !classDropdownRef.current.contains(event.target)
      ) {
        setIsClassDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const savedFeesArray = Array.isArray(formData?.fees) ? formData.fees : [];

  const calculateInstallmentSplits = () => {
    const totalAmount = parseFloat(amount);
    const splitCount = parseInt(numInstallments, 10);

    if (
      isNaN(totalAmount) ||
      totalAmount <= 0 ||
      isNaN(splitCount) ||
      splitCount <= 0
    ) {
      return [];
    }

    const baseAmount = Math.floor((totalAmount / splitCount) * 100) / 100;
    const structureArray = [];

    for (let i = 0; i < splitCount; i++) {
      const targetValue =
        i === 0
          ? Number((totalAmount - baseAmount * (splitCount - 1)).toFixed(2))
          : baseAmount;

      structureArray.push({
        name: `${i + 1}${getOrdinalSuffix(i + 1)} Installment`,
        value: targetValue,
      });
    }

    return structureArray;
  };

  const getOrdinalSuffix = (num) => {
    if (num === 1) return "st";
    if (num === 2) return "nd";
    if (num === 3) return "rd";
    return "th";
  };

  const activeInstallmentSplits = calculateInstallmentSplits();

  const openAddModal = () => {
    setEditingIndex(null);
    setFeeType("");
    setAmount("");
    setPaymentOption("Full Payment");
    setNumInstallments("2");
    setSelectedClasses([]);
    setIsModalOpen(true);
  };

  const openEditModal = (index) => {
    const targetFee = savedFeesArray[index];
    setEditingIndex(index);
    setFeeType(targetFee.feeType);
    setAmount(targetFee.amount);
    setPaymentOption(targetFee.paymentOption || "Full Payment");
    setNumInstallments(
      targetFee.numInstallments ? String(targetFee.numInstallments) : "2",
    );
    setSelectedClasses(targetFee.className || []); // ✅ fixed: was applicableClasses
    setIsModalOpen(true);
  };

  const handleSaveFee = () => {
    if (!feeType || !amount) return;

    const feePayload = {
      feeType,
      amount: parseFloat(amount),
      paymentOption,
      numInstallments:
        paymentOption === "Installment" ? parseInt(numInstallments, 10) : "N/A",
      installmentDetails:
        paymentOption === "Installment" ? activeInstallmentSplits : [],
      className: selectedClasses, // ✅ fixed: was applicableClasses
    };

    const updatedFeesList = [...savedFeesArray];

    if (editingIndex !== null) {
      updatedFeesList[editingIndex] = feePayload;
    } else {
      updatedFeesList.push(feePayload);
    }

    setFormData((prev) => ({
      ...prev,
      fees: updatedFeesList,
    }));

    setIsModalOpen(false);
  };

  const handleRemoveFeeRow = (indexToRemove) => {
    setFormData({
      ...formData,
      fees: savedFeesArray.filter((_, idx) => idx !== indexToRemove),
    });
  };

  const toggleClassSelection = (classLabel) => {
    if (selectedClasses.includes(classLabel)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== classLabel));
    } else {
      setSelectedClasses([...selectedClasses, classLabel]);
    }
  };

  return (
    <div className="fee-structure-wrapper">
      {savedFeesArray.length > 0 && (
        <div className="fee-table-wrapper">
          <table className="fee-table">
            <thead>
              <tr>
                <th>Fee Type</th>
                <th>Applicable Classes</th>
                <th>Payment Option</th>
                <th>Amount</th>
                <th className="fee-table-action-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {savedFeesArray.map((fee, index) => (
                <tr key={index}>
                  <td className="fee-table-fee-type">{fee.feeType}</td>
                  <td>
                    <div className="table-classes-pill-row">
                      {/* ✅ fixed: was fee.applicableClasses */}
                      {fee.className?.length > 0
                        ? fee.className.join(", ")
                        : "All Classes"}
                    </div>
                  </td>
                  <td className="fee-table-payment-term">
                    {fee.paymentOption === "Installment"
                      ? `Installment (${fee.numInstallments} parts)`
                      : "Full Payment"}
                  </td>
                  <td className="fee-table-amount">
                    {Number(fee.amount).toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    <div className="fee-table-action">
                      <button
                        type="button"
                        onClick={() => openEditModal(index)}
                        className="fee-action-btn fee-edit-btn"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeeRow(index)}
                        className="fee-action-btn fee-delete-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="fee-table-action-trigger-container">
        <button type="button" onClick={openAddModal} className="add-fee-btn">
          <span className="add-fee-icon">+</span> Add a regular fee
        </button>
      </div>

      {isModalOpen && (
        <div
          className="modal-fixed-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="sidebar-surface-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-panel">
              <h2 className="modal-header-heading">
                {editingIndex !== null ? "Edit Fee" : "Add Fee"}
              </h2>
              <button
                type="button"
                className="modal-close-trigger-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body-scroll-form">
              <div className="modal-form-grid-fields">
                <div className="modal-field-block">
                  <label className="modal-input-label">Fee Type</label>
                  <input
                    type="text"
                    required
                    placeholder="Tuition Fee"
                    value={feeType}
                    onChange={(e) => setFeeType(e.target.value)}
                    className="modal-text-input-control"
                  />
                </div>

                <div className="modal-field-block">
                  <label className="modal-input-label">Amount (₦)</label>
                  <input
                    type="number"
                    required
                    placeholder="50000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="modal-text-input-control"
                  />
                </div>
              </div>

              <div
                className="modal-field-block class-dropdown-section-block"
                ref={classDropdownRef}
              >
                <label className="modal-input-label">
                  Applicable Class(es)
                </label>
                <p className="modal-field-sub-hint">
                  Select the class(es) this fee applies to.
                </p>

                <div className="multiselect-custom-deck">
                  <button
                    type="button"
                    className="multiselect-trigger-bar-btn"
                    onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                  >
                    <span className="multiselect-truncate-value-text">
                      {selectedClasses.length > 0
                        ? selectedClasses.join(", ")
                        : "Select Classes..."}
                    </span>
                    <span className="multiselect-caret-span">▼</span>
                  </button>

                  {isClassDropdownOpen && (
                    <ul className="multiselect-popover-options-list">
                      {dynamicAvailableClasses.map((cls) => {
                        const isChecked = selectedClasses.includes(cls.label);
                        return (
                          <li
                            key={cls.id}
                            className={`multiselect-option-item ${isChecked ? "is-active-option" : ""}`}
                            onClick={() => toggleClassSelection(cls.label)}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="multiselect-item-checkbox"
                            />
                            <span className="multiselect-item-label-text">
                              {cls.label}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>

              <div className="modal-field-block">
                <label className="modal-input-label">Payment Option</label>
                <div className="payment-card-option-row-grid">
                  <button
                    type="button"
                    className={`payment-selection-card ${paymentOption === "Full Payment" ? "is-selected-card" : ""}`}
                    onClick={() => setPaymentOption("Full Payment")}
                    style={{
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <div className="card-radio-circle-indicator">
                      {paymentOption === "Full Payment" && (
                        <div className="card-radio-circle-inner-dot" />
                      )}
                    </div>
                    <div className="card-details-wrapper">
                      <span className="card-main-title">Full Payment</span>
                      <span className="card-sub-description">
                        One-time full payment
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`payment-selection-card ${paymentOption === "Installment" ? "is-selected-card" : ""}`}
                    onClick={() => setPaymentOption("Installment")}
                    style={{
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <div className="card-radio-circle-indicator">
                      {paymentOption === "Installment" && (
                        <div className="card-radio-circle-inner-dot" />
                      )}
                    </div>
                    <div className="card-details-wrapper">
                      <span className="card-main-title">Installment</span>
                      <span className="card-sub-description">
                        Allow payments in parts
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {paymentOption === "Installment" && (
                <div className="modal-installment-disclosure-box">
                  <h4 className="disclosure-box-title">Installment Plan</h4>
                  <p className="modal-field-sub-hint">
                    Define how students can pay in installments
                  </p>

                  <div
                    className="modal-form-grid-fields"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <div
                      className="modal-field-block"
                      style={{ gridColumn: "span 2" }}
                    >
                      <label className="modal-input-label">
                        Number of installments
                      </label>
                      <select
                        className="modal-select-input-control"
                        value={numInstallments}
                        onChange={(e) => setNumInstallments(e.target.value)}
                      >
                        <option value="2">2 Installments</option>
                        <option value="3">3 Installments</option>
                        <option value="4">4 Installments</option>
                      </select>
                    </div>
                  </div>

                  {activeInstallmentSplits.length > 0 && (
                    <div className="installment-breakdown-sub-stack">
                      <span className="installment-breakdown-title-header">
                        Amount Breakdown
                      </span>
                      <div className="installment-grid-pills-container">
                        {activeInstallmentSplits.map((split, sIdx) => (
                          <div
                            key={sIdx}
                            className="installment-split-pill-card"
                          >
                            <span className="split-pill-name">
                              {split.name}
                            </span>
                            <span className="split-pill-amount">
                              {split.value.toLocaleString("en-NG", {
                                style: "currency",
                                currency: "NGN",
                              })}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="modal-actions-footer-row">
                <button
                  onClick={handleSaveFee}
                  className="modal-save-submit-btn"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeStructureStep;