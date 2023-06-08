import axios from "axios";
const baseUrl = "https://frontend-test-api.aircall.io";

const getAll = async (userObject) => {
  const response = await axios.get(`${baseUrl}/calls`, {
    headers: {
      Authorization: `Bearer ${userObject.access_token}`,
    },
  });
  return response.data;
};

const getCallsByPage = async (userObject, number, limit) => {
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

const getCallsById = async (userObject, id) => {
  const response = await axios.get(`${baseUrl}/calls/${id}`, {
    headers: {
      Authorization: `Bearer ${userObject.access_token}`,
    },
  });
  return response.data;
};

const addNotes = async (userObject, id, note) => {
  const response = await axios.post(
    `${baseUrl}/calls/${id}/note`,
    {
      content: note,
    },
    {
      headers: {
        Authorization: `Bearer ${userObject.access_token}`,
      },
    }
  );
  return response.data;
};

const archiveCalls = async (userObject, id) => {
  console.log("passed data", userObject);
  console.log("passed token", userObject.access_token);

  const response = await axios.put(`${baseUrl}/calls/${id}/archive`, "", {
    headers: {
      Authorization: `Bearer ${userObject.access_token}`,
    },
  });
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getCallsByPage,
  getCallsById,
  addNotes,
  archiveCalls,
};
