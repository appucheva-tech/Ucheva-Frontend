import React from "react";
import "./layout.css";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="CTLayoutContainer">
      <div className="Header-SideBar-Holder">
        <SideBar />
        <Header />
      </div>
      <article className="CTWrapper">
        <Outlet />
      </article>
    </main>
  );
};

export default Layout;
