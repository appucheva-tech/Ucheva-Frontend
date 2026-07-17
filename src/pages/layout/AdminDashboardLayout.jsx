import React from "react";
import "./AdminDashboardLayout.css";
import AdminSidebar from "../Admin/Pages/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../Admin/Pages/AdminHeader";
import { useState } from "react";
import AdminFooter from "../Admin/Pages/AdminFooter";

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="Zmain_body">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="Zcontent-wrapper">
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        <main className="Zmain-content">
          <Outlet />
          <AdminFooter />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
