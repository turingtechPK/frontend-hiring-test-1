import { Button, Form, Input, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

import { LoginInput } from './types.ts'
import { useLogin } from './useLogin.ts'

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
      style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <Form
        name="login"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="User Name"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}
