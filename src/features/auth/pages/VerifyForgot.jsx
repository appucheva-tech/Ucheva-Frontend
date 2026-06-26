import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "../styles/verify-forgot.css";
import { apiClient } from "../../../config/AxiosInstance";

const VerifyForgot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const subdomain = window.location.hostname.split(".")[0];

  // Captures email securely passed down from the prior page
  const userEmail = location.state?.email || searchParams.get("email") || "";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(59);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft === 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleInputChange = (element, index) => {
    const val = element.value;
    if (isNaN(val)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = val.substring(val.length - 1);
    setOtp(updatedOtp);

    if (error) setError("");

    if (val && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = "";
        setOtp(updatedOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pastedData)) return;

    const splitValues = pastedData.slice(0, 6).split("");
    const updatedOtp = [...otp];

    splitValues.forEach((char, idx) => {
      if (idx < 6) updatedOtp[idx] = char;
    });
    setOtp(updatedOtp);

    const focusTargetIndex = Math.min(splitValues.length - 1, 5);
    if (inputRefs.current[focusTargetIndex]) {
      inputRefs.current[focusTargetIndex].focus();
    }
  };

  const handleResendCode = async () => {
    if (timeLeft > 0 || !userEmail) return;

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      await apiClient.post(
        "/admin/resend-otp",
        { email: userEmail },
        {
          headers: {
            "x-tenant": subdomain,
          },
        },
      );

      setSuccessMessage("A fresh verification pin has been sent.");
      setTimeLeft(59);
      setOtp(new Array(6).fill(""));
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to resend validation code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // VERIFIES THE INPUTTED OTP CODE AND NAVIGATES MANUALLY WITH ROUTER STATE
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const codeString = otp.join("");

    if (codeString.length < 6) {
      setError("Please fill out all verification blocks.");
      return;
    }

    if (!userEmail) {
      setError("Email address is missing. Please restart the request.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const payload = {
        email: userEmail,
        otp: codeString,
      };

      console.log("[API Call] Verifying OTP code token:", payload);

      // 1. Fire verification payload to your endpoint
      await apiClient.post("/admin/verify-password", payload, {
        headers: {
          "x-tenant": subdomain,
        },
      });

      setSuccessMessage("Code verified successfully! Proceeding...");

      // 2. Wait slightly, then route manually passing the context inside history state
      setTimeout(() => {
        navigate("/reset-password", {
          state: { email: userEmail },
        });
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid OTP token code provided. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page-viewport">
      <div className="verify-card-box">
        <h1 className="verify-title">Input Code</h1>

        <p className="verify-subtext">
          Input the 6-digit OTP code sent to your email <br />
          <span className="user-email-highlight">
            {userEmail || "your email address"}
          </span>
        </p>

        <form onSubmit={handleOtpVerification}>
          {/* OTP Box Inputs Container */}
          <div className="otp-inputs-row">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                pattern="[0-9]*"
                inputMode="numeric"
                className={`otp-digit-field ${error ? "otp-field-error" : ""}`}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInputChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                disabled={loading}
              />
            ))}
          </div>

          {successMessage && (
            <p className="otp-success-toast">{successMessage}</p>
          )}
          {error && <p className="otp-error-toast">{error}</p>}

          {/* Countdown / Resend Indicator */}
          <p className="countdown-timer-text">
            {loading ? (
              <span className="processing-text">Processing request...</span>
            ) : timeLeft > 0 ? (
              <>
                Code will expire in{" "}
                <span className="timer-countdown">
                  0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
                </span>
              </>
            ) : (
              <span
                className="resend-action-trigger"
                onClick={handleResendCode}
              >
                Resend Code
              </span>
            )}
          </p>

          <button
            type="submit"
            className="verify-submit-button"
            disabled={loading || otp.includes("")}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="verify-footer-nav">
          Already have an account?{" "}
          <span className="login-link-span" onClick={() => navigate("/login")}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyForgot;
