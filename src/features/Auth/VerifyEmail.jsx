import React, { useState, useRef, useEffect } from "react";
import "./AuthStyles/VerifyEmail.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const nav = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // Changed to 2 minutes (120 seconds)
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const BaseUrl = import.meta.env.VITE_Base_Url;

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (timeLeft > 0 && !isExpired) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsExpired(true);
    }
  }, [timeLeft, isExpired]);

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

  const handleResendCode = async () => {
    if (!userEmail) {
      toast.error("Email not found. Please sign up again.");
      nav("/signup");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BaseUrl}/admin/resend-otp`, {
        email: userEmail,
      });
      toast.success(response.data.message || "OTP code resent successfully!");

      setTimeLeft(120);
      setIsExpired(false);
      setOtp(["", "", "", "", "", ""]);

      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    } catch (error) {
      console.error("Resend error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to resend OTP code. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    if (isExpired) {
      setError("Code has expired. Please request a new code");
      return;
    }

    if (!userEmail) {
      toast.error("Email not found. Please sign up again.");
      nav("/signup");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BaseUrl}/admin/verify`, {
        email: userEmail,
        otp: otpCode,
      });

      toast.success(response.data.message || "Email verified successfully!");

      localStorage.removeItem("userEmail");

      setTimeout(() => {
        nav("/login");
      }, 2000);
    } catch (error) {
      console.error("Verification error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("Failed to verify email. Please try again.");
        toast.error("Failed to verify email. Please try again.");
      }

      setOtp(["", "", "", "", "", ""]);

      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <section className="verify_container geist-content">
      <ToastContainer position="top-right" autoClose={5000} />

      <article className="verify_holder">
        <aside className="verify_left">
          <img
            src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png"
            alt="signup img"
          />
          <div className="Logo-verify_holder">
            <img
              src="https://i.postimg.cc/PJgRQh50/logo.png"
              alt="logo"
              onClick={() => nav("/")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="verify_text">
            <h1>Verify Your Email</h1>
            <p>
              Please enter the 6-digit code sent to your email address to
              complete your registration.
            </p>
          </div>
        </aside>

        <aside className="verify_right">
          <h2>Verify Your Email</h2>

          <div className="verify_otp">
            <label>We've sent an OTP code to your email</label>
            <span className="otp_span">
              {userEmail || "your email address"}
            </span>
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
                  disabled={isExpired || isLoading}
                  autoComplete="off"
                />
              ))}
            </div>

            <label className="verify_code">
              Code will expire{" "}
              <span className={timeLeft <= 10 ? "expiring-soon" : ""}>
                {formatTime(timeLeft)}
              </span>
            </label>

            {error && <div className="error-message">{error}</div>}

            <button
              className="resend-btn"
              onClick={handleResendCode}
              disabled={isLoading || (!isExpired && timeLeft > 0)}
            >
              {isLoading ? "Sending..." : "Resend Code"}
            </button>
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
