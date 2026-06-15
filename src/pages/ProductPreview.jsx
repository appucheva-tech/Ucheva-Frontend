import React from 'react';
import './ProductPreview.css';
import dark from '../assets/dark.svg'

const ProductPreview = () => {
  return (
    <>
    <div className="FFpreview-container">
      <span className="FFpreview-tag">Product Preview</span>
      <h1 className="FFpreview-title">Your School. One Powerful Dashboard</h1>
      <p className="FFpreview-description">
        Get started in minutes with a simple process designed to
        help schools manage operations more efficiently.
      </p>
    </div>
    <section className='FFAdminSection'>
        <img src={dark} alt="" className='FFAdminDashboard'/>
    </section>
    </>
  );
};

export default ProductPreview;