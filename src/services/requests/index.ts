import axios from 'axios'

export const server = axios.create({
  baseURL: '/api',
  withCredentials: true,
})
