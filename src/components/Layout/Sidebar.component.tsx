'use client';

import React from 'react';
import {Box, styled} from '@mui/material';
import {SidebarWidth} from '@/style/theme/constants';
import {Link} from '@components/Base';
import {Name, Picture} from '@components/Me';

const StyledAside = styled('aside')(({theme}) => ({
  background: theme.palette.background.default,
}));

export const Sidebar = () => {
  return (
    <StyledAside
      sx={{
        position: {md: 'sticky'},
        top: {md: 0},
        bottom: {md: 0},
        display: 'flex',
        flexDirection: 'column',
        alignItems: {xs: 'center', md: 'unset'},
        justifyContent: 'flex-end',
        width: {xs: '100%', md: SidebarWidth},
        height: {md: '100vh'},
        p: 3,
        backgroundColor: '#1A1A1A',
      }}>
      <Picture sx={{display: {xs: 'none', md: 'unset'}, mb: 1}} />
      <Name />
      <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: {xs: 'center', md: 'unset'}}}>
        {[
          {name: 'GitHub', url: 'https://github.com/tklein1801'},
          {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/thorben-klein-52767b1a1/',
          },
          {
            name: 'Source-Code',
            url: 'https://github.com/tklein1801/tklein.it',
          },
        ].map(link => (
          <Link
            key={link.name}
            href={link.url}
            data-umami-event="click-sidebar-link"
            data-umami-event-href={link.url}
            sx={{width: 'fit-content'}}>
            {link.name}
          </Link>
        ))}
      </Box>
    </StyledAside>
  );
};
