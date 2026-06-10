import React, { useState, useRef, useEffect } from "react";
import "./AuthStyles/InputCode.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputCode = () => {
  const nav = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
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
      toast.error("Email not found. Please try again.");
      nav("/forgetpassword");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BaseUrl}/admin/resend-otp`, {
        email: userEmail,
      });
      toast.success(
        response?.data?.message || "Verification code resent to your email",
      );

      setTimeLeft(120);
      setIsExpired(false);
      setOtp(["", "", "", "", "", ""]);

      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    } catch (error) {
      console.error("Resend code error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
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
      toast.error("Email not found. Please try again.");
      nav("/forgetpassword");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BaseUrl}/admin/verify-password`, {
        email: userEmail,
        otp: otpCode,
      });

      toast.success(response?.data?.message || "OTP verified successfully!");

      setTimeout(() => {
        nav("/resetpassword");
      }, 1500);
    } catch (error) {
      console.error("Verify OTP error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);

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
    <section className="inputCode_container geist-content">
      <ToastContainer position="top-right" autoClose={5000} />

      <article className="inputCode_holder">
        <aside className="inputCode_left">
          <img src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png" alt="img" />
          <div className="logo-inputCode_holder">
            <img
              src="https://i.postimg.cc/PJgRQh50/logo.png"
              alt="logo"
              onClick={() => nav("/")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="inputCode_text">
            <h1>Verify Your Code</h1>
            <p>
              Please enter the 6-digit code sent to your email address to reset
              your password.
            </p>
          </div>
        </aside>

        <aside className="inputCode_right">
          <h2>Input Code</h2>

          <div className="inputCode_otp">
            <label>Input the 6-digit OTP code sent to your email</label>
            <span className="otp_span">
              {userEmail || "your email address"}
            </span>
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
                  disabled={isExpired || isLoading}
                  autoComplete="off"
                />
              ))}
            </div>

            <label className="inputCode_code">
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

          <div className="inputCodeBtn">
            <button
              className="inputCode_btn"
              onClick={handleVerify}
              disabled={isExpired || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>

            {/* <label className="backToLogin" onClick={() => nav("/login")}>
              ← Back to Login
            </label> */}
          </div>
        </aside>
      </article>
    </section>
  );
};

export default InputCode;
