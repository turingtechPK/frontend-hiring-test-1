import api from '../../services/dataService';
import { LOGIN, LOGOUT } from './types';

export const login = (email, password) => async dispatch => {
  try {
    await api.post(`/auth/login`, { username: email, password }).then(res => {
      console.log(res);
      api.defaults.headers.common = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      localStorage.setItem('AccesToken', res.data.access_token);
      localStorage.setItem('user', res.data.user.username);
      dispatch({
        type: LOGIN,
        payload: res,
      });
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const logout = () => {
  localStorage.setItem('AccesToken', undefined);
  localStorage.setItem('user', undefined);
  api.defaults.headers.common = {
	Authorization: undefined,
  };
  return { type: LOGOUT };
};
