import React from "react";
import "./AdminSubscriptionBilling.css";

const SubscriptionBilling = () => {
  return (
    <div className="Navy-container">
      <div className="Navy-header">
        <h1 className="Navy-title">Subscription &amp; Billing</h1>
        <p className="Navy-subtitle">
          Manage your subscription, billing information, and plan limits.
        </p>
      </div>

      <div className="Navy-pricingGrid">
        <div className="Navy-planCard">
          <div className="Navy-planHeader">
            <span className="Navy-planName">Starter Plan</span>
            <div className="Navy-priceRow">
              <span className="Navy-price">Free</span>
              <span className="Navy-activeBadge">
                <span className="Navy-dot"></span> Active
              </span>
            </div>
            <p className="Navy-description">
              Perfect for schools exploring digital school management.
            </p>
            <button className="Navy-currentBtn" disabled>
              Current Plan
            </button>
          </div>
          <div className="Navy-featuresList">
            <p className="Navy-featuresTitle">Features</p>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Up to 150 students
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Attendance tracking
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Announcement board
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Student records
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Staff records
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Basic dashboard access
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Email support
            </div>
          </div>
        </div>

        <div className="Navy-planCard Navy-recommended">
          <div className="Navy-badgeRecommended">Recommended</div>
          <div className="Navy-planHeader">
            <span className="Navy-planName">Standard Plan</span>
            <div className="Navy-priceRow">
              <span className="Navy-price">N40,000</span>
              <span className="Navy-period">/per term</span>
            </div>
            <p className="Navy-description">
              Built for growing schools that need better visibility and
              organization.
            </p>
            <button className="Navy-chooseBtn">Choose Standard</button>
          </div>
          <div className="Navy-featuresList">
            <p className="Navy-featuresTitle">Features</p>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Up to 500 students
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Full feature access
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Fee tracking dashboard
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> WhatsApp parent toasts
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Online fee payments
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> QR staff check-in
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Attendance reports
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Student &amp; staff
              management
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Class management
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Priority support
            </div>
          </div>
        </div>

        <div className="Navy-planCard">
          <div className="Navy-planHeader">
            <span className="Navy-planName">School+ Plan</span>
            <div className="Navy-priceRow">
              <span className="Navy-price">N75,000</span>
              <span className="Navy-period">/per term</span>
            </div>
            <p className="Navy-description">
              Advanced tools for larger schools and multi-branch operations.
            </p>
            <button className="Navy-getStartedBtn">Get Started</button>
          </div>
          <div className="Navy-featuresList">
            <p className="Navy-featuresTitle">Features</p>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Unlimited students
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Full feature access
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Multi-admin access
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Priority onboarding
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Dedicated support
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Advanced analytics
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Early access to new features
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Multi-branch support
            </div>
            <div className="Navy-featureItem">
              <span className="Navy-checkIcon">✓</span> Custom operational
              assistance
            </div>
          </div>
        </div>
      </div>

      <div className="Navy-activitySection">
        <h2 className="Navy-activityTitle">Subscription Activity</h2>
        <div className="Navy-tableWrapper">
          <table className="Navy-activityTable">
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
                <td>
                  <span className="Navy-activityText">Upgraded</span>
                </td>
              </tr>
              <tr>
                <td>25 January 2026</td>
                <td>Standard Plan</td>
                <td>N 40,000</td>
                <td>
                  <span className="Navy-activityText">Plan Renewed</span>
                </td>
              </tr>
              <tr>
                <td>25 January 2026</td>
                <td>Standard Plan</td>
                <td>N 40,000</td>
                <td>
                  <span className="Navy-activityText">Upgraded</span>
                </td>
              </tr>
              <tr>
                <td>25 January 2026</td>
                <td>Starter Plan</td>
                <td>N 0</td>
                <td>
                  <span className="Navy-activityText">Free Plan</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="Navy-paginationBar">
          <span className="Navy-showingText">Showing pages of 1 to 7</span>
          <div className="Navy-paginationControls">
            <button className="Navy-arrowBtn" disabled>
              &lt;
            </button>
            <button className="Navy-pageBtn Navy-activePage">1</button>
            <button className="Navy-pageBtn">2</button>
            <button className="Navy-pageBtn">3</button>
            <span className="Navy-ellipsis">...</span>
            <button className="Navy-pageBtn">6</button>
            <button className="Navy-pageBtn">7</button>
            <button className="Navy-arrowBtn">&gt;</button>
          </div>
          <div className="Navy-rowsPerPage">
            <span>Rows per page</span>
            <select className="Navy-rowSelect" defaultValue="10">
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