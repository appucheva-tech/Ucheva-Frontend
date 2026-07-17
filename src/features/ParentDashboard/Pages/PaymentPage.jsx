import React, { useState, useEffect } from "react";
import "../css/PaymentPage.css";
import { apiClient } from "../../../config/AxiosInstance";
import { useOutletContext } from "react-router-dom";
 

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [paymentType, setPaymentType] = useState("installment");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedStudent } = useOutletContext();
  const subdomain = window.location.hostname.split(".")[0];

  useEffect(() => {
    const fetchFees = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/payment/getclass");
        setPaymentData(response.data.data);
      } catch (err) {
        setError("Failed to load payment options.");
      } finally {
        setLoading(false);
      }
    };
    fetchFees();
  }, []);

  // --- INITIALIZE PAYMENT FUNCTION ---
  const handleInitializePayment = async () => {
    if (!selectedStudent?.id) {
      alert("No student selected. Please select a student to continue.");
      return;
    }

    const payload = {
      classId: paymentData.classId,
      className: paymentData.class,
      parentName: paymentData.studentName,
      parentEmail: paymentData.parentEmail,
      currency: "NGN",
      paymentType: "card",
    };

    try {
      const response = await apiClient.post(
        `/payment/initialize/${selectedStudent.id}`,
        payload,
        {
          headers: {
            "x-tenant": subdomain,
          },
        },
      );
      window.location.href = response.data.checkoutUrl;
    } catch (err) {
      alert("Payment initialization failed. Please try again.");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("₦", "N");
  };

  if (loading)
    return <div className="payment-page flex-center-view">Loading...</div>;
  if (error)
    return <div className="payment-page flex-center-view">{error}</div>;
  if (!selectedStudent)
    return (
      <div className="payment-page flex-center-view">
        No student selected. Please select a student to continue.
      </div>
    );

  const total = paymentData.totalFee;
  const amountNow =
    paymentType === "installment" ? paymentData.payableAmount : total;
  const balance = paymentType === "installment" ? paymentData.balance : 0;

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h1>Payment</h1>
        <p>
          Paying for: <strong>{paymentData.studentName}</strong> (
          {paymentData.class})
        </p>
      </div>

      <div className="payment-container">
        <div className="payment-left">
          <div className="payment-section">
            <div className="section-header">
              <h2>School Fees</h2>
              <p>Select what you want to pay for.</p>
            </div>
            <div className="fee-list">
              <label className="fee-item">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="fee-checkbox"
                />
                <div className="fee-content">
                  <div className="fee-name">Total School Fees</div>
                  <div className="fee-term">For {paymentData.class}</div>
                </div>
                <div className="fee-amount">{formatCurrency(total)}</div>
              </label>
            </div>
          </div>

          <div className="payment-section">
            <div className="section-header">
              <h2>Payment Type</h2>
              <p>Choose how you want to pay.</p>
            </div>

            <div className="payment-type-list">
              <label
                className={`payment-type-option ${paymentType === "full" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="payment-type"
                  value="full"
                  checked={paymentType === "full"}
                  onChange={() => setPaymentType("full")}
                  className="payment-radio"
                />
                <div className="payment-type-content">
                  <div className="payment-type-label">Full Payment</div>
                  <div className="payment-type-description">
                    Pay {formatCurrency(total)} at once.
                  </div>
                </div>
              </label>

              <label
                className={`payment-type-option ${paymentType === "installment" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="payment-type"
                  value="installment"
                  checked={paymentType === "installment"}
                  onChange={() => setPaymentType("installment")}
                  className="payment-radio"
                />
                <div className="payment-type-content">
                  <div className="payment-type-label">Installment Payment</div>
                  <div className="payment-type-description">
                    Pay {formatCurrency(paymentData.amountPerInstallment)} per
                    installment ({paymentData.numberOfInstallments} times).
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="payment-right">
          <div className="order-summary">
            <div className="summary-header">
              <h2>Order Summary</h2>
              <p>Review your payment details.</p>
            </div>

            <div className="payment-preview-box">
              <p className="preview-label">You are paying</p>
              <h3 className="preview-amount">{formatCurrency(amountNow)}</h3>
              <p className="preview-subtext">
                {paymentType === "full"
                  ? "Total settlement"
                  : "First installment payment"}
              </p>
            </div>

            <div className="summary-content">
              <div className="summary-items">
                <div className="summary-item">
                  <span>Total Fees</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row">
                <span className="summary-label">Payment Type</span>
                <span className="summary-value">
                  {paymentType === "installment"
                    ? "Installment"
                    : "Full Payment"}
                </span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Amount Paying Now</span>
                <span className="summary-value">
                  {formatCurrency(amountNow)}
                </span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Balance</span>
                <span className="summary-value">{formatCurrency(balance)}</span>
              </div>

              <button
                className="proceed-button"
                onClick={handleInitializePayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;