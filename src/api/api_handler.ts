import axios from 'axios';
import { ARCHIVE_CALL, AUTH_LOGIN, GET_CALL } from './api_url';
export const authLogin = (username: String, password: String) =>
  axios.request({
    method: 'POST',
    url: AUTH_LOGIN(),
    data: { username, password },
  });

export const getCallList = (offset: number, limit: number) =>
  axios.request({
    method: 'GET',
    url: GET_CALL(offset, limit),
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  });

export const archivedCall = (id: string) =>
  axios.request({
    method: 'PUT',
    url: ARCHIVE_CALL(id),
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  });
