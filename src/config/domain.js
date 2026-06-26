import axios from "axios";
import { store } from "../global/store";
import { clearUser } from "../global/userSlice";
import { toast } from "react-toastify";
const subdomain = window.location.hostname.split(".")[0];
export const domainClient = axios.create({
  baseURL: import.meta.env.VITE_Base_Url,
  headers: {
    "Content-Type": "application/json",
    "x-tenant": subdomain,
  },
});
