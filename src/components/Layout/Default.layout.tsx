import React from 'react';
import {Box, Container} from '@mui/material';
import {Sidebar} from './Sidebar.component';
import {Header} from './Header.component';
import {Footer} from './Footer.component';
import {SuspendedStockWrapper} from '@components/Stock';
import {config} from '@/config';

export type TDefaultLayoutProps = React.PropsWithChildren;

export const DefaultLayout: React.FC<TDefaultLayoutProps> = ({children}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      <Sidebar />
      <Box
        sx={{display: 'flex', flexDirection: 'column', width: {xs: '100%', md: `calc(100% - ${config.sidebarWidth})`}}}>
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
