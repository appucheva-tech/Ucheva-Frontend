import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import "./Popup.css";
import closeIcon from "../../../../assets/PopupClose.svg";

const AddFeeModal = ({ closeModal }) => {
  const [installment, setInstallment] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");

  // Full Payment is ALWAYS true and fixed
  const fullPayment = true;

  const handleInstallmentClick = () => {
    setInstallment(!installment);
  };

  return (
    <div className="AddFeeModalOverlay geist-content" onClick={closeModal}>
      <article
        className="AddFeeModal ScrollablePopup"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="CloseBtn" onClick={closeModal}>
          <img src={closeIcon} alt="Close" />
        </button>

        <nav className="ModalTitle">Add Fee</nav>

        <section className="FeeInputs">
          <div className="FeeInputHolder">
            <label>Fee Type</label>
            <input
              type="text"
              placeholder="e.g Tuition Fee"
              className="FeeInput"
            />
          </div>

          <div className="FeeInputHolder">
            <label>Amount (N)</label>
            <input
              type="text"
              placeholder="N e.g 50,000"
              className="FeeInput"
            />
          </div>
        </section>

        {/* Applicable Classes Section */}
        <section className="ApplicableClassesSection">
          <h3>Applicable Class(es)</h3>
          <p className="ApplicableSubtext">
            Select the class(es) this fee applies to.
          </p>

          <div className="FeeInputHolder">
            <label>Class</label>
            <div className="SelectHolder">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="" disabled>
                  Select Class
                </option>
                <option>JSS 1</option>
                <option>JSS 2</option>
                <option>JSS 3</option>
                <option>SS 1</option>
                <option>SS 2</option>
                <option>SS 3</option>
              </select>
              <IoChevronDown />
            </div>
          </div>
        </section>

        <section className="PaymentSection">
          <h3>Payment Option</h3>

          <div className="PaymentOptions">
            {/* Full Payment - Fixed & Always Selected */}
            <div className="PaymentCard PaymentCardActive PaymentCardFixed">
              <div className="PaymentTop">
                <IoCheckmarkCircle className="CheckIcon CheckIconActive" />
                <span>Full Payment</span>
              </div>
              <p>One-time full payment</p>
            </div>

            {/* Installment - Optional */}
            <div
              className={`PaymentCard ${
                installment ? "PaymentCardActive" : ""
              }`}
              onClick={handleInstallmentClick}
            >
              <div className="PaymentTop">
                <IoCheckmarkCircle
                  className={`CheckIcon ${
                    installment ? "CheckIconActive" : ""
                  }`}
                />
                <span>Installment</span>
              </div>
              <p>Allow payments in parts</p>
            </div>
          </div>
        </section>

        {/* Only show Installment Section when installment is selected */}
        {installment && (
          <section className="InstallmentSection">
            <nav className="InstallmentTitle">
              Installment Plan
              <span className="InstallmentTextspan">
                Define how students can pay in installments
              </span>
            </nav>

            <div className="InstallmentInputs">
              <div className="FeeInputHolder">
                <label>Number of installments</label>

                <div className="SelectHolder">
                  <select>
                    <option disabled selected>
                      Select number
                    </option>
                    <option>2 Installments</option>
                    <option>3 Installments</option>
                    <option>4 Installments</option>
                  </select>

                  <IoChevronDown />
                </div>
              </div>

              <div className="FeeInputHolder4">
                <label>Total Amount Payable (N)</label>

                <input
                  type="text"
                  value="N25,000"
                  readOnly
                  className="FeeInput"
                />
              </div>
            </div>
          </section>
        )}

        <nav className="PopupButtonHolder">
          <button className="SaveFeeBtn" onClick={closeModal}>
            Save
          </button>
        </nav>
      </article>
    </div>
  );
};

export default AddFeeModal;
