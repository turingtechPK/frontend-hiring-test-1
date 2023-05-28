import React from 'react';

import { Button, Layout, Modal } from 'antd';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import {logout} from '../../../store/actions/AuthAction'

import turingLogo from '../../../assets/images/TT Logo.png';

import APP_URL from '../../../constants/ApplicationUrls'

// Style
import './style.scss'

const { Header } = Layout;

function TuringHeader({
  showLogOut
}){

  // Refs
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogoutConfirm = () => {

    Modal.confirm({
      title: 'Confirm',
      icon: null,
      closable: true,
      closeIcon: <i className="icon-close"></i>,
      content: 'Are you sure you want to Log out',
      okButtonProps: 'secondary',
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      onOk: onLogout,
      className: 'meesagesModal'
    });

  }

  const onLogout = () => {
    dispatch(
      logout()
    ).then(() => {
      history.push(APP_URL.AUTH.LOGIN);
    })
  }

  return(
    <Header className="site-header header">
      {/* Header Area */}
      <img src={turingLogo}/>
      {
        showLogOut &&
        <Button type='primary' onClick={()=>onLogoutConfirm()}
        style={{float:'right', marginTop:'10px'}}>
        Log Out
        </Button>
      }
      
    </Header>
  )
}

export default TuringHeader
