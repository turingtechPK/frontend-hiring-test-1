import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/login/Login';
import NotFound from '../pages/NotFound';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to='/login' replace />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'dashboard',
      element: <Dashboard />,
    },
    {
      path: '/404',
      element: <NotFound />,
    },
    {
      path: '*',
      element: <Navigate to='/404' replace />,
    },
  ]);
}
