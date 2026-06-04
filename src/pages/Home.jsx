import React from 'react'
import './Home.css'
import Header from './Header'
import Footer from './Footer'
import Carousel from './Carousel'
import HappyCL1 from '../assets/HappyCL1.jpg'
import HappyCL2 from '../assets/HappyCL2.jpg'
import HappyCL3 from '../assets/HappyCL3.jpg'
import HappyCL4 from '../assets/HappyCL4.jpg'
import Pic1 from '../assets/Pic1.jpg'
import Pic2 from '../assets/Pic2.jpg'
import Pic3 from '../assets/Pic3.jpg'
import Pic4 from '../assets/Pic4.jpg'
import Features from './Features'
import ProductPreview from './ProductPreview'
import HowItWorks from './HowItWorks'
import WhyChooseUs from './WhyChooseUs'
import Testimonials from './Testimonials'
import PricingTable from './PricingTable'
import Ready from './Ready'

export default function Home() {

  const stats = [
    {
      value: "5,000+",
      label: "Students records managed"
    },
    {
      value: "95%",
      label: "Attendance tracking accuracy"
    },
    {
      value: "98%",
      label: "Satisfied Clients"
    }
  ];
 
  return (
    <>
    <Header/>
    <section className="hero-container">
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
          <br />school activities with less stress.
        </p>
        
        <button className="cta-button">
          Get Started
        </button>
        
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
            <div className="stars">⭐⭐⭐⭐⭐
              <span className="score">5.0</span>
            </div>
            <div className="rating-text">
              <span className="reviews">(1200+ Reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-container">
      <div className="accent-bg-top"></div>
      
      <div className="accent-bg-bottom"></div>

      <div className="grid-layout">
        <div className="grid-item top-left">
          <img src={Pic1} alt="Team member using tablet" className='topLeft'/>
        </div>

        <div className="grid-item top-right">
          <img src={Pic2} alt="Team member in front of bookshelf" />
        </div>

        <div className="grid-item bottom-left">
          <img src={Pic3} alt="Team member standing by office desk" />
        </div>

        <div className="grid-item bottom-right">
          <img src={Pic4} alt="Smiling team member giving thumbs up" />
        </div>
      </div>

      <button className="central-action-btn" aria-label="Next page">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
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
    <Carousel/>
    <Features/>
    <ProductPreview/>
    <HowItWorks/>
    <WhyChooseUs/>
    <Testimonials/>
    <PricingTable/>
    <Ready/>
    <Footer/>
    </>
  );
}
