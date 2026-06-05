import React from "react";
import "./STReport.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const STReport = () => {
  return (
    <main className="STReportContainer">
      <article className="STReportWrapper">
        <div className="STSReportHead">
          Preview
          <nav className="STSReportHeadRight">
            <span className="STR">Report Cards</span>
            <MdOutlineKeyboardArrowRight className="STA" />
            <span className="STP">Preview</span>
          </nav>
        </div>
        <section className="SubToAdmin">
          <button className="STAdd">+ Add Remark</button>
          <button className="STSubmit">Submit to Admin</button>
        </section>
      </article>
    </main>
  );
};

export default STReport;
