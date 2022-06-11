import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from '../modules/Authentication/Components/Login';
import CallListings from '../modules/Calls/Listings';
import CallDetails from '../modules/Calls/Details';

const AppRoutes = () => {
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return <Navigate to="/auth/login" replace />;
    }
    return children;
  };

  const AuthRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      return <Navigate to="/calls" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/calls" element={<ProtectedRoute><CallListings /></ProtectedRoute>} />
        <Route path="/call/details" element={<ProtectedRoute><CallDetails /></ProtectedRoute>} />
        <Route path="*" element={<AuthRoute><Login /></AuthRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
