import React from 'react';
import { Layout } from 'antd';
import logo from '../../assets/images/TTLogo.png';
import styles from './navbar.module.css';
const { Header } = Layout;
const Navbar = () => {
  return (
    <Header className={styles.nav}>
      <img src={logo} className={logo} />
	  <h4>Navbar</h4>
    </Header>
	
  );
};

export default Navbar;
