import axios from "axios";
import { BASE_URL, REFRESH_INTERVAL } from "./constants";
import { access } from "fs";

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

export default api;
