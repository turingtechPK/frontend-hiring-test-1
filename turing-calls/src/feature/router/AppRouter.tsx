import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login } from '../login/Login.tsx'
import { Calls } from '../calls/Calls.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/calls',
    element: <Calls />,
  },
])

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}
