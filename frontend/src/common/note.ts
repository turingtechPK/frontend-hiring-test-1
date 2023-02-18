import axios from "axios";
import { api_url_base } from "./const";
import { store } from "../redux/store";

export const SaveNote = async (callId: string, content: string) => {
  const access_token = store.getState().auth.accessToken;
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  try {
    const response = await axios.post(
      `${api_url_base}/calls/${callId}/note`,
      { content },
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
