import React from 'react'
import './WhyChooseUs.css';
import UchevaCircle from '../assets/Ucheva Circle.png'

const WhyChooseUs = () => {

    const features = [
  {
    id: 1,
    title: 'Easy to Use',
    description: 'Simple and intuitive tools designed for administrators, teachers, and staff.',
    icon: '☝️' // Replace with your own SVG or Icon component
  },
  {
    id: 2,
    title: 'All-in-One Management',
    description: 'Manage attendance, fees, records, and communication from one platform.',
    icon: '👥'
  },
  {
    id: 3,
    title: 'Real-Time Access',
    description: 'Monitor school activities and updates anytime, from anywhere.',
    icon: '⏰'
  },
  {
    id: 4,
    title: 'Faster Communication',
    description: 'Keep parents and staff informed with instant notifications and updates.',
    icon: '💬'
  },
  {
    id: 5,
    title: 'Secure Data Management',
    description: 'Store important school records safely with organized digital access.',
    icon: '🔒'
  },
  {
    id: 6,
    title: 'Built for Growing Schools',
    description: 'Flexible tools designed to support schools as they grow and expand.',
    icon: '📅'
  }
];

  return (
    <>
      <section className='MainSection'>
        <div className='MainSectionLeft'>
            <div className='MainSectionLeftCont1'>
                <section className="school-promo">
                <span className="sub-heading">Why Choose Us</span>
                <h2 className="main-heading">Why Modern Schools Choose Ucheva</h2>
                <p className="description">
                    Built to make school management simpler, faster, and more organized.
                </p>
    </section>
            </div>
            <div className='MainSectionLeftCont2'>
                <img src={UchevaCircle} alt="" className='UchevaCircle'/>
            </div>
        </div>

        <div className='MainSectionRight'>
            <div className="features-container">
            {features.map((feature) => (
                <div key={feature.id} className="feature-card">
                <div className="icon-wrapper">
                    <span className="feature-icon">{feature.icon}</span>
                </div>
                <div className="text-wrapper">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
      </section>
    </>
  )
}

export default WhyChooseUs
