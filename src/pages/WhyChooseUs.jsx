import React from 'react'
import './WhyChooseUs.css';
import UchevaCircle from '../assets/UchevaCircle.png';
import { PiHandTap } from "react-icons/pi";
import { FaUsersGear } from "react-icons/fa6";
import { IoMdAlarm } from "react-icons/io";
import { TbBrandWechat } from "react-icons/tb";
import { CiLock } from "react-icons/ci";
import { LuCalendarCheck } from 'react-icons/lu';


const WhyChooseUs = () => {

    const features = [
  {
    id: 1,
    title: 'Easy to Use',
    description: 'Simple and intuitive tools designed for administrators, teachers, and staff.',
    icon: <PiHandTap /> 
  },
  {
    id: 2,
    title: 'All-in-One Management',
    description: 'Manage attendance, fees, records, and communication from one platform.',
    icon: <FaUsersGear />
  },
  {
    id: 3,
    title: 'Real-Time Access',
    description: 'Monitor school activities and updates anytime, from anywhere.',
    icon: <IoMdAlarm />
  },
  {
    id: 4,
    title: 'Faster Communication',
    description: 'Keep parents and staff informed with instant notifications and updates.',
    icon: <TbBrandWechat />
  },
  {
    id: 5,
    title: 'Secure Data Management',
    description: 'Store important school records safely with organized digital access.',
    icon: <CiLock />
  },
  {
    id: 6,
    title: 'Built for Growing Schools',
    description: 'Flexible tools designed to support schools as they grow and expand.',
    icon: <LuCalendarCheck />
  }
];

  return (
    <>
      <section className='HHMainSection'>
        <div className='HHMainSectionLeft'>
            <div className='HHMainSectionLeftCont1'>
                <section className="HHschool-promo">
                <span className="HHsub-heading">Why Choose Us</span>
                <h2 className="HHmain-heading">Why Modern Schools Choose Ucheva</h2>
                <p className="HHdescription">
                    Built to make school management simpler, faster, and more organized.
                </p>
    </section>
            </div>
            <div className='HHMainSectionLeftCont2'>
                <img src={UchevaCircle} alt="" className='HHUchevaCircle'/>
            </div>
        </div>

        <div className='HHMainSectionRight'>
            <div className="HHfeatures-container">
            {features.map((feature) => (
                <div key={feature.id} className="HHfeature-card">
                <div className="HHicon-wrapper">
                    <span className="HHfeature-icon">{feature.icon}</span>
                </div>
                <div className="HHtext-wrapper">
                    <h3 className="HHfeature-title">{feature.title}</h3>
                    <p className="HHfeature-description">{feature.description}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
      </section>
    </>
  )
}

export default WhyChooseUs;