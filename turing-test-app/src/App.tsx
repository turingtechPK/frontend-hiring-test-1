import React, { useEffect } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Dashboard from './components/dashboard/Dashboard';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import api from './Api/api';

function App() {
  const [cookies, setCookie] = useCookies(['authToken', 'refreshToken']);
  const [isLoggedin, setisLoggedin] = useState(false)

  useEffect(() => {
    if (cookies.authToken && cookies.refreshToken) {

      api.get(`/me`, {
        headers: {
          'Authorization': `Bearer ${cookies.authToken}`
        }
      })
        .then((res) => {
          setisLoggedin(true);
        })
        .catch((err) => {
          if (err?.response?.data?.statusCode == 401) {
            api.post('auth/refresh-token', {}, {
              headers: {
                'Authorization': `bearer ${cookies.refreshToken}`
              }
            })
              .then((res) => {
                setCookie('authToken', res.data.access_token, { path: '/' })
                setisLoggedin(true)
              })
              .catch((err) => { console.log(err) })
          }
        })

    }
    else {
      setisLoggedin(false);
    }
  }, [])

  const handleIsLogin = () => {
    setisLoggedin(true);
  }

  return (
    <>
      {
        (isLoggedin) ? <Dashboard /> : <Auth setisLoggedin={handleIsLogin} />
      }
    </>
  );
}

export default App;
