import React from 'react'
import './AdminStaff.css'
import Ifeanacho from '../../assets/Ifeanacho.jpg'
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

const AdminStaff = () => {

  const staffData = [
    { name: 'Adaeze Clinton', role: 'Teacher', class: 'SS 1A', subject: 'Mathematics', phone: '08032456789' },
    { name: 'Emeka Ugonna', role: 'Teacher', class: 'JSS 2C', subject: 'English Language', phone: '08061234567' },
    { name: 'Tolu Adesunya', role: 'Bursar', class: '--', subject: '--', phone: '08029876543' },
    { name: 'Chidi Okoronkwo', role: 'Security', class: '--', subject: '--', phone: '08098765432' },
    { name: 'Grace Obidi', role: 'Cleaner', class: '--', subject: '--', phone: '08101122233' },
    { name: 'Ifeanyi Okafor', role: 'Teacher', class: 'SS 2A', subject: 'Physics', phone: '08055567788' },
    { name: 'Ngozi Bassey', role: 'Teacher', class: 'JSS 1B', subject: 'Basic Science', phone: '08073345566' }
  ];

  return (
    <>
    <header className="adminDashboard-header">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search staff by name, role..." 
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
          Staff Management <button className='AddStaff'>+ Add Staff</button>
        </h1>
        <p className="subtitle-text">
          Manage Teaching and non-teaching staff records. Add, edit and assign staff to classes or subjects.
        </p>
      </header>

      <div className="metrics-grid">
        <div className="metric-card card-students">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Total Staff</span>
              <span className="card-value">38</span>
            </div>
            <div className="icon-wrapper icon-students">
              <PiStudentFill className='DashIcon'/>
            </div>
          </div>
          <div className="card-footer trend-up">
          </div>
        </div>

        <div className="metric-card card-staff">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Teaching Staff</span>
              <span className="card-value">28</span>
            </div>
            <div className="icon-wrapper icon-staff">
              <HiMiniUserGroup className='DashIcon'/>
            </div>
          </div>
          <div className="card-footer trend-up">
          </div>
        </div>

        <div className="metric-card card-attendance">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Non-Teaching Staff</span>
              <span className="card-value">10</span>
            </div>
            <div className="icon-wrapper icon-attendance">
              <PiCalendarBlankFill className='DashIcon'/>
            </div>
          </div>
          <div className="card-footer trend-up">
          </div>
        </div>

        <div className="metric-card card-fees">
          <div className="card-content">
            <div className="text-section">
              <span className="card-label">Class Teachers</span>
              <span className="card-value">32</span>
            </div>
            <div className="icon-wrapper icon-fees">
              <FaSackDollar className='DashIcon'/>
            </div>
          </div>
          <div className="card-footer trend-pct">
          </div>
        </div>
      </div>
    </div>

    <div className="tableContainer">
      <div className="filterSection">
        <div className="filterGroup">
          <label className="filterLabel">Staff Type</label>
          <div className="selectWrapper">
            <select className="selectInput" defaultValue="all">
              <option value="all">All Types</option>
            </select>
          </div>
        </div>
        <button className="resetBtn">
          <svg className="resetIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
          </svg>
          Reset
        </button>
      </div>

      <div className="tableWrapper">
        <table className="staffTable">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Role</th>
              <th>Assigned Class</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff, index) => (
              <tr key={index}>
                <td className="staffName">{staff.name}</td>
                <td className="roleText">{staff.role}</td>
                <td className="classText">{staff.class}</td>
                <td className="subjectText">{staff.subject}</td>
                <td>{staff.phone}</td>
                <td>
                  <div className="actionButtons">
                    <button className="editBtn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button className="deleteBtn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="paginationRow">
          <div className="paginationInfo">
            Showing pages of 1 to 7
          </div>
          
          <div className="paginationControls">
            <button className="arrowBtn" disabled>&lt;</button>
            <button className="pageBtn activePage">1</button>
            <button className="pageBtn">2</button>
            <button className="pageBtn">3</button>
            <span className="ellipsis">...</span>
            <button className="pageBtn">6</button>
            <button className="pageBtn">7</button>
            <button className="arrowBtn">&gt;</button>
          </div>

          <div className="rowsPerPageGroup">
            <span className="rowsLabel">Rows per page</span>
            <div className="rowsSelectWrapper">
              <select className="rowsSelect" defaultValue="10">
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="footerRow">
        <span className="copyrightText">© 2026 Ucheva school operating management system . All right reserved.</span>
        <span className="supportText">Need help? <a href="#support" className="supportLink">Contact support</a></span>
      </footer>
    </div>
    </>
  )
} 

export default AdminStaff
