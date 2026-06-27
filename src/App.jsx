import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
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
import AdminStudentAttendance from "./pages/Admin/AdminStudentAttendance";
import AdminSubjects from "./pages/Admin/AdminSubjects";
import AdminClass from "./pages/Admin/AdminClass";
import AdminFees from "./pages/Admin/AdminFees";
import AdminReportCards from "./pages/Admin/AdminReportCards";
import AdminAnnouncement from "./pages/Admin/AdminAnnouncement";
import AdminWallet from "./pages/Admin/AdminWallet";
import AdminSettings from "./pages/Admin/AdminSettings";
import Features from "./pages/Features";
import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";
import VerifyEmail from "./features/auth/pages/VerifyEmail";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import VerifyForgot from "./features/auth/pages/VerifyForgot";
import AuthLayout from "./features/auth/layout/AuthLayout";
import OnboardingStepper from "./features/onboarding/pages/Onboarding";
import ResetPassword from "./features/auth/pages/ResetPassword";
import AdminStaff2 from "./pages/Admin/AdminStaff2";
import CreatePassword from "./features/auth/pages/CreatePassword";
import StaffDetails from "./pages/Admin/AdminStaffDetails";
import AdminStudent2 from "./pages/Admin/AdminStudent2";
import { ToastContainer } from "react-toastify";
import AdminStudentDetails from "./pages/Admin/AdminStudentDetails";
import AdminEditStudent from "./pages/Admin/AdminEditStudent";
import AttendancePage from "./features/busary/components/AttendancePage";
import PrivateRoute from "./pages/PrivateRoute";
import NotFound from "./pages/notFound";
import PaymentVerification from "./features/ParentDashboard/Pages/PaymentVerification";
import RequireSubdomain from "./pages/requireSubdomain";
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
        {/* PUBLIC ROUTES */}
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/payment-verification" element={<PaymentVerification />} />

        {/* Signup does NOT require subdomain */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Everything below requires a subdomain */}
        <Route element={<RequireSubdomain />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-password" element={<VerifyForgot />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/create-password/:token"
              element={<CreatePassword />}
            />
          </Route>

          <Route path="/onboarding" element={<OnboardingStepper />} />

          <Route path="/admin" element={<AdminDashboardLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="AdminStaff" element={<AdminStaff />} />
            <Route path="AdminStaff2" element={<AdminStaff2 />} />
            <Route
              path="/admin/edit-staff/:staffId"
              element={<AdminStaff2 />}
            />
            <Route path="staff-details/:id" element={<StaffDetails />} />
            <Route path="AdminStudents" element={<AdminStudents />} />
            <Route path="AdminStudent2" element={<AdminStudent2 />} />
            <Route
              path="AdminStudentDetails/:id"
              element={<AdminStudentDetails />}
            />
            <Route path="AdminEditStudent/:id" element={<AdminEditStudent />} />
            <Route path="AdminAttendance" element={<AdminAttendance />} />
            <Route
              path="AdminStudentAttendance"
              element={<AdminStudentAttendance />}
            />
            <Route path="AdminSubjects" element={<AdminSubjects />} />
            <Route path="AdminClass" element={<AdminClass />} />
            <Route path="AdminFees" element={<AdminFees />} />
            <Route path="AdminReportCards" element={<AdminReportCards />} />
            <Route path="AdminAnnouncement" element={<AdminAnnouncement />} />
            <Route path="AdminWallet" element={<AdminWallet />} />
            <Route path="AdminSettings" element={<AdminSettings />} />
          </Route>

          <Route path="/CTdashboard" element={<CTLayout />}>
            {/* CT routes */}

            <Route index element={<Overview />} />
            <Route path="myclass" element={<MyClass />} />
            <Route path="CTscore" element={<Score />} />
            <Route path="CTreportcard" element={<CTreport />} />
            <Route
              path="CTreportcard/studentreport/:admissionnumber"
              element={<STReport />}
            />
            <Route path="CTsettings" element={<CTSettings />} />
            <Route path="CTAnnouncement" element={<CTAnnouncement />} />
            <Route path="attendance" element={<AttendancePage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/attendance/:token" element={<AttendancePage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/attendance/:token" element={<AttendancePage />} />
          </Route>

          <Route path="/bursary" element={<BursaryLayout />}>
            {/* bursary routes */}

            <Route index element={<BusaryDashboard />} />
            <Route path="bursaryFees" element={<BursaryFees />} />
            <Route path="studentFee" element={<StudentFee />} />
            <Route path="bursarySettings" element={<BursarySettings />} />
            <Route
              path="bursaryAnnouncement"
              element={<BursaryAnnouncement />}
            />
            <Route path="attendance" element={<AttendancePage />} />
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
            <Route
              path="announcement"
              element={<SubjectTeacherAnnouncement />}
            />
            <Route path="settings" element={<SubjectTeacherSettings />} />
            <Route path="attendance/:token" element={<AttendancePage />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
