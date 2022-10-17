import { ReactNode } from "react"

export interface LayoutProps {
  children: (isAuthenticated: boolean) => ReactNode
}
