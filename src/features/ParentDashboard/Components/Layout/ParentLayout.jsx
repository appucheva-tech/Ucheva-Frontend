import React, { useEffect, useState } from "react";
import ParentSidebar from "./ParentSidebar";
import Header from "./Header";
import Footer from "./Footer";
import "./LayoutStyles/ParentLayout.css";
import { Outlet } from "react-router-dom";
import { apiClient } from "../../../../config/AxiosInstance";

const ParentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await apiClient.get("parent/students");
      const data = response.data.studentsData || [];

      setStudents(data);
      if (data.length > 0) setSelectedStudent(data[0]);
    } catch (err) {
      console.error(err);
      setError("Failed to load your dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <div className="parent-app-layout nunito-content">
      <ParentSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="parent-main-content">
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          students={students}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
        />

        <main className="parent-page-content">
          <Outlet context={{ students, selectedStudent, setSelectedStudent }} />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ParentLayout;
