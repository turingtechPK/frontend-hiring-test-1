import { combineReducers } from 'redux';
import { ReduxAction } from '../actions/types';

const authenticationStatus = (data = 'loading', action: ReduxAction) =>
  action.type === 'SET_AUTHENTICATED' ? action.payload : data;

const rootReducer = combineReducers({
  authenticationStatus,
});
export default rootReducer;
