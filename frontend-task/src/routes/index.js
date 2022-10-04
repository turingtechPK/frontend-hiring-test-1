import { Navigate, useRoutes } from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: 'login',
      element: <Login />,
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
