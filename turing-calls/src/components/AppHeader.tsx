import { Button, Flex } from 'antd'

import turingLogo from '../assets/TT Logo.png'
import { useLogin } from '../features/login/useLogin.ts'
import { useNavigate } from 'react-router-dom'

export const AppHeader: React.FC = () => {
  const context = useLogin()
  const navigate = useNavigate()

  const handleLogout = () => {
    context.signOut(() => {
      navigate('/login')
    })
  }

  return (
    <Flex justify="space-between" align="center">
      <img src={turingLogo} alt="Turing Technologies" width={400} />
      {context.user && (
        <Button
          style={{
            backgroundColor: 'var(--color-primary',
            color: 'white',
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
    </Flex>
  )
}
