import axios from "axios";

const httpClient = async (
  url: string,
  method: string = "GET",
  payload?: any,
  config?: any
) => {
  const authToken: string | null = localStorage.getItem("authToken");

  const headers: Record<string, string> = {};

  if (authToken) {
    const tokenWithoutQuotes = authToken.replace(/"/g, "");
    headers["Authorization"] = `Bearer ${tokenWithoutQuotes}`;
  }

  try {
    const response = await axios.request({
      url,
      method,
      data: payload,
      headers,
      ...config,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default httpClient;
