import { GET_LIST } from "../apiUrls";
import { GET_LIST_BY_ID, ADD_NOTE } from "../apiUrls";

export const getList = async (token: string, offset: number, limit: number) => {
    return await fetch(GET_LIST(offset,limit), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .catch(error => error);
  };

export const getListById = async (token: string, id: string) => {
    return await fetch(GET_LIST_BY_ID(id), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .catch(error => error);
  };

export const addNote = async (token: string, id: string, content:string) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
    content: content,
    });

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
    };
    return await fetch(ADD_NOTE(id), requestOptions)
      .then(response => response.json())
      .catch(error => error);
  };
