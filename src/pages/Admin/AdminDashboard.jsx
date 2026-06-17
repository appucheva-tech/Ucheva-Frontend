import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BsQrCode } from "react-icons/bs";

const AdminDashboard = () => {
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
      case 'Checked In': return 'Cstatus-checked-in';
      case 'Checked Out': return 'Cstatus-checked-out';
      case 'Absent': return 'Cstatus-absent';
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
    <div className="CAdashboard-container">
      <header className="Cdashboard-header">
        <h1 className="Cwelcome-text">
          Good morning, Mr Ifeanacho <span className="Cwave-emoji">👋</span>
        </h1>
        <p className="Csubtitle-text">
          Here's an overview of Green Field Academy activities today.
        </p>
      </header>

      <div className="Cmetrics-grid">
        <div className="Cmetric-card Ccard-students">
          <div className="Ccard-content">
            <div className="Ctext-section">
              <span className="Ccard-label">Total Students</span>
              <span className="Ccard-value">342</span>
            </div>
            <div className="Cicon-wrapper Cicon-students">
              <PiStudentFill className='CDashIcon'/>
            </div>
          </div>
          <div className="Ccard-footer Ctrend-up">
            <FaArrowTrendUp className='Carrow'/> 12 from last week
          </div>
        </div>

        <div className="Cmetric-card Ccard-staff">
          <div className="Ccard-content">
            <div className="Ctext-section">
              <span className="Ccard-label">Total Staff</span>
              <span className="Ccard-value">28</span>
            </div>
            <div className="Cicon-wrapper Cicon-staff">
              <HiMiniUserGroup className='CDashIcon'/>
            </div>
          </div>
          <div className="Ccard-footer Ctrend-up">
            <FaArrowTrendUp className='Carrow'/> 2 from last week
          </div>
        </div>

        <div className="Cmetric-card Ccard-attendance">
          <div className="Ccard-content">
            <div className="Ctext-section">
              <span className="Ccard-label">Attendance Rate</span>
              <span className="Ccard-value">93%</span>
            </div>
            <div className="Cicon-wrapper Cicon-attendance">
              <PiCalendarBlankFill className='CDashIcon'/>
            </div>
          </div>
          <div className="Ccard-footer Ctrend-up">
            <FaArrowTrendUp className='Carrow'/> 2 from last week
          </div>
        </div>

        <div className="Cmetric-card Ccard-fees">
          <div className="Ccard-content">
            <div className="Ctext-section">
              <span className="Ccard-label">Fees Collected</span>
              <span className="Ccard-value">N1,200,000</span>
            </div>
            <div className="Cicon-wrapper Cicon-fees">
              <FaSackDollar className='CDashIcon'/>
            </div>
          </div>
          <div className="Ccard-footer Ctrend-pct">
            <FaArrowTrendUp className='Carrow'/> 72% fee collected
          </div>
        </div>
      </div>
    </div>

    <div className='CAdminCardHolder'>

      <div className="Cattendance-card">
        <div className="Ccard-header">
          <h2>Today's Staff Attendance</h2>
          <a href="#view-all" className="Cview-all-link" onClick={() => nav ('AdminAttendance')}>
            View All
            <svg className="Clink-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>

        <table className="Cattendance-table">
          <thead>
            <tr>
              <th className='CAdminTheadLi1'>Name</th>
              <th className='CAdminTheadLi2'>Role</th>
              <th className='CAdminTheadLi3'>Time</th>
              <th className='CAdminTheadLi4'>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((staff, index) => (
              <tr key={index}>
                <td className="Cstaff-name">{staff.name}</td>
                <td className="Cstaff-role">{staff.role}</td>
                <td className="Cstaff-time">{staff.time}</td>
                <td>
                  <span className={`Cstatus-badge ${getStatusClass(staff.status)}`}>
                    {staff.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="Cquick-actions-container">
        <h2 className="Ctitle">Quick Actions</h2>
        <div className="Cgrid-layout">
          {actions.map((action) => (
            <div 
              key={action.id} 
              className={`Ccard C${action.type}`} 
              onClick={() => handleCardClick(action)}
            >
              <div className="Ccard-content">
                <div className="Cicon-wrapper">{action.icon}</div>
                <div className="Ctext-wrapper">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
              </div>
              <button className="Carrow-button" aria-label={`Go to ${action.title}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {isQrModalOpen && (
        <div className="Cmodal-overlay" onClick={() => setIsQrModalOpen(false)}>
          <div className="Cmodal-container" onClick={(e) => e.stopPropagation()}>
            <button className="Cclose-btn" onClick={() => setIsQrModalOpen(false)}>&times;</button>
            
            <div className="Cqr-code-wrapper">
              <BsQrCode className="Cqr-image"/>
            </div>
            
            <p className="Cmodal-text">
              This QR code refreshes automatically every day for secure staff attendance tracking.
            </p>
            
            <div className="Cmodal-actions">
              <button className="Cbtn Cbtn-download">
                <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M5 20h14v-2H5v2zm7-18L6.5 7.5l1.41 1.41L11 5.83V16h2V5.83l3.09 3.08 1.41-1.41L12 2z" transform="rotate(180 12 12)"/></svg>
                Download
              </button>
              <button className="Cbtn Cbtn-print">
                <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>
                Print
              </button>
            </div>
          </div>
        </div>
        )}
    </div>

    <div className='CAdminAnnouncementHolder'>
      <div className="Cannouncements-card">
      <h2 className="Ccard-title">Recent Announcements</h2>
      <div className="Cannouncements-list">
        {announcementsData.map((item) => (
          <div key={item.id} className="Cannouncement-item">
            <h3 className="Citem-title">{item.title}</h3>
            <div className="Citem-date">
              <svg className="Ccalendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{item.date}</span>
            </div>
            <p className="Citem-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="Cfee-summary-container">
      <h2 className="Cfee-summary-title">Fee Collection Summary</h2>
      
      <div className="Cfee-summary-content">
        <div className="Cchart-wrapper">
          <svg className="Cdonut-chart" viewBox="0 0 180 180">
            <circle
              className="Cchart-track"
              cx="90"
              cy="90"
              r={radius}
              strokeWidth={strokeWidth}
            />
            <circle
              className="Cchart-progress"
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
          <div className="Cchart-labels">
            <span className="Cpercentage-text">{data.percentage}%</span>
            <span className="Csub-text">collected</span>
          </div>
        </div>

        <div className="Cbreakdown-wrapper">
          <div className="Cbreakdown-list">
            <div className="Cbreakdown-item">
              <div className="Clabel-group">
                <span className="Ccolor-indicator Ccollected-indicator"></span>
                <span className="Citem-label">Collected</span>
              </div>
              <span className="Citem-value">{data.collected}</span>
            </div>

            <div className="Cbreakdown-item">
              <div className="Clabel-group">
                <span className="Ccolor-indicator Coutstanding-indicator"></span>
                <span className="Citem-label">Outstanding</span>
              </div>
              <span className="Citem-value">{data.outstanding}</span>
            </div>
          </div>

          <div className="Cdivider" />

          <div className="Ctotal-row">
            <span className="Ctotal-label">Total fee</span>
            <span className="Ctotal-value">{data.total}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default AdminDashboard;