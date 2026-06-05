import "../css/PaymentPage.css";
import { useState } from "react";

const PaymentPage = () => {
  const [selectedItems, setSelectedItems] = useState({
    tuition: true,
    bus: true,
    levy: false,
    uniform: false,
  });

  const [paymentType, setPaymentType] = useState("installment");

  const paymentItems = [
    {
      id: "tuition",
      label: "Tuition Fee",
      term: "Third Term 2025/2026",
      amount: 150000,
    },
    {
      id: "bus",
      label: "School Bus Fee",
      term: "Third Term 2025/2026",
      amount: 25000,
    },
    {
      id: "levy",
      label: "Development Levy",
      term: "Third Term 2025/2026",
      amount: 10000,
    },
    {
      id: "uniform",
      label: "Uniform Fee",
      term: "Third Term 2025/2026",
      amount: 20000,
    },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const calculateTotals = () => {
    let total = 0;
    paymentItems.forEach((item) => {
      if (selectedItems[item.id]) {
        total += item.amount;
      }
    });
    return {
      total,
      amountNow: paymentType === "installment" ? total / 2 : total,
      balance: paymentType === "installment" ? total / 2 : 0,
    };
  };

  const totals = calculateTotals();
  const selectedItemsList = paymentItems.filter(
    (item) => selectedItems[item.id],
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("₦", "N");
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h1>Payment</h1>
        <p>Select what you want to pay.</p>
      </div>

      <div className="payment-container">
        <div className="payment-left">
          <div className="payment-section">
            <h2>What do you want to pay for?</h2>
            <p className="section-subtitle">Select one or more items.</p>

            <div className="items-list">
              {paymentItems.map((item) => (
                <div key={item.id} className="payment-item">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={selectedItems[item.id]}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="checkbox-input"
                  />
                  <label htmlFor={item.id} className="item-label">
                    <div className="item-info">
                      <span className="item-name">{item.label}</span>
                      <span className="item-term">{item.term}</span>
                    </div>
                    <span className="item-amount">
                      {formatCurrency(item.amount)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="payment-section">
            <h2>Payment Type</h2>
            <p>Choose how you want to pay.</p>

            <div className="payment-type-options">
              <div className="radio-option">
                <input
                  type="radio"
                  id="full-payment"
                  name="payment-type"
                  value="full"
                  checked={paymentType === "full"}
                  onChange={() => setPaymentType("full")}
                  className="radio-input"
                />
                <label htmlFor="full-payment" className="radio-label">
                  <span className="radio-title">Full Payment</span>
                  <span className="radio-description">
                    Pay the total amount at once.
                  </span>
                </label>
              </div>

              <div className="radio-option">
                <input
                  type="radio"
                  id="installment-payment"
                  name="payment-type"
                  value="installment"
                  checked={paymentType === "installment"}
                  onChange={() => setPaymentType("installment")}
                  className="radio-input"
                />
                <label htmlFor="installment-payment" className="radio-label">
                  <span className="radio-title">Installment Payment</span>
                  <span className="radio-description">
                    Pay in parts over time.
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-right">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <p className="section-subtitle">Select one or more items.</p>

            <div className="summary-content">
              <div className="summary-items">
                {selectedItemsList.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span className="summary-item-name">{item.label}</span>
                    <span className="summary-item-amount">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}

                <div className="summary-divider"></div>

                <div className="summary-item total">
                  <span className="summary-item-name">Total Fees</span>
                  <span className="summary-item-amount">
                    {formatCurrency(totals.total)}
                  </span>
                </div>
              </div>

              <div className="summary-details">
                <div className="detail-row">
                  <span className="detail-label">Payment Type</span>
                  <span className="detail-value">
                    {paymentType === "installment"
                      ? "Installment"
                      : "Full Payment"}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Amount Paying Now</span>
                  <span className="detail-value">
                    {formatCurrency(totals.amountNow)}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Balance</span>
                  <span className="detail-value">
                    {formatCurrency(totals.balance)}
                  </span>
                </div>
              </div>

              <button className="proceed-button">Proceed to Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
