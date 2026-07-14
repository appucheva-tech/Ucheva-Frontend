import React, { useState, useEffect } from "react";
import "./AdminWallet.css";
import {
  PiStudentFill,
  PiCalendarBlankFill,
  PiPlusLight,
  PiPlus,
} from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar, FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineHistory } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { walletService } from "./Services/walletService";
import { GoPlus } from "react-icons/go";

// ── Your three state components ───────────────────────────────────────────────
import LoadingScreen from "../../../components/Loading-Screen";
import ErrorScreen from "../../../components/Error-Screen";
import EmptyState from "../../../components/EmptyState";

const NIGERIAN_BANKS = [
  { name: "Access Bank", code: "044" },
  { name: "Fidelity Bank", code: "070" },
  { name: "First Bank", code: "011" },
  { name: "GTBank", code: "058" },
  { name: "Zenith Bank", code: "057" },
  { name: "United Bank for Africa", code: "033" },
  { name: "Stanbic IBTC", code: "221" },
  { name: "FCMB", code: "214" },
  { name: "Sterling Bank", code: "232" },
  { name: "Union Bank", code: "032" },
];

const AdminWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [payments, setPayments] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [withdrawData, setWithdrawData] = useState({
    amount: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
    bankCode: "",
    currency: "NG",
    narration: "School wallet withdrawal",
  });

  const formatCurrency = (amt) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amt);

  const getStatusLabel = (s) =>
    ({ completed: "Successful", pending: "Pending", failed: "Failed" })[s] || s;

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchData = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const [wRes, pRes] = await Promise.all([
        walletService.getWallet(),
        walletService.getPaymentHistory(),
      ]);
      setWallet(wRes.data.wallet);
      setPayments(pRes.data.payments || []);
      setWithdrawals(pRes.data.withdrawals || []);
    } catch (err) {
      console.error(err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...withdrawData, amount: Number(withdrawData.amount) };
      await walletService.withdraw(payload);
      setShowModal(false);
      alert("Withdrawal requested!");
      fetchData();
    } catch (err) {
      alert("Withdrawal failed.");
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isLoading) return <LoadingScreen />;

  // ── Error state ───────────────────────────────────────────────────────────
  if (hasError) {
    return (
      <ErrorScreen
        title="Wallet Unavailable"
        message="We couldn't load your wallet data. Check your connection and try again."
        onRetry={fetchData}
      />
    );
  }

  return (
    <div className="Navy-dashboard-container">
      {/* ── Header ── */}
      <header className="Navy-dashboard-headerWallet">
        <h1 className="Navy-welcome-textWallet">
          Wallet
          <span className="Navy-subtitle-textWallet">
            Manage your revenue and withdrawals.
          </span>
        </h1>
        <button className="Navy-WithdrawFunds" onClick={() => setShowModal(true)}>
          <GoPlus />
          Withdraw Funds
        </button>
      </header>

      {/* ── Metrics ── */}
      <div className="Navy-metrics-grid">
        <div className="Navy-metric-card Navy-card-students">
          <span className="Navy-card-label">Received</span>
          <span className="Navy-card-value">
            {wallet ? formatCurrency(wallet.balance * 0.3) : "₦0"}
          </span>
          <PiStudentFill className="Navy-card-icon" />
        </div>
        <div className="Navy-metric-card Navy-card-staff">
          <span className="Navy-card-label">Withdrawal</span>
          <span className="Navy-card-value">
            {wallet ? formatCurrency(wallet.balance * 0.2) : "₦0"}
          </span>
          <HiMiniUserGroup className="Navy-card-icon" />
        </div>
        <div className="Navy-metric-card Navy-card-attendance">
          <span className="Navy-card-label">Balance</span>
          <span className="Navy-card-value">
            {wallet ? formatCurrency(wallet.balance) : "₦0"}
          </span>
          <PiCalendarBlankFill className="Navy-card-icon" />
        </div>
        <div className="Navy-metric-card Navy-card-fees">
          <span className="Navy-card-label">Transactions</span>
          <span className="Navy-card-value">{payments.length}</span>
          <FaSackDollar className="Navy-card-icon" />
        </div>
      </div>

      {/* ── Payment history ── */}
      <div className="Navy-history-card">
        <h2 className="Navy-card-title">Payment History</h2>
        {payments.length === 0 ? (
          <EmptyState
            title="No Payments Yet"
            message="No payments have been processed yet. They will appear here once parents make payments."
          />
        ) : (
          <div className="Navy-table-responsive-wrapper">
            <table className="Navy-data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td>{p.parentName}</td>
                    <td>{formatCurrency(p.amount)}</td>
                    <td>{getStatusLabel(p.paymentStatus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Withdrawal history ── */}
      <div className="Navy-history-card">
        <h2 className="Navy-card-title">Withdrawal History</h2>
        {withdrawals.length === 0 ? (
          <EmptyState
            title="No Withdrawals Yet"
            message="You haven't made any withdrawals yet."
            actionText="Withdraw Funds"
            onAction={() => setShowModal(true)}
          />
        ) : (
          <div className="Navy-table-responsive-wrapper">
            <table className="Navy-data-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr key={w.id}>
                    <td>{formatCurrency(w.amount)}</td>
                    <td>{getStatusLabel(w.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Withdraw modal ── */}
      {showModal && (
        <div className="Navy-modal-overlay">
          <div className="Navy-modal-content">
            <div className="Navy-modal-header">
              <h3>Withdraw Funds</h3>
              <button onClick={() => setShowModal(false)}>
                <IoClose />
              </button>
            </div>
            <form onSubmit={handleWithdrawSubmit}>
              <input
                type="number"
                placeholder="Amount"
                onChange={(e) =>
                  setWithdrawData({ ...withdrawData, amount: e.target.value })
                }
                required
              />

              <select
                onChange={(e) => {
                  const b = NIGERIAN_BANKS.find(
                    (x) => x.name === e.target.value,
                  );
                  setWithdrawData({
                    ...withdrawData,
                    bankName: e.target.value,
                    bankCode: b?.code,
                  });
                }}
                required
              >
                <option value="">Select Bank</option>
                {NIGERIAN_BANKS.map((b) => (
                  <option key={b.code} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Account Name"
                onChange={(e) =>
                  setWithdrawData({
                    ...withdrawData,
                    accountName: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Account Number"
                onChange={(e) =>
                  setWithdrawData({
                    ...withdrawData,
                    accountNumber: e.target.value,
                  })
                }
                required
              />

              <button type="submit" className="Navy-submit-btn">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWallet;