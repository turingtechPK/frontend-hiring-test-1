import { server } from '..'
import { API_ENDPOINT, LoginPayload, LoginResponse } from './types'

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await server.post<LoginResponse>(API_ENDPOINT.LOGIN, payload)
  return data
}
