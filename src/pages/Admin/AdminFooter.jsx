import React from "react";
import "./AdminFooter.css";
import { FaRegCopyright } from "react-icons/fa";

const AdminFooter = () => {
  return (
    <footer className="footerRow">
      <span className="copyrightText">
        ©️ {new Date().getFullYear()} Ucheva school operating management system.
        All rights reserved.
      </span>
      <span className="supportText">
        Need help?{" "}
        <a href="#support" className="supportLink">
          Contact support
        </a>
      </span>
    </footer>
  );
};

export default AdminFooter;
