'use client';

import {styled, Link as MuiLink} from '@mui/material';

export const Link = styled(MuiLink)(({theme}) => ({
  zIndex: 1,
  position: 'relative',
  borderBottom: 0,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&::before': {
    content: "''",
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '0.125em',
    background: theme.palette.primary.main,
    transition: 'all 0.2s',
    zIndex: -1,
  },
  '&:hover': {
    color: theme.palette.primary.contrastText,
  },
  '&:hover::before': {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
  },
}));
