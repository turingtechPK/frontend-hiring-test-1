import { Axios, AxiosError } from 'axios'
import { server } from '..'
import { API_ENDPOINT, LoginPayload, LoginResponse } from './types'

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await server.post<LoginResponse>(API_ENDPOINT.LOGIN, payload)
  return data
}

export const refreshToken = async (): Promise<LoginResponse> => {
  try {
    const { data } = await server.post<LoginResponse>(API_ENDPOINT.REFRESH)
    return data
  } catch (err) {
    throw err
  }
}
