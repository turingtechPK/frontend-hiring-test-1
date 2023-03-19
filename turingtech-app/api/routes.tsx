import axios from "./axiosInstance";

export const login = async (payload: { username: string; password: string; }) => {
  const res = await axios.post("/auth/login", payload);
  return res.data;
};
export const refreshToken = async () => {
  const res = await axios.post("/auth/refresh-token");
  return res.data;
};

export const getCalls = async (offset: any, limit: any) => {
  const res = await axios.get(`/calls?offset=${offset}&limit=${limit}`);
  return res.data;
};

export const getCall = async (id: any) => {
  const res = await axios.get(`/calls/${id}`);
  return res.data;
};

export const addNote = async (id: any, newNote: any) => {
  const res = await axios.post(`/calls/${id}/note`, {
    content: newNote,
  });
  return res.data;
};
export const toggleArchive = async (id: any) => {
  const res = await axios.put(`/calls/${id}/archive`);
  return res.data;
};
