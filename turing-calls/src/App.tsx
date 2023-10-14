import { Layout, Space } from 'antd'

import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './feature/login/Login.tsx'
import { Calls } from './feature/calls/Calls.tsx'
import { AppHeader } from './components/AppHeader.tsx'

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
  color: '#fff',
}

function App() {
  return (
    <BrowserRouter>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout style={{ height: '100vh' }}>
          <Header style={headerStyle}>
            <AppHeader />
          </Header>
          <Content style={contentStyle}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/calls" element={<Calls />} />
              <Route path="/" element={<Navigate to="/calls" />} />
            </Routes>
          </Content>
        </Layout>
      </Space>
    </BrowserRouter>
  )
}

export default App
