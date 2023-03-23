import axios from "utils/interceptor";

export const getCallsInfo = async (params) => {
  return await axios.get(`/calls${params}`);
};

export const getCallsInfoById = async (id) => {
  return await axios.get(`/calls/${id}`);
};

export const archiveCall = async (id) => {
  return await axios.put(`/calls/${id}/archive`);
};

export const addNote = async (id, content) => {
  return await axios.post(`/calls/${id}/note`, { content });
};
