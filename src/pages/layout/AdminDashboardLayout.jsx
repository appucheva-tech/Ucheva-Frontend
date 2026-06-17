import React from "react";
import './AdminDashboardLayout.css'
import AdminSidebar from '../Admin/AdminSidebar'
import { Outlet } from "react-router-dom";
import AdminHeader from "../Admin/AdminHeader";
import AdminFooter from "../Admin/AdminFooter";

const AdminDashboardLayout = () => {
  return (
    <div className="Zmain_body">
      <AdminSidebar />
      <main className="Zmain-content">
        <AdminHeader />
        <Outlet />
        <AdminFooter />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
