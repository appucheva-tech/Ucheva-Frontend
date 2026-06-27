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
  // console.log(selectedStudent?.id);
  console.log(selectedStudent.id);

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
      parentName: paymentData.studentName, // Mapping from API data
      parentEmail: paymentData.parentEmail, // Replace with actual user email
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
      // if (response.data.authorizationUrl) {
      window.location.href = response.data.checkoutUrl;
      // }
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
<<<<<<< HEAD
    return <div className="payment-page flex-center-view">No student selected. Please select a student to continue.</div>;
=======
    return (
      <div className="payment-page flex-center-view">
        No student selected. Please select a student to continue.
      </div>
    );
>>>>>>> 9b88fc74a336f52646724175afd5a02fbd67b80e

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
            <h2>School Fees</h2>
            <div className="items-list">
              <div className="payment-item">
                <input type="checkbox" id="totalFee" checked={true} disabled />
                <label htmlFor="totalFee" className="item-label">
                  <div className="item-info">
                    <span className="item-name">Total School Fees</span>
                    <span className="item-term">For {paymentData.class}</span>
                  </div>
                  <span className="item-amount">{formatCurrency(total)}</span>
                </label>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <h2>Payment Type</h2>
            <div className="payment-type-options">
              <div
                className={`radio-option ${paymentType === "full" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  id="full"
                  checked={paymentType === "full"}
                  onChange={() => setPaymentType("full")}
                />
                <label htmlFor="full">
                  Full Payment <span>Pay {formatCurrency(total)} at once.</span>
                </label>
              </div>
              <div
                className={`radio-option ${paymentType === "installment" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  id="installment"
                  checked={paymentType === "installment"}
                  onChange={() => setPaymentType("installment")}
                />
                <label htmlFor="installment">
                  Installment{" "}
                  <span>
                    Pay {formatCurrency(paymentData.amountPerInstallment)} per
                    installment ({paymentData.numberOfInstallments} times).
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-right">
          <div className="order-summary">
            <h2>Order Summary</h2>

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
              <div className="summary-item">
                <span>Total Fees</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-details">
                <div className="detail-row">
                  <span>Amount Due Now</span>
                  <span>{formatCurrency(amountNow)}</span>
                </div>
                <div className="detail-row">
                  <span>Balance</span>
                  <span>{formatCurrency(balance)}</span>
                </div>
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
