// src/pages/Admin/AdminWallet.jsx
import React, { useState, useEffect } from "react";
import "./AdminWallet.css";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { walletService } from "./Services/walletService";
import WithdrawFundsModal from "../../components/Modals/WithdrawFundsModal";
import VerifyModal from "../../components/Modals/VerifyModal";
import SuccessModal from "../../components/Modals/SuccessModal";

const AdminWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal flow: "withdraw" | "verify" | "success" | null
  const [activeModal, setActiveModal] = useState(null);
  const [withdrawalData, setWithdrawalData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [walletRes, paymentRes] = await Promise.all([
        walletService.getWallet(),
        walletService.getPaymentHistory(),
      ]);
      setWallet(walletRes.data.wallet);
      setPayments(paymentRes.data.payments);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: open withdraw form
  const handleOpenWithdraw = () => setActiveModal("withdraw");

  // Step 2: form submitted → move to OTP verify
  const handleWithdrawNext = (formData) => {
    setWithdrawalData(formData);
    setActiveModal("verify");
  };

  // Step 3: OTP verified → call API → show success
  const handleVerify = async (code, data) => {
    try {
      // await walletService.requestWithdrawal({ ...data, otp: code });
      setActiveModal("success");
      fetchData(); // refresh wallet balance
    } catch (err) {
      console.error("Withdrawal failed:", err);
    }
  };

  // Close all modals cleanly
  const handleCloseAll = () => {
    setActiveModal(null);
    setWithdrawalData(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: "badge-success",
      pending: "badge-warning",
      failed: "badge-danger",
      processing: "badge-info",
      refunded: "badge-info",
    };
    return badges[status] || "badge-warning";
  };

  const getStatusLabel = (status) => {
    const labels = {
      completed: "Full Payment",
      pending: "Pending",
      failed: "Failed",
      processing: "Processing",
      refunded: "Refunded",
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={fetchData} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Modals — rendered here so they sit above everything */}
      <WithdrawFundsModal
        isOpen={activeModal === "withdraw"}
        onClose={handleCloseAll}
        onNext={handleWithdrawNext}
        balance={wallet?.balance || 0}
      />

      <VerifyModal
        isOpen={activeModal === "verify"}
        onClose={handleCloseAll}
        onVerify={handleVerify}
        email={wallet?.email || "your registered email"}
        withdrawalData={withdrawalData}
      />

      <SuccessModal
        isOpen={activeModal === "success"}
        onClose={handleCloseAll}
        amount={withdrawalData?.amount || 0}
      />

      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="welcome-text">
            Good morning, Mr Eric 👋
            <p className="subtitle-text">
              Here's an overview of Green Field Academy activities today.
            </p>
          </h1>
          <button className="WithdrawFunds" onClick={handleOpenWithdraw}>
            Withdraw Funds
          </button>
        </header>

        <div className="metrics-grid">
          <div className="metric-card card-students">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Payment received</span>
                <span className="card-value">
                  {formatCurrency(wallet?.balance * 0.3)}
                </span>
              </div>
              <div className="icon-wrapper icon-students">
                <PiStudentFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FaArrowTrendUp className="arrow" />
              All payment received
            </div>
          </div>

          <div className="metric-card card-staff">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Withdrawal</span>
                <span className="card-value">
                  {formatCurrency(wallet?.balance * 0.2)}
                </span>
              </div>
              <div className="icon-wrapper icon-staff">
                <HiMiniUserGroup className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FaArrowTrendUp className="arrow" />
              Amount Withdrawn
            </div>
          </div>

          <div className="metric-card card-attendance">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Balance</span>
                <span className="card-value">
                  {formatCurrency(wallet?.balance)}
                </span>
              </div>
              <div className="icon-wrapper icon-attendance">
                <PiCalendarBlankFill className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-up">
              <FaArrowTrendUp className="arrow" /> Available balance
            </div>
          </div>

          <div className="metric-card card-fees">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Total transactions</span>
                <span className="card-value">{payments.length || 0}</span>
              </div>
              <div className="icon-wrapper icon-fees">
                <FaSackDollar className="DashIcon" />
              </div>
            </div>
            <div className="card-footer trend-pct">
              <FaArrowTrendUp className="arrow" />
              Successful Transactions
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        {/* Payment History */}
        <div className="history-card">
          <div className="card-header">
            <h2 className="card-title">Payment History</h2>
            <div className="header-filters">
              <div className="filter-group">
                <label>Status</label>
                <div className="select-wrapper">
                  <select defaultValue="all">
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="processing">Processing</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Payment Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Reference ID</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.slice(0, 7).map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.parentName || "N/A"}</td>
                      <td>{payment.paymentType?.replace("_", " ") || "N/A"}</td>
                      <td className="font-medium">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td>
                        {payment.paymentDate
                          ? formatDate(payment.paymentDate)
                          : "N/A"}
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusBadge(payment.paymentStatus)}`}
                        >
                          {getStatusLabel(payment.paymentStatus)}
                        </span>
                      </td>
                      <td className="text-mono">
                        {payment.reference || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="card-footer">
            <span className="pagination-info">
              Showing 1 to {Math.min(payments.length, 7)} of {payments.length}
            </span>
            <div className="pagination-controls">
              <button className="page-btn active">1</button>
              <button className="page-nav-btn">&gt;</button>
            </div>
            <div className="rows-per-page">
              <span>Rows per page</span>
              <select defaultValue="10">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="history-card">
          <div className="card-header">
            <h2 className="card-title">Withdrawal History</h2>
            <div className="header-filters">
              <div className="filter-group">
                <label>Status</label>
                <div className="select-wrapper">
                  <select defaultValue="all">
                    <option value="all">All Status</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Withdrawal ID</th>
                  <th>Amount</th>
                  <th>Bank Account</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Processed Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center">
                    No withdrawals found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card-footer">
            <span className="pagination-info">Showing 0 results</span>
            <div className="pagination-controls">
              <button className="page-btn active">1</button>
              <button className="page-nav-btn">&gt;</button>
            </div>
            <div className="rows-per-page">
              <span>Rows per page</span>
              <select defaultValue="10">
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>

        <div className="info-banner">
          <div className="info-content">
            <div className="info-icon">i</div>
            <div className="info-text">
              <h3>About Platform Fee</h3>
              <p>
                A platform service fee of ₦600.00 is applied to each successful
                transaction.
              </p>
            </div>
          </div>
          <button className="learn-more-btn">Learn More</button>
        </div>

        <footer className="dashboard-footer">
          <p className="copyright">
            © 2026 Ucheva school operating management system. All right
            reserved.
          </p>
          <div className="footer-support">
            <span>Need help?</span>{" "}
            <a href="#support" className="support-link">
              Contact support
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AdminWallet;
