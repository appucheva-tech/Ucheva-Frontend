import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "./Header";
import Stars5 from '../assets/stars.svg'
import Footer from "./Footer";
import Carousel from "./Carousel";
import Features from "./Features";
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
    <main className="CCgeneralHome CCgeist-content">
      <Header />
      <section className="CChero-container CCgeist-content">
        <div className="CChero-content">
          <div className="CCbadge">
            <span>Welcome to Ucheva</span>
          </div>

          <h1 className="CCtitle">
            Run Your School <br />
            Smarter, <span className="CChighlight">Not Harder.</span>
          </h1>

          <p className="CCdescription">
            Manage attendance, payments, staff, and
            <br />
            school activities with less stress.
          </p>

          <button className="CCcta-button" onClick={() => nav ('./signup') }>Get Started</button>

          <div className="CCsocial-proof">
            <div className="CCclient-meta">
              <div className="CCavatar-group">
                <img src={HappyCL1} alt="User avatar" className="CCavatar" />
                <img src={HappyCL2} alt="User avatar" className="CCavatar" />
                <img src={HappyCL3} alt="User avatar" className="CCavatar" />
                <img src={HappyCL4} alt="User avatar" className="CCavatar" />
              </div>
              <div className="CCclient-text">
                <span className="CCcount">50+</span>
                <span className="CClabel">Happy Clients</span>
              </div>
            </div>

            <div className="CCrating-divider" />

            <div className="CCrating-meta">
              <div className="CCstars">
                <img src={Stars5} alt="" className="CCStars5"/>
                <span className="CCscore">5.0</span>
              </div>
              <div className="CCrating-text">
                <span className="CCreviews">(1200+ Reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="CCgrid-container">
          <img
            src={Home4Pics}
            alt="Team member using tablet"
            className="CCHome4Pics"
          />
        </div>
      </section>

      <section className="CCstats-container">
        {stats.map((stat, index) => (
          <div key={index} className="CCstat-card">
            <h2 className="CCstat-value">{stat.value}</h2>
            <p className="CCstat-label">{stat.label}</p>
          </div>
        ))}
      </section>
      <Carousel />
      <Features />
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
