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

ApiClient.interceptors.request.use((config) => {
  const token = store.getState().user.token;

  const isPublicRoute = PublicRoutes.some((routes) => {
    config.url.includes(routes);
  });

  if (token && !PublicRoutes) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
  (error) => Promise.reject(error);
});

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response.status;

    if (error === 401) {
      store.dispatch(clearUser());
      window.location.href = "/login";
    } else if (error === 403) {
      console.error("Access Forbidden");
    } else if (error === 500) {
      console.error("Internal Server error");
    }

    return Promise.reject(error);
  },
);
