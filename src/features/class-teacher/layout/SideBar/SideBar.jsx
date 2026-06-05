import React, { useState } from "react";
import "./SideBar.css";
import { PiSquaresFourBold, PiCertificateBold } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { MdOutlineCreditScore } from "react-icons/md";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [dashboard, setDashboard] = useState(null);
  // const [myClass, setMyClass] = useState(false);
  const nav = useNavigate();

  return (
    <main className="sideBarContainer geist-content">
      <article className="sideBarWrapper">
        <div className="CTLogoHolder">
          <img src="/src/assets/Ucheva Logo.png" alt="" />
        </div>
        <div className="TabsHolder">
          <nav
            className="CTTabs"
            style={{
              background: dashboard === "dashboard" ? "#F1F7FF" : "none",
              color: dashboard === "dashboard" ? "#0062F6" : "#03173C",
            }}
            onClick={() => {
              nav("/dashboard");
              setDashboard("dashboard");
            }}
          >
            <PiSquaresFourBold />
            Dashboard
          </nav>
          <nav
            className="CTTabs"
            style={{
              background: dashboard === "myClass" ? "#F1F7FF" : "none",
              color: dashboard === "myClass" ? "#0062F6" : "#03173C",
            }}
            onClick={() => {
              nav("myclass");
              setDashboard("myClass");
            }}
          >
            <FaPersonChalkboard />
            My Class
          </nav>
          <nav
            className="CTTabs"
            style={{
              background: dashboard === "scores" ? "#F1F7FF" : "none",
              color: dashboard === "scores" ? "#0062F6" : "#03173C",
            }}
            onClick={() => {
              nav("score");
              setDashboard("scores");
            }}
          >
            <MdOutlineCreditScore />
            Scores
          </nav>
          <nav
            className="CTTabs"
            style={{
              background: dashboard === "report" ? "#F1F7FF" : "none",
              color: dashboard === "report" ? "#0062F6" : "#03173C",
            }}
            onClick={() => {
              nav("reportcard");
              setDashboard("report");
            }}
          >
            <PiCertificateBold />
            Report Cards
          </nav>
          <nav
            className="CTTabs"
            style={{
              background: dashboard === "announce" ? "#F1F7FF" : "none",
              color: dashboard === "announce" ? "#0062F6" : "#03173C",
            }}
            onClick={() => {
              setDashboard("announce");
            }}
          >
            <HiMiniSpeakerWave />
            Announcement
          </nav>
          <nav
            className="CTTabs"
            style={{
              background: dashboard === "settings" ? "#F1F7FF" : "none",
              color: dashboard === "settings" ? "#0062F6" : "#03173C",
            }}
            onClick={() => {
              setDashboard("settings");
            }}
          >
            <IoSettingsOutline />
            Settings
          </nav>
        </div>
      </article>
    </main>
  );
};

export default SideBar;
