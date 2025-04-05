'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { authState, logout } = useAuth();
  const pathname = usePathname();
  
  // If we're on the login page or not authenticated, don't show the layout
  if (pathname === '/login' || !authState.isAuthenticated) {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/calls">
                <div className="block h-7 sm:h-8 w-auto">
                  <Image 
                    src="/logos/TT Logo.png" 
                    alt="Company Logo" 
                    width={120} 
                    height={40} 
                    className="h-7 sm:h-8 w-auto"
                  />
                </div>
              </Link>
            </div>
            
            {/* User menu */}
            <div className="flex items-center">
              <Button
                onClick={() => logout()}
                className="text-xs sm:text-sm ml-2 sm:ml-4 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-4 md:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout; 