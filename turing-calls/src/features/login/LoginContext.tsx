import { createContext } from 'react'

import { LoginContextType } from './types.ts'

export const LoginContext = createContext<LoginContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  signIn: () => {},
  signInFromSessionStorage: () => {},
  signOut: () => {},
})
