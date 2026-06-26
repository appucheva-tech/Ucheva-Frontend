import React from 'react';
import './Testimonials.css';
import Cathrine from '../assets/Cathrine.jpg'
import John from '../assets/John.jpg'
import Ugonna from '../assets/Ugonna.jpg'

const testimonialsData = [
  {
    id: 1,
    name: 'Cathrine',
    role: 'School Administrator',
    avatar: Cathrine,
    stars: 5,
    text: 'This platform has completely changed how we manage attendance and communicate with parents. Everything feels more organized now.'
  },
  {
    id: 2,
    name: 'John',
    role: 'Proprietor',
    avatar: John,
    stars: 5,
    text: 'Tracking fees and student records is much easier than before. It has reduced a lot of manual work for our staff.'
  },
  {
    id: 3,
    name: 'Ugonna',
    role: 'Vice Principal',
    avatar: Ugonna,
    stars: 5,
    text: 'The system is simple to use, and parents now receive updates faster without confusion.'
  }
];

export default function Testimonials() {
  return (
    <section className="IItestimonials-section">
      <div className="IItestimonials-container">
        
        <header className="IItestimonials-header">
          <span className="IIsubtitle">Testimonials</span>
          <h2 className="IItitle">See What Our Users Think</h2>
          <p className="IIdescription">
            Real feedback from schools using ucheva to manage daily operations more efficiently.
          </p>
        </header>

        <div className="IItestimonials-grid">
          {testimonialsData.map((item) => (
            <div key={item.id} className="IItestimonial-card">
              <div className="IIcard-header">
                <img src={item.avatar} alt={item.name} className="IIavatar" />
                <div className="IIuser-info">
                  <h3 className="IIuser-name">{item.name}</h3>
                  <span className="IIuser-role">{item.role}</span>
                    <div className="IIstar-rating">
                    {Array.from({ length: item.stars }).map((_, index) => (
                    <span key={index} className="IIstar">★</span>
                    ))}
                    </div>
                </div>
              </div>
              
              <p className="IItestimonial-text">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="IIpagination-controls">
          <button className="IInav-btn IIprev-btn" aria-label="Previous testimonial">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
            </svg>
          </button>
          <button className="IInav-btn IInext-btn IIactive" aria-label="Next testimonial">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}