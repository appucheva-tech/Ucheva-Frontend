import React from "react";
import "./AdminDashboardLayout.css";
import AdminSidebar from "../Admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../Admin/AdminHeader";

const AdminDashboardLayout = () => {
  return (
    <div className="Zmain_body">
      <AdminSidebar />

      <div className="Zcontent-wrapper">
        <AdminHeader />

        <main className="Zmain-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
