import { dataServer } from "./axios.config";
import { Call, PaginatedCalls } from "../../types";
import { getAccessToken } from "../../utils/getAccessToken";
import { setAccessToken } from "../../utils/setAccessToken";
import { setRefreshToken } from "../../utils/setRefreshToken";

const authenticate = async (username: string, password: string) => {
  try {
    const response = await dataServer.post("/auth/login", {
      username,
      password,
    });
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    console.log(accessToken, refreshToken);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

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
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const result: PaginatedCalls = {
      nodes: response.data.nodes as Call[],
      totalCount: response.data.totalCount,
      hasNextPage: response.data.hasNextPage,
    };

    return result;
  } catch (error) {
    console.log("error in api...", error);
    throw error;
  }
};

const getCallById = async (id: string) => {
  try {
    const response = await dataServer.get(`/calls/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error in api...", error);
    throw error;
  }
};

const getAuthenticatedUser = async () => {
  try {
    const response = await dataServer.get("/me", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error in api...", error);
    throw error;
  }
};

const createNoteForCall = async (id: string, note: string) => {
  try {
    const response = await dataServer.post(
      `/calls/${id}/note`,
      { note },
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error in api...", error);
    throw error;
  }
};

const archiveOrUnarchiveCall = async (id: string) => {
  try {
    const response = await dataServer.put(`/calls/${id}/archive`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
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
