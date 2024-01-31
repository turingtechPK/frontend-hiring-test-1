'use client';

import CallsProvider from '@/contexts';
import CallsTable from '@/components/Calls/CallsTable';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getAccessToken } from '@/utils/localStorage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!getAccessToken()) {
      router.push('/login');
    }
  }, [router]);

  return (
    <CallsProvider>
      <main className="p-6 lg:p-12 bg-white overflow-hidden">
        <h1 className="font-medium text-2xl lg:text-4xl mb-10">
          Turing Technologies Frontend Test
        </h1>
        <CallsTable />
      </main>
    </CallsProvider>
  );
}
