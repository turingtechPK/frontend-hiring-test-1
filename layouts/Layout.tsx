import { useRouter } from "next/router"
import React from "react"
import { Loader } from "../components/Loader"
import { useAppSelector } from "../redux/store/hooks"
import { URL_DASHBOARD, URL_LOGIN } from "../router/routes"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { LayoutProps } from "./Layout.interfaces"

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()

  const token = useAppSelector((store) => store.auth.access_token)
  const isAuthenticated = !!token

  const authenticated_route = router.pathname.includes(URL_DASHBOARD)
  const unauthenticated_route = router.pathname === URL_LOGIN

  const fullPage = false

  if (!isAuthenticated && authenticated_route) {
    router.push(URL_LOGIN)
    return (
      <div className="flex flex-col justify-between h-full min-h-screen bg-body">
        <Loader />
      </div>
    )
  }
  if (isAuthenticated && unauthenticated_route) {
    router.push(URL_DASHBOARD)
    return (
      <div className="flex flex-col justify-between h-full min-h-screen bg-body">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-between h-full min-h-screen bg-body">
      {!fullPage && <Header />}
      {children}
      {!fullPage && <Footer />}
    </div>
  )
}
