import { Layout, Space } from 'antd'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import './App.css'
import { Login } from './features/login/Login.tsx'
import { Calls } from './features/calls/Calls.tsx'
import { AppHeader } from './components/AppHeader.tsx'
import { AuthRoute } from './components/AuthRoute.tsx'
import { useLogin } from './features/login/useLogin.ts'
import { User } from './features/login/types.ts'

const { Header, Content } = Layout

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: 'white',
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
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
                  <Calls />
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
