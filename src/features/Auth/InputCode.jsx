import React, { useState, useRef, useEffect } from "react";
import "./AuthStyles/InputCode.css"
import { useNavigate } from "react-router-dom";

const InputCode = () => {
  const nav = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(59);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsExpired(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); 
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedNumbers = pastedData.replace(/\D/g, "").slice(0, 6);

    if (pastedNumbers) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedNumbers.length; i++) {
        newOtp[i] = pastedNumbers[i];
      }
      setOtp(newOtp);

      const nextIndex = Math.min(pastedNumbers.length, 5);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const handleResendCode = () => {
    setIsLoading(true);

    setTimeout(() => {
      setTimeLeft(59);
      setIsExpired(false);
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setIsLoading(false);

      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 500); 
  };

  const handleVerify = () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    if (isExpired) {
      setError("Code has expired. Please request a new code");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      nav("/resetPassword");
    }, 500);
  };

  return (
    <section className="inputCode_container geist-content">
      <article className="inputCode_holder">
        <aside className="inputCode_left">
          <img src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png" alt="img" />
              <div className="logo-inputCode_holder">
            <img src="https://i.postimg.cc/PJgRQh50/logo.png" alt="" />
          </div>
        </aside>
        <aside className="inputCode_right">
          <h2>Input Code</h2>
          <div className="inputCode_otp">
            <label>
              Input the 6-digit OTP code sent to your email 
            </label>
            <span className="otp_span">nodosacademy@gmail.com</span>
          </div>

          <div className="inputCode_expire">
            <div className="inputCode_expire_btn">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`otp-input ${error ? "error-input" : ""}`}
                  disabled={isExpired}
                />
              ))}
            </div>

            <label className="inputCode_code">
              Code will expire{" "}
              <span className={timeLeft <= 10 ? "expiring-soon" : ""}>
                {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}s
              </span>
            </label>

            {error && <div className="error-message">{error}</div>}

            {isExpired && (
              <button
                className="resend-btn"
                onClick={handleResendCode}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Resend Code"}
              </button>
            )}
          </div>

          <div className="inputCodeBtn">
            <button
              className="inputCode_btn"
              onClick={handleVerify}
              disabled={isExpired || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </aside>
      </article>
    </section>
  );
};

export default InputCode;