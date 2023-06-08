import axios from "axios";
const baseUrl = "https://frontend-test-api.aircall.io";

//https://frontend-test-api.aircall.io

const login = async (info) => {
  const response = await axios.post(`${baseUrl}/auth/login`, info);
  return response.data;
};

const refreshToken = async (userObject, data) => {
  const response = await axios.post(`${baseUrl}/auth/refresh-token`, data, {
    headers: {
      Authorization: `Bearer ${userObject.access_token}`,
    },
  });
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, refreshToken };
