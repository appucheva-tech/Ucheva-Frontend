import React from "react";
import { useNavigate } from "react-router-dom";
import "./PricingTable.css";
import FreeLadyBackground from "../assets/FreeLadyBackground.png";


const PricingTable = () => {
  const nav = useNavigate();

  return (
    <div className="JJpricing-container">
      <div className="JJpricing-header">
        <p className="JJsub-title">Price Plan Preview</p>
        <h1 className="JJmain-titles">Flexible Pricing for Every School</h1>
        <p className="JJdescriptions">
          Choose a plan that fits your school size and operational needs.
        </p>
      </div>

      <div className="JJcards-grid">
        <div className="JJcard JJstarter-card">
          <div className="JJcard-content">
            <span className="JJplan-name JJtext-light">Starter Plan</span>
            <h2 className="JJprice JJtext-light">Free</h2>
            <p className="JJcard-desc JJtext-light">
              Perfect for schools getting started with digital management.
            </p>
          </div>
          <div className="JJimage-container">
            <img
              src={FreeLadyBackground}
              alt="School Administrator"
              className="JJadmin-image"
            />
          </div>
        </div>

        <div className="JJcard JJbilling-card JJactive-card">
          <div className="JJcard-content">
            <span className="JJplan-name">Standard Plan</span>
            <h2 className="JJprice">N40,000</h2>
            <p className="JJcard-desc">
              Built for growing schools that need better visibility and
              organization.
            </p>

            <ul className="JJfeatures-list">
              <li>Up to 600 students</li>
              <li>Full feature access</li>
              <li>Fee tracking dashboard</li>
              <li>WhatsApp parent alerts</li>
            </ul>

            <button className="JJview-all-btn" onClick={() => nav ('./Pricing')}>View all</button>
            <button className="JJcta-button JJprimary-btn" onClick={() => nav ('./signup') }>Get Started</button>
          </div>
        </div>

        <div className="JJcard JJbilling-card">
          <div className="JJcard-content">
            <span className="JJplan-name">School+ Plan</span>
            <h2 className="JJprice">N75,000</h2>
            <p className="JJcard-desc">
              Advanced tools for larger schools and multi-branch operations.
            </p>

            <ul className="JJfeatures-list">
              <li>Unlimited students</li>
              <li>Full feature access</li>
              <li>Multi-admin access</li>
              <li>Priority onboarding</li>
            </ul>

            <button className="JJview-all-btn" onClick={() => nav ('./Pricing')}>View all</button>
            <button className="JJcta-button JJsecondary-btn" onClick={() => nav ('./signup') }>Get Started</button>
          </div>
        </div>
      </div>

      <div className="JJpricing-footer">
        <p className="JJfooter-P" onClick={() => nav ('./Pricing')}>
          Need a custom solution for your school network or organization?{" "}
          <a href="#contact" className="JJfooter-link">
            Contact us
          </a>{" "}
          for enterprise support and tailored pricing.
        </p>
      </div>
    </div>
  );
};

export default PricingTable;