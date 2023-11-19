'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'
const LoginButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      type='submit'
      className=' text-white bg-[#2093ff] p-3 mx-6 max-w-fit disabled:bg-gray-400'
    >
      {pending ? 'Loggin In...' : 'Log In'}
    </button>
  )
}

export default LoginButton
