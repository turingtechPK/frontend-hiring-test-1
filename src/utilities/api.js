import axios from "axios";

const base_url = "https://frontend-test-api.aircall.io";

export const login = async (name, password) => {
  try {
    return await axios.post(`${base_url}/auth/login`, {
      username: name,
      password: password,
    });
  } catch (error) {
    console.error(error);
  }
};
export const refreshToken = async () => {
  try {
    return await axios.post(
      `${base_url}/auth/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const getCalls = async () => {
  try {
    return await axios.get(`${base_url}/calls`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCallsCustom = async (offset) => {
  try {
    return await axios.get(`${base_url}/calls?offset=${offset}&limit=10`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const changeStatus = async (id) => {
  try {
    return await axios.put(
      `${base_url}/calls/${id}/archive`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const addNote = async (id, note) => {
  try {
    return await axios.post(
      `${base_url}/calls/${id}/note`,
      { content: note },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
