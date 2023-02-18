import axios from "axios";
import { api_url_base } from "./const";
import { store } from "../redux/store";
import {
  updateAccessToken,
  updateRefreshToken,
} from "../redux/slices/auth.slice";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${api_url_base}/auth/login`, {
      username,
      password,
    });

    store.dispatch(updateAccessToken(response.data.access_token));
    store.dispatch(updateRefreshToken(response.data.refresh_token));
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const refreshToken = async () => {
  const access_token = store.getState().auth.accessToken;
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  try {
    const response = await axios.post(
      `${api_url_base}/auth/refresh-token`,
      {},
      config
    );

    store.dispatch(updateAccessToken(response.data.access_token));
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const logout = async () => {
  store.dispatch(updateAccessToken(""));
};
