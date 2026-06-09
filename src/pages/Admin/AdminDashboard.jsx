import React from 'react'
import './AdminDashboard.css'

const AdminDashboard = () => {
  return (
    <>
    <header className="AdminDashboard-header">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search students, staff, classes, etc..." 
          className="search-input"
        />
        <button className="search-button" aria-label="Search">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      <div className="meta-container">
        <div className="date-display">
          <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Monday, 18 May 2026</span>
        </div>

        <div className="divider"></div>

        <div className="dropdown">
          <span>2025/2026 Session</span>
          <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div className="divider"></div>

        <div className="dropdown">
          <span>Third Term</span>
          <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div className="profile-container">
        <button className="notification-button" aria-label="Notifications">
          <svg className="bell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="notification-badge"></span>
        </button>

        <div className="user-profile">
          <img 
            src="https://placeholder.com" 
            alt="Eric Ugochukwu" 
            className="avatar"
          />
          <div className="Auser-info">
            <span className="user-name">Eric Ugochukwu</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
      IFEANACHO
    </>
  )
}

export default AdminDashboard;
