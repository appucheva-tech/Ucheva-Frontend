import React from 'react'
import './AdminFees.css'
import Ifeanacho from '../../assets/Ifeanacho.jpg'
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

const AdminFees = () => {
  const feesData = [
    { name: 'Adaeze Clinton', class: 'JSS 1A', total: 'N75,000', paid: 'N39,000', type: 'Bank Transfer', status: 'Full Payment', date: '12 May 2026' },
    { name: 'Emeka Ugonna', class: 'SS 1C', total: 'N50,000', paid: 'N25,000', type: 'Bank Transfer', status: 'Part Payment', date: '10 May 2026' },
    { name: 'Tolu Adesunya', class: 'PRY 1', total: 'N150,000', paid: 'N0', type: '--', status: 'Unpaid', date: '--' },
    { name: 'Chidi Okoronkwo', class: 'NRY 2', total: 'N150,000', paid: 'N75,000', type: 'Bank Transfer', status: 'Fully Paid', date: '14 May 2026' },
    { name: 'Grace Obidi', class: 'SS 3B', total: 'N50,000', paid: 'N0', type: '--', status: 'Unpaid', date: '--' },
    { name: 'Ifeanyi Okafor', class: 'SS 2A', total: 'N150,000', paid: 'N150,000', type: 'Card', status: 'Full Payment', date: '09 May 2026' },
    { name: 'Ngozi Bassey', class: 'JSS 1B', total: 'N150,000', paid: 'N150,000', type: 'Card', status: 'Full Payment', date: '11 May 2026' }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Full Payment':
      case 'Fully Paid':
        return 'statusFull';
      case 'Part Payment':
        return 'statusPart';
      case 'Unpaid':
        return 'statusUnpaid';
      default:
        return '';
    }
  };

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

      <div className="tableContainer">
      <div className="filterSection">
        <div className="filtersGroup">
          <div className="filterItem">
            <label className="filterLabel">Class Section</label>
            <div className="selectWrapper">
              <select className="selectInput" defaultValue="all">
                <option value="all">All Classes</option>
              </select>
            </div>
          </div>
          <div className="filterItem">
            <label className="filterLabel">Payment Status</label>
            <div className="selectWrapper">
              <select className="selectInput" defaultValue="all">
                <option value="all">All Status</option>
              </select>
            </div>
          </div>
          <div className="filterItem">
            <label className="filterLabel">Term</label>
            <div className="selectWrapper">
              <select className="selectInput" defaultValue="third">
                <option value="third">Third Term</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="actionRowButtons">
          <button className="exportBtn">
            <svg className="exportIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Export
          </button>
          <button className="resetBtn">
            <svg className="resetIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            Reset
          </button>
        </div>
      </div>

      <div className="tableWrapper">
        <table className="feesTable">
          <thead>
            <tr>
              <th className="checkboxCol">
                <input type="checkbox" className="customCheckbox" />
              </th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Total Amount</th>
              <th>Amount Paid</th>
              <th>Payment Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((row, index) => (
              <tr key={index}>
                <td className="checkboxCol">
                  <input type="checkbox" className="customCheckbox" />
                </td>
                <td className="studentName">{row.name}</td>
                <td className="textValue">{row.class}</td>
                <td className="textValue">{row.total}</td>
                <td className="textValue">{row.paid}</td>
                <td className="textValue">{row.type}</td>
                <td>
                  <span className={`statusBadge ${getStatusClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="textValue">{row.date}</td>
                <td>
                  <button className="moreActionsBtn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="5" r="2"/>
                      <circle cx="12" cy="12" r="2"/>
                      <circle cx="12" cy="19" r="2"/>
                    </svg>
                  </button>
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

export default AdminFees
