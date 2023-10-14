import { useContext } from 'react'

import { LoginContext } from './LoginContext.tsx'

export const useLogin = () => {
  return useContext(LoginContext)
}
