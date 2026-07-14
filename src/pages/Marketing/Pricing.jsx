import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pricing.css";
import Header from "./Header";
import Footer from "./Footer";
import FAQ from "./FAQ";
import NotSure from "./NotSure";

const Pricing = () => {
  const nav = useNavigate();
  return (
    <>
      <Header />
      <div className="LLpricing-container">
        <div className="LLpricing-header">
          <p className="LLsub-title">Pricing Plans</p>
          <h2 className="LLmain-title">Up and Running In Three Simple Steps</h2>
          <p className="LLdescription">
            Get started in minutes with a simple process designed to help
            schools manage operations more efficiently.
          </p>
        </div>

        <div className="LLcards-grid">
          <div className="LLpricing-card">
            <div className="LLcard-header">
              <span className="LLplan-name">Starter Plan</span>
              <h3 className="LLplan-price">Free</h3>
              <p className="LLplan-desc">
                Perfect for schools exploring digital school management.
              </p>
            </div>
            <button
              className="LLbtn LLbtn-secondary"
              onClick={() => nav("/signup")}
            >
              Get Started
            </button>
            <div className="LLfeatures-container">
              <p className="LLfeatures-title">Features</p>
              <ul className="LLfeatures-list">
                <li>Up to 150 students</li>
                <li>Attendance tracking</li>
                <li>Announcement board</li>
                <li>Student records</li>
                <li>Staff records</li>
                <li>Basic dashboard access</li>
                <li>Email support</li>
              </ul>
            </div>
          </div>

          <div className="LLpricing-card LLfeatured">
            <span className="LLbadge">Recommended</span>
            <div className="LLcard-header">
              <span className="LLplan-name">Standard Plan</span>
              <h3 className="LLplan-price">
                N40,000<span className="LLperiod">/per term</span>
              </h3>
              <p className="LLplan-desc">
                Built for growing schools that need better visibility and
                organization.
              </p>
            </div>
            <button
              className="LLbtn LLbtn-primary"
              onClick={() => nav("/signup")}
            >
              Get Started
            </button>
            <div className="LLfeatures-container">
              <p className="LLfeatures-title">Features</p>
              <ul className="LLfeatures-list">
                <li>Up to 600 students</li>
                <li>Full feature access</li>
                <li>Fee tracking dashboard</li>
                <li>WhatsApp parent toasts</li>
                <li>Online fee payments</li>
                <li>QR staff check-in</li>
                <li>Attendance reports</li>
                <li>Student & staff management</li>
                <li>Class management</li>
                <li>Priority support</li>
              </ul>
            </div>
          </div>

          <div className="LLpricing-card">
            <div className="LLcard-header">
              <span className="LLplan-name">School+ Plan</span>
              <h3 className="LLplan-price">
                N75,000<span className="LLperiod">/per term</span>
              </h3>
              <p className="LLplan-desc">
                Advanced tools for larger schools and multi-branch operations.
              </p>
            </div>
            <button
              className="LLbtn LLbtn-secondary"
              onClick={() => nav("/signup")}
            >
              Get Started
            </button>
            <div className="LLfeatures-container">
              <p className="LLfeatures-title">Features</p>
              <ul className="LLfeatures-list">
                <li>Unlimited students</li>
                <li>Full feature access</li>
                <li>Multi-admin access</li>
                <li>Priority onboarding</li>
                <li>Dedicated support</li>
                <li>Advanced analytics</li>
                <li>Early access to new features</li>
                <li>Multi-branch support</li>
                <li>Custom operational assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <FAQ />
      <NotSure />
      <Footer />
    </>
  );
};

export default Pricing;
