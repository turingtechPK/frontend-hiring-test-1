import { Layout, Space, Spin } from 'antd'
import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import './App.css'
import { Login } from './features/login/Login.tsx'
import { AppHeader } from './components/AppHeader.tsx'
import { AuthRoute } from './components/AuthRoute.tsx'
import { useLogin } from './features/login/useLogin.ts'
import { User } from './features/login/types.ts'

const Calls = lazy(() => import('./features/calls/Calls.tsx'))

const { Header, Content } = Layout

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'white',
  padding: 0,
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  color: '#000',
  backgroundColor: '#fff',
}

function App() {
  const context = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    if (!context.user) {
      const accessToken = sessionStorage.getItem('accessToken')
      const refreshToken = sessionStorage.getItem('refreshToken')
      const user = JSON.parse(sessionStorage.getItem('user')!) as User

      if (accessToken && refreshToken && user) {
        context.signInFromSessionStorage(
          { user, access_token: accessToken, refresh_token: refreshToken },
          () => {
            navigate('/calls')
          }
        )
      }
    }
  }, [context, navigate])

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout style={{ height: '100vh' }}>
        <Header style={headerStyle}>
          <AppHeader />
        </Header>
        <Content style={contentStyle}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/calls"
              element={
                <AuthRoute>
                  <Suspense fallback={<Spin />}>
                    <Calls />
                  </Suspense>
                </AuthRoute>
              }
            />
            <Route path="/" element={<Navigate to="/calls" />} />
          </Routes>
        </Content>
      </Layout>
    </Space>
  )
}

export default App
