import Image from 'next/image'
import React from 'react'
import Logo from '../../../design-files/TT Logo.png'
const Navbar = () => {
  return (
    <div className='bg-white pt-[18px] pb-[21px] pl-[23px] h-20 '>
      <Image
        src={Logo}
        alt='TT-Logo'
        className='max-h-10 max-w-[310px] '
        priority
      />
    </div>
  )
}

export default Navbar
