import React from "react";
import "./AboutUs.css";
import Header from "./Header";
import Footer from "./Footer";
import AboutUsPic1 from "../assets/AboutUsPic1.png";
import OurMission from "./OurMission";

export default function AboutUs() {
  return (
    <>
      <Header />
      <section className="our-story-section">
        <div className="story-container">
          <div className="grid-gallery">
            <img src={AboutUsPic1} alt="" className="AboutUsPic1" />
          </div>

          <div className="story-content">
            <span className="content-subtitle">About Us</span>
            <h2 className="content-title">Our Story</h2>
            <p className="content-text">
              The idea began after several conversations with school
              administrators, teachers, and staff who all shared similar
              frustrations. Attendance was being recorded on paper, fee tracking
              was difficult to manage, important announcements got lost in
              WhatsApp groups, and parents often stayed uninformed unless there
              was a serious issue.
            </p>
          </div>
        </div>
      </section>
      <OurMission />
      <Footer />
    </>
  );
}
