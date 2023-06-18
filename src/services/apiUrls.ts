export const GET_JWT_TOKEN = 'https://frontend-test-api.aircall.io/auth/login';
export const GET_LIST =(offset: number,limit: number) => `https://frontend-test-api.aircall.io/calls?offset=${offset}&limit=${limit}`
export const GET_LIST_BY_ID =(id: string) => `https://frontend-test-api.aircall.io/calls/${id}`
export const ADD_NOTE =(id: string) => `https://frontend-test-api.aircall.io/calls/${id}/note`