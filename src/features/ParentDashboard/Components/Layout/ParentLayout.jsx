import ParentSidebar from "./ParentSidebar";
import Header from "./Header";
import Footer from "./Footer";
import "./LayoutStyles/ParentLayout.css";
import { Outlet } from "react-router-dom";

const ParentLayout = () => {
  return (
    <div className="parent-app-layout nunito-content">
      <ParentSidebar />

      <div className="parent-main-content">
        <Header />

        <main className="parent-page-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ParentLayout;
