import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const dataServer = axios.create({
  baseURL: apiUrl,
  timeout: 100000000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

export { dataServer };
