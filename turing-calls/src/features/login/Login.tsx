import { Button, Flex, Form, Input, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

import { LoginInput } from './types.ts'
import { useLogin } from './useLogin.ts'
import { IconUser } from '../../components/icons/IconUser.tsx'
import { IconLock } from '../../components/icons/IconLock.tsx'

type FieldType = {
  username?: string
  password?: string
}

export const Login: React.FC = () => {
  const ctx = useLogin()
  const navigate = useNavigate()

  const onFinish = (values: LoginInput) => {
    ctx.signIn(values, () => {
      navigate('/calls')
    })
  }

  return (
    <Space
      direction="horizontal"
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4EEEE',
        height: '100vh',
      }}
    >
      <Form
        name="login"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          width: 600,
          height: 400,
          backgroundColor: 'white',
          padding: '2rem 2rem',
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="User Name"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="john.doe" prefix={<IconUser />} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="********" prefix={<IconLock />} />
        </Form.Item>

        <Flex justify="start">
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Flex>
      </Form>
    </Space>
  )
}
