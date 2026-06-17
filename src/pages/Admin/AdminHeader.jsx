import React, { useState, useEffect, useRef } from 'react';
import './AdminHeader.css'
import Ifeanacho from '../../assets/Ifeanacho.jpg'

const AdminHeader = () => {
const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const toggleNotifications = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
    <header className="AAdminDashboardHeader">
          <div className="Asearch-container">
            <input 
              type="text" 
              placeholder="Search students, staff, classes, etc..." 
              className="Asearch-input"
            />
            <button className="Asearch-button" aria-label="Search">
              <svg className="Asearch-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
    
          <div className="Ameta-container">
            <div className="Adate-display">
              <svg className="Acalendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Monday, 18 May 2026</span>
            </div>
    
            <div className="Adivider"></div>
    
            <div className="Adropdown">
              <span>2025/2026 Session</span>
              <svg className="Achevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
    
            <div className="Adivider"></div>
    
            <div className="Adropdown">
              <span>Third Term</span>
              <svg className="Achevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
    
          <div className="Aprofile-container">
            <div className="Anotification-wrapper" ref={popupRef}>
              <button 
                className="Anotification-button" 
                aria-label="Notifications"
                onClick={toggleNotifications}
              >
                <svg className="Abell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span className="Anotification-badge"></span>
              </button>
    
              {isOpen && (
                <div className="Anotification-popup">
                  <div className="Apopup-header">
                    <h2>Notifications</h2>
                    <button className="Aclose-btn" onClick={() => setIsOpen(false)} aria-label="Close">&times;</button>
                  </div>
    
                  <div className="Anotification-list">
                    <div className="Anotification-item Aunread">
                      <div className="Anotification-content">
                        <h3>Payment Received</h3>
                        <p><strong>₦85,000</strong> payment made by Daniels Ogeremu’s parent.</p>
                        <span class="Atime-stamp">2 min ago</span>
                      </div>
                      <span className="Aunread-dot"></span>
                    </div>
    
                    <div className="Anotification-item Aunread">
                      <div className="Anotification-content">
                        <h3>Withdrawal Approved</h3>
                        <p>Withdrawal of <strong>₦500,000</strong> completed</p>
                        <span class="Atime-stamp">5 min ago</span>
                      </div>
                      <span className="Aunread-dot"></span>
                    </div>
    
                    <div className="Anotification-item">
                      <div className="Anotification-content">
                        <h3>Withdrawal Rejected</h3>
                        <p>Withdrawal of <strong>₦250,000</strong> rejected</p>
                        <span class="Atime-stamp">Yesterday</span>
                      </div>
                    </div>
    
                    <div className="Anotification-item">
                      <div className="Anotification-content">
                        <h3>Payment Received</h3>
                        <p><strong>₦150,000</strong> payment made by Ebube Udoka’s parent</p>
                        <span class="Atime-stamp">Yesterday</span>
                      </div>
                    </div>
                  </div>
    
                  <div className="Apopup-footer">
                    <button className="Amark-all-btn">Mark all as read</button>
                  </div>
                </div>
              )}
            </div>
    
            <div className="Auser-profile">
              <img 
                src={Ifeanacho} 
                alt="Ifeanacho" 
                className="Aavatar"
              />
            </div>
            <div className="Auser-info">
              <span className="Auser-name">Ifeanacho Francis</span>
              <span className="Auser-role">Admin</span>
            </div>
          </div>
        </header>
    </>
  )
}

export default AdminHeader