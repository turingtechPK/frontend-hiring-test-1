import axios from "axios";
import { redirect } from "react-router-dom";

import { ACCESS_TOKEN, URL } from "../constants";

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const refreshJwtToken = async () => {
  try {
    const headers = {
      Authorization: `Bearer ${getAccessToken()}`,
    };
    const response = await axios.post(
      `${URL}/auth/refresh-token`,
      {},
      { headers: headers }
    );

    if (response.status !== 201) {
      throw new Error("Token refresh failed");
    }

    const data = response.data;
    localStorage.setItem(ACCESS_TOKEN, data.access_token);

    return data.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    redirect("/login");
    throw error;
  }
};

export const startTokenRefresh = () => {
  refreshJwtToken();

  setInterval(() => {
    refreshJwtToken().catch((error) => {
      console.error("Failed to refresh token automatically:", error);
    });
  }, 540000); // refresh token after every 9 minutes
};
