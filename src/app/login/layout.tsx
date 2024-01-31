import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to proceed',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
