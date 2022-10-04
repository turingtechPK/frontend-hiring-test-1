import { combineReducers } from "redux";
import auth from "./auth";
import calls from "./calls";

export default combineReducers({
  auth,
  calls,
});