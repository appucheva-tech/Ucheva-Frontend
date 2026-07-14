import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/Marketing/Home";
import Pricing from "./pages/Marketing/Pricing";
import AboutUs from "./pages/Marketing/AboutUs";
import ContactUs from "./pages/Marketing/ContactUs";

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
import CTSettings from "./features/class-teacher/pages/CTSettings/CTSettings";
import CTAnnouncement from "./features/class-teacher/pages/CTAnnouncement/CTAnnouncement";

import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";
import VerifyEmail from "./features/auth/pages/VerifyEmail";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import VerifyForgot from "./features/auth/pages/VerifyForgot";
import AuthLayout from "./features/auth/layout/AuthLayout";
import OnboardingStepper from "./features/onboarding/pages/Onboarding";
import ResetPassword from "./features/auth/pages/ResetPassword";
import CreatePassword from "./features/auth/pages/CreatePassword";

import SecurityLayout from "./features/SecurityDashboard/Components/Layout/SecurityLayout";
import SecurityAnnouncement from "./features/SecurityDashboard/Pages/SecurityAnnouncement";
import SecuritysDashboard from "./features/SecurityDashboard/Pages/SecuritysDashboardPage";
import SecuritySettings from "./features/SecurityDashboard/Pages/SecuritySettings";
import BursaryLayout from "./features/busary/layout/BursaryLayout";
import BusaryDashboard from "./features/busary/pages/BusaryDashboard";
import BursaryFees from "./features/busary/pages/BursaryFee";
import StudentFee from "./features/busary/pages/StudentFee";
import BursarySettings from "./features/busary/pages/BursarySettings";
import BursaryAnnouncement from "./features/busary/pages/BursaryAnnouncement";

import SubjectTeacherLayout from "./features/SubjectTeacherDashboard/Components/Layout/SubjectTeacherLayout";
import SubjectTeacherDashboard from "./features/SubjectTeacherDashboard/Pages/SubjectTeacherDashboard";
import SubjectTeacherScores from "./features/SubjectTeacherDashboard/Pages/SubjectTeacherScores";
import SubjectTeacherAnnouncement from "./features/SubjectTeacherDashboard/Pages/SubjectTeacherAnnouncement";
import SubjectTeacherSettings from "./features/SubjectTeacherDashboard/Pages/SubjectTeacherSettings";

import AdminDashboardLayout from "./pages/layout/AdminDashboardLayout";
import AdminDashboard from "./pages/Admin/Pages/AdminDashboard";
import AdminStaff from "./pages/Admin/Pages/AdminStaff";
import AdminStudents from "./pages/Admin/Pages/AdminStudents";
import AdminAttendance from "./pages/Admin/Pages/AdminAttendance";
import AdminStudentAttendance from "./pages/Admin/Pages/AdminStudentAttendance";
import AdminSubjects from "./pages/Admin/Pages/AdminSubjects";
import AdminClass from "./pages/Admin/Pages/AdminClass";
import AdminFees from "./pages/Admin/Pages/AdminFees";
import AdminReportCards from "./pages/Admin/Pages/AdminReportCards";
import AdminAnnouncement from "./pages/Admin/Pages/AdminAnnouncement";
import AdminWallet from "./pages/Admin/Pages/AdminWallet";
import AdminSettings from "./pages/Admin/Pages/AdminSettings";
import Features from "./pages/Marketing/Features";

import AdminStaff2 from "./pages/Admin/Pages/AdminStaff2";
import StaffDetails from "./pages/Admin/Pages/AdminStaffDetails";
import AdminStudent2 from "./pages/Admin/Pages/AdminStudent2";
import { ToastContainer } from "react-toastify";
import AdminStudentDetails from "./pages/Admin/Pages/AdminStudentDetails";
import AdminEditStudent from "./pages/Admin/Pages/AdminEditStudent";
import AttendancePage from "./features/busary/components/AttendancePage";
import PrivateRoute from "./pages/Marketing/PrivateRoute";
import NotFound from "./pages/Marketing/notFound";
import PaymentVerification from "./features/ParentDashboard/Pages/PaymentVerification";
import RequireSubdomain from "./pages/Marketing/requireSubdomain";
import AdminREportDetailPage from "./pages/Admin/Pages/AdminReportDetalpage";
import SubscriptionBilling from "./pages/Admin/Pages/AdminSubscriptionBilling";
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
        <Route path="*" element={<NotFound />} />
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
          <Route path="/attendance/:token" element={<AttendancePage />} />

          <Route path="/onboarding" element={<OnboardingStepper />} />

          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
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
              <Route
                path="AdminEditStudent/:id"
                element={<AdminEditStudent />}
              />
              <Route path="AdminAttendance" element={<AdminAttendance />} />
              <Route
                path="AdminStudentAttendance"
                element={<AdminStudentAttendance />}
              />
              <Route path="AdminSubjects" element={<AdminSubjects />} />
              <Route path="AdminClass" element={<AdminClass />} />
              <Route path="AdminFees" element={<AdminFees />} />
              <Route path="AdminReportCards" element={<AdminReportCards />} />

              <Route
                path="AdminReportCards/:admissionnumber"
                element={<AdminREportDetailPage />}
              />

              <Route path="AdminAnnouncement" element={<AdminAnnouncement />} />
              <Route path="AdminWallet" element={<AdminWallet />} />

              <Route path="AdminSettings" element={<AdminSettings />} />
              <Route path="suscribe" element={<SubscriptionBilling />} />
            </Route>
          </Route>

          <Route
            element={<PrivateRoute allowedStaffTypes={["class teacher"]} />}
          >
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
          </Route>

          <Route
            element={
              <PrivateRoute allowedStaffTypes={["non-teaching staff"]} />
            }
          >
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
          </Route>

          <Route element={<PrivateRoute allowedRoles={["parent"]} />}>
            <Route path="/parentdashboard" element={<ParentLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute allowedStaffTypes={["security"]} />}>
            <Route path="/securitydashboard" element={<SecurityLayout />}>
              <Route index element={<SecuritysDashboard />} />
              <Route path="announcement" element={<SecurityAnnouncement />} />
              <Route path="settings" element={<SecuritySettings />} />
            </Route>
          </Route>

          <Route
            element={<PrivateRoute allowedStaffTypes={["subject teacher"]} />}
          >
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
              <Route path="attendance" element={<AttendancePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
