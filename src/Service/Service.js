import axios from "axios";

const api = axios.create({
  baseURL: "https://frontend-test-api.aircall.io",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: true,
});

export const loginService = async (userData) => {
  let response;
  try {
    response = await api.post("/auth/login", userData);
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const getCallsService = async (offset, limit, jwt_token) => {
  let response;
  try {
    response = await api.get("/calls", {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
      params: {
        offset,
        limit,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const addArchiveService = async (id, jwt_token) => {
  let response;
  try {
    response = await api.put(
      `/calls/${id}/archive`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const addNotesService = async (id, note, jwt_token) => {
  let response;
  try {
    response = await api.post(
      `/calls/${id}/note`,
      {
        content: note,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const refreshTokenService = async (jwt_token) => {
  let response;
  try {
    response = await api.post(
      "/auth/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const getMeService = async (jwt_token) => {
  let response;
  try {
    response = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return response;
};
