import { Layout, Space } from 'antd'

import './App.css'
import { AppRouter } from './feature/router/AppRouter.tsx'
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
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <AppHeader />
        </Header>
        <Content style={contentStyle}>
          <AppRouter />
        </Content>
      </Layout>
    </Space>
  )
}

export default App
