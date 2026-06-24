import axios from "axios";
import { store } from "../global/store";
import { clearUser } from "../global/userSlice";
import { toast } from "react-toastify";

const subdomain = window.location.hostname.split(".")[0];
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_Base_Url,
  // timeout: 8000,
  headers: {
    "Content-Type": "application/json",
   "x-tenant": subdomain,
  },
});

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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    let fallbackMessage = "Something went wrong";

    switch (status) {
      case 401:
        store.dispatch(clearUser());
        window.location.href = "/login";
        break;

      case 403:
        fallbackMessage = "Access Forbidden";
        break;

      case 500:
        fallbackMessage = "Internal Server Error";
        break;

      default:
        fallbackMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
    }

    // Attach the correct message to error.response.data.message so your Signup catch block can read it seamlessly
    if (!error.response) {
      error.response = { data: { message: fallbackMessage } };
    } else if (!error.response.data) {
      error.response.data = { message: fallbackMessage };
    } else if (!error.response.data.message) {
      error.response.data.message = fallbackMessage;
    }

    // Crucial fix: reject the promise to drop the response into your signup form's catch block
    return Promise.reject(error);
  },
);
