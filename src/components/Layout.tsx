import React, { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        {children}
      </Container>
    </>
  );
};

export default Layout;
