import api from '../../services/dataService';
import { GETCALLS } from './types';

export const getCalls = (limit, offset) => async dispatch => {
  try {
    await api.get(`/calls?offset=${offset}&limit=${limit}`).then(res => {
     
      dispatch({
        type: GETCALLS,
        calls: res.data.nodes,
      });
    });
  } catch (err) {
    throw new Error(err);
  }
};
