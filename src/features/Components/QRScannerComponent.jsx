// QRScannerComponent.js
import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./QRScannerComponent.css"; // We'll create this

const QRScannerComponent = ({
  onScanSuccess,
  onScanError,
  buttonText,
  isCheckedIn,
}) => {
  const scannerRef = useRef(null);
  const [showScanner, setShowScanner] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const startScanner = () => {
    setShowScanner(true);
    setIsScanning(true);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(() => {});
    }
    setShowScanner(false);
    setIsScanning(false);
  };

  useEffect(() => {
    if (!showScanner) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
        aspectRatio: 1.0,
        formatsToSupport: [
          /* Add specific formats if needed */
        ],
      },
      false,
    );

    scanner.render(
      (decodedText) => {
        console.log("QR Code Scanned:", decodedText);

        if (onScanSuccess) {
          onScanSuccess(decodedText);
        }

        // Auto-stop scanner after success
        setTimeout(() => {
          stopScanner();
        }, 1500);
      },
      (error) => {
        // Only log actual errors, not the normal scanning attempts
        if (error && !error.includes("No QR code found")) {
          console.log("Scan error:", error);
          if (onScanError) {
            onScanError(error);
          }
        }
      },
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [showScanner, onScanSuccess, onScanError]);

  return (
    <div className="qr-scanner-wrapper">
      {!isCheckedIn && (
        <button
          onClick={startScanner}
          className={`scan-qr-btn ${isScanning ? "scanning" : ""}`}
          disabled={isScanning}
        >
          <span className="btn-icon">📷</span>
          {isScanning ? "Scanning..." : buttonText || "Scan QR to Check In"}
        </button>
      )}

      {showScanner && (
        <div className="scanner-container">
          <div className="scanner-header">
            <span className="scanner-title">📸 Position QR Code in frame</span>
            <button onClick={stopScanner} className="close-scanner-btn">
              ✕
            </button>
          </div>
          <div id="reader" className="qr-reader" />
          <div className="scanner-footer">
            <span className="scanner-hint">
              Align QR code within the square
            </span>
            <button onClick={stopScanner} className="cancel-scan-btn">
              Cancel Scan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScannerComponent;
