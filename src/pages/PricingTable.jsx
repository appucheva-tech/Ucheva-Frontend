import React from "react";
import "./PricingTable.css";
import FreeLadyBackground from "../assets/FreeLadyBackground.png";
const PricingTable = () => {
  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <p className="sub-title">Price Plan Preview</p>
        <h1 className="main-titles">Flexible Pricing for Every School</h1>
        <p className="descriptions">
          Choose a plan that fits your school size and operational needs.
        </p>
      </div>

      <div className="cards-grid">
        <div className="card starter-card">
          <div className="card-content">
            <span className="plan-name text-light">Starter Plan</span>
            <h2 className="price text-light">Free</h2>
            <p className="card-desc text-light">
              Perfect for schools getting started with digital management.
            </p>
          </div>
          <div className="image-container">
            <img
              src={FreeLadyBackground}
              alt="School Administrator"
              className="admin-image"
            />
          </div>
        </div>

        <div className="card billing-card active-card">
          <div className="card-content">
            <span className="plan-name">Standard Plan</span>
            <h2 className="price">N40,000</h2>
            <p className="card-desc">
              Built for growing schools that need better visibility and
              organization.
            </p>

            <ul className="features-list">
              <li>Up to 600 students</li>
              <li>Full feature access</li>
              <li>Fee tracking dashboard</li>
              <li>WhatsApp parent alerts</li>
            </ul>

            <button className="view-all-btn">View all</button>
            <button className="cta-button primary-btn">Get Started</button>
          </div>
        </div>

        <div className="card billing-card">
          <div className="card-content">
            <span className="plan-name">School+ Plan</span>
            <h2 className="price">N75,000</h2>
            <p className="card-desc">
              Advanced tools for larger schools and multi-branch operations.
            </p>

            <ul className="features-list">
              <li>Unlimited students</li>
              <li>Full feature access</li>
              <li>Multi-admin access</li>
              <li>Priority onboarding</li>
            </ul>

            <button className="view-all-btn">View all</button>
            <button className="cta-button secondary-btn">Get Started</button>
          </div>
        </div>
      </div>

      <div className="pricing-footer">
        <p>
          Need a custom solution for your school network or organization?{" "}
          <a href="#contact" className="footer-link">
            Contact us
          </a>{" "}
          for enterprise support and tailored pricing.
        </p>
      </div>
    </div>
  );
};

export default PricingTable;
