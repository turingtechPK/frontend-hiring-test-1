import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk";
import rootReducer from './reducers';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(ReduxThunk)
);

export default store;