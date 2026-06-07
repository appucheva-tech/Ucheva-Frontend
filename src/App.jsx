import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Step1 from "./features/Unboarding/Pages/Step1";
import Step2 from "./features/Unboarding/Pages/Step2";
import Step3 from "./features/Unboarding/Pages/Step3";
import Success from "./features/Unboarding/Pages/Success";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SignUp from "./features/Auth/SignUp";
import Login from "./features/Auth/Login";
import VerifyEmail from "./features/Auth/VerifyEmail";
import ForgetPassword from "./features/Auth/ForgetPassword";
import InputCode from "./features/Auth/InputCode";
import ResetPassword from "./features/Auth/ResetPassword";
import MyClass from "./features/class-teacher/pages/MyClass/MyClass";
import Score from "./features/class-teacher/pages/Scores/Score";
import CTreport from "./features/class-teacher/pages/CTreport/CTreport";
import Dashboard from "./features/ParentDashboard/Pages/DashboardPages";
import PaymentPage from "./features/ParentDashboard/Pages/PaymentPage";
import SettingsPage from "./features/ParentDashboard/Pages/SettingsPage";
import Layout from "./features/class-teacher/layout/Layout";
import Overview from "./features/class-teacher/pages/Overview/Overview";
import ParentLayout from "./features/ParentDashboard/Components/Layout/ParentLayout";
import DashboardPage from "./features/ParentDashboard/Pages/DashboardPages";
import CTLayout from "./features/class-teacher/layout/Layout";
import STReport from "./features/class-teacher/pages/STudentReport/STReport";
import SecurityLayout from "./features/SecurityDashboard/Components/Layout/SecurityLayout";
import SecurityAnnouncement from "./features/SecurityDashboard/Pages/SecurityAnnouncement";
import SecuritysDashboard from "./features/SecurityDashboard/Pages/SecuritysDashboard";
import SecuritySettings from "./features/SecurityDashboard/Pages/SecuritySettings";
import CTSettings from "./features/class-teacher/CTSettings/CTSettings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/inputCode" element={<InputCode />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard" element={<CTLayout />}>
          <Route index element={<Overview />} />
          <Route path="myclass" element={<MyClass />} />
          <Route path="score" element={<Score />} />
          <Route path="reportcard" element={<CTreport />} />
          <Route path="studentreport" element={<STReport />} />
          <Route path="CTsettings" element={<CTSettings />} />
        </Route>
        <Route path="/parentdashboard" element={<ParentLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/securitydashboard" element={<SecurityLayout />}>
          <Route index element={<SecuritysDashboard />} />
          <Route path="announcement" element={<SecurityAnnouncement />} />
          <Route path="settings" element={<SecuritySettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
// hello
