import React, { useState, useEffect } from "react";
import "../css/PaymentPage.css";
import { apiClient } from "../../../config/AxiosInstance";
import { useOutletContext } from "react-router-dom";
import LoadingScreen from "../../../components/Loading-Screen";

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
    // Check if amount is a valid number
    if (amount === undefined || amount === null || isNaN(amount)) {
      return "N0";
    }
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("₦", "N");
  };

  if (loading) return <LoadingScreen />;
  if (error)
    return (
      <div className="parent-payment-page parent-flex-center-view">{error}</div>
    );
  if (!selectedStudent)
    return (
      <div className="parent-payment-page parent-flex-center-view">
        No student selected. Please select a student to continue.
      </div>
    );
  if (!paymentData) {
    return (
      <div className="parent-payment-page parent-flex-center-view">
        No payment data available.
      </div>
    );
  }

  // Set default values to prevent NaN
  const total = paymentData.totalFee || 0;

  // For installment payment, we need to calculate based on available data
  // Since the API returns "full payment" only, we'll create installment options
  const hasInstallmentData =
    paymentData.amountPerInstallment && paymentData.numberOfInstallments;

  // If no installment data from API, create reasonable defaults
  const amountPerInstallment = hasInstallmentData
    ? paymentData.amountPerInstallment
    : Math.ceil(total / 3); // Default to 3 installments

  const numberOfInstallments = hasInstallmentData
    ? paymentData.numberOfInstallments
    : 3;

  // Calculate amount based on payment type
  const amountNow =
    paymentType === "installment" ? amountPerInstallment : total;

  const balance =
    paymentType === "installment" ? total - amountPerInstallment : 0;

  // Check if the student has already paid partially
  const hasPaid = paymentData.amountPaid > 0;
  const remainingBalance = paymentData.balance || total;

  return (
    <div className="parent-payment-page">
      <div className="parent-payment-header">
        <h1>Payment</h1>
        <p>
          Paying for: <strong>{paymentData.studentName}</strong> (
          {paymentData.class})
        </p>
        {paymentData.paymentStatus && (
          <p className="parent-payment-status">
            Status:{" "}
            <span
              className={
                paymentData.paymentStatus === "paid"
                  ? "parent-status-paid"
                  : "parent-status-unpaid"
              }
            >
              {paymentData.paymentStatus}
            </span>
          </p>
        )}
      </div>

      <div className="parent-payment-container">
        <div className="parent-payment-left">
          <div className="parent-payment-section">
            <div className="parent-section-header">
              <h2>School Fees</h2>
              <p>Select what you want to pay for.</p>
            </div>
            <div className="parent-fee-list">
              <label className="parent-fee-item">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="parent-fee-checkbox"
                />
                <div className="parent-fee-content">
                  <div className="parent-fee-name">Total School Fees</div>
                  <div className="parent-fee-term">For {paymentData.class}</div>
                </div>
                <div className="parent-fee-amount">{formatCurrency(total)}</div>
              </label>
            </div>
          </div>

          <div className="parent-payment-section">
            <div className="parent-section-header">
              <h2>Payment Type</h2>
              <p>Choose how you want to pay.</p>
            </div>

            <div className="parent-payment-type-list">
              <label
                className={`parent-payment-type-option ${paymentType === "full" ? "parent-active" : ""}`}
              >
                <input
                  type="radio"
                  name="payment-type"
                  value="full"
                  checked={paymentType === "full"}
                  onChange={() => setPaymentType("full")}
                  className="parent-payment-radio"
                />
                <div className="parent-payment-type-content">
                  <div className="parent-payment-type-label">Full Payment</div>
                  <div className="parent-payment-type-description">
                    Pay {formatCurrency(total)} at once.
                  </div>
                </div>
              </label>

              <label
                className={`parent-payment-type-option ${paymentType === "installment" ? "parent-active" : ""}`}
              >
                <input
                  type="radio"
                  name="payment-type"
                  value="installment"
                  checked={paymentType === "installment"}
                  onChange={() => setPaymentType("installment")}
                  className="parent-payment-radio"
                />
                <div className="parent-payment-type-content">
                  <div className="parent-payment-type-label">
                    Installment Payment
                  </div>
                  <div className="parent-payment-type-description">
                    Pay {formatCurrency(amountPerInstallment)} per installment (
                    {numberOfInstallments} times).
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="parent-payment-right">
          <div className="parent-order-summary">
            <div className="parent-summary-header">
              <h2>Order Summary</h2>
              <p>Review your payment details.</p>
            </div>

            <div className="parent-payment-preview-box">
              <p className="parent-preview-label">You are paying</p>
              <h3 className="parent-preview-amount">
                {formatCurrency(amountNow)}
              </h3>
              <p className="parent-preview-subtext">
                {paymentType === "full"
                  ? "Total settlement"
                  : `Installment 1 of ${numberOfInstallments}`}
              </p>
            </div>

            <div className="parent-summary-content">
              <div className="parent-summary-items">
                <div className="parent-summary-item">
                  <span>Total Fees</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                {hasPaid && (
                  <div className="parent-summary-item">
                    <span>Amount Paid</span>
                    <span>{formatCurrency(paymentData.amountPaid)}</span>
                  </div>
                )}
              </div>

              <div className="parent-summary-divider"></div>

              <div className="parent-summary-row">
                <span className="parent-summary-label">Payment Type</span>
                <span className="parent-summary-value">
                  {paymentType === "installment"
                    ? "Installment"
                    : "Full Payment"}
                </span>
              </div>

              <div className="parent-summary-row">
                <span className="parent-summary-label">Amount Paying Now</span>
                <span className="parent-summary-value">
                  {formatCurrency(amountNow)}
                </span>
              </div>

              <div className="parent-summary-row">
                <span className="parent-summary-label">Balance</span>
                <span className="parent-summary-value">
                  {formatCurrency(balance)}
                </span>
              </div>

              <button
                className="parent-proceed-button"
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