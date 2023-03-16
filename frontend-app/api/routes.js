import axios from "./axiosInstance";

export const login = async (payload) => {
  const res = await axios.post("/auth/login", payload);
  return res.data;
};
export const refreshToken = async () => {
  const res = await axios.post("/auth/refresh-token");
  return res.data;
};

export const getCalls = async (offset, limit) => {
  const res = await axios.get(`/calls?offset=${offset}&limit=${limit}`);
  return res.data;
};

export const getCall = async (id) => {
  const res = await axios.get(`/calls/${id}`);
  return res.data;
};

export const addNote = async (id, newNote) => {
  const res = await axios.post(`/calls/${id}/note`, {
    content: newNote,
  });
  return res.data;
};
export const toggleArchive = async (id) => {
  const res = await axios.put(`/calls/${id}/archive`);
  return res.data;
};
