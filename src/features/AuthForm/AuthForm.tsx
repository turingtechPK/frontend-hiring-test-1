'use client'
import { Button, Form, Input } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AuthFormWrapper } from './AuthForm.styles'
import { AuthFormFieldType } from '@/lib/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { login, refreshToken } from '@/services/requests/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'

const authFormSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

export const AuthForm: React.FC = () => {
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      router.push('/calls')
    },
    onError: (error) => {
      console.error(error)
    },
  })
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: authFormSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values)
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
        <Form.Item<AuthFormFieldType>
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

        <Form.Item<AuthFormFieldType>
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
