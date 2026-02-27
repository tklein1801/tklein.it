'use client';

import React from 'react';
import {Grid, Paper, Skeleton} from '@mui/material';

export const LoadingProject = () => {
  return (
    <Paper elevation={0} sx={{p: 2, border: theme => `2px solid ${theme.palette.divider}`}}>
      <Skeleton width={'60%'} variant="text" />
      <React.Fragment>
        <Skeleton width={'100%'} variant="text" />
        <Skeleton width={'100%'} variant="text" />
      </React.Fragment>

      <Grid container columnSpacing={2} sx={{mt: 1}}>
        <Grid size={{xs: 6, md: 5}}>
          <Skeleton width={100} variant="rounded" />
        </Grid>

        <Grid size={{xs: 3, md: 3.5}}>
          <Skeleton width={'60%'} variant="rounded" />
        </Grid>

        <Grid size={{xs: 3, md: 3.5}}>
          <Skeleton width={'60%'} variant="rounded" />
        </Grid>
      </Grid>
    </Paper>
  );
};
