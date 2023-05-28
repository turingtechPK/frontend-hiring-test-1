export const API_URLS = {
  AUTHENTICATE: {
    LOGIN:'/auth/login',
  },
  TURING_TECH: {
    GET_ALL: '/calls',
    ADD_NOTES:'/calls/:id/note', //post content
    ARCHIVE_UNARCHIVE:'/calls/:id/archive', //put
    GET_CALL:'/calls/:id',
  },
};
    