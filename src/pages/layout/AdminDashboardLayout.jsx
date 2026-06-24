import React from "react";
import "./AdminDashboardLayout.css";
import AdminSidebar from "../Admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../Admin/AdminHeader";

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="Zmain_body">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

        {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
        )}

      <div className="Zcontent-wrapper">
        <AdminHeader setSidebarOpen={setSidebarOpen}/>

        <main className="Zmain-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
