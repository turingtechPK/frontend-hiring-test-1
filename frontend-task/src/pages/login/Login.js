import React, { useRef } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Space, Button } from 'antd';
// import Navbar from '../components/navbar/Navbar';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css'

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await dispatch(
        authActions.login(
          emailRef.current.input.value,
          passwordRef.current.input.value
        )
      );
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.loginContainer}>
      <Space direction='vertical'>
        <Input
          size='large'
          placeholder='Email'
          prefix={<UserOutlined />}
          ref={emailRef}
        />
        <Input.Password
          size='large'
          placeholder='input password'
          prefix={<LockOutlined />}
          ref={passwordRef}
        />
        <Button type='primary' size='large' onClick={handleSubmit}>
          Log in
        </Button>
      </Space>
    </div>
  );
};

export default Login;
