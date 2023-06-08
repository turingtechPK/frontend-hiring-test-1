import axios from "axios";
const baseUrl = "https://frontend-test-api.aircall.io";

//https://frontend-test-api.aircall.io

const login = async (info) => {
  const response = await axios.post(`${baseUrl}/auth/login`, info);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
