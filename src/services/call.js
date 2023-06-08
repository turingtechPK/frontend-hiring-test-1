import axios from "axios";
const baseUrl = "https://frontend-test-api.aircall.io";

const getAll = async (userObject) => {
  console.log("passed data", userObject);
  console.log("passed token", userObject.access_token);
  const response = await axios.get(`${baseUrl}/calls`, {
    headers: {
      Authorization: `Bearer ${userObject.access_token}`,
    },
  });
  return response.data;
};

const getCallsByPage = async (userObject, number, limit) => {
  console.log("passed data", userObject);
  console.log("passed token", userObject.access_token);
  const response = await axios.get(
    `${baseUrl}/calls/?offset=${number}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${userObject.access_token}`,
      },
    }
  );
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getCallsByPage };
