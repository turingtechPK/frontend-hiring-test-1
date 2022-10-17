import { RouteObject } from "react-router-dom"
import { NotFound } from "../container/NotFound"
import { Dashboard } from "../pages/Dashboard"
import { Login } from "../pages/Login"

export interface Route extends RouteObject {
  name?: string
  children?: Route[]
  icon?: JSX.Element
}

// Basic Routes

export const URL_DASHBOARD = "/"
export const URL_LOGIN = "/login"

export const OPEN_ROUTES: Route[] = [
  {
    path: "*",
    element: <NotFound />,
  },
]

export const AUTHENTICATED_ROUTES: Route[] = [
  {
    path: URL_DASHBOARD,
    element: <Dashboard />,
  },
]

export const UNAUTHENTICATED_ROUTES: Route[] = [
  {
    path: URL_LOGIN,
    element: <Login />,
  },
]
