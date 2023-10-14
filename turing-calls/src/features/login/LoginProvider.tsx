import { ReactNode, useState } from 'react'

import {
  Login,
  LoginInput,
  LoginResponse,
  RefreshTokenResponse,
  User,
} from './types.ts'
import { LoginContext } from './LoginContext.tsx'
import { LOGIN_MUTATION, REFRESH_TOKEN_MUTATION } from './graphql.ts'
import { sendGraphQlRequest } from '../../utils/http.ts'

const NINE_MINUTES_IN_MS = 9 * 60 * 60

let tokenRefreshIntervalId: number

const authProvider = {
  isAuthenticated: false,
  async signIn(loginInput: LoginInput, callback: (res: Login) => void) {
    const res = await sendGraphQlRequest<LoginResponse>(
      LOGIN_MUTATION,
      { input: loginInput },
      undefined
    )
    this.isAuthenticated = true

    clearInterval(tokenRefreshIntervalId)
    tokenRefreshIntervalId = setInterval(async () => {
      const res = await sendGraphQlRequest<RefreshTokenResponse>(
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
