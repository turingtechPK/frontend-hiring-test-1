import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username: "Nouman",
      password: "Test@123",
    });
    localStorage.setItem("accessToken", response.data.access_token);
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const refreshToken = async (accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/refresh-token`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Refresh token error", error);
    throw error;
  }
};
