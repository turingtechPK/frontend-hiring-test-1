import { differenceInSeconds, fromUnixTime, subMinutes } from "date-fns"
import jwt_decode from "jwt-decode"
import React, { useEffect } from "react"
import { matchRoutes, Navigate, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store/hooks"
import {
  AUTHENTICATED_ROUTES,
  UNAUTHENTICATED_ROUTES,
  URL_DASHBOARD,
  URL_LOGIN,
} from "../router/routes"
import { useRefreshTokenMutation } from "../services/user"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { LayoutProps } from "./Layout.interfaces"

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const token = useAppSelector((store) => store.auth.access_token)
  const isAuthenticated = !!token
  const [refreshtoken] = useRefreshTokenMutation()

  const authenticated_route = !!matchRoutes(AUTHENTICATED_ROUTES, pathname)?.length
  const unauthenticated_route = !!matchRoutes(UNAUTHENTICATED_ROUTES, pathname)?.length

  useEffect(() => {
    if (!token) return

    var decoded = jwt_decode<{ exp: number; iat: number; sub: string; username: string }>(token)

    // gets expiry time
    const expdate = new Date(fromUnixTime(decoded.exp))
    // subtract minute from expiry time
    const Submint = subMinutes(expdate, 1)
    // calculate exact time
    const seconds = differenceInSeconds(Submint, new Date())

    setTimeout(() => refreshtoken(), seconds * 1000)
  }, [token, refreshtoken, dispatch])

  const fullPage = false

  if (!isAuthenticated && authenticated_route) return <Navigate to={URL_LOGIN} />
  if (isAuthenticated && unauthenticated_route) return <Navigate to={URL_DASHBOARD} replace />

  return (
    <div className="flex flex-col justify-between h-full min-h-screen bg-body">
      {!fullPage && <Header />}
      {children(isAuthenticated)}
      {!fullPage && <Footer />}
    </div>
  )
}
