import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Step1 from "./features/Unboarding/Pages/Step1";
import Step2 from "./features/Unboarding/Pages/Step2";
import Step3 from "./features/Unboarding/Pages/Step3";
import success from "./features/Unboarding/Pages/Success";
import Success from "./features/Unboarding/Pages/Success";
import ForgetPassword from "./features/Auth/ForgetPassword";
import SignUp from "./features/Auth/SignUp";
import Login from "./features/Auth/Login";
import VerifyEmail from "./features/Auth/VerifyEmail";
import InputCode from "./features/Auth/InputCode";
import ResetPassword from "./features/Auth/ResetPassword";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/success" element={<Success />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/inputcode" element={<InputCode />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
