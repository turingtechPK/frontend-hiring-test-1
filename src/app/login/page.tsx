'use client'
import React from 'react'
import { redirect } from 'next/navigation'
import { useFormState } from 'react-dom'
import { authenticate } from '@/lib/actions'
import LoginButton from '@/components/ui/LoginButton'
const LoginPage = () => {
  const [state, dispatch] = useFormState(authenticate, null)

  //   const authenticate = async (formData: FormData) => {

  //   }
  if (state?.message === 'Logged In Successfully') {
    redirect('/')
  }
  return (
    <div className='flex min-h-[calc(100%-80px)] bg-[#f3ebeb] flex-col justify-center px-6 py-12 lg:px-8'>
      <div className=' h-full '>
        <form
          action={dispatch}
          className='bg-white flex flex-col justify-center max-w-xl mx-auto  gap-y-5 py-10 '
        >
          <div className='flex flex-col mx-6 gap-y-3'>
            <label className=' before:content-["*"] before:p-1 before:text-red-600'>
              User Name
            </label>
            <input
              id='username'
              type='text'
              name='username'
              autoComplete='username'
              placeholder='Email'
              className=' placeholder:text-base placeholder:font-avenirBook py-3 pl-4 focus-visible:outline-[#2093ff]  border-[#D3D5D8] border-2  '
              required
            />
          </div>
          <div className='flex flex-col mx-6 gap-y-3'>
            <label className=' before:content-["*"] before:p-1 before:text-red-600'>
              Password
            </label>
            <input
              id='password'
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='current-password'
              className=' placeholder:text-base placeholder:font-avenirBook py-3 pl-4 focus-visible:outline-[#2093ff] border-[#D3D5D8] border-2  '
              required
            />
          </div>

          <LoginButton />
        </form>
      </div>
    </div>
  )
}

export default LoginPage
