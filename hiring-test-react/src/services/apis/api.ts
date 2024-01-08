import { dataServer } from "./axios.config";

const authenticate = async (username: string, password: string) => {
  try {
    const response = await dataServer.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("error in api...", error);
    throw error;
  }
};

const refreshToken = async () => {
  try {
    const response = await dataServer.post("/auth/refresh-token");
    return response.data;
  } catch (error) {
    console.log("error in api...", error);
    throw error;
  }
};

const getCalls = async (offset: number, limit: number) => {
  try {
    const response = await dataServer.get("/calls", {
      params: { offset, limit },
    });
    return response.data;
  } catch (error) {
    console.log("error in api...", error);
    throw error;
  }
};

const getCallById = async (id: string) => {
  try {
    const response = await dataServer.get(`/calls/${id}`);
    return response.data;
  } catch (error) {
    console.log("error in api...", error);
    throw error;
  }
};

const getAuthenticatedUser = async () => {
  try {
    const response = await dataServer.get("/me");
    return response.data;
  } catch (error) {
    console.log("error in api...", error);
    throw error;
  }
};

const createNoteForCall = async (id: string, note: string) => {
  try {
    const response = await dataServer.post(`/calls/${id}/note`, { note });
    return response.data;
  } catch (error) {
    console.log("error in api...", error);
    throw error;
  }
};

const archiveOrUnarchiveCall = async (id: string) => {
  try {
    const response = await dataServer.put(`/calls/${id}/archive`);
    return response.data;
  } catch (error) {
    console.log("error in api...", error);
    throw error;
  }
};

export {
  authenticate,
  refreshToken,
  getCalls,
  getCallById,
  getAuthenticatedUser,
  createNoteForCall,
  archiveOrUnarchiveCall,
};
