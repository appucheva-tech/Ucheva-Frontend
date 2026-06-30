import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../global/userSlice";
import axios from "axios";
import NotFound from "./notFound";
import { domainClient } from "../config/domain";
import { persistor } from "../global/store";
import LoadingScreen from "../components/Loading-Screen";

const getDashboardByRole = (user) => {
  
  if (!user) return "/login";
  if (user.role === "admin") return "/admin/dashboard";
  if (user.role === "parent") return "/parentdashboard";
  if (user.role === "staff") {
    switch (user.staffType?.trim().toLowerCase()) {
      case "class teacher":
        return "/CTdashboard";
      case "subject teacher":
        return "/subjectteacherdashboard";
      case "non-teaching staff":
        return "/bursary";
      case "security":
        return "/securitydashboard";
      default:
        return "/";
    }
  }
  return "/";
};

const PrivateRoute = ({ allowedRoles, allowedStaffTypes }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector(
    (state) => state.user.token || state.staff.staffToken,
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [subdomainValid, setSubdomainValid] = useState(false);
  const [rehydrated, setRehydrated] = useState(false);

  const host = window.location.hostname;

  let subdomain = null;

  if (host.includes("nip.io")) {
    subdomain = host.split(".")[0];
  } else {
    const parts = host.split(".");
    subdomain =
      parts.length > 2 ? parts.slice(0, parts.length - 2).join(".") : null;
  }

  const checkSubdomain = async () => {
    try {
      if (!subdomain) {
        setSubdomainValid(false);
        setLoading(false);
        return;
      }

      const res = await domainClient.get("/admin/school-url");
      const exists = res?.data?.exists ?? false;

      setSubdomainValid(exists);
    } catch (error) {
      console.error(error);
      setSubdomainValid(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSubdomain();
  }, [subdomain]);

  useEffect(() => {
    const unsubscribe = persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        setRehydrated(true);
      }
    });
    return unsubscribe;
  }, []);
  console.log(loading, rehydrated);

  if (loading ) return <LoadingScreen/>;

  if (!subdomainValid) {
    return <NotFound />;
  }

  if (!token) {
    dispatch(clearUser());
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={getDashboardByRole(user)} replace />;
  }

  if (
    allowedStaffTypes &&
    !allowedStaffTypes.includes(user?.staffType?.trim().toLowerCase())
  ) {
    return <Navigate to={getDashboardByRole(user)} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
