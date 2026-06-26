import React, { useState } from "react";
import "./CTLayout.css";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

const CTLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="ct-app-layout nunito-content">
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          className="ct-mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="ct-main-content">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="ct-page-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CTLayout;
