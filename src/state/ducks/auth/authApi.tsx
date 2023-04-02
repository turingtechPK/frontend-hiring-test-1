import axios from 'axios';
import { BASE_URL, REFRESH_INTERVAL } from '../../../utils/constants';

export const login = async (obj:any) => {
  return await axios.post(`${BASE_URL}/auth/login`, obj);
};

let refreshTimer: NodeJS.Timeout | null = null;

export function startRefreshTimer() {
  refreshTimer = setInterval(async () => {
    try {
      const refreshToken = sessionStorage.getItem("refresh_token");
      const response = await axios.post("/auth/refresh-token", {
        refresh_token: refreshToken,
      });
      sessionStorage.setItem("access_token", response.data.access_token);
      sessionStorage.setItem("refresh_token", response.data.access_token); //REFRESH TOKEN API DOES NOT RETURN A REFRESH TOKEN
    } catch (error) {
      console.log("Error refreshing access token", error);
    }
  }, REFRESH_INTERVAL);
}
  
