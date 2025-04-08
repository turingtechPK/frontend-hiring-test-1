import axios from 'axios';
import { authResponse } from '../Interfaces/auth';


const API_URL = import.meta.env.VITE_API_URL;



export const login = async (username: string, password: string): Promise<authResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const refreshToken = async (accessToken: string|null): Promise<authResponse> => {
  const response = await axios.post(`${API_URL}/auth/refresh-token`, {}, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
