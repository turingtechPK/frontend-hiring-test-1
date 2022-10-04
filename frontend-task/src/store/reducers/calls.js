import { GETCALLS } from '../actions/types';

const initialState = {
  calls: [],
};
function callsReducer(state = initialState, action) {
  const { type, calls } = action;

  switch (type) {
    case GETCALLS:
      return {
        ...state,
        calls,
      };
    default:
      return state;
  }
}

export default callsReducer;
