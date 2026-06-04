import React from "react";
import "./Overview.css";

const Overview = () => {
  return (
    <main className="CTDash">
      <article className="CTDashWrapper">
        <nav className="CTGreetings">
          Good morning, Grace 👋
          <span>Welcome back.</span>
        </nav>
        <article className="CTCards">
          <div className="myAttendance">
            <nav className="CTtext">
              My Attendance
              <div className="CTPending">Pending</div>
            </nav>
            <div className="CTImageHolder1">
              <img className="CTImg" src="src/assets/uim_calender.png" alt="" />
            </div>
          </div>
          <div className="AssignedClass">
            <nav className="CTtext">
              Assigned Class
              <div className="CTClassRoom">SS2A</div>
            </nav>
            <div className="CTImageHolder2">
              <img
                className="CTImg"
                src="src/assets/streamline-plump_class-lesson-remix.png"
                alt=""
              />
            </div>
          </div>
          <div className="TotalStudents">
            <nav className="CTtext">
              Total Students
              <div className="CTStudents">23</div>
            </nav>
            <div className="CTImageHolder3">
              <img
                className="CTImg"
                src="src/assets/ph_student-fill.png"
                alt=""
              />
            </div>
          </div>
          <div className="CTSubject">
            <nav className="CTtext4">
              Assigned Subjects
              <div className="SubjectDigit">1</div>
            </nav>
            <div className="CTImageHolder4">
              <img
                className="CTImg"
                src="src/assets/material-symbols-light_menu-book-rounded.png"
                alt=""
              />
            </div>
          </div>
        </article>
        <section className="CTCheckIn">
          <div className="CTQR">
            <nav className="CTQRHolder">
              <img className="CTQRImg" src="src/assets/Icon.png" alt="" />
            </nav>
            <ul className="CTReminder">
              You have not checked in today
              <span>Please scan the QR code to mark your attendance</span>
            </ul>
            <button className="CTScan">Scan QR to Check In</button>
          </div>
          <div className="CTAnnouncement">
            <nav className="CTAnnounceHead">Recent Announcements</nav>
            <article className="CTAnnouncementView">
              <ul className="CTAnnouncementCotent">
                <nav className="CTAnnounceDate">
                  Staff Meeting
                  <span>May 18, 2026</span>
                </nav>
                <p className="TheCTAnnouncement">
                  All staff members are required to attend the mo...
                </p>
              </ul>
              <ul className="CTAnnouncementCotent">
                <nav className="CTAnnounceDate">
                  Staff Meeting
                  <span>May 18, 2026</span>
                </nav>
                <p className="TheCTAnnouncement">
                  All staff members are required to attend the mo...
                </p>
              </ul>
              <ul className="CTAnnouncementCotent">
                <nav className="CTAnnounceDate">
                  Staff Meeting
                  <span>May 18, 2026</span>
                </nav>
                <p className="TheCTAnnouncement">
                  All staff members are required to attend the mo...
                </p>
              </ul>
            </article>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Overview;
