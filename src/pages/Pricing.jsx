import React from 'react';
import './Pricing.css'
import Header from './Header';
import Footer from './Footer';
import FAQ from './FAQ';
import NotSure from './NotSure';

const Pricing = () => {
  return (
    <>
    <Header/>
    <div className="pricing-container">
      <div className="pricing-header">
        <p className="sub-title">Pricing Plans</p>
        <h2 className="main-title">Up and Running In Three Simple Steps</h2>
        <p className="description">
          Get started in minutes with a simple process designed to help schools manage operations more efficiently.
        </p>
      </div>

      <div className="cards-grid">
        {/* Starter Plan */}
        <div className="pricing-card">
          <div className="card-header">
            <span className="plan-name">Starter Plan</span>
            <h3 className="plan-price">Free</h3>
            <p className="plan-desc">Perfect for schools exploring digital school management.</p>
          </div>
          <button className="btn btn-secondary">Get Started</button>
          <div className="features-container">
            <p className="features-title">Features</p>
            <ul className="features-list">
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

        {/* Standard Plan */}
        <div className="pricing-card featured">
          <span className="badge">Recommended</span>
          <div className="card-header">
            <span className="plan-name">Standard Plan</span>
            <h3 className="plan-price">
              N40,000<span className="period">/per term</span>
            </h3>
            <p className="plan-desc">Built for growing schools that need better visibility and organization.</p>
          </div>
          <button className="btn btn-primary">Choose Standard</button>
          <div className="features-container">
            <p className="features-title">Features</p>
            <ul className="features-list">
              <li>Up to 600 students</li>
              <li>Full feature access</li>
              <li>Fee tracking dashboard</li>
              <li>WhatsApp parent alerts</li>
              <li>Online fee payments</li>
              <li>QR staff check-in</li>
              <li>Attendance reports</li>
              <li>Student & staff management</li>
              <li>Class management</li>
              <li>Priority support</li>
            </ul>
          </div>
        </div>

        {/* School+ Plan */}
        <div className="pricing-card">
          <div className="card-header">
            <span className="plan-name">School+ Plan</span>
            <h3 className="plan-price">
              N75,000<span className="period">/per term</span>
            </h3>
            <p className="plan-desc">Advanced tools for larger schools and multi-branch operations.</p>
          </div>
          <button className="btn btn-secondary">Get Started</button>
          <div className="features-container">
            <p className="features-title">Features</p>
            <ul className="features-list">
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
    <FAQ/>
    <NotSure/>
    <Footer/>
    </>
  );
};

export default Pricing;
