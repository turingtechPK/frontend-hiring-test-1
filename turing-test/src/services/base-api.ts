import { app } from "@/shared/config";
import { getAccessToken } from "@/shared/helper";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AUHT_ROUTES } from "./auth";

const instance = axios.create({
  baseURL: app.API_BASE_URL,
});

instance.interceptors.request.use(async function (config) {
  if (config.url !== AUHT_ROUTES.login) {
    const accessToken = getAccessToken();

    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) => {
      return axios.get<T>(url, config);
    },
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
      return axios.patch<T>(url, body, config);
    },
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
      return axios.post<T>(url, body, config);
    },
  };
};

export default api(instance);
