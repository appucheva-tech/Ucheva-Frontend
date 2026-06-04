import React from 'react';
import './Button.css';

export default function Button({ text, onClick, type }) {
  return (
    <button 
      className={`btn-${type}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
}
