import axios from "axios";
import { config } from "../../config";

// const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const BASE_URL = config.BACKEND_BASE_URL;
console.log("BASE URL:", BASE_URL)


const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("access_token");
    if (!refreshToken) {
      throw new Error("Refresh token not available");
    }

    const response = await axios.post(
      `${BASE_URL}/auth/refresh-token`,
      null,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      }
    );

    const { access_token } = response.data;
    if (!access_token) {
      throw new Error("Access token not found");
    }

    console.log("Refresh Item: Access token:", access_token)
    // Assuming the expiration time is fixed at 10 minutes
    const expires_in = 2 * 60; 
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("exp_time", Date.now() + expires_in * 1000);

    return access_token;
  } catch (error) {
    console.error("Error refreshing token:", error.response?.data?.message || error.message);
    throw new Error("Unable to refresh token");
  }
};

export const userInfo = () => async (dispatch) => {
  try {
    console.log("User Info Request Initiated");
    dispatch({
      type: "USER_INFO_REQUEST"
    });

    const token = localStorage.getItem("access_token");
    const expTime = localStorage.getItem("exp_time");
    console.log("user token & time:", { token, expTime });

    if (token && expTime && Date.now() < expTime) {
      console.log("Token is valid")
      // Token is still valid, make the request with the current token
      const { data } = await axios.get(`${BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: "USER_INFO_SUCCESS",
        payload: data,
      });

      console.log("User Info successfully dispatched");
    } else {
      // Token is expired or not available, try to refresh the token
      console.log("Token has expired")
      const newToken = await refreshToken();

      // Retry the user info request with the new token
      const { data } = await axios.get(`${BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${newToken}`
        }
      });

      dispatch({
        type: "USER_INFO_SUCCESS",
        payload: data,
      });

      console.log("Success user dispatched after token refresh");
    }
  } catch (error) {
    console.error("Fetch User Error:", error.response?.data || error.message);
    dispatch({
      type: "USER_INFO_FAIL",
      payload: error.response?.data?.message || "Unable to fetch user information",
    });
  }
};