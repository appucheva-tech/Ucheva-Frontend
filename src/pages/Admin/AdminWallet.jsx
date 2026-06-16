import React from 'react'
import './AdminWallet.css'
import Ifeanacho from '../../assets/Ifeanacho.jpg'
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

const AdminWallet = () => {

  return (
    <>
    
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

      <div className="dashboard-container">
      <div className="history-card">
        <div className="card-header">
          <h2 className="card-title">Payment History</h2>
          <div className="header-filters">
            <div className="filter-group">
              <label>Status</label>
              <div className="select-wrapper">
                <select defaultValue="all">
                  <option value="all">All Status</option>
                </select>
              </div>
            </div>
            <div className="date-picker-mock">
              <span className="calendar-icon">📅</span>
              <span>Monday, May 18 2026</span>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Payment Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Reference ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adaeze Clinton</td>
                <td>Bank Transfer</td>
                <td className="font-medium">₦85,000</td>
                <td>May 20, 2026</td>
                <td><span className="badge badge-success">Full Payment</span></td>
                <td className="text-mono">TXN-4587-AB12</td>
              </tr>
              <tr>
                <td>Tomi Collins</td>
                <td>Card</td>
                <td className="font-medium">₦60,000</td>
                <td>May 20, 2026</td>
                <td><span className="badge badge-success">Fully Paid</span></td>
                <td className="text-mono">TXN-4586-FT89</td>
              </tr>
              <tr>
                <td>Tomi Collins</td>
                <td>Card</td>
                <td className="font-medium">₦60,000</td>
                <td>May 19, 2026</td>
                <td><span className="badge badge-warning">Part Payment</span></td>
                <td className="text-mono">TXN-4583-PL90</td>
              </tr>
              <tr>
                <td>Zainab Bello</td>
                <td>Bank Transfer</td>
                <td className="font-medium">₦25,000</td>
                <td>May 19, 2026</td>
                <td><span className="badge badge-success">Full Payment</span></td>
                <td className="text-mono">TXN-4585-KL56</td>
              </tr>
              <tr>
                <td>Uche Nwosu</td>
                <td>Bank Transfer</td>
                <td className="font-medium">₦25,000</td>
                <td>May 19, 2026</td>
                <td><span className="badge badge-warning">Part Payment</span></td>
                <td className="text-mono">TXN-4584-HJ32</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card-footer">
          <span className="pagination-info">Showing pages of 1 to 7</span>
          <div className="pagination-controls">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-ellipsis">...</span>
            <button className="page-btn">6</button>
            <button className="page-btn">7</button>
            <button className="page-nav-btn">&gt;</button>
          </div>
          <div className="rows-per-page">
            <span>Rows per page</span>
            <select defaultValue="10">
              <option value="10">10</option>
            </select>
          </div>
        </div>
      </div>

      <div className="history-card">
        <div className="card-header">
          <h2 className="card-title">Withdrawal History</h2>
          <div className="header-filters">
            <div className="filter-group">
              <label>Status</label>
              <div className="select-wrapper">
                <select defaultValue="all">
                  <option value="all">All Status</option>
                </select>
              </div>
            </div>
            <div className="date-picker-mock">
              <span className="calendar-icon">📅</span>
              <span>Monday, May 18 2026</span>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Withdrawal ID</th>
                <th>Amount</th>
                <th>Bank Account</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Processed Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mono">UCH-2026-00057</td>
                <td className="font-medium">₦450,000</td>
                <td>GTBank ***1234</td>
                <td>May 18, 2026</td>
                <td><span className="badge badge-info">Processing</span></td>
                <td>May 18, 2025</td>
              </tr>
              <tr>
                <td className="text-mono">UCH-2026-00056</td>
                <td className="font-medium">₦300,000</td>
                <td>GTBank ***1234</td>
                <td>May 15, 2025</td>
                <td><span className="badge badge-success-outline">Successful</span></td>
                <td>May 15, 2025</td>
              </tr>
              <tr>
                <td className="text-mono">UCH-2026-00055</td>
                <td className="font-medium">₦600,000</td>
                <td>GTBank ***1234</td>
                <td>May 14, 2025</td>
                <td><span className="badge badge-success-outline">Successful</span></td>
                <td>May 14, 2025</td>
              </tr>
              <tr>
                <td className="text-mono">UCH-2026-00054</td>
                <td className="font-medium">₦200,000</td>
                <td>GTBank ***1234</td>
                <td>May 12, 2025</td>
                <td><span className="badge badge-danger">Failed</span></td>
                <td>May 13, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card-footer">
          <span className="pagination-info">Showing pages of 1 to 7</span>
          <div className="pagination-controls">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-ellipsis">...</span>
            <button className="page-btn">6</button>
            <button className="page-btn">7</button>
            <button className="page-nav-btn">&gt;</button>
          </div>
          <div className="rows-per-page">
            <span>Rows per page</span>
            <select defaultValue="10">
              <option value="10">10</option>
            </select>
          </div>
        </div>
      </div>

      <div className="info-banner">
        <div className="info-content">
          <div className="info-icon">i</div>
          <div className="info-text">
            <h3>About Platform Fee</h3>
            <p>A platform service fee of ₦600.00 is applied to each successful transaction.</p>
          </div>
        </div>
        <button className="learn-more-btn">Learn More</button>
      </div>

      <footer className="dashboard-footer">
        <p className="copyright">© 2026 Ucheva school operating management system. All right reserved.</p>
        <div className="footer-support">
          <span>Need help?</span> <a href="#support" className="support-link">Contact support</a>
        </div>
      </footer>
    </div>
        
    </>
  )
} 

export default AdminWallet
