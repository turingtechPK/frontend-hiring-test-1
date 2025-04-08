import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_URL;

export const addNote = async (activityId: string, content: string) => {
  const token = localStorage.getItem("authToken");

  if (!token) throw new Error("Unauthorized: No access token found");

  const response = await axios.post(
    `${API_BASE_URL}/calls/${activityId}/note`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
