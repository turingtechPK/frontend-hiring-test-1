import axios from "axios";
import { BASE_URL, FETCH_CALLS } from "../../Utils/constants";

export const fetchCalls = async () => {
  try {
    const response = await axios.get(`${BASE_URL + FETCH_CALLS}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Employees." + error.message);
  }
};
