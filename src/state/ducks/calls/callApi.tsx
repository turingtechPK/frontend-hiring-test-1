import axios from '../../../utils/api';
import { BASE_URL } from '../../../utils/constants';

export const getCalls = async (offset:Number, limit:Number) => {
  return await axios.get(`${BASE_URL}/calls?offset=${offset}&limit=${limit}`);
}

export const addNewNote = async (content:String, id:String) => {
  return await axios.post(`${BASE_URL}/calls/${id}/note`, { content });
}

export const archiveCall=async(id:String)=>{
  return await axios.post(`${BASE_URL}/calls/${id}/archive`);
}
