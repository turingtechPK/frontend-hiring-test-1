import { Outlet } from 'react-router-dom';
import { Header } from './components';

/**
 * `Layout` component defines the default layout of every page.
 */
export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
