import axios from "axios";

const instance = axios.create({
  baseURL: "https://frontend-test-api.aircall.io",
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default instance;
