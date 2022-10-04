import React from 'react';
import { Button, Layout } from 'antd';
import logo from '../../assets/images/TTLogo.png';
import styles from './navbar.module.css';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function logout(e) {
    e.preventDefault();
    try {
      await dispatch(authActions.logout());
      navigate('/login', { replace: true });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Header className={styles.nav}>
      <img src={logo} className={logo} alt='logo' />
      <Button type='primary' size='large' onClick={logout}>
        Logout
      </Button>
    </Header>
  );
};

export default Navbar;
