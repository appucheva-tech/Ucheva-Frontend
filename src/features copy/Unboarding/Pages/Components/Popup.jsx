import React, { useState } from "react";
import "./Popup.css";
import { IoClose } from "react-icons/io5";
import { IoMdCheckbox, IoMdRadioButtonOff } from "react-icons/io";

const AddFeeModal = ({ closeModal }) => {
  const [paymentType, setPaymentType] = useState("full");

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeBtn" onClick={closeModal}>
          <IoClose />
          IFEANACHO
        </button>

        <h2 className="modalTitle">Add Fee</h2>

        <div className="feeInputs">
          <div className="inputHolder">
            <label>Fee Type</label>
            <input placeholder="e.g Tuition Fee" />
          </div>

          <div className="inputHolder">
            <label>Amount (₦)</label>
            <input placeholder="₦ e.g 50,000" />
          </div>
        </div>

        <div className="paymentSection">
          <h3>Payment Option</h3>

          <div className="paymentCards">
            <div
              className={`paymentCard ${
                paymentType === "full" ? "active" : ""
              }`}
              onClick={() => setPaymentType("full")}
            >
              <div className="paymentTop">
                {paymentType === "full" ? (
                  <IoMdCheckbox />
                ) : (
                  <IoMdRadioButtonOff />
                )}
                Full Payment
              </div>

              <span>One-time full payment</span>
            </div>

            <div
              className={`paymentCard ${
                paymentType === "installment" ? "active" : ""
              }`}
              onClick={() => setPaymentType("installment")}
            >
              <div className="paymentTop">
                {paymentType === "installment" ? (
                  <IoMdCheckbox />
                ) : (
                  <IoMdRadioButtonOff />
                )}
                Installment
              </div>

              <span>Allow payments in parts</span>
            </div>
          </div>
        </div>

        {paymentType === "installment" && (
          <div className="installmentSection">
            <h3>Installment Plan</h3>

            <p>Define how students can pay in installments</p>

            <div className="feeInputs">
              <div className="inputHolder">
                <label>Number of installments</label>

                <select>
                  <option>Select number</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>

              <div className="inputHolder">
                <label>Total Amount Payable (₦)</label>

                <input placeholder="₦ 0" />
              </div>
            </div>
          </div>
        )}

        <button className="saveBtn">Save</button>
      </div>
    </div>
  );
};

export default AddFeeModal;
