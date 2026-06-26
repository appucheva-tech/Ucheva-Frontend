import SecuritySidebar from "./SecuritySideBar";
import SecurityHeader from "./SecurityHeader";
import Footer from "./Footer";
import "./LayoutStyles/SecurityLayout.css";
import { Outlet } from "react-router-dom";

const SecurityLayout = () => {
  return (
    <div className="security-app-layout nunito-content">
      <SecuritySidebar />

      <div className="security-main-content">
        <SecurityHeader />

        <main className="security-page-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default SecurityLayout;
