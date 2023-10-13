import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
