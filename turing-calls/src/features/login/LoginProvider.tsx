import { ReactNode, useState } from 'react'
import request from 'graphql-request'

import {
  Login,
  LoginInput,
  LoginResponse,
  RefreshTokenResponse,
  User,
} from './types.ts'
import { LoginContext } from './LoginContext.tsx'
import { LOGIN_MUTATION, REFRESH_TOKEN_MUTATION } from './graphql.ts'

const NINE_MINUTES_IN_MS = 9 * 60 * 60
const URL = 'https://frontend-test-api.aircall.dev/graphql'

let tokenRefreshIntervalId: number

const authProvider = {
  isAuthenticated: false,
  async signIn(loginInput: LoginInput, callback: (res: Login) => void) {
    const res = await request<LoginResponse>({
      url: URL,
      document: LOGIN_MUTATION,
      variables: { input: loginInput },
    })
    this.isAuthenticated = true

    clearInterval(tokenRefreshIntervalId)
    tokenRefreshIntervalId = setInterval(async () => {
      const res = await request<RefreshTokenResponse>(
        URL,
        REFRESH_TOKEN_MUTATION,
        undefined,
        {
          Authorization: `Bearer ${sessionStorage.getItem('refreshToken')}`,
        }
      )

      callback(res.refreshTokenV2)
    }, NINE_MINUTES_IN_MS)

    callback(res.login)
  },
  signInFromSessionStorage(login: Login, callback: (res: Login) => void) {
    this.isAuthenticated = true
    callback(login)
  },
  signOut(callback: VoidFunction) {
    this.isAuthenticated = false
    callback()
  },
}

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  function signIn(credentials: LoginInput, callback: VoidFunction) {
    return authProvider.signIn(credentials, res => {
      setUser(res.user)
      setAccessToken(res.access_token)
      setRefreshToken(res.refresh_token)
      sessionStorage.setItem('refreshToken', res.refresh_token)
      sessionStorage.setItem('accessToken', res.access_token)
      sessionStorage.setItem('user', JSON.stringify(res.user))
      callback()
    })
  }

  function signInFromSessionStorage(login: Login, callback: VoidFunction) {
    return authProvider.signInFromSessionStorage(login, res => {
      setUser(res.user)
      setAccessToken(res.access_token)
      setRefreshToken(res.refresh_token)
      sessionStorage.setItem('refreshToken', res.refresh_token)
      sessionStorage.setItem('accessToken', res.access_token)
      sessionStorage.setItem('user', JSON.stringify(res.user))
      callback()
    })
  }

  function signOut(callback: VoidFunction) {
    return authProvider.signOut(() => {
      setUser(null)
      setAccessToken(null)
      setRefreshToken(null)
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('refreshToken')
      sessionStorage.removeItem('user')
      callback()
    })
  }

  const value = {
    user,
    accessToken,
    refreshToken,
    signIn,
    signInFromSessionStorage,
    signOut,
  }

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}
