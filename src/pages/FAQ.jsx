import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    { id: '01', question: 'Is the platform easy to use?' },
    { id: '02', question: 'Can parents receive updates?' },
    { id: '03', question: 'Can parents receive updates?' },
    { id: '04', question: 'Can parents receive updates?' },
    { id: '05', question: 'Can parents receive updates?' }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="MMfaq-container">
      <div className="MMfaq-info">
        <span className="MMfaq-tag">FAQs</span>
        <h2 className="MMfaq-title">
          Got Questions? We’ve Got <span className="MMhighlight">Answers</span>
        </h2>
        <p className="MMfaq-description">
          Quick answers to common questions about the platform.
        </p>
      </div>

      <div className="MMfaq-accordion-list">
        {faqData.map((item, index) => (
          <div 
            key={item.id} 
            className={`MMfaq-item ${activeIndex === index ? 'MMactive' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="MMfaq-item-header">
              <span className="MMfaq-number">{item.id}</span>
              <h3 className="MMfaq-question">{item.question}</h3>
              <span className="MMfaq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="MMfaq-item-content">
                <p>
                  {item.id === '01' 
                    ? 'Yes, its designed to be simple and easy for school staff to use.' 
                    : 'Yes, parents receive important updates and alerts instantly.'}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;