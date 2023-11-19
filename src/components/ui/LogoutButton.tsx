'use client'
import React, { useEffect, useState } from 'react'
import { deleteCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
const LogoutButton = () => {
  const router = useRouter()
  const [token, settoken] = useState(false)
  const accessToken = hasCookie('access_token')
  useEffect(() => {
    settoken(accessToken)
  }, [accessToken])

  return (
    <>
      {token && (
        <button
          className=' pt-2 pb-3 pl-8 pr-7 bg-[#4F46F8] text-white rounded-sm'
          onClick={() => {
            deleteCookie('access_token')
            deleteCookie('refresh_token')
            settoken(false)
            router.push('/login')
          }}
        >
          Log out
        </button>
      )}
    </>
    // <button
    //   className=' pt-2 pb-3 pl-8 pr-7 bg-[#4F46F8] text-white rounded-sm'
    //   onClick={() => {
    //     deleteCookie('access_token')
    //     deleteCookie('refresh_token')
    //     router.push('/login')
    //   }}
    // >
    //   Log out
    // </button>
  )
}

export default LogoutButton
