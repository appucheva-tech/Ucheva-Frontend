import React from 'react';
import './ProductPreview.css';
import dark from '../assets/dark.svg'

const ProductPreview = () => {
  return (
    <>
    <div className="preview-container">
      <span className="preview-tag">Product Preview</span>
      <h1 className="preview-title">Your School. One Powerful Dashboard</h1>
      <p className="preview-description">
        Get started in minutes with a simple process designed to
        help schools manage operations more efficiently.
      </p>
    </div>
    <section className='AdminSection'>
        <img src={dark} alt="" className='AdminDashboard'/>
    </section>
    </>
  );
};

export default ProductPreview;
