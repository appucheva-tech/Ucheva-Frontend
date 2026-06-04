import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Step1 from "./features/Unboarding/Pages/Step1";
import Step2 from "./features/Unboarding/Pages/Step2";
import Step3 from "./features/Unboarding/Pages/Step3";
import success from "./features/Unboarding/Pages/Success";
import Success from "./features/Unboarding/Pages/Success";
import Header from "./features/class-teacher/layout/Header/Header";
import Layout from "./features/class-teacher/layout/Layout";
import Overview from "./features/class-teacher/pages/Overview/Overview";
import SignUp from "./features/auth/SignUp";
import Login from "./features/auth/Login";
import VerifyEmail from "./features/auth/VerifyEmail";
import ForgetPassword from "./features/auth/ForgetPassword";
import InputCode from "./features/auth/InputCode";
import ResetPassword from "./features/auth/ResetPassword";
import Home from './pages/Home'
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import ContactUs from './pages/ContactUs'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/inputCode" element={<InputCode />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<Success />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Overview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
