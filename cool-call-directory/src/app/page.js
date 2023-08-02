'use client';

import CallsTable from '@/components/CallsTable'
import { checkUserAuthentication } from '@/helpers/auth'
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const styles = {
  loading:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  }
}

export default function Home() {
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const userIsAuthenticated = checkUserAuthentication();

    if (!userIsAuthenticated) {
      router.push('/auth');
      return;
    }

    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      {loading
        ? <div style={styles.loading}><CircularProgress/></div>
        : <CallsTable/>
      }
    </React.Fragment>
  )
}
