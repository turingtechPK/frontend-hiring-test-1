import api from "./api";

const getListofPaginatedCalls = (offset, limit) => {
  console.log("hello3")
  return api.get(`/calls?offset=${offset}&limit=${limit}`);
  
};

const getSingleCall = (id) => {
  return api.get(`/calls/${id}`);
};

const getCurrentUser = () => {
  return api.get("/me");
};

const createNote = (id, note) => {
  return api.post(`/calls/${id}/note`, {
    content: note
  });
};

const toggleArchive = (id) => {
  return api.put(`/calls/${id}/archive`)
}

const CallService = {
  getListofPaginatedCalls,
  getSingleCall,
  getCurrentUser,
  createNote,
  toggleArchive
};

export default CallService;
