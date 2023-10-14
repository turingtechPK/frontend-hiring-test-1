export type LoginInput = {
  username: string
  password: string
}

export type Login = {
  access_token: string
  refresh_token: string
  user: User
}

export type LoginResponse = {
  login: Login
}

export type RefreshTokenResponse = {
  refreshTokenV2: Login
}

export type User = {
  id: string
  username: string
}

export type LoginContextType = {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  signIn: (credentials: LoginInput, callback: VoidFunction) => void
  signInFromSessionStorage: (login: Login, callback: VoidFunction) => void
  signOut: (callback: VoidFunction) => void
}
