import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NotFound from "./notFound";
import axios from "axios";
import { domainClient } from "../config/domain";
export default function RequireSubdomain() {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);





const host = window.location.hostname;

let subdomain = null;

if (host.includes("nip.io")) {
  subdomain = host.split(".")[0];
} else {
  const parts = host.split(".");
  subdomain =
    parts.length > 2
      ? parts.slice(0, parts.length - 2).join(".")
      : null;
}


  useEffect(() => {
    const checkSubdomain = async () => {
      try {
        if (!subdomain) {
          setValid(false);
          setLoading(false);
          return;
        }

        const res = await domainClient.get("/admin/school-url");
        const exists = res?.data?.exists ?? false;

        setValid(exists);
      } catch (error) {
        console.error(error);
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubdomain();
  }, [subdomain]);

  if (loading) {
    return null;
  }

  return valid ? <Outlet /> : <NotFound />;
}