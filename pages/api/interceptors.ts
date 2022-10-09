import axios from "axios";

// axios.defaults.baseURL = 'https://frontend-test-api.aircall.io/';

const instance = axios.create({
  baseURL: "https://frontend-test-api.aircall.io/",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config: any) => {
    const token = JSON.parse(localStorage.getItem("token")!);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token.access_token; // for Spring Boot back-end
      //config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const originalConfig = error.config;
    return error;
  }
);
export default instance;
