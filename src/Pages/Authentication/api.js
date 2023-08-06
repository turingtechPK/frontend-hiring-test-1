import axios from "axios";
import { BASE_URL, LOGIN_URL } from "../../Utils/constants";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL + LOGIN_URL}`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
    s;
  }
};
