'use client';

import {createTheme} from '@mui/material';
import {Breakpoints, Components, Direction, Mixins, Shadows, Shape, Transitions, Typography, ZIndex} from './constants';

export const GreenTheme = createTheme({
  breakpoints: Breakpoints,
  direction: Direction,
  palette: {
    mode: 'dark',
    primary: {
      main: '#02d463',
      light: '#00b053',
      dark: '#28f673',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    divider: 'rgba(194, 224, 255, 0.08)',
    background: {
      default: '#212121',
      paper: '#1f1f1f',
    },
    common: {
      black: '#1D1D1D',
      white: '#fff',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.6)',
      secondary: '#B2BAC2',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    grey: {
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
    error: {
      main: '#EB0014',
      light: '#FF99A2',
      dark: '#C70011',
      contrastText: '#fff',
    },
    success: {
      main: '#1DB45A',
      light: '#6AE79C',
      dark: '#1AA251',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    warning: {
      main: '#DEA500',
      light: '#FFDC48',
      dark: '#AB6800',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    action: {
      active: '#fff',
      hover: 'rgba(255, 255, 255, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(255, 255, 255, 0.16)',
      selectedOpacity: 0.16,
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(255, 255, 255, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  },
  shape: Shape,
  unstable_strictMode: true,
  components: Components,
  typography: Typography,
  mixins: Mixins,
  shadows: Shadows,
  transitions: Transitions,
  zIndex: ZIndex,
});
