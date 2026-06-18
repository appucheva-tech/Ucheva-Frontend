import React from 'react';
import './AdminSubscriptionBilling.css'

const SubscriptionBilling = () => {
  return (
    <div className="Mcontainer">
      <div className="Mheader">
        <h1 className="Mtitle">Subscription &amp; Billing</h1>
        <p className="Msubtitle">Manage your subscription, billing information, and plan limits.</p>
      </div>

      <div className="MpricingGrid">
        <div className="MplanCard">
          <div className="MplanHeader">
            <span className="MplanName">Starter Plan</span>
            <div className="MpriceRow">
              <span className="Mprice">Free</span>
              <span className="MactiveBadge">
                <span className="Mdot"></span> Active
              </span>
            </div>
            <p className="Mdescription">Perfect for schools exploring digital school management.</p>
            <button className="McurrentBtn" disabled>Current Plan</button>
          </div>
          <div className="MfeaturesList">
            <p className="MfeaturesTitle">Features</p>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Up to 150 students
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Attendance tracking
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Announcement board
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Student records
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Staff records
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Basic dashboard access
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Email support
            </div>
          </div>
        </div>

        <div className="MplanCard Mrecommended">
          <div className="MbadgeRecommended">Recommended</div>
          <div className="MplanHeader">
            <span className="MplanName">Standard Plan</span>
            <div className="MpriceRow">
              <span className="Mprice">N40,000</span>
              <span className="Mperiod">/per term</span>
            </div>
            <p className="Mdescription">Built for growing schools that need better visibility and organization.</p>
            <button className="MchooseBtn">Choose Standard</button>
          </div>
          <div className="MfeaturesList">
            <p className="MfeaturesTitle">Features</p>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Up to 500 students
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Full feature access
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Fee tracking dashboard
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> WhatsApp parent alerts
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Online fee payments
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> QR staff check-in
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Attendance reports
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Student &amp; staff management
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Class management
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Priority support
            </div>
          </div>
        </div>

        <div className="MplanCard">
          <div className="MplanHeader">
            <span className="MplanName">School+ Plan</span>
            <div className="MpriceRow">
              <span className="Mprice">N75,000</span>
              <span className="Mperiod">/per term</span>
            </div>
            <p className="Mdescription">Advanced tools for larger schools and multi-branch operations.</p>
            <button className="MgetStartedBtn">Get Started</button>
          </div>
          <div className="MfeaturesList">
            <p className="MfeaturesTitle">Features</p>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Unlimited students
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Full feature access
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Multi-admin access
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Priority onboarding
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Dedicated support
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Advanced analytics
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Early access to new features
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Multi-branch support
            </div>
            <div className="MfeatureItem">
              <span className="McheckIcon">✓</span> Custom operational assistance
            </div>
          </div>
        </div>
      </div>

      <div className="MactivitySection">
        <h2 className="MactivityTitle">Subscription Activity</h2>
        <div className="MtableWrapper">
          <table className="MactivityTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>15 May 2026</td>
                <td>School+ Plan</td>
                <td>N 75,000</td>
                <td><span className="MactivityText">Upgraded</span></td>
              </tr>
              <tr>
                <td>25 January 2026</td>
                <td>Standard Plan</td>
                <td>N 40,000</td>
                <td><span className="MactivityText">Plan Renewed</span></td>
              </tr>
              <tr>
                <td>25 January 2026</td>
                <td>Standard Plan</td>
                <td>N 40,000</td>
                <td><span className="MactivityText">Upgraded</span></td>
              </tr>
              <tr>
                <td>25 January 2026</td>
                <td>Starter Plan</td>
                <td>N 0</td>
                <td><span className="MactivityText">Free Plan</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="MpaginationBar">
          <span className="MshowingText">Showing pages of 1 to 7</span>
          <div className="MpaginationControls">
            <button className="MarrowBtn" disabled>&lt;</button>
            <button className="MpageBtn MactivePage">1</button>
            <button className="MpageBtn">2</button>
            <button className="MpageBtn">3</button>
            <span className="Mellipsis">...</span>
            <button className="MpageBtn">6</button>
            <button className="MpageBtn">7</button>
            <button className="MarrowBtn">&gt;</button>
          </div>
          <div className="MrowsPerPage">
            <span>Rows per page</span>
            <select className="MrowSelect" defaultValue="10">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBilling;