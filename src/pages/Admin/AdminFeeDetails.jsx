import React from 'react';
import './AdminFeeDetails.css'

const FeeDetails = () => {
  return (
    <div className="Lcontainer">
      <div className="Lheader">
        <h1 className="Ltitle">Fee Details</h1>
        <div className="Lbreadcrumb">
          <span>Fee Management</span>
          <span className="Lseparator">&gt;</span>
          <span className="Lactive">Fee Details</span>
        </div>
      </div>

      <div className="LprofileCard">
        <div className="Lavatar">AC</div>
        <div className="LprofileMeta">
          <h2 className="LstudentName">Adaeze Clinton</h2>
          <div className="LmetaGrid">
            <div className="LmetaItem">
              <span className="LmetaLabel">Addmission No.</span>
              <span className="LmetaValue">UCH/2026/001</span>
            </div>
            <div className="LmetaItem">
              <span className="LmetaLabel">Class</span>
              <span className="LmetaValue">JSS 1A</span>
            </div>
            <div className="LmetaItem">
              <span className="LmetaLabel">Age</span>
              <span className="LmetaValue">10 years old</span>
            </div>
            <div className="LmetaItem">
              <span className="LmetaLabel">Gender</span>
              <span className="LmetaValue">Female</span>
            </div>
          </div>
        </div>
      </div>

      <div className="LinfoBlock">
        <div className="LblockHeader">Fee Information</div>
        <div className="LblockContent">
          <div className="LinfoGrid">
            <div className="LinfoRow">
              <span className="LinfoLabel">Term</span>
              <span className="LinfoValue">Third Term</span>
            </div>
            <div className="LinfoRow">
              <span className="LinfoLabel">Amount Paid</span>
              <span className="LinfoValue">N39,00</span>
            </div>
            <div className="LinfoRow">
              <span className="LinfoLabel">Payment Type</span>
              <span className="LinfoValue">
                <span className="Lbadge LbadgePart">Part Payment</span>
              </span>
            </div>
            <div className="LinfoRow">
              <span className="LinfoLabel">Balance</span>
              <span className="LinfoValue">N39,00</span>
            </div>
            <div className="LinfoRow">
              <span className="LinfoLabel">Total Amount</span>
              <span className="LinfoValue">N78,000</span>
            </div>
            <div className="LinfoRow">
              <span className="LinfoLabel">Date Paid</span>
              <span className="LinfoValue">12 May 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="LinfoBlock">
        <div className="LblockHeader">Fee Breakdown</div>
        <div className="LtableContainer">
          <table className="Ltable">
            <thead>
              <tr>
                <th className="LtextLeft">Description</th>
                <th className="LtextLeft">Amount (N)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tuition Fee</td>
                <td>N50,000</td>
              </tr>
              <tr>
                <td>Uniform Fee</td>
                <td>N15,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="LinfoBlock">
        <div className="LblockHeader">Payment History</div>
        <div className="LtableContainer">
          <table className="Ltable">
            <thead>
              <tr>
                <th className="LtextLeft">Date</th>
                <th className="LtextLeft">Amount (N)</th>
                <th className="LtextLeft">Payment Method</th>
                <th className="LtextLeft">Reference</th>
                <th className="LtextLeft">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12 May 2026</td>
                <td>N39,000</td>
                <td>Bank Transfer</td>
                <td>KP/1234567890</td>
                <td>
                  <span className="Lbadge LbadgePart">Part Payment</span>
                </td>
              </tr>
              <tr>
                <td>28 Jan 2026</td>
                <td>N50,000</td>
                <td>Card</td>
                <td>KP/1234567890</td>
                <td>
                  <span className="Lbadge LbadgeFull">Full Payment</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="Lactions">
        <button className="LbtnPrint">
          <span className="LbtnIcon">🖨️</span> Print Receipt
        </button>
        <button className="LbtnReminder">
          <span className="LbtnIcon">📅</span> Send Reminder
        </button>
      </div>
    </div>
  );
};

export default FeeDetails;