import React from "react";
import "./AboutUs.css";
import Header from "./Header";
import Footer from "./Footer";
import AboutUsPic1 from "../assets/AboutUsPic1.png";
import OurMission from "./OurMission";
import OurValues from './OurValues'
import TheTeam from './TheTeam'
import Manage from './Manage'

export default function AboutUs() {
  return (
    <>
      <Header />
      <section className="OOour-story-section">
        <div className="OOstory-container">
          <div className="OOgrid-gallery">
            <img src={AboutUsPic1} alt="" className="OOAboutUsPic1" />
          </div>

          <div className="OOstory-content">
            <span className="OOcontent-subtitle">About Us</span>
            <h2 className="OOcontent-title">Our Story</h2>
            <p className="OOcontent-text">
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
      <OurValues />
      <TheTeam />
      <Manage />
      <Footer />
    </>
  );
}