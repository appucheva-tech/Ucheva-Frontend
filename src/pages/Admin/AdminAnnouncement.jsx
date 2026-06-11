import React from 'react'
import './AdminAnnouncement.css'
import Ifeanacho from '../../assets/Ifeanacho.jpg'
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

const AdminAnnouncement = () => {
  const categories = ['All', 'Drafts', 'Scheduled', 'Template', 'Sent'];
  
  const announcementsData = [
    {
      title: 'Staff Meeting Reminder',
      content: 'All staff members are required to attend the meeting scheduled for Monday, 19th May 2026 by 2:00 PM in the school hall. Thank you.',
      date: 'May 18, 2026',
      time: '8:30 AM',
      type: 'draft'
    },
    {
      title: 'Resumption of Normal Activities',
      content: 'This is to inform all staff that the school will resume normal activities on Monday, 19th May 2026. Please be punctual.',
      date: 'May 15, 2026',
      time: '4:45 PM',
      type: 'scheduled'
    },
    {
      title: 'Environmental Sanitation Exercise',
      content: 'Weekly environmental sanitation exercise will hold on Saturday, 24th May 2026. All staff are expected to participate.',
      date: 'May 13, 2026',
      time: '9:00 AM',
      type: 'template'
    },
    {
      title: 'Emergency Closure Update',
      content: 'Due to the forecasted heavy rainfall, the school will be closed on Tuesday, 20th May 2026 for safety purposes.',
      date: 'May 12, 2026',
      time: '6:20 PM',
      type: 'sent'
    }
  ];
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
            src={Ifeanacho} 
            alt="Ifeanacho" 
            className="avatar"
          />
        </div>
        <div className="Auser-info">
            <span className="user-name">Ifeanacho Francis</span>
            <span className="user-role">Admin</span>
          </div>
      </div>
    </header>
    
    <div className="dashboard-container">
          <header className="dashboard-header">
            <h1 className="welcome-text">
              Good morning, Mr Eric <span className="wave-emoji">👋</span>
            </h1>
            <p className="subtitle-text">
              Here's an overview of Green Field Academy activities today.
            </p>
          </header>
    
          <div className="metrics-grid">
            <div className="metric-card card-students">
              <div className="card-content">
                <div className="text-section">
                  <span className="card-label">Total Students</span>
                  <span className="card-value">342</span>
                </div>
                <div className="icon-wrapper icon-students">
                  <PiStudentFill className='DashIcon'/>
                </div>
              </div>
              <div className="card-footer trend-up">
                <FaArrowTrendUp className='arrow'/> 12 from last week
              </div>
            </div>
    
            <div className="metric-card card-staff">
              <div className="card-content">
                <div className="text-section">
                  <span className="card-label">Total Staff</span>
                  <span className="card-value">28</span>
                </div>
                <div className="icon-wrapper icon-staff">
                  <HiMiniUserGroup className='DashIcon'/>
                </div>
              </div>
              <div className="card-footer trend-up">
                <FaArrowTrendUp className='arrow'/> 2 from last week
              </div>
            </div>
    
            <div className="metric-card card-attendance">
              <div className="card-content">
                <div className="text-section">
                  <span className="card-label">Attendance Rate</span>
                  <span className="card-value">93%</span>
                </div>
                <div className="icon-wrapper icon-attendance">
                  <PiCalendarBlankFill className='DashIcon'/>
                </div>
              </div>
              <div className="card-footer trend-up">
                <FaArrowTrendUp className='arrow'/> 2 from last week
              </div>
            </div>
    
            <div className="metric-card card-fees">
              <div className="card-content">
                <div className="text-section">
                  <span className="card-label">Fees Collected</span>
                  <span className="card-value">N1,200,000</span>
                </div>
                <div className="icon-wrapper icon-fees">
                  <FaSackDollar className='DashIcon'/>
                </div>
              </div>
              <div className="card-footer trend-pct">
                <FaArrowTrendUp className='arrow'/> 72% fee collected
              </div>
            </div>
    
          </div>
        </div>

        <div className="announcementsContainer">
      {/* Top Navigation Bar */}
      <div className="topNavbar">
        <div className="tabGroup">
          {categories.map((category, index) => (
            <button 
              key={category} 
              className={`tabButton ${index === 0 ? 'activeTab' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="searchBoxWrapper">
          <input 
            type="text" 
            placeholder="Search announcements..." 
            className="searchInput" 
          />
          <svg className="searchIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* Announcements List */}
      <div className="cardsList">
        {announcementsData.map((item, index) => (
          <div key={index} className={`announcementCard border-${item.type}`}>
            <div className="cardHeader">
              <h3 className="cardTitle">{item.title}</h3>
              <button className="menuButton">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="2"/>
                  <circle cx="12" cy="12" r="2"/>
                  <circle cx="12" cy="19" r="2"/>
                </svg>
              </button>
            </div>
            <p className="cardContent">{item.content}</p>
            <div className="cardFooter">
              <span className="metaItem">
                <svg className="metaIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {item.date}
              </span>
              <span className="metaItem">
                <svg className="metaIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend Indicators Box */}
      <div className="legendBox">
        <div className="legendItem">
          <span className="indicatorDot dot-draft"></span>
          <span className="legendLabel">Draft</span>
        </div>
        <div className="legendItem">
          <span className="indicatorDot dot-scheduled"></span>
          <span className="legendLabel">Scheduled</span>
        </div>
        <div className="legendItem">
          <span className="indicatorDot dot-template"></span>
          <span className="legendLabel">Template</span>
        </div>
        <div className="legendItem">
          <span className="indicatorDot dot-sent"></span>
          <span className="legendLabel">Sent</span>
        </div>
      </div>

      {/* Outer Layout Footer Links */}
      <footer className="footerView">
        <span className="copyright">© 2026 Ucheva school operating management system . All right reserved.</span>
        <span className="support">Need help? <a href="#support" className="supportLink">Contact support</a></span>
      </footer>
    </div>
    </>
  )
} 

export default AdminAnnouncement
