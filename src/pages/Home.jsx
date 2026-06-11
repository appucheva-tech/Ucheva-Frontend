import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "./Header";
import Stars5 from '../assets/stars.svg'
import Footer from "./Footer";
import Carousel from "./Carousel";
import HappyCL1 from "../assets/HappyCL1.jpg";
import HappyCL2 from "../assets/HappyCL2.jpg";
import HappyCL3 from "../assets/HappyCL3.jpg";
import HappyCL4 from "../assets/HappyCL4.jpg";
import Home4Pics from "../assets/Home4Pics.png";
import ProductPreview from "./ProductPreview";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import PricingTable from "./PricingTable";
import Ready from "./Ready";

export default function Home() {
  const nav = useNavigate();
  const stats = [
    {
      value: "5,000+",
      label: "Students records managed",
    },
    {
      value: "95%",
      label: "Attendance tracking accuracy",
    },
    {
      value: "98%",
      label: "Satisfied Clients",
    },
  ];

  return (
    <main className="generalHome geist-content">
      <Header />
      <section className="hero-container geist-content">
        <div className="hero-content">
          <div className="badge">
            <span>Welcome to Ucheva</span>
          </div>

          <h1 className="title">
            Run Your School <br />
            Smarter, <span className="highlight">Not Harder.</span>
          </h1>

          <p className="description">
            Manage attendance, payments, staff, and
            <br />
            school activities with less stress.
          </p>

          <button className="cta-button" onClick={() => nav ('./signup') }>Get Started</button>

          <div className="social-proof">
            <div className="client-meta">
              <div className="avatar-group">
                <img src={HappyCL1} alt="User avatar" className="avatar" />
                <img src={HappyCL2} alt="User avatar" className="avatar" />
                <img src={HappyCL3} alt="User avatar" className="avatar" />
                <img src={HappyCL4} alt="User avatar" className="avatar" />
              </div>
              <div className="client-text">
                <span className="count">50+</span>
                <span className="label">Happy Clients</span>
              </div>
            </div>

            <div className="rating-divider" />

            <div className="rating-meta">
              <div className="stars">
                <img src={Stars5} alt="" className="Stars5"/>
                <span className="score">5.0</span>
              </div>
              <div className="rating-text">
                <span className="reviews">(1200+ Reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-container">
          <img
            src={Home4Pics}
            alt="Team member using tablet"
            className="Home4Pics"
          />
        </div>
      </section>

      <section className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h2 className="stat-value">{stat.value}</h2>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </section>
      <Carousel />
      <ProductPreview />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <PricingTable />
      <Ready />
      <Footer/>
    </main>
  );
}
