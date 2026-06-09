import React from 'react';
import './Features.css';
import ProductPreview from './ProductPreview';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: '📅', 
      title: 'Digital Attendance Tracking',
      description: 'Track student attendance digitally and monitor daily records in real time.'
    },
    {
      id: 2,
      icon: '💳',
      title: 'Fee Management System',
      description: 'Manage school fees, track payments, and monitor outstanding balances easily.'
    },
    
    {
      id: 4,
      icon: '💬',
      title: 'WhatsApp Parent Alerts',
      description: 'Send important updates, reminders, and announcements directly to parents instantly.'
    },
    {
      id: 5,
      icon: '🛡️',
      title: 'Online School Fee Payments',
      description: 'Allow parents to make secure school fee payments conveniently from anywhere.'
    }
  ];

  return (

    <>
    <section className="features-container">
      <div className="features-header">
        <span className="subtitle">Featuring</span>
        <h2 className="title">
          Features That Simplify <br />
          <span className="highlight">School Management</span>
        </h2>
        <p className="description">
          Smart tools built to make daily school operations easier and more organized.
        </p>
        <div className='LeftDownCont'>
            <article className='LeftDownContArt'>
                👤
            </article>
            <h1 className='LeftDownContH1'>Student & Staff Records</h1>
            <p className='LeftDownContP'>Organize and access student and staff 
                <br />information from one secure system.</p>
        </div>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className="icon-wrapper">{feature.icon}</div>
            <h3 className="card-title">{feature.title}</h3>
            <p className="card-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
    <ProductPreview />
    </>
  );
};

export default Features;
