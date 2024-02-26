'use client';

import React from 'react';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import {CssBaseline, ThemeProvider as MuiThemeProvider} from '@mui/material';
import {GreenTheme} from '@/style/theme/Green.theme';

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <AppRouterCacheProvider>
      <MuiThemeProvider theme={GreenTheme}>
        {children}
        <CssBaseline />
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
};
