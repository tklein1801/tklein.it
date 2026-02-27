import React from 'react';
import {Box} from '@mui/material';

export type TColorKeys = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export type TBadgeProps = {
  children: React.ReactNode;
  color?: TColorKeys;
};

export const Badge: React.FC<TBadgeProps> = ({children, color = 'primary'}) => {
  return (
    <Box
      sx={{
        width: 'fit-content',
        px: 1,
        py: 0.5,
        borderRadius: theme => (theme.shape.borderRadius as number) / 2 + 'px',
        backgroundColor: theme => theme.palette[color].main,
        color: theme => theme.palette[color].contrastText,
      }}>
      {children}
    </Box>
  );
};
