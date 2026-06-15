import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'
import Ifeanacho from '../../assets/Ifeanacho.jpg'
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

const AdminDashboard = () => {
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

  const nav = useNavigate();

  const attendanceData = [
    { name: 'Adaeze Clinton', role: 'Teacher', time: '7:48 AM', status: 'Checked In' },
    { name: 'Emeka Ugonna', role: 'Teacher', time: '8:02 AM', status: 'Checked In' },
    { name: 'Tolu Adesunya', role: 'Bursar', time: '7:55 AM', status: 'Checked In' },
    { name: 'Chidi Okoronkwo', role: 'Security', time: '--', status: 'Absent' },
    { name: 'Grace Obidi', role: 'Cleaner', time: '4:10 PM', status: 'Checked Out' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Checked In': return 'status-checked-in';
      case 'Checked Out': return 'status-checked-out';
      case 'Absent': return 'status-absent';
      default: return '';
    }
  };

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const handleCardClick = (action) => {
    if (action.type === 'qr') {
      setIsQrModalOpen(true);
    } else if (action.path) {
      nav(action.path);
    }
  };
  const actions = [
    {
      id: 1,
      title: 'Generate QR Code',
      description: 'For staff to mark attendance',
      type: 'qr',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm-2 2h2v2h-2v-2zm2 2h3v3h-3v-3zm-4 0h2v2h-2v-2zm2-4h2v2h-2v-2zm-2 2h2v2h-2v-2zM11 11h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2-2h2v2H9v-2zm2-2H9v2h2v-2zm2 0h2v-2h-2v2zm-4-4h2v2H9V7zm4 0h2v2h-2V7z"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Add Students',
      description: 'Register a student',
      type: 'students',
      path: 'AdminStudents',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <circle cx="19" cy="11" r="3" />
          <path d="M19 8v6M16 11h6" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Send Announcement',
      description: 'Notify staff or parents',
      type: 'announcement',
      path: 'AdminAnnouncement',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'View Report Cards',
      description: 'View student results',
      type: 'reports',
      path: 'AdminReportCards',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    }
  ];

  const announcementsData = [
  {
    id: 1,
    title: 'PTA Meeting',
    date: 'Scheduled - May 28, 2026',
    description: 'All parents are invited to attend the quarterly meeting...'
  },
  {
    id: 2,
    title: 'Mid-term break notice',
    date: 'May 18, 2026',
    description: 'School will close for mid-term break from May 20th to 24th...'
  },
  {
    id: 3,
    title: 'Sports Day Event',
    date: 'May 15, 2026',
    description: 'Annual inter-house sports competition will be held...'
  }
];

const data = {
    percentage: 72,
    collected: "N1,200,000",
    outstanding: "N400,000",
    total: "N1,600,000"
  };

  const radius = 70;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.percentage / 100) * circumference;

  return (
    <>
    <header className="AAdminDashboard-header">
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
        <div className="notification-wrapper" ref={popupRef}>
          <button 
            className="notification-button" 
            aria-label="Notifications"
            onClick={toggleNotifications}
          >
            <svg className="bell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="notification-badge"></span>
          </button>

          {isOpen && (
            <div className="notification-popup">
              <div className="popup-header">
                <h2>Notifications</h2>
                <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close">&times;</button>
              </div>

              <div className="notification-list">
                <div className="notification-item unread">
                  <div className="notification-content">
                    <h3>Payment Received</h3>
                    <p><strong>₦85,000</strong> payment made by Daniels Ogeremu’s parent.</p>
                    <span class="time-stamp">2 min ago</span>
                  </div>
                  <span className="unread-dot"></span>
                </div>

                <div className="notification-item unread">
                  <div className="notification-content">
                    <h3>Withdrawal Approved</h3>
                    <p>Withdrawal of <strong>₦500,000</strong> completed</p>
                    <span class="time-stamp">5 min ago</span>
                  </div>
                  <span className="unread-dot"></span>
                </div>

                <div className="notification-item">
                  <div className="notification-content">
                    <h3>Withdrawal Rejected</h3>
                    <p>Withdrawal of <strong>₦250,000</strong> rejected</p>
                    <span class="time-stamp">Yesterday</span>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-content">
                    <h3>Payment Received</h3>
                    <p><strong>₦150,000</strong> payment made by Ebube Udoka’s parent</p>
                    <span class="time-stamp">Yesterday</span>
                  </div>
                </div>
              </div>

              <div className="popup-footer">
                <button className="mark-all-btn">Mark all as read</button>
              </div>
            </div>
          )}
        </div>

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
    
    <div className="Adashboard-container">
      <header className="dashboard-header">
        <h1 className="welcome-text">
          Good morning, Mr Ifeanacho <span className="wave-emoji">👋</span>
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

    <div className='AdminCardHolder'>

      <div className="attendance-card">
        <div className="card-header">
          <h2>Today's Staff Attendance</h2>
          <a href="#view-all" className="view-all-link" onClick={() => nav ('AdminAttendance')}>
            View All
            <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>

        <table className="attendance-table">
          <thead>
            <tr>
              <th className='AdminTheadLi1'>Name</th>
              <th className='AdminTheadLi2'>Role</th>
              <th className='AdminTheadLi3'>Time</th>
              <th className='AdminTheadLi4'>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((staff, index) => (
              <tr key={index}>
                <td className="staff-name">{staff.name}</td>
                <td className="staff-role">{staff.role}</td>
                <td className="staff-time">{staff.time}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(staff.status)}`}>
                    {staff.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="quick-actions-container">
        <h2 className="title">Quick Actions</h2>
        <div className="grid-layout">
          {actions.map((action) => (
            <div 
              key={action.id} 
              className={`card ${action.type}`} 
              onClick={() => handleCardClick(action)}
            >
              <div className="card-content">
                <div className="icon-wrapper">{action.icon}</div>
                <div className="text-wrapper">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
              </div>
              <button className="arrow-button" aria-label={`Go to ${action.title}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {isQrModalOpen && (
        <div className="modal-overlay" onClick={() => setIsQrModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsQrModalOpen(false)}>&times;</button>
            
            <div className="qr-code-wrapper">
              <img 
                src="https://qrserver.com" 
                alt="Attendance QR Code" 
                className="qr-image" 
              />
            </div>
            
            <p className="modal-text">
              This QR code refreshes automatically every day for secure staff attendance tracking.
            </p>
            
            <div className="modal-actions">
              <button className="btn btn-download">
                <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M5 20h14v-2H5v2zm7-18L6.5 7.5l1.41 1.41L11 5.83V16h2V5.83l3.09 3.08 1.41-1.41L12 2z" transform="rotate(180 12 12)"/></svg>
                Download
              </button>
              <button className="btn btn-print">
                <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>
                Print
              </button>
            </div>
          </div>
        </div>
        )}
    </div>

    <div className='AdminAnnouncementHolder'>
      <div className="announcements-card">
      <h2 className="card-title">Recent Announcements</h2>
      <div className="announcements-list">
        {announcementsData.map((item) => (
          <div key={item.id} className="announcement-item">
            <h3 className="item-title">{item.title}</h3>
            <div className="item-date">
              <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{item.date}</span>
            </div>
            <p className="item-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="fee-summary-container">
      <h2 className="fee-summary-title">Fee Collection Summary</h2>
      
      <div className="fee-summary-content">
        <div className="chart-wrapper">
          <svg className="donut-chart" viewBox="0 0 180 180">
            <circle
              className="chart-track"
              cx="90"
              cy="90"
              r={radius}
              strokeWidth={strokeWidth}
            />
            <circle
              className="chart-progress"
              cx="90"
              cy="90"
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
            />
          </svg>
          <div className="chart-labels">
            <span className="percentage-text">{data.percentage}%</span>
            <span className="sub-text">collected</span>
          </div>
        </div>

        <div className="breakdown-wrapper">
          <div className="breakdown-list">
            <div className="breakdown-item">
              <div className="label-group">
                <span className="color-indicator collected-indicator"></span>
                <span className="item-label">Collected</span>
              </div>
              <span className="item-value">{data.collected}</span>
            </div>

            <div className="breakdown-item">
              <div className="label-group">
                <span className="color-indicator outstanding-indicator"></span>
                <span className="item-label">Outstanding</span>
              </div>
              <span className="item-value">{data.outstanding}</span>
            </div>
          </div>

          <div className="divider" />

          <div className="total-row">
            <span className="total-label">Total fee</span>
            <span className="total-value">{data.total}</span>
          </div>
        </div>
      </div>
    </div>
    </div>

    <footer className="footer-container">
      <div className="footer-content">
        <p className="copyright">
          &copy; 2026 Ucheva school operating management system . All right reserved.
        </p>
        <p className="support">
          Need help? <a href="#support" className="support-link">Contact support</a>
        </p>
      </div>
    </footer>
    </>
  )
}

export default AdminDashboard;
