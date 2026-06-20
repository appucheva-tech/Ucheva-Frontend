import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/verify-email.css";
import { apiClient } from "../../../config/AxiosInstance";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subdomain = window.location.hostname.split(".")[0];

  const userEmail =
    searchParams.get("email") ||
    localStorage.getItem("userEmail") ||
    "your-email@domain.com";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(59);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Navigates inputs backward on Backspace clicks
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty, focus previous input and clear it
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Gracefully processes pasted codes (e.g., cmd+v or ctrl+v)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pastedData)) return; // Check if it contains only numbers

    const splitValues = pastedData.slice(0, 6).split("");
    const updatedOtp = [...otp];

    splitValues.forEach((char, idx) => {
      if (idx < 6) updatedOtp[idx] = char;
    });
    setOtp(updatedOtp);

    // Position focus onto the last modified element
    const focusTargetIndex = Math.min(splitValues.length, 5);
    inputRefs.current[focusTargetIndex].focus();
  };

  // Live API handler for resending the OTP code
  const handleResendCode = async () => {
    if (timeLeft > 0) return;

    try {
      setLoading(true);
      setError("");

      // 1. Call your actual backend resend route
      await apiClient.post(
        "/admin/resend-otp",
        { email: userEmail },
        {
          headers: {
            "x-tenant": subdomain,
          },
        },
      );

      console.log("[API Success] New verification pin dispatched.");

      // 2. Reset the client countdown timer and clear inputs
      setTimeLeft(59);
      setOtp(new Array(6).fill(""));
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    } catch (err) {
      // 3. Capture any server errors (e.g., rate-limiting or network issues)
      setError(
        err.response?.data?.message ||
          "Failed to resend validation code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const verificationCode = otp.join("");

    if (verificationCode.length < 6) {
      setError("Please fill out all verification blocks.");
      return;
    }

    try {
      setLoading(true);
      setError("");

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

      if (response.data) {
        const { loginRedirectUrl, verifyRedirectLocalUrl } = response.data;

        // Use .includes() to accurately catch localhost, IP addresses, or local nip.io domains
        const isLocalhost =
          window.location.hostname.includes("localhost") ||
          window.location.hostname.includes("127.0.0.1") ||
          window.location.hostname.includes("nip.io");

        // 1. Pick the correct login redirect path based on environment
        let targetUrl = isLocalhost
          ? verifyRedirectLocalUrl
          : loginRedirectUrl || "/login";

        // 2. Strip 'www.' automatically to keep local debugging clean
        if (targetUrl.includes("www.")) {
          targetUrl = targetUrl.replace("www.", "");
        }

        console.log(`[Redirecting] Moving to workspace login: ${targetUrl}`);

        // 3. Perform hard page location switch to the tenant's login portal
        window.location.href = targetUrl;
      } else {
        navigate("/login");
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
    <div className="verify-page-viewport">
      <div className="verify-card-box">
        <h1 className="verify-title">Verify Your Email</h1>

        <p className="verify-subtext">
          We've sent an OTP code to your email <br />
          <span className="user-email-highlight">{userEmail}</span>
        </p>

        <form onSubmit={handleVerifySubmit}>
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

export default VerifyEmail;
