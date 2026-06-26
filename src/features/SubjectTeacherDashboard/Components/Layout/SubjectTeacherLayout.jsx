import { useState } from "react";
import SubjectTeacherSidebar from "./SubjectTeacherSidebar";
import SubjectTeacherHeader from "./SubjectTeacherHeader";
import Footer from "../../../ParentDashboard/Components/Layout/Footer";
import "./LayoutStyles/SubjectTeacherLayout.css";
import { Outlet } from "react-router-dom";

const SubjectTeacherLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`SubjectTeacherLayout-app-layout nunito-content ${isSidebarOpen ? "sidebar-active" : ""}`}
    >
      <SubjectTeacherSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <div className="SubjectTeacherLayout-main-content">
        <SubjectTeacherHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="SubjectTeacherLayout-page-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default SubjectTeacherLayout;
