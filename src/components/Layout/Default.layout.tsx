import React from 'react';
import {Box, Container} from '@mui/material';
import {Sidebar} from './Sidebar.component';
import {Header} from './Header.component';
import {SuspendedStockWrapper} from '@components/Base/Stock';
import {Footer} from './Footer.component';

export type TDefaultLayoutProps = React.PropsWithChildren;

export const DefaultLayout: React.FC<TDefaultLayoutProps> = ({children}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      <Sidebar />
      {/* 100% - SidebarWidth */}
      <Box sx={{width: {xs: '100%', md: `calc(100% - 360px)`}}}>
        <Header />
        <SuspendedStockWrapper />
        <Container maxWidth="xl" sx={{my: 5}}>
          {children}
        </Container>
        <Footer />
      </Box>
    </Box>
  );
};
