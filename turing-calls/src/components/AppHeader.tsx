import { Button, Flex } from 'antd'

import turingLogo from '../assets/TT Logo.png'

export const AppHeader: React.FC = () => {
  return (
    <Flex justify="space-between" align="center">
      <img src={turingLogo} alt="Turing Technologies" width={400} />
      <Button
        style={{
          backgroundColor: 'var(--color-primary',
          color: 'white',
        }}
      >
        Logout
      </Button>
    </Flex>
  )
}
