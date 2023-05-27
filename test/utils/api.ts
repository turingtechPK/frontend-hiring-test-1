import axios from "axios";

const API = axios.create({
  baseURL: "https://frontend-test-api.aircall.io",
});

export default API;
