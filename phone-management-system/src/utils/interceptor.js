import axios from "axios";
import { store } from "./../redux/store";

const baseURL = "https://frontend-test-api.aircall.io/";

const baseInstance = axios.create({
  baseURL,
});

baseInstance.defaults.headers.common["Accept"] = "application/json";
baseInstance.defaults.headers.common["Content-Type"] = "application/json";

// request interceptor
baseInstance.interceptors.request.use(async (config) => {
  const {
    auth: { access_token },
  } = store.getState();
  if (!access_token) {
    return config;
  }

  if (access_token) {
    config.headers.authorization = "Bearer " + access_token;
    // const user = jwtDecode(access_token);
    // const expTime = user?.exp * 1000;
    // if (expTime - Date.now() <= 600000) {
    //   const res = await axios.post(`${baseURL}auth/refresh-token`, null, {
    //     headers: {
    //       Authorization: "Bearer " + access_token,
    //     },
    //   });
    //   actions.refreshToken(res?.data);
    //   return config;
    // } else {
    //   return config;
    // }
  }
  return config;
});

// response interceptor
baseInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // if (err?.config?.url !== "/auth/login") {
      //   window.location.reload();
      // }
      // localStorage.clear();
    }
    throw err;
  }
);

export default baseInstance;
