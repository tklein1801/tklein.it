'use client';

import {Box, keyframes} from '@mui/material';
import React from 'react';

const slide = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

export const TickerContent: React.FC<React.PropsWithChildren<{ref?: React.Ref<unknown>; animationTime?: number}>> =
  React.forwardRef(({animationTime = 20, children}, ref) => (
    <Box
      ref={ref}
      sx={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        animation: `${slide} ${animationTime}s linear infinite`,
      }}>
      {children}
    </Box>
  ));
