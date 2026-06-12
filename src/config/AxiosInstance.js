import axios from "axios";
import { store } from "../global/store";
import { clearUser } from "../global/userSlice";
import { PublicRoutes } from "../lib/PublicRoutes";

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_Base_Url,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;

    const isPublicRoute = PublicRoutes.some((route) =>
      config.url?.includes(route),
    );

    if (token && !isPublicRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

ApiClient.interceptors.response.use(
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
        break;
    }

    return Promise.reject(error);
  },
);
