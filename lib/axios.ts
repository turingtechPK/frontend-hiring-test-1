import axios from "axios";

const BASE_URL = "https://frontend-test-api.aircall.dev/";

export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },

})

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },

})