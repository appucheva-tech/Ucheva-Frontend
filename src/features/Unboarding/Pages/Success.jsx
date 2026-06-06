import React from "react";
import "./Sucess.css";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const nav = useNavigate();

  return (
    <main className="setUpComplete geist-content">
      <article className="setUpCompleteHolder">
        <div className="setUpImgHolder">
          <img src="https://i.postimg.cc/Y9zb4hsp/Ucheva-Logo.png" alt="" />
        </div>
        <div className="StepImgHolder">
          <img src="https://i.postimg.cc/rstsnrXC/Steps3.png" alt="" />
        </div>
        <div className="setUpMarkHolder">
          <img
            className="MarkImage"
            src="https://i.postimg.cc/XYZWwbWf/Success.png"
            alt=""
          />
          <nav className="setUpText1">
            Setup Complete!
            <span>
              You're all set! Your school has been successfully configured.
            </span>
          </nav>
        </div>
      </article>
      <button
        onClick={() => {
          nav("/dashboard");
        }}
        className="goToDashBoard"
      >
        Go to Dashboard
      </button>
    </main>
  );
};

export default Success;
