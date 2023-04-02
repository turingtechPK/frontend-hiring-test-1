import axios from '../../../utils/api';
import { BASE_URL } from '../../../utils/constants';

export const getCalls = async (offset:number, limit:number) => {
  return await axios.get(`${BASE_URL}/calls?offset=${offset}&limit=${limit}`);
}

export const addNewNote = async (content:string, id:string) => {
  return await axios.post(`${BASE_URL}/calls/${id}/note`, { content });
}

export const setArchiveCall=async(id:string)=>{
  return await axios.put(`${BASE_URL}/calls/${id}/archive`);
}
