import React, { useState } from "react";
import ParentSidebar from "./ParentSidebar";
import Header from "./Header";
import Footer from "./Footer";
import "./LayoutStyles/ParentLayout.css";
import { Outlet } from "react-router-dom";

const ParentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="parent-app-layout nunito-content">
      <ParentSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="parent-main-content">
        <Header onMenuClick={toggleSidebar} />

        <main className="parent-page-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ParentLayout;
