import MainApi from "./MainApi";

const getCalls = () => {
  return MainApi.get("calls?offset=0&limit=10");
};
const getCallDetails = () => {
  return MainApi.get("calls/:id");
};
const getLoggedInUser = () => {
  return MainApi.get("me");
};
const getAdminBoard = () => {
  return MainApi.post("calls/:id/note");
};

const getArchivedCall = () => {
  return MainApi.put("calls/:id/archive");
};

const UserService = {
  getCalls,
  getCallDetails,
  getLoggedInUser,
  getAdminBoard,
  getArchivedCall,
};
export default UserService;
