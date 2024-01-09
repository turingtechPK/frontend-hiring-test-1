import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Pusher from "pusher-js";

import { refreshToken } from "./api";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const appCluster = import.meta.env.VITE_REACT_APP_APP_CLUSTER;
const appKey = import.meta.env.VITE_REACT_APP_APP_KEY;

const pusher = new Pusher(appKey, {
  cluster: appCluster,
  authEndpoint: `${apiUrl}pusher/auth`,
  // @ts-expect-error type implicit below
  encrypted: true,
});

const channel = pusher.subscribe("private-aircall");

// event listener
channel.bind("update-call", (data: any) => {
  console.log("Call updated:", data);
});

const dataServer: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 100000000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

// response interceptor to handle token expiration and refresh
// dataServer.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshResponse = await refreshToken();
//         const newAccessToken = refreshResponse.access_token;

//         // updated stored access token
//         localStorage.setItem("access_token", newAccessToken);

//         // retrying  original request with new access token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return dataServer(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh token error:", refreshError);
//         throw refreshError;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export { dataServer };
