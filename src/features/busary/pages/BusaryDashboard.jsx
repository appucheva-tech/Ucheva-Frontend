import React from "react";
import "./BusaryDashboard.css";

const BusaryDashboard = () => {
  return (
    <main className="br-dash">
      <article className="br-dash-wrapper">
        <nav className="br-greetings">
          Good Afternoon, Kareem 👋
          <span>Here is today's financial overview</span>
        </nav>
        <article className="br-cards">
          <div className="br-attendance">
            <nav className="br-text">
              My Attendance
              <div className="br-pending">Checked in</div>
            </nav>
            <div className="br-image-holder1">
              <img
                className="br-img"
                src="src/assets/uim_calender.png"
                alt=""
              />
            </div>
          </div>
          <div className="br-fee-collected">
            <nav className="br-text">
              Fee Collected
              <div className="br-number">6</div>
            </nav>
            <div className="br-image-holder2">
              <img
                className="br-img"
                src="src/assets/streamline-plump_class-lesson-remix.png"
                alt=""
              />
            </div>
          </div>
          <div className="br-outstanding-fee">
            <nav className="br-text">
              Outstanding Fee
              <div className="br-number">23</div>
            </nav>
            <div className="br-image-holder3">
              <img
                className="br-img"
                src="src/assets/ph_student-fill.png"
                alt=""
              />
            </div>
          </div>
          <div className="br-collection-rate">
            <nav className="br-text">
              Collection Rate %<div className="br-percentage">85%</div>
            </nav>
            <div className="br-image-holder4">
              <img
                className="br-img"
                src="src/assets/material-symbols-light_menu-book-rounded.png"
                alt=""
              />
            </div>
          </div>
        </article>
        <section className="br-checkin">
          <div className="br-qr">
            <nav className="br-qr-holder">
              <img className="br-qr-img" src="src/assets/Icon.png" alt="" />
            </nav>
            <ul className="br-reminder">
              You have not checked in today
              <span>Please scan the QR code to mark your attendance</span>
            </ul>
            <button className="br-scan">Scan QR to Check In</button>
          </div>
          <div className="br-announcement">
            <nav className="br-announce-head">Recent Announcements</nav>
            <article className="br-announcement-view">
              <ul className="br-announcement-content">
                <nav className="br-announce-date">
                  Staff Meeting
                  <span>May 18, 2026</span>
                </nav>
                <p className="br-announce-text">
                  All staff members are required to attend the mo...
                </p>
              </ul>
              <ul className="br-announcement-content">
                <nav className="br-announce-date">
                  Staff Meeting
                  <span>May 18, 2026</span>
                </nav>
                <p className="br-announce-text">
                  All staff members are required to attend the mo...
                </p>
              </ul>
              <ul className="br-announcement-content">
                <nav className="br-announce-date">
                  Staff Meeting
                  <span>May 18, 2026</span>
                </nav>
                <p className="br-announce-text">
                  All staff members are required to attend the mo...
                </p>
              </ul>
            </article>
          </div>
        </section>
        <section className="br-payment-history">
          <div className="br-payment-header">
            <h3>Payment History</h3>

            <button className="br-view-all">View All ↗</button>
          </div>

          <div className="br-payment-table-wrapper">
            <table className="br-payment-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
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
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Adaeze Clinton</td>
                  <td>JSS 1A</td>
                  <td>₦75,000</td>
                  <td>₦39,000</td>
                  <td>Bank Transfer</td>
                  <td>
                    <span className="br-status">Full Payment</span>
                  </td>
                  <td>18 May 2026</td>
                  <td className="br-action">⋮</td>
                </tr>

                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Emeka Ugonna</td>
                  <td>SS 1C</td>
                  <td>₦50,000</td>
                  <td>₦50,000</td>
                  <td>Bank Transfer</td>
                  <td>
                    <span className="br-status">Full Payment</span>
                  </td>
                  <td>18 May 2026</td>
                  <td className="br-action">⋮</td>
                </tr>

                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Tolu Adesunya</td>
                  <td>PRY 1</td>
                  <td>₦50,000</td>
                  <td>₦50,000</td>
                  <td>Card</td>
                  <td>
                    <span className="br-status">Full Payment</span>
                  </td>
                  <td>18 May 2026</td>
                  <td className="br-action">⋮</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </main>
  );
};

export default BusaryDashboard;
