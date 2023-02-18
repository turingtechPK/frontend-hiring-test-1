import axios from "axios";
import { api_url_base } from "./const";
import { store } from "../redux/store";

export const FetchCall = async (id: string) => {
  const access_token = store.getState().auth.accessToken;
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  try {
    const response = await axios.get(`${api_url_base}/calls/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const FetchCallsOffset = async (offset: number = 0) => {
  const access_token = store.getState().auth.accessToken;
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  try {
    const response = await axios.get(
      `${api_url_base}/calls?offset=${offset}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
