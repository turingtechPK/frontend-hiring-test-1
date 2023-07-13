import axios from "axios";

const baseUrl = "https://frontend-test-api.aircall.io";
const Reload = () => {
  localStorage.clear();
  window.location.reload();
};

export const getData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/calls`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return response;
  } catch (error) {
    console.log("error", error);
    if (error.response && error.response.status === 401) {
      Reload();
    }
  }
};

export const siginCall = async (userName: string, password: string) => {
  try {
    return await axios.post(`${baseUrl}/auth/login`, {
      username: userName,
      password: password,
    });
  } catch (error) {
    console.log("error", error);
    if (error.response && error.response.status === 401) {
      Reload();
    }
  }
};

export const getPaginationData = async (offset: number) => {
  try {
    return await axios.get(`${baseUrl}/calls?offset=${offset}&limit=10`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.log("error", error);
    if (error.response && error.response.status === 401) {
      Reload();
    }
  }
};

export const addNote = async (id: string, note: string) => {
  try {
    return await axios.post(
      `${baseUrl}/calls/${id}/note`,
      { content: note },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error) {
    console.log("error", error);
    if (error.response && error.response.status === 401) {
      Reload();
    }
  }
};

export const archiveCall = async (id: string) => {
  try {
    return await axios.put(
      `${baseUrl}/calls/${id}/archive`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error) {
    console.log("error", error);
    if (error.response && error.response.status === 401) {
      Reload();
    }
  }
};
