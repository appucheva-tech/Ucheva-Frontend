import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/verify-email.css";
import { apiClient } from "../../../config/AxiosInstance";
import logo from "../../../assets/Logo.svg";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subdomain = window.location.hostname.split(".")[0];

  const userEmail =
    searchParams.get("email") ||
    localStorage.getItem("userEmail") ||
    "your-email@domain.com";
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(300);

  const [error, setError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  const inputRefs = useRef([]);

  useEffect(() => {
    const isComplete = otp.every((digit) => digit !== "");

    if (!isComplete) return;
    if (loading) return;

    const timeout = setTimeout(() => {
      handleVerifySubmit();
    }, 300);

    return () => clearTimeout(timeout);
  }, [otp]);

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
    if (serverSuccess) setServerSuccess("");

    if (val && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
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
    if (error) setError("");
    if (serverSuccess) setServerSuccess("");

    const focusTargetIndex = Math.min(splitValues.length, 5);
    inputRefs.current[focusTargetIndex].focus();
  };

  const handleResendCode = async () => {
    if (timeLeft > 0) return;

    try {
      setLoading(true);
      setError("");
      setServerSuccess("");

      await apiClient.post(
        "/admin/resend-otp",
        { email: userEmail },
        {
          headers: { "x-tenant": subdomain },
        },
      );

      setServerSuccess(
        "A new verification code has been dispatched to your email address.",
      );
      setTimeLeft(300);
      setOtp(new Array(6).fill(""));
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e) => {
    if (e) e.preventDefault();
    const verificationCode = otp.join("");

    if (verificationCode.length < 6) {
      setError("Please fill out all verification blocks.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setServerSuccess("");

      const payload = {
        email: userEmail,
        otp: verificationCode,
      };

      const response = await apiClient.post("/admin/verify", payload, {
        headers: {
          "x-tenant": subdomain,
        },
      });

      console.log("[API Success] OTP Verified successfully!", response.data);
      setServerSuccess(
        "Email verification successful! Redirecting you to your workspace...",
      );

      if (response.data) {
        const { loginRedirectUrl, verifyRedirectLocalUrl } = response.data;

        const isLocalhost =
          window.location.hostname.includes("localhost") ||
          window.location.hostname.includes("127.0.0.1") ||
          window.location.hostname.includes("nip.io");

        let targetUrl = isLocalhost
          ? verifyRedirectLocalUrl
          : loginRedirectUrl || "/login";

        if (targetUrl.includes("www.")) {
          targetUrl = targetUrl.replace("www.", "");
        }

        setTimeout(() => {
          window.location.href = targetUrl;
        }, 1500);
      } else {
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid OTP code provided. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Verify-page-viewport">
      {/* Form Content Area Container */}
      <div className="Verify-form-container">
        <div className="Verify-card-box">
          <div className="Verify-main-app-logo">
            <img src={logo} alt="Company Logo" />
          </div>

          <h1 className="Verify-title">Verify Your Email</h1>

          <p className="Verify-subtext">
            We've sent an OTP code to your email <br />
            <span className="Verify-user-email-highlight">{userEmail}</span>
          </p>

          <form onSubmit={handleVerifySubmit} className="Verify-form-element">
            <div className="Verify-otp-inputs-row">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className={`Verify-otp-digit-field ${error ? "Verify-otp-field-error" : ""}`}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleInputChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  disabled={loading}
                />
              ))}
            </div>

            <p className="Verify-countdown-timer-text">
              {loading ? (
                <span className="Verify-processing-text">Processing request...</span>
              ) : timeLeft > 0 ? (
                <>
                  Code will expire in{" "}
                  <span className="Verify-timer-countdown">
                    {Math.floor(timeLeft / 60)}:
                    {(timeLeft % 60).toString().padStart(2, "0")}s
                  </span>
                </>
              ) : (
                <span
                  className="Verify-resend-action-trigger"
                  onClick={handleResendCode}
                >
                  Resend Code
                </span>
              )}
            </p>

            {/* In-Card Dynamic Notification Banners positioned above button */}
            {error && (
              <div className="Verify-inline-banner Verify-banner-error">
                <span className="Verify-banner-icon">⚠️</span>
                <p className="Verify-banner-text">{error}</p>
                <button
                  type="button"
                  className="Verify-banner-close-btn"
                  onClick={() => setError("")}
                >
                  &times;
                </button>
              </div>
            )}

            {serverSuccess && (
              <div className="Verify-inline-banner Verify-banner-success">
                <span className="Verify-banner-icon">🎉</span>
                <p className="Verify-banner-text">{serverSuccess}</p>
                <button
                  type="button"
                  className="Verify-banner-close-btn"
                  onClick={() => setServerSuccess("")}
                >
                  &times;
                </button>
              </div>
            )}

            <button
              type="submit"
              className="Verify-submit-button"
              disabled={loading || otp.includes("")}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>

          <p className="Verify-footer-nav">
            Already have an account?{" "}
            <span
              className="Verify-login-link-span"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;