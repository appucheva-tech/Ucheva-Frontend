import React, { useState } from "react";
import "./BursaryLayout.css";
import BursaryHeader from "./BursaryHeader/BursaryHeader";
import BursarySideBar from "./BursarySideBar/BursarySideBar";
import { Outlet } from "react-router-dom";
import BursaryFooter from "./BursaryFooter/BursaryFooter";

const BursaryLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="br-app-layout nunito-content">
      {/* Mobile menu button */}
      <button
        className="br-mobile-menu-btn"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <BursarySideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="br-mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="br-main-content">
        <BursaryHeader setSidebarOpen={setSidebarOpen} />
        <main className="br-page-content">
          <Outlet />
        </main>
        <BursaryFooter />
      </div>
    </div>
  );
};

export default BursaryLayout;
