import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import "./QRModal.css";
import axios from "axios";
import { apiClient } from "../../config/AxiosInstance";
// import QRCode from "qrcode";

const QRModal = ({ isOpen, onClose }) => {
  const [qrSrc, setQrSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const subdomain = window.location.hostname.split(".")[0];

  useEffect(() => {
    if (isOpen) {
      fetchQRCode();
    }
  }, [isOpen]);

  const fetchQRCode = async () => {
    try {
      setLoading(true);

      const { data } = await apiClient.post(
        "/staffattendance/qr-code",
        {},
        { headers: { "x-tenant": subdomain } },
      );
      console.log("data.qrImage:  ", data.qrImage);
      // const qrImage = await QRCode.toDataURL(data.qrImage);
      // console.log(qrImage);
setQrSrc(data.qrImage);
    
    } catch (error) {
      console.error("Failed to load QR code:", error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(qrSrc);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrSrc;
    link.download = "attendance-qr.png";
    link.click();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <body style="display:flex;justify-content:center;align-items:center;height:100vh;">
          <img src="${qrSrc}" alt="QR Code" />
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  if (!isOpen) return null;

  return (
    <div className="qr-modal-overlay">
      <div className="qr-modal">
        <button className="qr-close-btn" onClick={onClose}>
          ✕
        </button>

        {loading ? (
          <p>Loading QR Code...</p>
        ) : (
          <>
            <div className="qr-image-wrapper">
              <img src={qrSrc} alt="QR Code" className="qr-image" />
            </div>

            <p className="qr-description">
              This QR code refreshes automatically every day for secure staff
              attendance tracking.
            </p>

            <div className="qr-actions">
              <button className="download-btn" onClick={handleDownload}>
                Download
              </button>

              <button className="print-btn" onClick={handlePrint}>
                Print
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QRModal;
