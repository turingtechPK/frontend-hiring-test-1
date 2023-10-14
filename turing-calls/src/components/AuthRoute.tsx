import { Navigate, useLocation } from 'react-router-dom'

import { useLogin } from '../feature/login/useLogin.ts'

export const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const login = useLogin()
  const location = useLocation()

  if (!login?.user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
