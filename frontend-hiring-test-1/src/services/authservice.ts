// /src/services/authService.js
import axios from 'axios';

const API_BASE_URL = 'https://frontend-test-api.aircall.dev';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    
    // Store the token in localStorage
    localStorage.setItem('accessToken', response.data.access_token);
    
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const refreshToken = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
      accessToken,
    });

    // Update the stored access token with the new one
    localStorage.setItem('accessToken', response.data.access_token);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
