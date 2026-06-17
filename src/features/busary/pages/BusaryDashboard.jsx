import React from "react";
import "./BusaryDashboard.css";
import PH from "../../../assets/ph.svg";
import UIM from "../../../assets/uim.svg";
import Streamline from "../../../assets/streamline.svg";
import Material from "../../../assets/material.svg";
import { Html5QrcodeScanner } from "html5-qrcode";

const BusaryDashboard = () => {
  const scannerRef = useRef(null);
  const [showScanner, setShowScanner] = useState(false);

  const startScanner = () => {
    setShowScanner(true);
  };

  useEffect(() => {
    if (!showScanner) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false,
    );

    scanner.render(
      (decodedText) => {
        console.log("QR Code:", decodedText);

        // stop scanner after success
        scanner.clear();
        setShowScanner(false);
      },
      (error) => {
        console.log("Scan error:", error);
      },
    );

    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [showScanner]);

  return (
    <main className="br-dash">
      <article className="br-dash-wrapper">
        <nav className="br-greetings">
          Good Afternoon, Kareem 👋
          <span>Here is today's financial overview</span>
        </nav>
        <article className="br-cards">
          <div className="br-attendance">
            <nav className="br-text">
              My Attendance
              <div className="br-pending">Checked in</div>
            </nav>
            <div className="br-image-holder1">
              <img className="br-img" src={UIM} alt="" />
            </div>
          </div>
          <div className="br-fee-collected">
            <nav className="br-text">
              Fee Collected
              <div className="br-number">6</div>
            </nav>
            <div className="br-image-holder2">
              <img className="br-img" src={Streamline} alt="" />
            </div>
          </div>
          <div className="br-outstanding-fee">
            <nav className="br-text">
              Outstanding Fee
              <div className="br-number">23</div>
            </nav>
            <div className="br-image-holder3">
              <img className="br-img" src={PH} alt="" />
            </div>
          </div>
          <div className="br-collection-rate">
            <nav className="br-text">
              Collection Rate %<div className="br-percentage">85%</div>
            </nav>
            <div className="br-image-holder4">
              <img className="br-img" src={Material} alt="" />
            </div>
          </div>
        </article>
        <section className="br-checkin">
          <div>
            <p>You have not checked in today</p>

            <button onClick={startScanner}>Scan QR to Check In</button>

            {showScanner && (
              <div
                id="reader"
                style={{ width: "100%", maxWidth: "400px", marginTop: "20px" }}
              />
            )}
          </div>
          <div className="br-announcement">
            <nav className="br-announce-head">Recent Announcements</nav>
            <article className="br-announcement-view">
              <ul className="br-announcement-content">
                <nav className="br-announce-date">
                  Staff Meeting
                  <span>May 18, 2026</span>
                </nav>
                <p className="br-announce-text">
                  All staff members are required to attend the mo...
                </p>
              </ul>
              <ul className="br-announcement-content">
                <nav className="br-announce-date">
                  Staff Meeting
                  <span>May 18, 2026</span>
                </nav>
                <p className="br-announce-text">
                  All staff members are required to attend the mo...
                </p>
              </ul>
              <ul className="br-announcement-content">
                <nav className="br-announce-date">
                  Staff Meeting
                  <span>May 18, 2026</span>
                </nav>
                <p className="br-announce-text">
                  All staff members are required to attend the mo...
                </p>
              </ul>
            </article>
          </div>
        </section>
        <section className="br-payment-history">
          <div className="br-payment-header">
            <h3>Payment History</h3>

            <button className="br-view-all">View All ↗</button>
          </div>

          <div className="br-payment-table-wrapper">
            <table className="br-payment-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Total Amount</th>
                  <th>Amount Paid</th>
                  <th>Payment Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Adaeze Clinton</td>
                  <td>JSS 1A</td>
                  <td>₦75,000</td>
                  <td>₦39,000</td>
                  <td>Bank Transfer</td>
                  <td>
                    <span className="br-status">Full Payment</span>
                  </td>
                  <td>18 May 2026</td>
                  <td className="br-action">⋮</td>
                </tr>

                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Emeka Ugonna</td>
                  <td>SS 1C</td>
                  <td>₦50,000</td>
                  <td>₦50,000</td>
                  <td>Bank Transfer</td>
                  <td>
                    <span className="br-status">Full Payment</span>
                  </td>
                  <td>18 May 2026</td>
                  <td className="br-action">⋮</td>
                </tr>

                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Tolu Adesunya</td>
                  <td>PRY 1</td>
                  <td>₦50,000</td>
                  <td>₦50,000</td>
                  <td>Card</td>
                  <td>
                    <span className="br-status">Full Payment</span>
                  </td>
                  <td>18 May 2026</td>
                  <td className="br-action">⋮</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </main>
  );
};

export default BusaryDashboard;
