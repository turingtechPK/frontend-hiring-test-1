import axios from "axios";
import { BASE_URL } from "./constants";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config:any) => {
    const accessToken = sessionStorage.getItem("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error:any) => Promise.reject(error)
);

api.interceptors.response.use(
  (response:any) => response,
  async (error:any) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refresh_token");

      const response = await api.post("/auth/refresh", {
        refresh_token: refreshToken,
      });

      sessionStorage.setItem("access_token", response.data.access_token);
      sessionStorage.setItem("refresh_token", response.data.refresh_token);
      originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
