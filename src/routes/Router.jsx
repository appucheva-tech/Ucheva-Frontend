import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../features/auth/layout/AuthLayout";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import VerifyEmail from "../features/auth/pages/VerifyEmail";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import VerifyForgot from "../features/auth/pages/VerifyForgot";
import ResetPassword from "../features/auth/pages/ResetPassword";
import OnboardingStepper from "../features/onboarding/pages/Onboarding";
// import AdminLayout from "../features/admin/layout/AdminLayout";
// import AdminDashboard from "../features/admin/pages/Admin-Dashboard";

const routes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "verify", element: <VerifyEmail /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify-password", element: <VerifyForgot /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/onboarding",
    element: <OnboardingStepper />,
  },

  // {
  //   path: "/admin",
  //   element: <AdminLayout />,
  //   children: [{ path: "dashboard", element: <AdminDashboard /> }],
  // },
];

export const Element = createBrowserRouter(routes);
