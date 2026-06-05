import SecuritySidebar from "./SecuritySideBar";
import SecurityHeader from "./SecurityHeader";
import Footer from "./Footer";
import "./LayoutStyles/SecurityLayout.css";
import { Outlet } from "react-router-dom";

const SecurityLayout = () => {
  return (
    <div className="app-layout nunito-content">
      <SecuritySidebar />

      <div className="main-content">
        <SecurityHeader />

        <main className="page-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default SecurityLayout;
