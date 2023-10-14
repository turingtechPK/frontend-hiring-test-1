import { ReactNode, useState } from 'react'
import request from 'graphql-request'

import { Login, LoginInput, LoginResponse, User } from './types.ts'
import { LoginContext } from './LoginContext.tsx'
import { LOGIN_MUTATION } from './graphql.ts'

const authProvider = {
  isAuthenticated: false,
  async signIn(loginInput: LoginInput, callback: (res: Login) => void) {
    const res = await request<LoginResponse>({
      url: 'https://frontend-test-api.aircall.dev/graphql',
      document: LOGIN_MUTATION,
      variables: { input: loginInput },
    })
    this.isAuthenticated = true

    callback(res.login)
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
      callback()
    })
  }

  const value = {
    user,
    accessToken,
    refreshToken,
    signIn,
    signOut,
  }

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}
