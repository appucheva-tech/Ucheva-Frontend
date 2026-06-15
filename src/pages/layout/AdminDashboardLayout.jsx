import React from "react";
import './AdminDashboardLayout.css'
import AdminSidebar from '../Admin/AdminSidebar'
import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="Zmain_body">
      <AdminSidebar />
      <main className="Zmain-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
