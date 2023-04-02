import axios from 'axios';
import { BASE_URL } from '../../../utils/constants';

export const login = async (obj:any) => {
  return await axios.post(`${BASE_URL}/auth/login`, obj);
};


  
