import axios from "axios";
import { refreshToken } from "./auth";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("yes");
      originalRequest._retry = true;
      const newToken = await refreshToken(localStorage.getItem("accessToken"));
      console.log("new token: ", newToken);
      localStorage.setItem("accessToken", newToken.access_token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newToken.access_token}`;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
