import { Button, ConfigProvider } from 'antd'

import theme from '@/theme/themeConfig'

export const HomePage: React.FC = () => {
  return (
    // <ConfigProvider theme={theme}>
    <div className="App">
      <Button type="primary">Button</Button>
    </div>
    // </ConfigProvider>
  )
}
