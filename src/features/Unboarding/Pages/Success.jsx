import React from "react";
import "./Sucess.css";
import { useNavigate } from "react-router-dom";
import Ucheva from "../../../assets/UchevaLogo.svg";
import SuccessStep from "../../../assets/StepSuccess.svg";
import SuccessMark from "../../../assets/SuccessMark.svg";

const Success = () => {
  const nav = useNavigate();

  return (
    <main className="setUpComplete geist-content">
      <article className="setUpCompleteHolder">
        <div className="setUpImgHolder">
          <img src={Ucheva} alt="Ucheva" />
        </div>
        <div className="StepImgHolder">
          <img src={SuccessStep} alt="Step 3" />
        </div>
        <div className="setUpMarkHolder">
          <img className="MarkImage" src={SuccessMark} alt="Success Mark" />
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
