import axios from "axios";
import { store } from "../global/store";
import { clearUser } from "../global/userSlice";

const subdomain = window.location.hostname.split(".")[0];
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_Base_Url,
  // timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    "x-tenant": subdomain,
  },
});
console.log(import.meta.env.VITE_Base_Url);

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();

    const token = state.staff.token || state.user.token;
    // console.log("State from store:", state);
    // console.log("Staff Token from store:", state.staff.token);
    // console.log("User Token from store:", state.user.token);
    //     console.log("Token from store:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        store.dispatch(clearUser());
        window.location.href = "/login";
        break;

      case 403:
        console.error("Access Forbidden");
        break;

      case 500:
        console.error("Internal Server Error");
        break;

      default:
        console.error(error.message);
    }

    return Promise.reject(error);
  },
);
