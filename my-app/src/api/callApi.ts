import axios from 'axios';
import { call, fetchCallsResponse,  } from '../Interfaces/call';


const API_URL =import.meta.env.VITE_API_URL;


export const fetchCalls = async (offset: number, limit: number, token: string): Promise<fetchCallsResponse> => {
  const response = await axios.get(`${API_URL}/calls?offset=${offset}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchCallById = async (id: string, token: string): Promise<call> => {
  const response = await axios.get(`${API_URL}/calls/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const archiveCall = async (id: string, token: string): Promise<call> => {
  const response = await axios.put(`${API_URL}/calls/${id}/archive`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
