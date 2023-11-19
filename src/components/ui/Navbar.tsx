import Image from 'next/image'
import React from 'react'
import Logo from '../../../design-files/TT Logo.png'
import LogoutButton from './LogoutButton'
const Navbar = () => {
  return (
    <div className='bg-white pt-[18px] pb-[21px] pl-[23px] h-20 border-b border-[#D3D5D8] flex justify-between pr-[14px]'>
      <Image
        src={Logo}
        alt='TT-Logo'
        className='max-h-10 max-w-[310px] '
        priority
      />
      <LogoutButton />
    </div>
  )
}

export default Navbar
