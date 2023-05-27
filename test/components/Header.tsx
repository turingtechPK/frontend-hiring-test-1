import Link from 'next/link'
import Image from 'next/image';
import React from 'react'
import { useAuth } from '@/context/AuthContext';

const Header = () => {
    const { logout, isLoggedIn } = useAuth();

    const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        logout();
    }


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
                <form onSubmit={handleLogout} >
                    {isLoggedIn && <button className='sm:px-6 sm:py-2 sm:text-sm text-xs py-2 px-3 bg-primary rounded-sm text-white hover:bg-primary/70 ease-in 300'>Logout</button>}
                </form>
            </div>
        </div >
    )
}

export default Header