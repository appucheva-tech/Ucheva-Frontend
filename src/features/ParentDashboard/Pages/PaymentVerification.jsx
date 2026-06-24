import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiClient } from "../../../config/AxiosInstance";
import "../css/payment-verification.css";

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hostname = window.location.hostname;
  const subdomain = hostname.includes("localhost")
    ? "dev"
    : hostname.split(".")[0];
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const reference = searchParams.get("reference");
    const verifyTransaction = async () => {
      try {
        const response = await apiClient.get(`/payment/verify/${reference}`, {
          headers: { "x-tenant": subdomain },
        });
        setStatus(
          response.data?.payment?.status === "success" ? "success" : "failed",
        );
      } catch (error) {
        setStatus("failed");
      }
    };
    if (reference) verifyTransaction();
    else setStatus("failed");
  }, [searchParams, subdomain]);

  if (status === "verifying") {
    return (
      <div className="payment-loading-overlay">
        <div className="payment-spinner-wrapper">
          <div className="spinner-track-outer"></div>
          <div className="spinner-track-inner"></div>
          {/* Logo removed, loader remains sleek */}
        </div>
        <div className="payment-loading-text">
          <h3>Verifying Payment</h3>
          <p>Confirming your transaction details securely.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="verification-page">
      <div className="verification-card">
        {status === "success" ? (
          <div className="status-box">
            <div className="status-icon success-glow">✓</div>
            <h2>Transaction Verified</h2>
            <p>
              Your payment has been processed successfully and reflected on your
              account.
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate("/parentdashboard")}
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <div className="status-box">
            <div className="status-icon failed-glow">✕</div>
            <h2>Verification Failed</h2>
            <p>
              We encountered an issue confirming your payment. Please contact
              support if you were debited.
            </p>
            <button
              className="btn-secondary"
              onClick={() => navigate("/payment")}
            >
              Return to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentVerification;
