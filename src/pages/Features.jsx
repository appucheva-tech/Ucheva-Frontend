import React from 'react';
import { LuCalendarCheck, LuCreditCard, LuMessageSquare, LuShieldCheck} from 'react-icons/lu';
import { FaRegUser } from "react-icons/fa";
import './Features.css';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <LuCalendarCheck className='EEFIcons'/>, 
      title: 'Digital Attendance Tracking',
      description: 'Track student attendance digitally and monitor daily records in real time.'
    },
    {
      id: 2,
      icon: <LuCreditCard className='EEFIcons'/>,
      title: 'Fee Management System',
      description: 'Manage school fees, track payments, and monitor outstanding balances easily.'
    },
    {
      id: 4,
      icon: <LuMessageSquare className='EEFIcons'/>,
      title: 'WhatsApp Parent Alerts',
      description: 'Send important updates, reminders, and announcements directly to parents instantly.'
    },
    {
      id: 5,
      icon: <LuShieldCheck className='EEFIcons'/>,
      title: 'Online School Fee Payments',
      description: 'Allow parents to make secure school fee payments conveniently from anywhere.'
    }
  ];

  return (
    <>
    <section className="EEfeatures-container">
      <div className="EEfeatures-header">
        <span className="EEsubtitle">Featuring</span>
        <h2 className="EEFtitle">
          Features That Simplify <span className="EEFhighlight"> School Management</span>
        </h2>
        <p className="EEFdescription">
          Smart tools built to make daily school operations easier and more organized.
        </p>
        <div className='EELeftDownCont'>
            <article className='EELeftDownContArt'>
                <FaRegUser className='EEFIcons'/>
            </article>
            <h1 className='EELeftDownContH1'>Student & Staff Records</h1>
            <p className='EELeftDownContP'>Organize and access student and staff 
                <br />information from one secure system.</p>
        </div>
      </div>

      <div className="EEfeatures-grid">
        {features.map((feature) => (
          <div key={feature.id} className="EEfeature-card">
            <div className="EEicon-wrapper">{feature.icon}</div>
            <h3 className="EEcard-title">{feature.title}</h3>
            <p className="EEcard-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default Features;