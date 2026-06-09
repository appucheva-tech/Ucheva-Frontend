import React from "react";
import './AdminDashboardLayout.css'
import AdminSidebar from '../Admin/AdminSidebar'
import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="main_body">
      <AdminSidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
