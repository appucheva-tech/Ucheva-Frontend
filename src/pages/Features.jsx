import React from 'react';
import { LuCalendarCheck, LuCreditCard, LuMessageSquare, LuShieldCheck, LuUsers } from 'react-icons/lu';
import './Features.css';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <LuCalendarCheck className='FIcons'/>, 
      title: 'Digital Attendance Tracking',
      description: 'Track student attendance digitally and monitor daily records in real time.'
    },
    {
      id: 2,
      icon: <LuCreditCard className='FIcons'/>,
      title: 'Fee Management System',
      description: 'Manage school fees, track payments, and monitor outstanding balances easily.'
    },
    {
      id: 4,
      icon: <LuMessageSquare className='FIcons'/>,
      title: 'WhatsApp Parent Alerts',
      description: 'Send important updates, reminders, and announcements directly to parents instantly.'
    },
    {
      id: 5,
      icon: <LuShieldCheck className='FIcons'/>,
      title: 'Online School Fee Payments',
      description: 'Allow parents to make secure school fee payments conveniently from anywhere.'
    }
  ];

  return (
    <section className="features-container">
      <div className="features-header">
        <span className="subtitle">Featuring</span>
        <h2 className="Ftitle">
          Features That Simplify 
          <span className="Fhighlight"> School Management</span>
        </h2>
        <p className="Fdescription">
          Smart tools built to make daily school operations easier and more organized.
        </p>
        <div className='LeftDownCont'>
            <article className='LeftDownContArt'>
                {/* <LuUsers /> */}
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
  );
};

export default Features;
