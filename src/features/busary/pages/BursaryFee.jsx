import React from "react";
import "./BursaryFees.css";
import { Link } from "react-router-dom";

const BursaryFees = () => {
  const payments = [
    {
      name: "Adaeze Clinton",
      class: "JSS 1A",
      total: "₦75,000",
      paid: "₦39,000",
      type: "Bank Transfer",
      status: "full",
      date: "12 May 2026",
    },
    {
      name: "Emeka Ugonna",
      class: "SS 1C",
      total: "₦50,000",
      paid: "₦25,000",
      type: "Bank Transfer",
      status: "part",
      date: "10 May 2026",
    },
    {
      name: "Tolu Adesunya",
      class: "PRY 1",
      total: "₦150,000",
      paid: "₦0",
      type: "--",
      status: "unpaid",
      date: "--",
    },
    {
      name: "Chidi Okoronkwo",
      class: "NRY 2",
      total: "₦150,000",
      paid: "₦75,000",
      type: "Bank Transfer",
      status: "full",
      date: "14 May 2026",
    },
    {
      name: "Grace Obidi",
      class: "SS 3B",
      total: "₦50,000",
      paid: "₦0",
      type: "--",
      status: "unpaid",
      date: "--",
    },
    {
      name: "Ifeanyi Okafor",
      class: "SS 2A",
      total: "₦150,000",
      paid: "₦150,000",
      type: "Card",
      status: "full",
      date: "09 May 2026",
    },
    {
      name: "Ngozi Bassey",
      class: "JSS 1B",
      total: "₦150,000",
      paid: "₦150,000",
      type: "Card",
      status: "full",
      date: "11 May 2026",
    },
  ];

  return (
    <main className="fm-page">
      <section className="fm-wrapper">
        <div className="fm-header">
          <h1>Fee Management</h1>
          <p>Manage school fees, payments, and view payment records.</p>
        </div>

        <article className="fm-cards">
          <div className="fm-attendance">
            <nav className="fm-text">
              Expected Fee
              <div className="fm-number">340000000</div>
            </nav>
            <div className="fm-image-holder1">
              <img
                className="fm-img"
                src="src/assets/uim_calender.png"
                alt=""
              />
            </div>
          </div>
          <div className="fm-fee-collected">
            <nav className="fm-text">
              Fee Collected
              <div className="fm-number">6</div>
            </nav>
            <div className="fm-image-holder2">
              <img
                className="fm-img"
                src="src/assets/streamline-plump_class-lesson-remix.png"
                alt=""
              />
            </div>
          </div>
          <div className="fm-outstanding-fee">
            <nav className="fm-text">
              Outstanding Fee
              <div className="fm-number">23</div>
            </nav>
            <div className="fm-image-holder3">
              <img
                className="fm-img"
                src="src/assets/ph_student-fill.png"
                alt=""
              />
            </div>
          </div>
          <div className="fm-collection-rate">
            <nav className="fm-text">
              Collection Rate %<div className="fm-percentage">85%</div>
            </nav>
            <div className="fm-image-holder4">
              <img
                className="fm-img"
                src="src/assets/material-symbols-light_menu-book-rounded.png"
                alt=""
              />
            </div>
          </div>
        </article>

        <section className="fm-filter-box">
          <div className="fm-filters">
            <div className="fm-field">
              <label>Class Section</label>
              <select>
                <option>All Classes</option>
              </select>
            </div>

            <div className="fm-field">
              <label>Payment Status</label>
              <select>
                <option>All Status</option>
              </select>
            </div>

            <div className="fm-field">
              <label>Term</label>
              <select>
                <option>Third Term</option>
              </select>
            </div>
          </div>

          <div className="fm-actions">
            <button className="fm-export">Export</button>

            <button className="fm-reset">Reset</button>
          </div>
        </section>

        <section className="fm-table-card">
          <div className="fm-table-wrapper">
            <table className="fm-table">
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
                {payments.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>

                    <td>{item.name}</td>
                    <td>{item.class}</td>
                    <td>{item.total}</td>
                    <td>{item.paid}</td>
                    <td>{item.type}</td>

                    <td>
                      <span
                        className={`fm-status ${
                          item.status === "full"
                            ? "fm-full"
                            : item.status === "part"
                              ? "fm-part"
                              : "fm-unpaid"
                        }`}
                      >
                        {item.status === "full"
                          ? "Full Payment"
                          : item.status === "part"
                            ? "Part Payment"
                            : "Unpaid"}
                      </span>
                    </td>

                    <td>{item.date}</td>
                    <Link to={"/bursary/studentFee"}>
                      <td className="fm-action">⋮</td>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="fm-pagination">
            <p>Showing pages of 1 to 7</p>

            <div className="fm-pages">
              <button>{"<"}</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>...</button>
              <button>6</button>
              <button>7</button>
              <button>{">"}</button>
            </div>

            <div className="fm-rows">
              Rows per page
              <select>
                <option>10</option>
              </select>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default BursaryFees;
