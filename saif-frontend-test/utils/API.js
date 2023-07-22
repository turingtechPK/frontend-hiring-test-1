import axios from 'axios';
const token = typeof localStorage !== 'undefined' && localStorage.getItem('turingUserToken')
const baseURL = `https://frontend-test-api.aircall.io`

const headers = {
    "Authorization": `Bearer ${token}`
  }

export const login = async (payload) => {
    return await axios.post(`${baseURL}/auth/login`, payload)
}

export const refreshToken = async () => {
    return await axios.post(`${baseURL}/auth/refresh-token`, {}, {headers})
}

export const getCalls = async (pageNumber, token) => {
    return await axios.get(`${baseURL}/calls?offset=${pageNumber}&limit=10`, {headers}).catch((error)=> {return {error: error}})

}

export const saveNote = async (callId, note) => {
    return await axios.post(`${baseURL}/calls/${callId}/note`, {content: note}, {headers})
}