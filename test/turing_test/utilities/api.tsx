import axios from "axios";

const baseUrl = "https://frontend-test-api.aircall.io";

export const siginCall = async (userName: string, password: string) => {
  return await axios.post(`${baseUrl}/auth/login`, {
    username: userName,
    password: password,
  });
};

export const refreshCall = async () => {
  return await axios.post(
    `${baseUrl}/auth/refresh-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

export const getData = async () => {
  return await axios.get(`${baseUrl}/calls`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const getPaginationData = async (offset: number) => {
  return await axios.get(`${baseUrl}/calls?offset=${offset}&limit=10`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
