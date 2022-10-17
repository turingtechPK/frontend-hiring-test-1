import { Button } from "@mui/material"
import Link from "next/link"
import { FC } from "react"
import { logout } from "../../redux/slice"
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks"
import { URL_DASHBOARD } from "../../router/routes"

import { HeaderProps } from "./Header.interfaces"

export const Header: FC<HeaderProps> = () => {
  const user = useAppSelector((store) => store.auth.user)
  const dispatch = useAppDispatch()

  return (
    <header className="border-b-2 bg-white flex flex-wrap justify-between items-center py-4 px-4 min-h-[64px]">
      <Link href={URL_DASHBOARD}>
        <img src="/Logo.png" alt="logo" className="h-auto max-h-6" />
      </Link>

      <div>
        {user && (
          <Button variant="contained" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        )}
      </div>
    </header>
  )
}
