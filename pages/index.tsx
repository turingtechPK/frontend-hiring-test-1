import React from 'react';
import type { NextPage } from 'next';
import router from 'next/router';
import Loader from '../components/Loader';

const Home: NextPage = () => {
  React.useEffect(() => {
    if(localStorage.getItem('access_token'))
      router.replace('/calls');
    else
      router.replace('/login');
  }, []);

  return (
    <Loader />
  )
}

export default Home;
