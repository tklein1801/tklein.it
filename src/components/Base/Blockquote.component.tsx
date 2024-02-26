import React from 'react';
import {Box} from '@mui/material';

export const BlockQuote: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row', my: 3}}>
      <Box
        sx={{
          width: '4px',
          minWidth: '4px',
          height: 'inherit',
          backgroundColor: 'primary.main',
          borderRadius: '50px',
          mr: 1.5,
        }}
      />
      <Box sx={{py: 1}}>{children}</Box>
    </Box>
  );
};
