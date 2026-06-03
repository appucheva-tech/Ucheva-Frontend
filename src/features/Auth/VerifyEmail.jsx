import React, { useState, useRef, useEffect } from "react";
import "./AuthStyles/VerifyEmail.css"
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
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
      nav("/login");
    }, 500);
  };

  return (
    <section className="verify_container geist-content">
      <article className="verify_holder">
        <aside className="verify_left">
          <img
            src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png"
            alt="signup img"
          />
          <div className="Logo-verify_holder ">
            <img src="https://i.postimg.cc/PJgRQh50/logo.png" alt="" />
          </div>
        </aside>
        <aside className="verify_right">
          <h2>Verify Your Email</h2>
          <div className="verify_otp">
            <label>
              We've sent an OTP code to your email <br />
            </label>
            <span className="otp_span">nodosacademy@gmail.com</span>
          </div>
          <div className="verify_expire">
            <div className="verify_expire_btn">
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
            <label className="verify_code">
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

          <div className="verifyBtn">
            <button
              className="verify_btn"
              onClick={handleVerify}
              disabled={isExpired || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
            <label className="verify_Account">
              Already have an Account?
              <span onClick={() => nav("/login")}> Login</span>
            </label>
          </div>
        </aside>
      </article>
    </section>
  );
};

export default VerifyEmail;