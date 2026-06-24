// src/components/Modals/VerifyModal.jsx
import React, { useState, useEffect } from 'react';
import './Modals.css';

const VerifyModal = ({ isOpen, onClose, onVerify, email, withdrawalData }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setCode(['', '', '', '', '', '']);
      setTimer(59);
      setIsResendDisabled(true);
      setError('');
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    onVerify(fullCode, withdrawalData);
  };

  const handleResend = () => {
    setTimer(59);
    setIsResendDisabled(true);
    setCode(['', '', '', '', '', '']);
    setError('');
    // Trigger resend API call here
    console.log('Resending verification code...');
    // Focus first input
    document.getElementById('code-0')?.focus();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content verify-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">Verify Withdrawal</h2>
        
        <p className="verify-description">
          Enter the 6-digit code sent to your registered email address.
        </p>
        
        <div className="email-display">
          <span className="email-icon">✉</span>
          <a href={`mailto:${email}`} className="email-link">{email}</a>
        </div>

        <div className="code-input-container">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`code-input ${error ? 'error' : ''}`}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {error && <div className="verify-error">{error}</div>}

        <div className="timer-container">
          <span>Link will expire in </span>
          <span className="timer">{timer}s</span>
        </div>

        <button onClick={handleVerify} className="verify-btn">
          Verify
        </button>

        <div className="resend-container">
          <span className="resend-text">Didn't receive the code?</span>
          <button 
            onClick={handleResend} 
            disabled={isResendDisabled}
            className={`resend-btn ${isResendDisabled ? 'disabled' : ''}`}
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;