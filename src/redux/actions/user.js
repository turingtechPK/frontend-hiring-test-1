import axios from "axios";
import { config } from "../../config";

// const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const BASE_URL = config.BACKEND_BASE_URL;
console.log("BASE URL:", BASE_URL)
export const userInfo = () => async (dispatch) => {

  try {
    console.log("Request initiated")
    dispatch({
      type: "USER_INFO_REQUEST"
    });

    const token = localStorage.getItem("access_token");
    const { data } = await axios.get(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("User Object:", data);

    dispatch({
      type: "USER_INFO_SUCCESS",
      payload: data,
    });
    console.log("Success user dispatched")


  } catch (error) {
    console.log("Fetch User Error:", error.response.data)
    dispatch({
      type: "USER_INFO_FAIL",
      payload: error.response.data.message,
    });
  }
}

export const refreshAccessToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('access_token');
    const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("REFRESH TOKEN DATA:", data)

    localStorage.setItem('access_token', data.access_token);

    dispatch({
      type: "USER_INFO_REQUEST"
    });

    dispatch({
      type: "USER_INFO_SUCCESS",
      payload: data,
    });

  } catch (error) {
    console.log("Fetch Refresh Token Error:", error.response.data)
    dispatch({
      type: "USER_INFO_FAIL",
      payload: error.response.data.message,
    });
  }
};