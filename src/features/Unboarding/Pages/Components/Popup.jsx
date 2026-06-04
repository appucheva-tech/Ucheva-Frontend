// import React, { useState } from "react";
// import { IoClose } from "react-icons/io5";
// import { IoCheckmarkCircle } from "react-icons/io5";
// import { IoChevronDown } from "react-icons/io5";
// import "./Popup.css";

// const AddFeeModal = ({ closeModal }) => {
//   const [fullPayment, setFullPayment] = useState(false);
//   const [installment, setInstallment] = useState(false);

//   return (
//     <main className="AddFeeModalOverlay geist-content">
//       <article className="AddFeeModal">
//         <div className="AddFeeModalWrapper">
//           <button className="CloseBtn" onClick={closeModal}>
//             <IoClose />
//           </button>

//           <nav className="ModalTitle">Add Fee</nav>

//           <section className="FeeInputs">
//             <div className="FeeInputHolder">
//               <label>Fee Type</label>
//               <input
//                 type="text"
//                 placeholder="e.g Tuition Fee"
//                 className="FeeInput"
//               />
//             </div>

//             <div className="FeeInputHolder">
//               <label>Amount (₦)</label>
//               <input
//                 type="text"
//                 placeholder="₦ e.g 50,000"
//                 className="FeeInput"
//               />
//             </div>
//           </section>

//           <section className="PaymentSection">
//             <h3>Payment Option</h3>

//             <div className="PaymentOptions">
//               <div
//                 className={`PaymentCard ${
//                   fullPayment ? "PaymentCardActive" : ""
//                 }`}
//                 onClick={() => setFullPayment(!fullPayment)}
//               >
//                 <div className="PaymentTop">
//                   <IoCheckmarkCircle
//                     className={`CheckIcon ${
//                       fullPayment ? "CheckIconActive" : ""
//                     }`}
//                   />

//                   <span>Full Payment</span>
//                 </div>

//                 <p>One-time full payment</p>
//               </div>

//               <div
//                 className={`PaymentCard ${
//                   installment ? "PaymentCardActive" : ""
//                 }`}
//                 onClick={() => setInstallment(!installment)}
//               >
//                 <div className="PaymentTop">
//                   <IoCheckmarkCircle
//                     className={`CheckIcon ${
//                       installment ? "CheckIconActive" : ""
//                     }`}
//                   />

//                   <span>Installment</span>
//                 </div>

//                 <p>Allow payments in parts</p>
//               </div>
//             </div>
//           </section>

//           <section className="InstallmentSection">
//             <nav className="InstallmentTitle">
//               Installment Plan
//               <span className="InstallmentTextspan">
//                 Define how students can pay in installments
//               </span>
//             </nav>

//             <div className="InstallmentInputs">
//               <div className="FeeInputHolder">
//                 <label>Number of installments</label>

//                 <div className="SelectHolder">
//                   <select>
//                     <option>Select number</option>
//                     <option>2 Installments</option>
//                     <option>3 Installments</option>
//                     <option>4 Installments</option>
//                   </select>

//                   <IoChevronDown />
//                 </div>
//               </div>

//               <div className="FeeInputHolder">
//                 <label>Total Amount Payable (₦)</label>

//                 <input type="text" placeholder="₦25,000" className="FeeInput" />
//               </div>
//             </div>
//           </section>
//         </div>
//         <nav className="PopupButtonHolder">
//           <button className="SaveFeeBtn" onClick={closeModal}>
//             Save
//           </button>
//         </nav>
//       </article>
//     </main>
//   );
// };

// export default AddFeeModal;

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import "./Popup.css";

const AddFeeModal = ({ closeModal }) => {
  const [fullPayment, setFullPayment] = useState(false);
  const [installment, setInstallment] = useState(false);

  return (
    <div className="AddFeeModalOverlay geist-content" onClick={closeModal}>
      <article className="AddFeeModal" onClick={(e) => e.stopPropagation()}>
        <button className="CloseBtn" onClick={closeModal}>
          <IoClose />
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
            <label>Amount (₦)</label>
            <input
              type="text"
              placeholder="₦ e.g 50,000"
              className="FeeInput"
            />
          </div>
        </section>

        <section className="PaymentSection">
          <h3>Payment Option</h3>

          <div className="PaymentOptions">
            <div
              className={`PaymentCard ${
                fullPayment ? "PaymentCardActive" : ""
              }`}
              onClick={() => setFullPayment(!fullPayment)}
            >
              <div className="PaymentTop">
                <IoCheckmarkCircle
                  className={`CheckIcon ${
                    fullPayment ? "CheckIconActive" : ""
                  }`}
                />
                <span>Full Payment</span>
              </div>

              <p>One-time full payment</p>
            </div>

            <div
              className={`PaymentCard ${
                installment ? "PaymentCardActive" : ""
              }`}
              onClick={() => setInstallment(!installment)}
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
                  <option>Select number</option>
                  <option>2 Installments</option>
                  <option>3 Installments</option>
                  <option>4 Installments</option>
                </select>

                <IoChevronDown />
              </div>
            </div>

            <div className="FeeInputHolder">
              <label>Total Amount Payable (₦)</label>

              <input type="text" placeholder="₦25,000" className="FeeInput" />
            </div>
          </div>
        </section>

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
