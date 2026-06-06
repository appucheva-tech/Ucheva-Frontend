import React from "react";
import "./layout.css";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

const CTLayout = () => {
  return (
    <main className="CTLayoutContainer nunito-content">
      <div className="Header-SideBar-Holder">
        <SideBar />
        <Header />
      </div>
      <article className="CTWrapper">
        <Outlet />
        <Footer />
      </article>
    </main>
  );
};

export default CTLayout;
