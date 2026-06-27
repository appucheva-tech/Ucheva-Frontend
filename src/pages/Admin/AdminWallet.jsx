import React, { useState, useEffect } from "react";
import "./AdminWallet.css";
import { PiStudentFill, PiCalendarBlankFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSackDollar, FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineHistory } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { walletService } from "./Services/walletService";
import LoadingScreen from "../../components/Loading-Screen";

const NIGERIAN_BANKS = [
  { name: "Access Bank", code: "033" },
  { name: "Fidelity Bank", code: "033" },
  { name: "First Bank", code: "033" },
  { name: "GTBank", code: "033" },
  { name: "Zenith Bank", code: "033" },
  { name: "United Bank for Africa", code: "033" },
  { name: "Stanbic IBTC", code: "033" },
  { name: "FCMB", code: "033" },
  { name: "Sterling Bank", code: "033" },
  { name: "Union Bank", code: "033" },
];

const AdminWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [payments, setPayments] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Initialized to match your requested req.body
  const [withdrawData, setWithdrawData] = useState({
    amount: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
    bankCode: "",
<<<<<<< HEAD
    currency: "NG",
=======
    currency: "NGN",
>>>>>>> 8b47e7baa1bf319a2a4dab9f1cb9fc2363a6bf85
    narration: "School wallet withdrawal",
  });

  const EmptyState = ({ icon: Icon, title, message, actionText, onAction }) => (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {actionText && (
        <button className="empty-state-action" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );

  const formatCurrency = (amt) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amt);
  const getStatusLabel = (s) =>
    ({ completed: "Successful", pending: "Pending", failed: "Failed" })[s] || s;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [wRes, pRes] = await Promise.all([
        walletService.getWallet(),
        walletService.getPaymentHistory(),
      ]);
      setWallet(wRes.data.wallet);
      setPayments(pRes.data.payments || []);
      setWithdrawals(pRes.data.withdrawals || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure amount is a number
      const payload = { ...withdrawData, amount: Number(withdrawData.amount) };
      await walletService.withdraw(payload);
      setShowModal(false);
      alert("Withdrawal requested!");
      fetchData();
    } catch (err) {
      alert("Withdrawal failed.");
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="welcome-text">
          Wallet
          <p className="subtitle-text">Manage your revenue and withdrawals.</p>
        </h1>
        <button className="WithdrawFunds" onClick={() => setShowModal(true)}>
          Withdraw Funds
        </button>
      </header>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card card-students">
          <span>Received</span>
          <span className="card-value">
            {wallet ? formatCurrency(wallet.balance * 0.3) : "N0"}
          </span>
          <PiStudentFill />
        </div>
        <div className="metric-card card-staff">
          <span>Withdrawal</span>
          <span className="card-value">
            {wallet ? formatCurrency(wallet.balance * 0.2) : "N0"}
          </span>
          <HiMiniUserGroup />
        </div>
        <div className="metric-card card-attendance">
          <span>Balance</span>
          <span className="card-value">
            {wallet ? formatCurrency(wallet.balance) : "N0"}
          </span>
          <PiCalendarBlankFill />
        </div>
        <div className="metric-card card-fees">
          <span>Transactions</span>
          <span className="card-value">{payments.length}</span>
          <FaSackDollar />
        </div>
      </div>

      {/* History Cards */}
      <div className="history-card">
        <h2 className="card-title">Payment History</h2>
        {payments.length > 0 ? (
          <table className="data-table">
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
        ) : (
          <EmptyState
            icon={FaRegCreditCard}
            title="No Payments"
            message="No payments processed yet."
          />
        )}
      </div>

      <div className="history-card">
        <h2 className="card-title">Withdrawal History</h2>
        {withdrawals.length > 0 ? (
          <table className="data-table">
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
        ) : (
          <EmptyState
            icon={MdOutlineHistory}
            title="No Withdrawals"
            message="Start by withdrawing funds."
            actionText="Withdraw"
            onAction={() => setShowModal(true)}
          />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
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

              <button type="submit" className="submit-btn">
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
