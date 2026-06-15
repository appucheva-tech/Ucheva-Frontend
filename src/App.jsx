import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
import SecuritysDashboard from "./features/SecurityDashboard/Pages/SecuritysDashboardPage";
import SecuritySettings from "./features/SecurityDashboard/Pages/SecuritySettings";
import CTSettings from "./features/class-teacher/pages/CTSettings/CTSettings";
import BursaryLayout from "./features/busary/layout/BursaryLayout";
import BusaryDashboard from "./features/busary/pages/BusaryDashboard";
import BursaryFees from "./features/busary/pages/BursaryFee";
import StudentFee from "./features/busary/pages/StudentFee";
import BursarySettings from "./features/busary/pages/BursarySettings";

import SubjectTeacherLayout from "./features/SubjectTeacherDashboard/Components/Layout/SubjectTeacherLayout";
import SubjectTeacherDashboard from "./features/SubjectTeacherDashboard/Pages/SubjectTeacherDashboard";
import SubjectTeacherScores from "./features/SubjectTeacherDashboard/Pages/SubjectTeacherScores";
import SubjectTeacherAnnouncement from "./features/SubjectTeacherDashboard/Pages/SubjectTeacherAnnouncement";
import SubjectTeacherSettings from "./features/SubjectTeacherDashboard/Pages/SubjectTeacherSettings";
import BursaryAnnouncement from "./features/busary/pages/BursaryAnnouncement";
import CTAnnouncement from "./features/class-teacher/pages/CTAnnouncement/CTAnnouncement";
import AdminDashboardLayout from "./pages/layout/AdminDashboardLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminStaff from "./pages/Admin/AdminStaff";
import AdminStudents from "./pages/Admin/AdminStudents";
import AdminAttendance from "./pages/Admin/AdminAttendance";
import AdminSubjects from "./pages/Admin/AdminSubjects";
import AdminClass from "./pages/Admin/AdminClass";
import AdminFees from "./pages/Admin/AdminFees";
import AdminReportCards from "./pages/Admin/AdminReportCards";
import AdminAnnouncement from "./pages/Admin/AdminAnnouncement";
import AdminWallet from "./pages/Admin/AdminWallet";
import AdminSettings from "./pages/Admin/AdminSettings";
import AdminStaff2 from "./pages/Admin/AdminStaff2";
import NotSure from "./pages/NotSure";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="Pricing/:id" element={<SignUp />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="AboutUs/:id" element={<SignUp />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/inputCode" element={<InputCode />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/success" element={<Success />} />

        <Route path="/AdminDashboard" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="AdminStaff" element={<AdminStaff />} />
          <Route path="AdminStaff/:id" element={<AdminStaff2 />} />
          <Route path="AdminStudents" element={<AdminStudents />} />
          <Route path="AdminAttendance" element={<AdminAttendance />} />
          <Route path="AdminSubjects" element={<AdminSubjects />} />
          <Route path="AdminClass" element={<AdminClass />} />
          <Route path="AdminFees" element={<AdminFees />} />
          <Route path="AdminReportCards" element={<AdminReportCards />} />
          <Route path="AdminAnnouncement" element={<AdminAnnouncement />} />
          <Route path="AdminWallet" element={<AdminWallet />} />
          <Route path="AdminSettings" element={<AdminSettings />} />
        </Route>

        <Route path="/CTdashboard" element={<CTLayout />}>
          <Route index element={<Overview />} />
          <Route path="dashboard" element={<Overview />} />
          <Route path="myclass" element={<MyClass />} />
          <Route path="CTscore" element={<Score />} />
          <Route path="CTreportcard" element={<CTreport />} />
          <Route path="STreport" element={<STReport />} />
          <Route path="CTsettings" element={<CTSettings />} />
          <Route path="CTAnnouncement" element={<CTAnnouncement />} />
        </Route>

        <Route path="/bursary" element={<BursaryLayout />}>
          <Route index element={<BusaryDashboard />} />
          <Route path="bursarydashboard" element={<BusaryDashboard />} />
          <Route path="bursaryFees" element={<BursaryFees />} />
          <Route path="studentFee" element={<StudentFee />} />
          <Route path="bursarySettings" element={<BursarySettings />} />
          <Route path="bursaryAnnouncement" element={<BursaryAnnouncement />} />
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

        <Route
          path="/subjectteacherdashboard"
          element={<SubjectTeacherLayout />}
        >
          <Route index element={<SubjectTeacherDashboard />} />
          <Route path="scores" element={<SubjectTeacherScores />} />
          <Route path="announcement" element={<SubjectTeacherAnnouncement />} />
          <Route path="settings" element={<SubjectTeacherSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
