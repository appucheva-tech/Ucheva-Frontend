import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import "./LayoutStyles/Layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-layout">
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

export default Layout;
