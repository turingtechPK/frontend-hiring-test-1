import { refresh_token } from '../utils/api';
import httpClient from '../utils/httpClient';

const refreshTokenInterval = 9 * 60 * 1000;

export const startTokenRefreshTimer = () => {
  setInterval(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const { data } = await httpClient(refresh_token, 'POST', { refreshToken });
      localStorage.setItem('authToken', data.access_token);
    } catch (error) {
      // Handle the error if needed.
      console.error('Token refresh failed:', error);
    }
  }, refreshTokenInterval);
};
