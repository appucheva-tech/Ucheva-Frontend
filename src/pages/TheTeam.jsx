import React, { useState } from 'react';
import './TheTeam.css';
import Emmanuella from '../assets/Emmanuella.jpg';
import Omosimisola from '../assets/Simi.jpg';
import Muiz from '../assets/Muiz.jpg';
import Emmanuel from '../assets/Emmanuel.jpg';
import Kareem from '../assets/Kareem.png';
import Ifeanacho from '../assets/Ifeanacho.jpg';

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const teamMembers = [
    {
      name: 'Emmanuella Orji',
      role: 'Product Designer',
      image: Emmanuella
    },
    {
      name: 'Omoniyi Omosimisola',
      role: 'Frontend Developer',
      image: Omosimisola
    },
    {
      name: 'Muiz Kareem',
      role: 'Backend Developer',
      image: Muiz
    },
    {
      name: 'Emmanuel Offozor',
      role: 'Backend Developer',
      image: Emmanuel
    },
    {
      name: 'Kareem Omogbolahan',
      role: 'Frontend Developer',
      image: Kareem
    },
    {
      name: 'Ifeanacho Francis',
      role: 'Frontend Developer',
      image: Ifeanacho
    }
  ];

  return (
    <section className="RRteam-container">
      <div className="RRteam-header">
        <span className="RRteam-subtitle">The Team</span>
        <h2 className="RRteam-title">
          Meet The People Behind <span className="RRhighlight">Ucheva</span>
        </h2>
        <p className="RRteam-intro">The principles that guide every decision we make.</p>
      </div>

      <div className="RRteam-grid" onMouseLeave={() => setActiveIndex(null)}>
        {teamMembers.map((member, index) => {
          const isActive = activeIndex === index;

          return (
            <div 
              key={index} 
              className={`RRteam-card ${isActive ? 'RRactive' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="RRimage-wrapper">
                <img src={member.image} alt={member.name} className="RRteam-img" />
                
                {isActive && (
                  <div className="RRsocial-sidebar">
                    <a href="#facebook" className="RRsocial-icon" aria-label="Facebook">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
                      </svg>
                    </a>
                    <a href="#instagram" className="RRsocial-icon" aria-label="Instagram">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#twitter" className="RRsocial-icon" aria-label="Twitter">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
              <div className="RRteam-info">
                <h3 className="RRteam-member-name">{member.name}</h3>
                <p className="RRteam-member-role">{member.role}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TeamSection;