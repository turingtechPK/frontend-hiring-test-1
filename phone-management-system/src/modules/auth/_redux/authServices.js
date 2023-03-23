import axios from "utils/interceptor";

export const login = async (formData) => {
  return await axios.post(`/auth/login`, formData);
};

export const refreshToken = async () => {
  return await axios.post(`/auth/refresh-token`);
};
