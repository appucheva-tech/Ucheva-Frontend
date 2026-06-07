import Sidebar from "./ParentSidebar";
import Header from "./Header";
import Footer from "./Footer";
import "./LayoutStyles/ParentLayout.css";
import { Outlet } from "react-router-dom";

const ParentLayout = () => {
  return (
    <div className="app-layout nunito-content">
      <Sidebar />

      <div className="main-content">
        <Header />

        <main className="page-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ParentLayout;
