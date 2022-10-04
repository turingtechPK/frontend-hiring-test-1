import { LOGIN, LOGOUT } from '../actions/types';

const initialState = [];

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return [...state, payload];
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
