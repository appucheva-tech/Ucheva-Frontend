import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminStaff.css'
import { PiStudentFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiCalendarBlankFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const AdminStaff = () => {  
    const nav = useNavigate();

  const staffData = [
    { id:1, name: 'Adaeze Clinton', role: 'Teacher', class: 'SS 1A', subject: 'Mathematics', phone: '08032456789' },
    { id:2, name: 'Emeka Ugonna', role: 'Teacher', class: 'JSS 2C', subject: 'English Language', phone: '08061234567' },
    { id:3, name: 'Tolu Adesunya', role: 'Bursar', class: '--', subject: '--', phone: '08029876543' },
    { id:4, name: 'Chidi Okoronkwo', role: 'Security', class: '--', subject: '--', phone: '08098765432' },
    { id:5, name: 'Grace Obidi', role: 'Cleaner', class: '--', subject: '--', phone: '08101122233' },
    { id:6, name: 'Ifeanyi Okafor', role: 'Teacher', class: 'SS 2A', subject: 'Physics', phone: '08055567788' },
    { id:7, name: 'Ngozi Bassey', role: 'Teacher', class: 'JSS 1B', subject: 'Basic Science', phone: '08073345566' }
  ];

  return (
    <>
<div className="Ddashboard-container">
      <header className="Ddashboard-header">
        <h1 className="Dwelcome-text">
          Staff Management <button className='DAddStaff' onClick={() => nav ('AdminStaff2')}>+ Add Staff</button>
        </h1>
        <p className="Dsubtitle-text">
          Manage Teaching and non-teaching staff records. Add, edit and assign staff to classes or subjects.
        </p>
      </header>

      <div className="Dmetrics-grid">
        <div className="Dmetric-card Dcard-students">
          <div className="Dcard-content">
            <div className="Dtext-section">
              <span className="Dcard-label">Total Staff</span>
              <span className="Dcard-value">38</span>
            </div>
            <div className="Dicon-wrapper Dicon-students">
              <PiStudentFill className='DDashIcon'/>
            </div>
          </div>
          <div className="Dcard-footer Dtrend-up">
          </div>
        </div>

        <div className="Dmetric-card Dcard-staff">
          <div className="Dcard-content">
            <div className="Dtext-section">
              <span className="Dcard-label">Teaching Staff</span>
              <span className="Dcard-value">28</span>
            </div>
            <div className="Dicon-wrapper Dicon-staff">
              <HiMiniUserGroup className='DDashIcon'/>
            </div>
          </div>
          <div className="Dcard-footer Dtrend-up">
          </div>
        </div>

        <div className="Dmetric-card Dcard-attendance">
          <div className="Dcard-content">
            <div className="Dtext-section">
              <span className="Dcard-label">Non-Teaching Staff</span>
              <span className="Dcard-value">10</span>
            </div>
            <div className="Dicon-wrapper Dicon-attendance">
              <PiCalendarBlankFill className='DDashIcon'/>
            </div>
          </div>
          <div className="Dcard-footer Dtrend-up">
          </div>
        </div>

        <div className="Dmetric-card Dcard-fees">
          <div className="Dcard-content">
            <div className="Dtext-section">
              <span className="Dcard-label">Class Teachers</span>
              <span className="Dcard-value">32</span>
            </div>
            <div className="Dicon-wrapper Dicon-fees">
              <FaSackDollar className='DDashIcon'/>
            </div>
          </div>
          <div className="Dcard-footer Dtrend-pct">
          </div>
        </div>
      </div>
    </div>

    <div className="DtableContainer">
      <div className="DfilterSection">
        <div className="DfilterGroup">
          <label className="DfilterLabel">Staff Type</label>
          <div className="DselectWrapper">
            <select className="DselectInput" defaultValue="all">
              <option value="all">All Types</option>
              <option value="all">Teaching Staff</option>
              <option value="all">Non-Teaching Staff</option>
            </select>
          </div>
        </div>
        <button className="DresetBtn">
          <svg className="DresetIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
          </svg>
          Reset
        </button>
      </div>

      <div className="DtableWrapper">
        <table className="DstaffTable">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Role</th>
              <th>Assigned Class</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff, index) => (
              <tr key={index} >
                <td className="DstaffName" onClick={() => nav (`AdminStaffDetails/${staff.id}`)}>{staff.name}</td>
                <td className="DroleText">{staff.role}</td>
                <td className="DclassText">{staff.class}</td>
                <td className="DsubjectText">{staff.subject}</td>
                <td>{staff.phone}</td>
                <td>
                  <div className="DactionButtons">
                      <MdOutlineEdit className="DeditBtn"/>
                      <RiDeleteBinLine className="DdeleteBtn"/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="DpaginationRow">
          <div className="DpaginationInfo">
            Showing pages of 1 to 7
          </div>
          
          <div className="DpaginationControls">
            <button className="DarrowBtn" disabled>&lt;</button>
            <button className="DpageBtn DactivePage">1</button>
            <button className="DpageBtn">2</button>
            <button className="DpageBtn">3</button>
            <span className="Dellipsis">...</span>
            <button className="DpageBtn">6</button>
            <button className="DpageBtn">7</button>
            <button className="DarrowBtn">&gt;</button>
          </div>

          <div className="DrowsPerPageGroup">
            <span className="DrowsLabel">Rows per page</span>
            <div className="DrowsSelectWrapper">
              <select className="DrowsSelect" defaultValue="10">
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
} 

export default AdminStaff
