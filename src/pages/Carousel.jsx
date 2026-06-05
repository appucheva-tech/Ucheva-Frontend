import React from 'react';
import './Carousel.css';
import School1 from '../assets/School1.jpg'
import School2 from '../assets/School2.jpg'
import School3 from '../assets/School3.jpg'
import School4 from '../assets/School4.jpg'
import School5 from '../assets/School5.png'
import School6 from '../assets/School6.jpg'

const logos = [
  { id: 1, name: 'Harmony', src: School1 },
  { id: 2, name: 'Excel', src: School2 },
  { id: 3, name: 'Riviera Schools', src: School3 },
  { id: 4, name: 'Earlytech Junior College', src: School4 },
  { id: 5, name: 'The School Child', src: School5 },
  { id: 6, name: 'CDA Education', src: School6 },
];

const Carousel = () => {
  const doubleLogos = [...logos, ...logos];

  return (
    <div className="carousel-container">
      <div className="carousel-label">Trusted By</div>
      
      <div className="carousel-slider">
        <div className="carousel-track">
          {doubleLogos.map((logo, index) => (
            <div className="carousel-slide" key={`${logo.id}-${index}`}>
              <img src={logo.src} alt={`${logo.name} logo`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
