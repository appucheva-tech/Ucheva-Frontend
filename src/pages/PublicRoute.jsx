import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const getDashboardByRole = (user) => {
  if (!user) return "/login";
  if (user.role === "admin") return "/admin/dashboard";
  if (user.role === "parent") return "/parentdashboard";
  if (user.role === "staff") {
    switch (user.staffType?.trim().toLowerCase()) {
      case "class teacher": return "/CTdashboard";
      case "subject teacher": return "/subjectteacherdashboard";
      case "non-teaching staff": return "/bursary";
      case "security": return "/securitydashboard";
      default: return "/";
    }
  }
  return "/";
};

const PublicRoute = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token || state.staff.staffToken);

  // If logged in, redirect to their dashboard
  if (token && user) {
    return <Navigate to={getDashboardByRole(user)} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;