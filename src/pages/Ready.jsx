import React from 'react';
import './Ready.css';
import AdminMobile from '../assets/AdminMobile.png'

const Ready = () => {
  return (
    <div className="banner-container">
      <div className="banner-content">
        <h1 className="banner-title">
          Ready to Transform The Way Your School Operates?
        </h1>
        <p className="banner-subtitle">
          Simplify attendance, fees, and report cards with one easy platform.
        </p>
        <button className="banner-btn">Start Free</button>
      </div>

      <img src={AdminMobile} alt="" className='AdminMobile'/>

      {/* <div className="mockup-container">
        <div className="phone-frame">
          <div className="status-bar">
            <span className="time">9:41</span>
            <div className="status-icons">
              <span className="icon-signal">📶</span>
              <span className="icon-battery">🔋</span>
            </div>
          </div>

          <div className="app-header">
            <div className="header-top">
              <button className="menu-btn">☰</button>
              <div className="header-meta">
                <span>🗓️ Monday, 18 May 2026</span>
                <span>2025/20...</span>
                <span>First Term ▾</span>
              </div>
              <img 
                src="https://unsplash.com" 
                alt="Profile" 
                className="profile-img" 
              />
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Search students, staff, classes, etc..." />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="app-body">
            <h2 className="welcome-text">Good morning, Mr Eric 👋</h2>
            <p className="school-context">Here's an overview of Nodos Academy activities today.</p>

            <div className="dashboard-grid">
              <div className="stat-card blue-card">
                <div className="card-info">
                  <span className="card-label">Total Students</span>
                  <span className="card-value">342</span>
                  <span className="card-trend upward">↗ 12 from last term</span>
                </div>
                <div className="card-icon icon-bg-blue">🎓</div>
              </div>

              <div className="stat-card purple-card">
                <div className="card-info">
                  <span className="card-label">Total Staff</span>
                  <span className="card-value">28</span>
                  <span className="card-trend upward">↗ 2 from last term</span>
                </div>
                <div className="card-icon icon-bg-purple">👥</div>
              </div>

              <div className="stat-card yellow-card">
                <div className="card-info">
                  <span className="card-label">Attendance Rate</span>
                  <span className="card-value">93%</span>
                  <span className="card-trend downward">↘ 2 from last term</span>
                </div>
                <div className="card-icon icon-bg-yellow">💰</div>
              </div>

              <div className="stat-card green-card">
                <div className="card-info">
                  <span className="card-label">Fees Collected</span>
                  <span className="card-value">₦1,200,000</span>
                  <span className="card-trend upward">↗ 72% fee collected</span>
                </div>
                <div className="card-icon icon-bg-green">💵</div>
              </div>
            </div>

            <div className="section-footer">
              <h3>Today's Staff Attendance</h3>
              <a href="#view-all" className="view-all-link">View All ↗</a>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Ready;
