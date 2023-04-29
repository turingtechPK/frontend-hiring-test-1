import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import logo from '../img/TTLogo.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  logo: {
    height: '40px',
  },
  button: {
    position: 'absolute',
    right: 0
  },
}));

const Header = ({accessToken, onLogout }) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <img src={logo} alt="Logo" className={classes.logo} />

{       accessToken && <Button className={classes.button}  color="inherit" onClick={onLogout}>
          Logout
        </Button>
}      </Toolbar>
    </AppBar>
  );
};

export default Header;