'use client'; // Error components must be Client Components

import {StyledPaper} from '@components/Base';
import {HomeRounded, RefreshRounded} from '@mui/icons-material';
import {Button, Typography} from '@mui/material';
import React from 'react';

export default function Error({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
  return (
    <StyledPaper
      sx={{
        width: {xs: '90%', md: '50%', lg: '45%'},
        maxWidth: '480px',
        margin: 'auto',
        px: 3,
        py: 2,
        textAlign: 'center',
      }}>
      <Typography variant="h2" sx={{mt: 1.5}}>
        Something went wrong
      </Typography>
      <Typography sx={{my: 1}}>
        {JSON.stringify(
          {
            name: error.name,
            message: error.message,
            digest: error.digest,
          },
          null,
          2,
        )}
      </Typography>
      <Button variant="contained" color="primary" href="/" startIcon={<HomeRounded />} sx={{mr: 2}}>
        Go to Home
      </Button>
      <Button variant="contained" color="primary" startIcon={<RefreshRounded />} onClick={() => reset()}>
        Refresh
      </Button>
    </StyledPaper>
  );
}
