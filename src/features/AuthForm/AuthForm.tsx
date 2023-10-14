'use client'
import { Button, Form, Input } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AuthFormWrapper } from './AuthForm.styles'

const authFormSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

type FieldType = {
  username?: string
  password?: string
}

export const AuthForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: authFormSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })
  return (
    <AuthFormWrapper>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={formik.handleSubmit}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          validateStatus={
            formik.touched.username && formik.errors.username ? 'error' : undefined
          }
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          validateStatus={
            formik.touched.password && formik.errors.password ? 'error' : undefined
          }
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AuthFormWrapper>
  )
}
