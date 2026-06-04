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
    <section className="faq-container">
      <div className="faq-info">
        <span className="faq-tag">FAQs</span>
        <h2 className="faq-title">
          Got Questions? We’ve Got <span className="highlight">Answers</span>
        </h2>
        <p className="faq-description">
          Quick answers to common questions about the platform.
        </p>
      </div>

      <div className="faq-accordion-list">
        {faqData.map((item, index) => (
          <div 
            key={item.id} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="faq-item-header">
              <span className="faq-number">{item.id}</span>
              <h3 className="faq-question">{item.question}</h3>
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-item-content">
                <p>Yes, parents receive important updates and alerts instantly.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
