import { GET_LIST } from "../apiUrls";

export const getList = async (token: string) => {
    return await fetch(GET_LIST, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .catch(error => error);
  };
