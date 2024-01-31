import type { Metadata } from 'next';

import './globals.css';
import Header from '@/components/app/Header';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your calls here',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white flex flex-col min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}
