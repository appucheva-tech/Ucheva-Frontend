import React from "react";
import "./StudentFee.css";

const StudentFee = () => {
  return (
    <main className="fd-page">
      <section className="fd-wrapper">
        {/* HEADER */}
        <div className="fd-topbar">
          <h1>Fee Details</h1>

          <div className="fd-breadcrumb">
            Fee Management <span>›</span> <b>Fee Details</b>
          </div>
        </div>

        {/* STUDENT CARD */}
        <div className="fd-student-card">
          <div className="fd-avatar">AC</div>

          <div className="fd-student-info">
            <h2>Adaeze Clinton</h2>

            <div className="fd-meta">
              <div>
                <p>Admission No.</p>
                <span>UCH/2026/001</span>
              </div>

              <div>
                <p>Class</p>
                <span>JSS 1A</span>
              </div>

              <div>
                <p>Age</p>
                <span>10 years old</span>
              </div>

              <div>
                <p>Gender</p>
                <span>Female</span>
              </div>
            </div>
          </div>
        </div>

        {/* FEE INFO */}
        <div className="fd-card">
          <h3>Fee Information</h3>

          <div className="fd-grid">
            <div>
              <span>Term</span>
              <p>Third Term</p>
            </div>

            <div>
              <span>Amount Paid</span>
              <p>₦39,000</p>
            </div>

            <div>
              <span>Payment Type</span>
              <p className="fd-pill orange">Part Payment</p>
            </div>

            <div>
              <span>Balance</span>
              <p>₦39,000</p>
            </div>

            <div>
              <span>Total Amount</span>
              <p>₦78,000</p>
            </div>

            <div>
              <span>Date Paid</span>
              <p>12 May 2026</p>
            </div>
          </div>
        </div>

        {/* BREAKDOWN */}
        <div className="fd-card">
          <h3>Fee Breakdown</h3>

          <table className="fd-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount (N)</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Tuition Fee</td>
                <td>₦50,000</td>
              </tr>

              <tr>
                <td>Uniform Fee</td>
                <td>₦15,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* HISTORY */}
        <div className="fd-card">
          <h3>Payment History</h3>

          <table className="fd-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Reference</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>12 May 2026</td>
                <td>₦39,000</td>
                <td>Bank Transfer</td>
                <td>KP/1234567890</td>
                <td>
                  <span className="fd-pill orange">Part Payment</span>
                </td>
              </tr>

              <tr>
                <td>28 Jan 2026</td>
                <td>₦50,000</td>
                <td>Card</td>
                <td>KP/1234567890</td>
                <td>
                  <span className="fd-pill green">Full Payment</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ACTIONS */}
        <div className="fd-actions">
          <button className="fd-primary">Print Receipt</button>

          <button className="fd-outline">Send Reminder</button>
        </div>
      </section>
    </main>
  );
};

export default StudentFee;
