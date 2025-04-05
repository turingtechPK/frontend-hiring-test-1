'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { authState } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!authState.loading) {
      if (authState.isAuthenticated) {
        router.push('/calls');
      } else {
        router.push('/login');
      }
    }
  }, [authState.isAuthenticated, authState.loading, router]);
  
  // Display a loading state while we check authentication
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
