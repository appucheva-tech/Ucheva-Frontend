import SubjectTeacherSidebar from "./SubjectTeacherSidebar";
import SubjectTeacherHeader from "./SubjectTeacherHeader";
import Footer from "../../../ParentDashboard/Components/Layout/Footer";
import "./LayoutStyles/SubjectTeacherLayout.css";
import { Outlet } from "react-router-dom";

const SubjectTeacherLayout = () => {
  return (
    <div className="SubjectTeacherLayout-app-layout nunito-content">
      <SubjectTeacherSidebar />

      <div className="SubjectTeacherLayout-main-content">
        <SubjectTeacherHeader />

        <main className="SubjectTeacherLayout-page-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default SubjectTeacherLayout;
