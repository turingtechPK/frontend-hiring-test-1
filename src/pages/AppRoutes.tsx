import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/layout';
import { CallsPage } from '@/pages/calls';
import { LoginPage } from '@/pages/login';
import { ProtectedRoute } from '@/components';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <CallsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
