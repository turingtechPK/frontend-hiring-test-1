export enum API_ENDPOINT {
  LOGIN = 'auth/login',
}

export type LoginPayload = {
  username: string
  password: string
}

type User = {
  id: string
  username: string
}

export type LoginResponse = {
  access_token: string
  refresh_token: string
  user: User
}
