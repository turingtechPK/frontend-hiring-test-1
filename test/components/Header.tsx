import Link from 'next/link'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Header = () => {


    return (
        <div style={{ backgroundColor: '#fff' }} className='fixed left-0 top-0 w-full ease-in duration-300 shadow-lg'>
            <div className='px-10 flex justify-between items-center p-4 text-black'>
                <Link href="/">
                    <Image src="/TT Logo.png"
                        alt="Turing Technologies Logo"
                        width={250}
                        height={20}
                    />
                </Link>
            </div>
        </div >
    )
}

export default Header