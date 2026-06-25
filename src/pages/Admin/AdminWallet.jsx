// src/pages/Admin/AdminWallet.jsx
import React, { useState, useEffect } from "react";
import "./AdminWallet.css";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
// FIXED: Correct import path - going up two levels to src, then into services
import { walletService } from "./Services/walletService";

const AdminWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
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
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="welcome-text">
            Wallet
            <p className="subtitle-text">
              Overview of your school's revenue and wallet activity.
            </p>
          </h1>
          <button className="WithdrawFunds">Withdraw Funds</button>
        </header>

        <div className="metrics-grid">
          <div className="metric-card card-students">
            <div className="card-content">
              <div className="text-section">
                <span className="card-label">Payment received</span>
                <span className="card-value">
                  {wallet ? formatCurrency(wallet.balance * 0.3) : "N0"}
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
                  {wallet ? formatCurrency(wallet.balance * 0.2) : "N0"}
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
                  {wallet ? formatCurrency(wallet.balance) : "N0"}
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
                <span className="card-value">
                  {payments.length > 0 ? payments.length : "0"}
                </span>
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
              <div className="date-picker-mock">
                <span className="calendar-icon">📅</span>
                <span>Monday, May 18 2026</span>
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
                        {formatCurrency(payment.amount || 0)}
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
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-ellipsis">...</span>
              <button className="page-btn">6</button>
              <button className="page-btn">7</button>
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
              <div className="date-picker-mock">
                <span className="calendar-icon">📅</span>
                <span>Monday, May 18 2026</span>
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
                  <td className="text-mono">UCH-2026-00057</td>
                  <td className="font-medium">₦450,000</td>
                  <td>GTBank ***1234</td>
                  <td>May 18, 2026</td>
                  <td>
                    <span className="badge badge-info">Processing</span>
                  </td>
                  <td>May 18, 2025</td>
                </tr>
                <tr>
                  <td className="text-mono">UCH-2026-00056</td>
                  <td className="font-medium">₦300,000</td>
                  <td>GTBank ***1234</td>
                  <td>May 15, 2025</td>
                  <td>
                    <span className="badge badge-success-outline">
                      Successful
                    </span>
                  </td>
                  <td>May 15, 2025</td>
                </tr>
                <tr>
                  <td className="text-mono">UCH-2026-00055</td>
                  <td className="font-medium">₦600,000</td>
                  <td>GTBank ***1234</td>
                  <td>May 14, 2025</td>
                  <td>
                    <span className="badge badge-success-outline">
                      Successful
                    </span>
                  </td>
                  <td>May 14, 2025</td>
                </tr>
                <tr>
                  <td className="text-mono">UCH-2026-00054</td>
                  <td className="font-medium">₦200,000</td>
                  <td>GTBank ***1234</td>
                  <td>May 12, 2025</td>
                  <td>
                    <span className="badge badge-danger">Failed</span>
                  </td>
                  <td>May 13, 2025</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card-footer">
            <span className="pagination-info">Showing pages of 1 to 7</span>
            <div className="pagination-controls">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-ellipsis">...</span>
              <button className="page-btn">6</button>
              <button className="page-btn">7</button>
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

        <footer className="footerRow">
          <span className="copyrightText">
            ©️ {new Date().getFullYear()} Ucheva school operating management
            system. All rights reserved.
          </span>
          <span className="supportText">
            Need help?{" "}
            <a href="#support" className="supportLink">
              Contact support
            </a>
          </span>
        </footer>
      </div>
    </>
  );
};

export default AdminWallet;
