'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getAccessToken, setAccessToken, setRefreshToken } from '@/utils/localStorage';
import Button from '../ui/Button';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAccessToken());
  }, [pathname]);

  return (
    <header className=" px-8 md:px-12 lg:px-16 xl:px-20 h-16 lg:h-20 py-3 lg:py-4 flex items-center justify-between shadow-md border-b-2">
      <img
        src="/logo.png"
        className="h-8 lg:h-10 w-auto object-contain"
        alt="Turing Technologies Logo"
      />

      {isLoggedIn && (
        <Button
          size="large"
          className=""
          onClick={() => {
            setAccessToken('');
            setRefreshToken('');
            router.push('/login');
          }}
        >
          Logout
        </Button>
      )}
    </header>
  );
}
